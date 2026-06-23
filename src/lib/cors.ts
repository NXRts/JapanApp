import { NextResponse } from "next/server";

// Get allowed origins from environment variable or use default
const getAllowedOrigins = (): string[] => {
  const envOrigins = process.env.ALLOWED_ORIGINS;
  if (envOrigins) {
    return envOrigins.split(",").map((origin) => origin.trim());
  }
  // Default origins for development and production
  return [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://japan-app.vercel.app",
    // Add your production domain here
  ];
};

export function addCorsHeaders(response: NextResponse, origin?: string | null): NextResponse {
  const allowedOrigins = getAllowedOrigins();
  
  // Check if the origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  } else if (!origin) {
    // Allow requests with no origin (like mobile apps or curl requests)
    response.headers.set("Access-Control-Allow-Origin", "*");
  }
  
  // CORS headers
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Max-Age", "86400"); // 24 hours
  
  return response;
}

export function handleCorsRequest(request: Request): NextResponse | null {
  const origin = request.headers.get("origin");
  
  // Handle preflight requests
  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 });
    return addCorsHeaders(response, origin);
  }
  
  return null;
}
