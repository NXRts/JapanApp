import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// In-memory rate limiting (fallback implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100, // 100 requests per minute
};

let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 5 * 60 * 1000; // Clean up every 5 minutes

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();

  // Lazy cleanup of all expired entries
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
    lastCleanup = now;
  }

  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT.maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// Production-ready Redis rate limiting using Upstash REST API
async function checkRedisRateLimit(identifier: string): Promise<{
  allowed: boolean;
  limit: number;
  remaining: number;
}> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Fallback to in-memory if Redis environment variables are missing
  if (!url || !token) {
    const allowed = checkRateLimit(identifier);
    const limit = RATE_LIMIT.maxRequests;
    return {
      allowed,
      limit,
      remaining: allowed ? limit - 1 : 0,
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 seconds timeout for rate limit checks

  try {
    const key = `ratelimit:${identifier}`;
    const cleanUrl = url.replace(/\/$/, "");
    const pipelineUrl = `${cleanUrl}/pipeline`;

    const res = await fetch(pipelineUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["TTL", key],
      ]),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Upstash Redis HTTP error: ${res.status}`);
    }

    const results = await res.json();
    const count = Number(results[0]?.result ?? 1);
    const ttl = Number(results[1]?.result ?? -1);

    // If key has no expiration (ttl === -1) or is newly created, set it to expire in 60s
    if (ttl === -1 || count === 1) {
      const expireUrl = `${cleanUrl}/expire/${key}/60`;
      fetch(expireUrl, {
        headers: { Authorization: `Bearer ${token}` },
      }).catch((err) => console.error("Failed to set Redis key expiry:", err));
    }

    const limit = RATE_LIMIT.maxRequests;
    const remaining = Math.max(0, limit - count);
    const allowed = count <= limit;

    return { allowed, limit, remaining };
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Redis rate limit error, falling back to in-memory:", error);
    
    // Fallback to in-memory on error
    const allowed = checkRateLimit(identifier);
    const limit = RATE_LIMIT.maxRequests;
    return {
      allowed,
      limit,
      remaining: allowed ? limit - 1 : 0,
    };
  }
}

export async function middleware(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ??
    request.headers.get("x-real-ip") ??
    "127.0.0.1";
  const path = request.nextUrl.pathname;

  // Skip rate limiting for static assets and Next.js internals
  if (
    path.startsWith("/_next") ||
    path.startsWith("/static") ||
    path.startsWith("/images") ||
    path.startsWith("/icons") ||
    path.includes(".") // Skip files with extensions
  ) {
    return NextResponse.next();
  }

  // Apply stricter rate limiting to API routes
  if (path.startsWith("/api")) {
    const identifier = `${ip}:${path}`;
    const rateLimit = await checkRedisRateLimit(identifier);

    if (!rateLimit.allowed) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
            "X-RateLimit-Limit": rateLimit.limit.toString(),
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }
  }

  // Add security headers
  const response = NextResponse.next();

  // Prevent clickjacking
  response.headers.set("X-Frame-Options", "DENY");

  // Prevent MIME type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Enable XSS protection
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Referrer policy
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions policy
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
