import { DetailedItemData, JukugoWord, ConfusableKanjiInfo } from "../types";
import { KANJI_DATA } from "@/data/kanji";
import { toRomaji } from "wanakana";

// Curated Jukugo database for popular Kanji
const JUKUGO_DATABASE: Record<string, JukugoWord[]> = {
  日: [
    { word: "日本", reading: "にほん", meaning: "Jepang" },
    { word: "日曜日", reading: "にちようび", meaning: "Hari Minggu" },
    { word: "毎日", reading: "まいにち", meaning: "Setiap Hari" },
    { word: "平日", reading: "へいじつ", meaning: "Hari Kerja" },
  ],
  月: [
    { word: "月曜日", reading: "げつようび", meaning: "Hari Senin" },
    { word: "今月", reading: "こんげつ", meaning: "Bulan Ini" },
    { word: "毎月", reading: "まいつき", meaning: "Setiap Bulan" },
    { word: "生年月日", reading: "せいねんがっぴ", meaning: "Tanggal Lahir" },
  ],
  火: [
    { word: "火曜日", reading: "かようび", meaning: "Hari Selasa" },
    { word: "火事", reading: "かじ", meaning: "Kebakaran" },
    { word: "花火", reading: "はなび", meaning: "Kembang Api" },
    { word: "火山", reading: "かざん", meaning: "Gunung Berapi" },
  ],
  水: [
    { word: "水曜日", reading: "すいようび", meaning: "Hari Rabu" },
    { word: "水着", reading: "みずぎ", meaning: "Baju Renang" },
    { word: "水道", reading: "すいどう", meaning: "Saluran Air / PDAM" },
    { word: "海水浴", reading: "かいすいよく", meaning: "Mandi Laut" },
  ],
  木: [
    { word: "木曜日", reading: "もくようび", meaning: "Hari Kamis" },
    { word: "大木", reading: "たいぼく", meaning: "Pohon Besar" },
    { word: "木材", reading: "もくざい", meaning: "Kayu Bangunan" },
  ],
  金: [
    { word: "金曜日", reading: "きんようび", meaning: "Hari Jumat" },
    { word: "お金", reading: "おかね", meaning: "Uang" },
    { word: "料金", reading: "りょうきん", meaning: "Biaya / Tarif" },
    { word: "金メダル", reading: "きんメダル", meaning: "Medali Emas" },
  ],
  土: [
    { word: "土曜日", reading: "どようび", meaning: "Hari Sabtu" },
    { word: "土産", reading: "みやげ", meaning: "Oleh-oleh" },
    { word: "土地", reading: "とち", meaning: "Tanah / Lahan" },
  ],
  人: [
    { word: "日本人", reading: "にほんじん", meaning: "Orang Jepang" },
    { word: "大人", reading: "おとな", meaning: "Orang Dewasa" },
    { word: "外国人", reading: "がいこくじん", meaning: "Orang Asing" },
    { word: "人口", reading: "じんこう", meaning: "Populasi" },
  ],
  山: [
    { word: "富士山", reading: "ふじさん", meaning: "Gunung Fuji" },
    { word: "登山", reading: "とざん", meaning: "Mendaki Gunung" },
    { word: "山脈", reading: "さんみゃく", meaning: "Pegunungan" },
  ],
  川: [
    { word: "河川", reading: "かせん", meaning: "Sungai Besar" },
    { word: "川口", reading: "かわぐち", meaning: "Muara Sungai" },
  ],
};

// Curated Visually Confusable Kanji database
const CONFUSABLE_DATABASE: Record<string, ConfusableKanjiInfo[]> = {
  日: [
    { char: "白", meaning: "Putih", differenceNote: "Memiliki garis kecil tambahan di bagian atas (ノ)" },
    { char: "百", meaning: "Ratusan", differenceNote: "Memiliki garis horizontal tegas di atas (一)" },
    { char: "目", meaning: "Mata", differenceNote: "Memiliki dua garis horizontal di dalam kotak (lebih tinggi)" },
  ],
  月: [
    { char: "用", meaning: "Gunakan", differenceNote: "Garis tengah menembus ke bawah" },
    { char: "円", meaning: "Yen / Lingkaran", differenceNote: "Garis dalam berbeda struktur" },
  ],
  土: [
    { char: "士", meaning: "Prajurit / Samurai", differenceNote: "Garis horizontal atas LEBIH PANJANG dari garis bawah" },
  ],
  木: [
    { char: "本", meaning: "Buku / Asal", differenceNote: "Memiliki garis potong horizontal pendek di bawah" },
    { char: "休", meaning: "Istirahat", differenceNote: "Memiliki radikal orang (人) di sebelah kiri" },
    { char: "林", meaning: "Hutan Kecil", differenceNote: "Dua kanji 木 bergandengan" },
  ],
  人: [
    { char: "入", meaning: "Masuk", differenceNote: "Garis kanan menimpa garis kiri" },
    { char: "八", meaning: "Delapan", differenceNote: "Kedua garis tidak bersentuhan" },
  ],
  水: [
    { char: "氷", meaning: "Es", differenceNote: "Memiliki titik kecil (丶) di bagian kiri atas" },
  ],
};

export function getDetailedItemInfo(char: string): DetailedItemData {
  // Check if Kanji
  for (const levelKey of Object.keys(KANJI_DATA)) {
    const list = KANJI_DATA[levelKey as keyof typeof KANJI_DATA];
    const match = list.find((item) => item.char === char);
    if (match) {
      const onyomi = match.on ? match.on.split("・") : [];
      const kunyomi = match.kun ? match.kun.split("・") : [];
      return {
        char: match.char,
        romaji: toRomaji(kunyomi[0] || onyomi[0] || match.char),
        meaning: match.meaning,
        onyomi,
        kunyomi,
        jukugo: JUKUGO_DATABASE[match.char] || [
          { word: `${match.char}語`, reading: `${toRomaji(match.char)}go`, meaning: `Kata terkait ${match.char}` },
        ],
        similarKanji: CONFUSABLE_DATABASE[match.char] || [],
        strokes: match.strokes || 4,
      };
    }
  }

  // Kana fallback
  return {
    char,
    romaji: toRomaji(char),
    meaning: `Karakter Kana: ${toRomaji(char)}`,
    strokes: 3,
  };
}
