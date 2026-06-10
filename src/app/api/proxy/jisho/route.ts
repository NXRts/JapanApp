import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");

  if (!keyword) {
    return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(keyword)}`,
    );
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Jisho Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from Jisho" },
      { status: 500 },
    );
  }
}
