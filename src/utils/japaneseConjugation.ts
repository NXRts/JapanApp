export interface ConjugationResult {
  formName: string;
  formNameId: string; // Indonesian explanation
  japanese: string;
  romaji?: string;
  polite?: string;
}

export interface WordConjugationTable {
  word: string;
  reading: string;
  type: "verb1" | "verb2" | "verb3" | "adj_i" | "adj_na" | "noun" | "other";
  typeLabel: string;
  items: ConjugationResult[];
}

/**
 * Detect verb or adjective group based on dictionary form and reading/meaning
 */
export function detectWordGroup(
  word: string,
  reading: string = "",
  partOfSpeech: string = ""
): "verb1" | "verb2" | "verb3" | "adj_i" | "adj_na" | "noun" | "other" {
  const pos = partOfSpeech.toLowerCase();

  if (pos.includes("suru") || word.endsWith("する") || word === "する") return "verb3";
  if (word === "来る" || word === "くる" || reading === "くる") return "verb3";

  if (pos.includes("verb 1") || pos.includes("godan") || pos.includes("v5")) return "verb1";
  if (pos.includes("verb 2") || pos.includes("ichidan") || pos.includes("v1")) return "verb2";
  if (pos.includes("i-adj") || pos.includes("adjective-i") || (word.endsWith("い") && !word.endsWith("きれい") && !word.endsWith("有名"))) return "adj_i";
  if (pos.includes("na-adj") || pos.includes("adjective-na")) return "adj_na";
  if (pos.includes("noun")) return "noun";

  // Heuristic fallbacks for Japanese dictionary forms
  if (word.endsWith("する")) return "verb3";
  if (word.endsWith("る")) {
    // Check common ichidan endings
    const stem = word.slice(0, -1);
    const lastStemChar = stem.slice(-1);
    if (["べ", "見", "れ", "せ", "て", "ね", "め", "え", "け", "げ"].includes(lastStemChar)) {
      return "verb2";
    }
    return "verb1";
  }

  const verbEndings = ["う", "く", "ぐ", "す", "つ", "ぬ", "ぶ", "む"];
  if (verbEndings.some((e) => word.endsWith(e))) {
    return "verb1";
  }

  if (word.endsWith("い")) return "adj_i";

  return "other";
}

/**
 * Generate full Japanese conjugation table
 */
export function generateConjugations(
  word: string,
  reading: string = "",
  partOfSpeech: string = ""
): WordConjugationTable | null {
  const type = detectWordGroup(word, reading, partOfSpeech);

  if (type === "other" || type === "noun") return null;

  const items: ConjugationResult[] = [];

  if (type === "verb3") {
    const isSuru = word.endsWith("する") || word === "する";
    const prefix = isSuru ? word.slice(0, -2) : "";

    if (isSuru) {
      items.push(
        { formName: "Bentuk Kamus (Plain)", formNameId: "Bentuk dasar", japanese: `${prefix}する`, romaji: `${prefix}suru` },
        { formName: "Bentuk Sopan (Masu)", formNameId: "Bentuk halus/formal", japanese: `${prefix}します`, romaji: `${prefix}shimasu` },
        { formName: "Bentuk Negatif (Nai)", formNameId: "Bentuk tidak/bukan", japanese: `${prefix}しない`, romaji: `${prefix}shinai` },
        { formName: "Bentuk Lampau (Ta)", formNameId: "Bentuk sudah terjadi", japanese: `${prefix}した`, romaji: `${prefix}shita` },
        { formName: "Bentuk Sambung (Te)", formNameId: "Bentuk lalu/mohon", japanese: `${prefix}して`, romaji: `${prefix}shite` },
        { formName: "Bentuk Potensial (Eru)", formNameId: "Bentuk bisa/sanggup", japanese: `${prefix}できる`, romaji: `${prefix}dekiru` },
        { formName: "Bentuk Keinginan (Tai)", formNameId: "Bentuk ingin", japanese: `${prefix}したい`, romaji: `${prefix}shitai` },
        { formName: "Bentuk Ajakan (Volitional)", formNameId: "Bentuk mari/ayo", japanese: `${prefix}しよう`, romaji: `${prefix}shiyou` }
      );
    } else {
      // Kuru (来る)
      items.push(
        { formName: "Bentuk Kamus (Plain)", formNameId: "Bentuk dasar", japanese: "来る", romaji: "kuru" },
        { formName: "Bentuk Sopan (Masu)", formNameId: "Bentuk halus/formal", japanese: "来ます", romaji: "kimasu" },
        { formName: "Bentuk Negatif (Nai)", formNameId: "Bentuk tidak/bukan", japanese: "来ない", romaji: "konai" },
        { formName: "Bentuk Lampau (Ta)", formNameId: "Bentuk sudah terjadi", japanese: "来た", romaji: "kita" },
        { formName: "Bentuk Sambung (Te)", formNameId: "Bentuk lalu/mohon", japanese: "来て", romaji: "kite" },
        { formName: "Bentuk Potensial (Eru)", formNameId: "Bentuk bisa/sanggup", japanese: "来られる", romaji: "korareru" },
        { formName: "Bentuk Keinginan (Tai)", formNameId: "Bentuk ingin", japanese: "来たい", romaji: "kitai" },
        { formName: "Bentuk Ajakan (Volitional)", formNameId: "Bentuk mari/ayo", japanese: "来よう", romaji: "koyou" }
      );
    }
  } else if (type === "verb2") {
    // Ichidan verb (-ru)
    const stem = word.slice(0, -1);
    items.push(
      { formName: "Bentuk Kamus (Plain)", formNameId: "Bentuk dasar", japanese: word, romaji: `${word}` },
      { formName: "Bentuk Sopan (Masu)", formNameId: "Bentuk halus/formal", japanese: `${stem}ます`, romaji: `${stem}masu` },
      { formName: "Bentuk Negatif (Nai)", formNameId: "Bentuk tidak/bukan", japanese: `${stem}ない`, romaji: `${stem}nai` },
      { formName: "Bentuk Lampau (Ta)", formNameId: "Bentuk sudah terjadi", japanese: `${stem}た`, romaji: `${stem}ta` },
      { formName: "Bentuk Sambung (Te)", formNameId: "Bentuk lalu/mohon", japanese: `${stem}て`, romaji: `${stem}te` },
      { formName: "Bentuk Potensial (Eru)", formNameId: "Bentuk bisa/sanggup", japanese: `${stem}られる`, romaji: `${stem}rareru` },
      { formName: "Bentuk Keinginan (Tai)", formNameId: "Bentuk ingin", japanese: `${stem}たい`, romaji: `${stem}tai` },
      { formName: "Bentuk Ajakan (Volitional)", formNameId: "Bentuk mari/ayo", japanese: `${stem}よう`, romaji: `${stem}you` }
    );
  } else if (type === "verb1") {
    // Godan verb (-u, -ku, -gu, -su, -tsu, -nu, -bu, -mu, -ru)
    const lastChar = word.slice(-1);
    const stem = word.slice(0, -1);

    // Helper mappings
    const iMap: Record<string, string> = { う: "い", く: "き", ぐ: "ぎ", す: "し", つ: "ち", ぬ: "に", ぶ: "び", む: "み", る: "り" };
    const aMap: Record<string, string> = { う: "わ", く: "か", ぐ: "が", す: "さ", つ: "た", ぬ: "な", ぶ: "ば", む: "ま", る: "ら" };
    const eMap: Record<string, string> = { う: "え", く: "け", ぐ: "げ", す: "せ", つ: "て", ぬ: "ね", ぶ: "べ", む: "め", る: "れ" };
    const oMap: Record<string, string> = { う: "おう", く: "こう", ぐ: "ごう", す: "そう", つ: "とう", ぬ: "のう", ぶ: "ぼう", む: "もう", る: "ろう" };

    // Te & Ta form mapping
    let teForm = "";
    let taForm = "";

    if (word === "行く" || word === "いく") {
      teForm = `${stem}行って`;
      taForm = `${stem}行った`;
    } else if (["う", "つ", "る"].includes(lastChar)) {
      teForm = `${stem}って`;
      taForm = `${stem}った`;
    } else if (["む", "ぶ", "ぬ"].includes(lastChar)) {
      teForm = `${stem}んで`;
      taForm = `${stem}んだ`;
    } else if (lastChar === "く") {
      teForm = `${stem}いて`;
      taForm = `${stem}いた`;
    } else if (lastChar === "ぐ") {
      teForm = `${stem}いで`;
      taForm = `${stem}いだ`;
    } else if (lastChar === "す") {
      teForm = `${stem}して`;
      taForm = `${stem}した`;
    } else {
      teForm = `${stem}て`;
      taForm = `${stem}た`;
    }

    const iChar = iMap[lastChar] || lastChar;
    const aChar = aMap[lastChar] || lastChar;
    const eChar = eMap[lastChar] || lastChar;
    const oChar = oMap[lastChar] || lastChar;

    items.push(
      { formName: "Bentuk Kamus (Plain)", formNameId: "Bentuk dasar", japanese: word, romaji: word },
      { formName: "Bentuk Sopan (Masu)", formNameId: "Bentuk halus/formal", japanese: `${stem}${iChar}ます`, romaji: `${stem}${iChar}masu` },
      { formName: "Bentuk Negatif (Nai)", formNameId: "Bentuk tidak/bukan", japanese: `${stem}${aChar}ない`, romaji: `${stem}${aChar}nai` },
      { formName: "Bentuk Lampau (Ta)", formNameId: "Bentuk sudah terjadi", japanese: taForm, romaji: taForm },
      { formName: "Bentuk Sambung (Te)", formNameId: "Bentuk lalu/mohon", japanese: teForm, romaji: teForm },
      { formName: "Bentuk Potensial (Eru)", formNameId: "Bentuk bisa/sanggup", japanese: `${stem}${eChar}る`, romaji: `${stem}${eChar}ru` },
      { formName: "Bentuk Keinginan (Tai)", formNameId: "Bentuk ingin", japanese: `${stem}${iChar}たい`, romaji: `${stem}${iChar}tai` },
      { formName: "Bentuk Ajakan (Volitional)", formNameId: "Bentuk mari/ayo", japanese: `${stem}${oChar}`, romaji: `${stem}${oChar}` }
    );
  } else if (type === "adj_i") {
    const stem = word.endsWith("い") ? word.slice(0, -1) : word;
    items.push(
      { formName: "Bentuk Kamus (Biasa)", formNameId: "Bentuk dasar", japanese: word, polite: `${word}です` },
      { formName: "Bentuk Negatif", formNameId: "Bentuk tidak/bukan", japanese: `${stem}くない`, polite: `${stem}くないです / ${stem}くありません` },
      { formName: "Bentuk Lampau", formNameId: "Bentuk dulu/dulu begitu", japanese: `${stem}かった`, polite: `${stem}かったです` },
      { formName: "Bentuk Lampau Negatif", formNameId: "Bentuk dulu tidak begitu", japanese: `${stem}くなかった`, polite: `${stem}くなかったです` },
      { formName: "Bentuk Sambung (Te)", formNameId: "Bentuk dan/karena", japanese: `${stem}くて` }
    );
  } else if (type === "adj_na") {
    const base = word.endsWith("な") ? word.slice(0, -1) : word;
    items.push(
      { formName: "Bentuk Kamus (Biasa)", formNameId: "Bentuk dasar", japanese: `${base}だ`, polite: `${base}です` },
      { formName: "Bentuk Negatif", formNameId: "Bentuk tidak/bukan", japanese: `${base}ではない`, polite: `${base}ではありません / ${base}じゃないです` },
      { formName: "Bentuk Lampau", formNameId: "Bentuk dulu/dulu begitu", japanese: `${base}だった`, polite: `${base}でした` },
      { formName: "Bentuk Lampau Negatif", formNameId: "Bentuk dulu tidak begitu", japanese: `${base}ではなかった`, polite: `${base}ではありませんでした` },
      { formName: "Bentuk Sambung (Te)", formNameId: "Bentuk dan/karena", japanese: `${base}で` }
    );
  }

  const typeLabels: Record<string, string> = {
    verb1: "Kata Kerja Group 1 (Godan / 五段動詞)",
    verb2: "Kata Kerja Group 2 (Ichidan / 一段動詞)",
    verb3: "Kata Kerja Group 3 (Irregular / 不規則動詞)",
    adj_i: "Kata Sifat -i (い形容詞)",
    adj_na: "Kata Sifat -na (な形容詞)",
  };

  return {
    word,
    reading,
    type,
    typeLabel: typeLabels[type] || "Kata Bahasa Jepang",
    items,
  };
}
