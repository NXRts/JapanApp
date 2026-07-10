import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hex = searchParams.get("hex");

    if (!hex) {
      return NextResponse.json(
        { error: "Hex parameter is required" },
        { status: 400 }
      );
    }

    // Clean parameter to prevent path traversal (allow only hex characters)
    const cleanHex = hex.replace(/[^a-fA-F0-9]/g, "").toLowerCase().slice(0, 8);
    if (!cleanHex) {
      return NextResponse.json(
        { error: "Invalid hex parameter" },
        { status: 400 }
      );
    }

    // Fetch the SVG server-side (immune to browser CSP and CORS headers)
    // Try JSDelivr CDN first for speed and high availability
    let res = await fetch(
      `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${cleanHex}.svg`,
      {
        next: { revalidate: 86400 }, // Cache on server for 24 hours to improve performance
      }
    );

    // Fallback to GitHub raw if JSDelivr fails
    if (!res.ok) {
      console.warn(`JSDelivr CDN failed for ${cleanHex}, falling back to raw GitHub.`);
      res = await fetch(
        `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${cleanHex}.svg`,
        {
          next: { revalidate: 86400 },
        }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch SVG from KanjiVG: ${res.status}` },
        { status: 404 }
      );
    }

    const text = await res.text();

    // Extract only the path stroke data (d attribute) using standard regex
    const matches = [...text.matchAll(/<path[^>]*\bd="([^"]+)"/g)];
    const paths = matches.map((m) => m[1]);

    return NextResponse.json(paths);
  } catch (error: any) {
    console.error("Error fetching Kanji SVG:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
