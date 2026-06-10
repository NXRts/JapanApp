import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  request: Request,
  context: { params: Promise<{ level: string }> },
) {
  try {
    const params = await context.params;
    const type = params.level.toLowerCase();

    // Ensure only valid types are requested
    const validTypes = [
      "hiragana",
      "katakana",
      "dakuten",
      "handakuten",
      "yoon",
    ];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: "Invalid kana type" }, { status: 400 });
    }

    const jsonPath = path.join(
      process.cwd(),
      "public",
      "jsons",
      `${type}.json`,
    );
    const raw = await fs.readFile(jsonPath, "utf-8");
    const data = JSON.parse(raw);

    // Extract individual characters, not their vocabulary
    const extractedKana: { character: string; romaji: string }[] = [];

    let collections = [];
    if (type === "hiragana") {
      collections.push(data.hiragana_huruf);
    } else if (type === "katakana") {
      collections.push(data.katakana_huruf);
    } else {
      collections.push(data.hiragana_huruf);
      collections.push(data.katakana_huruf);
    }

    for (const charCollection of collections) {
      if (charCollection) {
        // Handle both cases where charCollection is an array or an object
        const charArray = Array.isArray(charCollection)
          ? charCollection
          : Object.values(charCollection);

        for (const charObj of charArray as any[]) {
          if (
            charObj &&
            (charObj.hiragana ||
              charObj.katakana ||
              charObj.kana ||
              charObj.romaji)
          ) {
            extractedKana.push({
              character:
                charObj.hiragana ||
                charObj.katakana ||
                charObj.kana ||
                charObj.romaji,
              romaji: charObj.romaji,
            });
          }
        }
      }
    }

    return NextResponse.json(extractedKana);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Failed to load local kana data" },
      { status: 500 },
    );
  }
}
