import fs from "fs/promises";
import path from "path";

// Pastikan kamu memiliki API Key yang didapatkan dari Google AI Studio (Gratis)
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("\n❌ ERROR: GEMINI_API_KEY environment variable is missing.");
  console.error("👉 Cara Menjalankan:");
  console.error(
    '   linux/macOS : GEMINI_API_KEY="AIzaSy...your_key" node scripts/enrichGrammar.mjs',
  );
  console.error(
    "   windows CMD : set GEMINI_API_KEY=AIzaSy...your_key && node scripts/enrichGrammar.mjs\n",
  );
  process.exit(1);
}

const INPUT_FILE = "./public/JLPT_Vocabulary/data/rawData/GrammarList.txt";
const OUTPUT_FILE =
  "./public/JLPT_Vocabulary/data/results/GrammarDictionary.json";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function fetchGeminiData(keyword) {
  const prompt = `
Generate a JSON object for the Japanese JLPT grammar point "${keyword}".
The grammar point can be a particle, a conjugation rule, or a multi-word expression.
Return ONLY valid JSON with exactly the following schema. NO markdown backticks, NO extra text. Do not wrap with array.

{
  "id": "A unique lowercase english ID based on romaji, e.g. te-kara",
  "level": "JLPT Level, e.g. N5, N4, N3, N2, or N1",
  "title": "The exact Japanese grammar structure with tilde, e.g. ～てから",
  "meaning": "Indonesian translation of the meaning, e.g. Setelah melakukan...",
  "structure": "How to connect it to verbs/nouns, in Japanese/Indonesian, e.g. [Kata kerja -te] + から",
  "explanation": "Detailed explanation in Indonesian of nuances and when to use it.",
  "examples": [
    {
      "japanese": "Example sentence in natural Japanese.",
      "romaji": "Romaji of the sentence.",
      "english": "Indonesian translation of the sentence." (NOTE: the key name must literally be english, but the content must be in Indonesian)
    }
  ]
}
Make sure to provide exactly 3 high quality example sentences in the examples array for the grammar point.
    `;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.2, // Low temperature for consistent JSON data
              responseMimeType: "application/json", // Force the model to return JSON
            },
          }),
        },
      );

      if (!response.ok) {
        const errTxt = await response.text();
        throw new Error(`HTTP ${response.status} - ${errTxt}`);
      }

      const data = await response.json();
      let jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!jsonText) throw new Error("Empty response from API");

      // Membersihkan backticks jika model ngeyel mengembalikan format markdown
      if (jsonText.startsWith("```json"))
        jsonText = jsonText.substring(7, jsonText.length - 3).trim();
      else if (jsonText.startsWith("```"))
        jsonText = jsonText.substring(3, jsonText.length - 3).trim();

      return JSON.parse(jsonText);
    } catch (e) {
      if (attempt === 3) {
        console.error(
          `   [!] Failed after 3 attempts: ${e.message.substring(0, 100)}...`,
        );
        return null;
      }

      const isRateLimit = e.message.includes("429");
      const waitTime = isRateLimit ? 62000 : 4000; // wait 62s on 429 Rate Limit

      console.log(
        `   [!] Retry ${attempt}/3 error: ${e.message.substring(0, 80)}...`,
      );
      if (isRateLimit) {
        console.log(
          `   ⏳ Rate limit Google API tercapai (15 RPM). Menunggu 60 detik...`,
        );
      }
      await delay(waitTime);
    }
  }
  return null;
}

async function main() {
  console.log("Loading Input Grammar List...");
  let rawList = "";
  try {
    rawList = await fs.readFile(INPUT_FILE, "utf-8");
  } catch (e) {
    console.error(`❌ Input file ${INPUT_FILE} is missing.`);
    console.error(
      `Tolong buat file ${INPUT_FILE} dan isikan kata-kata grammar yang ingin diproses (satu baris satu item).`,
    );
    process.exit(1);
  }

  // Clean up empty lines, spaces, and comment lines
  const keywords = rawList
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith("#"));
  const total = keywords.length;
  console.log(`Terdeteksi ${total} kata tata bahasa yang siap di proses.\n`);

  let dictionaryArray = [];

  // Load existing progress
  try {
    await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
    const existingData = await fs.readFile(OUTPUT_FILE, "utf-8");
    dictionaryArray = JSON.parse(existingData);
    if (!Array.isArray(dictionaryArray)) {
      dictionaryArray = []; // safety fallback
    }
    console.log(
      `[Resume Mode] File output yang sudah ada ditemukan! (Sudah ada ${dictionaryArray.length} materi di dalamnya).`,
    );
  } catch (e) {
    console.log(`Memulai file output baru dari awal.`);
  }

  console.log(`=== Memulai Auto-Enrichment Grammar via AI ===`);
  console.log(
    `Tekan Ctrl+C jika ingin membatalkan. Progress Anda akan di-save berangsur-angsur.\n`,
  );

  let savedCount = 0;

  for (let i = 0; i < total; i++) {
    const keyword = keywords[i];

    // Cek apakah item ini sudah ada di dalam array (berdasarkan title awal/kata kuncinya)
    const sudahAda = dictionaryArray.some(
      (item) =>
        item.title &&
        (item.title.includes(keyword) || item.id === keyword.replace("~", "")),
    );

    if (sudahAda) {
      console.log(
        `[${i + 1}/${total}] ⏩ Melewati: ${keyword} (Sudah ada di database)`,
      );
      continue;
    }

    console.log(
      `[${i + 1}/${total}] 🤖 Melakukan generate materi untuk: ${keyword}`,
    );

    const aiData = await fetchGeminiData(keyword);

    if (aiData && aiData.title) {
      dictionaryArray.push(aiData);
      console.log(
        `   -> Sukses! Level: [${aiData.level}] | Arti: ${aiData.meaning}`,
      );
    } else {
      console.log(`   -> ❌ Gagal mendapatkan data untuk ${keyword}`);
    }

    // Delay antar request murni agar tidak terkena rate limit Google Gemini API (15 RPM limits for free tier)
    await delay(5000);

    // Auto Save ke file JSON setiap 3 item
    savedCount++;
    if (savedCount % 3 === 0) {
      await fs.writeFile(
        OUTPUT_FILE,
        JSON.stringify(dictionaryArray, null, 2),
        "utf-8",
      );
      console.log(
        `   [💾 Auto-Save: Total item sementara = ${dictionaryArray.length}]`,
      );
    }
  }

  // Save final
  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(dictionaryArray, null, 2),
    "utf-8",
  );
  console.log(
    `\n🎉 Proses Selesai! Semua Grammar berhasil di-enrich. Total: ${dictionaryArray.length} items di ${OUTPUT_FILE}`,
  );
}

main().catch((err) => {
  console.error("Fatal error in script:", err);
});
