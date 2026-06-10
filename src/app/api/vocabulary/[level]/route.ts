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
      return NextResponse.json(
        { error: "Invalid vocabulary type" },
        { status: 400 },
      );
    }

    const jsonPath = path.join(
      process.cwd(),
      "public",
      "jsons",
      `${type}.json`,
    );
    const raw = await fs.readFile(jsonPath, "utf-8");
    const data = JSON.parse(raw);

    // Extract the kosakata (vocabulary) arrays
    const extractedVocab: {
      word: string;
      reading: string;
      romaji: string;
      meaning: string;
    }[] = [];

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
          if (charObj && charObj.kosakata && Array.isArray(charObj.kosakata)) {
            for (const vocab of charObj.kosakata) {
              extractedVocab.push({
                word:
                  vocab.hiragana ||
                  vocab.katakana ||
                  vocab.kana ||
                  vocab.romaji,
                reading:
                  vocab.hiragana ||
                  vocab.katakana ||
                  vocab.kana ||
                  vocab.romaji,
                romaji: vocab.romaji,
                meaning: vocab.arti,
              });
            }
          }
        }
      }
    }

    return NextResponse.json(extractedVocab);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Failed to load local vocabulary data" },
      { status: 500 },
    );
  }
}
