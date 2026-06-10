const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "public/JLPT_Vocabulary/data/results/KanjiDictionary.json",
);
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const total = Object.keys(data).length;
console.log(`Total Kanji in dictionary: ${total}`);

const jlptKanjis = Object.values(data).filter((k) => k.jlpt !== null);
console.log(`Total JLPT Kanji: ${jlptKanjis.length}`);

const missingOnyomi = jlptKanjis.filter(
  (k) => !k.onyomi || k.onyomi.length === 0,
);
console.log(`JLPT Kanji missing Onyomi: ${missingOnyomi.length}`);

const missingKunyomi = jlptKanjis.filter(
  (k) => !k.kunyomi || k.kunyomi.length === 0,
);
console.log(`JLPT Kanji missing Kunyomi: ${missingKunyomi.length}`);

if (missingOnyomi.length > 0) {
  console.log(
    "Sample missing Onyomi:",
    missingOnyomi.slice(0, 10).map((k) => k.kanji),
  );
}
