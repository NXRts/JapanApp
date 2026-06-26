import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { logError } from "@/lib/logger";
import { addCorsHeaders, handleCorsRequest } from "@/lib/cors";

const ErrorLogSchema = z.object({
  message: z.string().max(1000),
  stack: z.string().max(10000).optional(),
  componentStack: z.string().max(10000).optional(),
});

export async function POST(request: NextRequest) {
  const corsResponse = handleCorsRequest(request);
  if (corsResponse) return corsResponse;

  const origin = request.headers.get("origin");

  try {
    const body = await request.json();
    
    // Validate request body structure
    const validation = ErrorLogSchema.safeParse(body);
    if (!validation.success) {
      const response = NextResponse.json(
        { success: false, error: "Invalid error log structure" },
        { status: 400 }
      );
      return addCorsHeaders(response, origin);
    }

    const { message, stack, componentStack } = validation.data;
    
    // Log the error using the app's structured logger
    logError(new Error(message), {
      stack,
      componentStack,
      loggedFrom: "ClientErrorBoundary",
    });

    const response = NextResponse.json({ success: true });
    return addCorsHeaders(response, origin);
  } catch (error) {
    const response = NextResponse.json(
      { success: false, error: "Malformed request or server error" },
      { status: 500 }
    );
    return addCorsHeaders(response, origin);
  }
}

export async function OPTIONS(request: NextRequest) {
  const corsResponse = handleCorsRequest(request);
  if (corsResponse) return corsResponse;
  return new NextResponse(null, { status: 204 });
}
