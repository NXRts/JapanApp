import { NextResponse } from "next/server";
import { validateKeyword } from "@/lib/validation";
import { addCorsHeaders, handleCorsRequest } from "@/lib/cors";

export async function GET(request: Request) {
  const corsResponse = handleCorsRequest(request);
  if (corsResponse) return corsResponse;

  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword");
    const origin = request.headers.get("origin");

    const validatedKeyword = validateKeyword(keyword);

    const res = await fetch(
      `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(validatedKeyword)}`,
    );
    const data = await res.json();

    const response = NextResponse.json(data);
    return addCorsHeaders(response, origin);
  } catch (error) {
    console.error("Jisho Proxy Error:", error);
    const response = NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch from Jisho" },
      { status: error instanceof Error && error.message.includes("required") ? 400 : 500 },
    );
    return addCorsHeaders(response, request.headers.get("origin"));
  }
}
