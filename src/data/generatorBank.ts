export interface GeneratorItem {
  japanese: string;
  romaji?: string;
  english: string; // Indonesian/English translations
  category: string;
  kanji?: string;
  furigana?: string;
}

export interface GrammarItem {
  pattern: string;
  exampleSentence: string;
  englishTranslation: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface GeneratorBank {
  vocabulary: GeneratorItem[];
  grammar: GrammarItem[];
  matchingPairs: { jp: string; id: string }[];
}

export const generatorBank: Record<'N5' | 'N4' | 'N3' | 'N2' | 'N1', GeneratorBank> = {
  N5: {
    vocabulary: [
      { japanese: 'あ', romaji: 'a', english: 'Vokal A', category: 'vowels' },
      { japanese: 'い', romaji: 'i', english: 'Vokal I', category: 'vowels' },
      { japanese: 'う', romaji: 'u', english: 'Vokal U', category: 'vowels' },
      { japanese: 'え', romaji: 'e', english: 'Vokal E', category: 'vowels' },
      { japanese: 'お', romaji: 'o', english: 'Vokal O', category: 'vowels' },
      { japanese: 'こんにちは', romaji: 'konnichiwa', english: 'Halo / Selamat Siang', category: 'greetings' },
      { japanese: 'おはようございます', romaji: 'ohayou gozaimasu', english: 'Selamat Pagi', category: 'greetings' },
      { japanese: 'こんばんは', romaji: 'konbanwa', english: 'Selamat Malam', category: 'greetings' },
      { japanese: 'ありがとう', romaji: 'arigatou', english: 'Terima Kasih', category: 'greetings' },
      { japanese: 'さようなら', romaji: 'sayounara', english: 'Selamat Tinggal', category: 'greetings' },
      { japanese: 'すし', romaji: 'sushi', english: 'Sushi', category: 'food' },
      { japanese: 'みず', romaji: 'mizu', english: 'Air', category: 'food' },
      { japanese: 'ごはん', romaji: 'gohan', english: 'Nasi / Makanan', category: 'food' },
      { japanese: 'おちゃ', romaji: 'ocha', english: 'Teh Hijau', category: 'food' },
      { japanese: 'ほん', romaji: 'hon', english: 'Buku', category: 'objects' },
      { japanese: 'たべる', romaji: 'taberu', english: 'Makan', category: 'verbs' },
      { japanese: 'のむ', romaji: 'nomu', english: 'Minum', category: 'verbs' },
      { japanese: 'いく', romaji: 'iku', english: 'Pergi', category: 'verbs' }
    ],
    grammar: [
      {
        pattern: 'は ~ です',
        exampleSentence: 'わたしはたなかです。',
        englishTranslation: 'Saya adalah Tanaka.',
        options: ['は', 'を', 'に', 'が'],
        answer: 'は',
        explanation: 'Partikel は (wa) digunakan untuk menandai topik utama dalam kalimat.'
      },
      {
        pattern: 'を ~ ます',
        exampleSentence: 'みずをのみます。',
        englishTranslation: 'Minum air.',
        options: ['を', 'は', 'に', 'が'],
        answer: 'を',
        explanation: 'Partikel を (o/wo) berfungsi sebagai penanda objek penderita dari kata kerja transitif.'
      },
      {
        pattern: 'に ~ ます',
        exampleSentence: 'がっこうにいきます。',
        englishTranslation: 'Pergi ke sekolah.',
        options: ['に', 'を', 'は', 'が'],
        answer: 'に',
        explanation: 'Partikel に (ni) menandai arah atau tujuan ke suatu tempat.'
      }
    ],
    matchingPairs: [
      { jp: 'あ', id: 'a' },
      { jp: 'い', id: 'i' },
      { jp: 'う', id: 'u' },
      { jp: 'え', id: 'e' },
      { jp: 'お', id: 'o' },
      { jp: 'みず', id: 'Air' },
      { jp: 'ごはん', id: 'Nasi' },
      { jp: 'すし', id: 'Sushi' }
    ]
  },
  N4: {
    vocabulary: [
      { japanese: 'えき', romaji: 'eki', english: 'Stasiun', category: 'travel' },
      { japanese: 'びょういん', romaji: 'byouin', english: 'Rumah Sakit', category: 'places' },
      { japanese: 'かぞく', romaji: 'kazoku', english: 'Keluarga', category: 'family' },
      { japanese: 'ともだち', romaji: 'tomodachi', english: 'Teman', category: 'social' },
      { japanese: 'あそこ', romaji: 'asoko', english: 'Di sana (jauh)', category: 'directions' },
      { japanese: 'かう', romaji: 'kau', english: 'Membeli', category: 'verbs' },
      { japanese: 'よむ', romaji: 'yomu', english: 'Membaca', category: 'verbs' },
      { japanese: 'ねる', romaji: 'neru', english: 'Tidur', category: 'verbs' }
    ],
    grammar: [
      {
        pattern: 'たい です (Keinginan)',
        exampleSentence: 'すしがたべたいです。',
        englishTranslation: 'Saya ingin makan sushi.',
        options: ['が', 'を', 'に', 'は'],
        answer: 'が',
        explanation: 'Saat menggunakan pola keinginan ~tai desu, partikel penanda objek penekanan yang disarankan adalah が (ga).'
      },
      {
        pattern: 'Bentuk ~ta (Lampau)',
        exampleSentence: 'きのうテレビをみた。',
        englishTranslation: 'Kemarin melihat televisi.',
        options: ['みた', 'みます', 'みる', 'みてる'],
        answer: 'みた',
        explanation: 'Bentuk lampau kasual/informal menggunakan akhiran ~ta form (mita).'
      },
      {
        pattern: 'Bentuk ~te (Perintah/Mohon)',
        exampleSentence: 'ちょっとまってください。',
        englishTranslation: 'Tolong tunggu sebentar.',
        options: ['まって', 'まちます', 'まつ', 'またない'],
        answer: 'まって',
        explanation: 'Kata kerja "matsu" berubah menjadi "matte" dalam bentuk ~te untuk permohonan sopan (~te kudasai).'
      }
    ],
    matchingPairs: [
      { jp: 'えき', id: 'Stasiun' },
      { jp: 'かぞく', id: 'Keluarga' },
      { jp: 'びょういん', id: 'Rumah Sakit' },
      { jp: 'ともだち', id: 'Teman' },
      { jp: 'あそこ', id: 'Di sana' }
    ]
  },
  N3: {
    vocabulary: [
      { japanese: '会議', romaji: 'kaigi', english: 'Rapat / Pertemuan', category: 'business' },
      { japanese: '元気そう', romaji: 'genkisou', english: 'Kelihatannya Sehat', category: 'adjectives' },
      { japanese: '美味しい', romaji: 'oishii', english: 'Lezat / Enak', category: 'food' },
      { japanese: '謙遜', romaji: 'kenson', english: 'Rendah Hati', category: 'traits' },
      { japanese: '案内', romaji: 'annai', english: 'Memandu / Menuntun', category: 'verbs' }
    ],
    grammar: [
      {
        pattern: 'そう です (Dugaan)',
        exampleSentence: '雨が降りそうです。',
        englishTranslation: 'Kelihatannya akan turun hujan.',
        options: ['降りそう', '降るそう', '降ってそう', '降り'],
        answer: '降りそう',
        explanation: 'Dugaan kelihatannya (~sou) menggunakan stem kata kerja (furi) + sou.'
      },
      {
        pattern: 'Kenjougo (Merendah)',
        exampleSentence: '田中と申します。',
        englishTranslation: 'Saya bernama Tanaka.',
        options: ['申します', 'おっしゃいます', '言います', 'でございます'],
        answer: '申します',
        explanation: 'Moushimasu adalah bentuk Kenjougo (bahasa merendahkan diri) untuk menyatakan nama/berkata.'
      },
      {
        pattern: 'Sonkeigo (Hormat)',
        exampleSentence: '先生が召し上がります。',
        englishTranslation: 'Guru sedang makan/minum.',
        options: ['召し上がります', 'いただきます', '食べます', '参ります'],
        answer: '召し上がります',
        explanation: 'Meshiagarimasu adalah bentuk Sonkeigo (bahasa menghormati lawan bicara/guru) untuk kata makan/minum.'
      }
    ],
    matchingPairs: [
      { jp: '会議', id: 'Rapat' },
      { jp: '美味しい', id: 'Lezat' },
      { jp: '謙遜', id: 'Rendah Hati' },
      { jp: '案内', id: 'Memandu' }
    ]
  },
  N2: {
    vocabulary: [
      { japanese: '環境', romaji: 'kankyou', english: 'Lingkungan', category: 'news' },
      { japanese: '影響', romaji: 'eikyou', english: 'Pengaruh', category: 'science' },
      { japanese: '経済', romaji: 'keizai', english: 'Ekonomi', category: 'politics' },
      { japanese: '解決', romaji: 'kaiketsu', english: 'Solusi / Penyelesaian', category: 'society' }
    ],
    grammar: [
      {
        pattern: 'について (Mengenai)',
        exampleSentence: 'この問題について考えます。',
        englishTranslation: 'Saya akan memikirkan tentang masalah ini.',
        options: ['について', 'にとって', 'として', 'において'],
        answer: 'について',
        explanation: '~ni tsuite digunakan untuk menandai subjek bahasan utama yang sedang dibahas/diteliti.'
      },
      {
        pattern: 'において (Di/Pada formal)',
        exampleSentence: '東京において会議が行われた。',
        englishTranslation: 'Rapat diadakan di Tokyo.',
        options: ['において', 'について', 'にとって', 'として'],
        answer: 'において',
        explanation: '~ni oite adalah ragam formal bahasa tulis untuk menandai lokasi atau bidang terjadinya suatu hal.'
      }
    ],
    matchingPairs: [
      { jp: '環境', id: 'Lingkungan' },
      { jp: '影響', id: 'Pengaruh' },
      { jp: '経済', id: 'Ekonomi' },
      { jp: '解決', id: 'Solusi' }
    ]
  },
  N1: {
    vocabulary: [
      { japanese: '謙遜', romaji: 'kenson', english: 'Sikap rendah hati yang mendalam', category: 'traits' },
      { japanese: '懸念', romaji: 'kenen', english: 'Kekhawatiran yang sangat mendalam', category: 'philosophy' },
      { japanese: '矛盾', romaji: 'mujun', english: 'Kontradiksi / Paradoks', category: 'academic' },
      { japanese: '余儀なくされる', romaji: 'yogi naku sareru', english: 'Terpaksa dilakukan tanpa pilihan lain', category: 'verbs' }
    ],
    grammar: [
      {
        pattern: 'をもって (Dengan ini/Batas)',
        exampleSentence: '本日をもって閉店いたします。',
        englishTranslation: 'Dengan ini toko tutup per hari ini.',
        options: ['をもって', 'を契機に', 'を通じて', 'のもとで'],
        answer: 'をもって',
        explanation: '~wo motte menandai batasan waktu penutupan atau keputusan formal dalam bahasa sastra tertulis.'
      },
      {
        pattern: 'なり ~ なり (Alternatif)',
        exampleSentence: '行くくなり行かないくなり、返事をして。',
        options: ['なり / なり', 'とか / とか', 'だの / だの', 'つつ / つつ'],
        answer: 'なり / なり',
        explanation: '~nari ~nari memberikan dua contoh alternatif tindakan ekstrem yang bisa dipilih pembicara.'
      }
    ],
    matchingPairs: [
      { jp: '懸念', id: 'Kekhawatiran' },
      { jp: '矛盾', id: 'Kontradiksi' },
      { jp: '謙遜', id: 'Rendah Hati' }
    ]
  }
};
