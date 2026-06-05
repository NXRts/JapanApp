export interface Question {
  id: string;
  type: 'multiple-choice' | 'sentence-builder' | 'listening' | 'fill-in-the-blank' | 'typing';
  questionText: string;
  audioText?: string; // Text to be spoken by standard Web Speech API for listening tasks
  options: string[]; // Options for multiple choice or cards for sentence builder
  answer: string; // Correct answer (for sentence-builder: space-separated card values)
  hint?: string;
}

export interface Lesson {
  id: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  unitId: string;
  unitTitle: string;
  unitDescription: string;
  unitColor: string;
  title: string;
  description: string;
  expReward: number;
  icon: string;
  badge: string;
  questions: Question[];
}

export const lessonsData: Lesson[] = [
  // ==========================================
  // JLPT N5: FOUNDATIONS & BASICS
  // ==========================================
  // ==========================================
  // UNIT 1: MEMESAN MAKANAN & MINUMAN DI RESTORAN
  // ==========================================
  {
    id: 'n5-u1-l1',
    level: 'N5',
    unitId: 'n5-u1',
    unitTitle: 'Unit 1: Ordering Food & Drinks at a Restaurant 🎌',
    unitDescription: 'Master how to order food/drinks politely in a Japanese restaurant.',
    unitColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    title: 'Basic Vowels & Hiragana',
    description: 'Learn the pronunciation and basic Japanese vowels: あ, い, う, え, お.',
    expReward: 20,
    icon: '🎌',
    badge: 'Hiragana',
    questions: [
      {
        id: 'n5-u1-l1-q1',
        type: 'multiple-choice',
        questionText: 'Pilihlah ejaan Romaji yang tepat untuk huruf Hiragana berikut: あ',
        options: ['a', 'i', 'u', 'e'],
        answer: 'a',
        hint: 'Karakter ini adalah vokal pertama dalam alfabet Jepang.'
      },
      {
        id: 'n5-u1-l1-q2',
        type: 'typing',
        questionText: 'Ketiklah padanan Romaji untuk huruf Hiragana berikut: い',
        options: [],
        answer: 'i',
        hint: 'Dibaca seperti huruf "i" dalam kata "ibu".'
      },
      {
        id: 'n5-u1-l1-q3',
        type: 'listening',
        questionText: 'Dengarkan suara berikut dan pilihlah huruf Hiragana yang tepat!',
        audioText: 'う',
        options: ['あ', 'い', 'う', 'え'],
        answer: 'う',
        hint: 'Bunyi vokal "u".'
      },
      {
        id: 'n5-u1-l1-q4',
        type: 'multiple-choice',
        questionText: 'Manakah huruf Hiragana yang dibaca sebagai "e"?',
        options: ['お', 'え', 'う', 'あ'],
        answer: 'え',
        hint: 'Bentuknya mirip dengan lambang pengait kecil.'
      },
      {
        id: 'n5-u1-l1-q5',
        type: 'sentence-builder',
        questionText: 'Susunlah kata "A-I" (Cinta dalam bahasa Jepang) dari kartu berikut!',
        options: ['い', 'う', 'あ', 'え'],
        answer: 'あ い',
        hint: 'Gabungkan vokal pertama "A" dan vokal kedua "I".'
      }
    ]
  },
  {
    id: 'n5-u1-l2',
    level: 'N5',
    unitId: 'n5-u1',
    unitTitle: 'Unit 1: Ordering Food & Drinks at a Restaurant 🎌',
    unitDescription: 'Master how to order food/drinks politely in a Japanese restaurant.',
    unitColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    title: 'Restaurant Menu Vocabulary',
    description: 'Learn the words for ramen, sushi, mizu, and koohii.',
    expReward: 20,
    icon: '🍱',
    badge: 'Kosakata',
    questions: [
      {
        id: 'n5-u1-l2-q1',
        type: 'multiple-choice',
        questionText: 'Apa arti dari kosakata makanan "すし" (sushi)?',
        options: ['Nasi kepal khas Jepang', 'Mie kuah kaldu', 'Daging sapi panggang', 'Sup kacang merah'],
        answer: 'Nasi kepal khas Jepang',
        hint: 'Kombinasi nasi cuka dan ikan mentah segar.'
      },
      {
        id: 'n5-u1-l2-q2',
        type: 'multiple-choice',
        questionText: 'Apakah terjemahan dari kata "コーヒー" (koohii)?',
        options: ['Kopi', 'Teh Hijau', 'Air', 'Susu'],
        answer: 'Kopi',
        hint: 'Kata serapan asing (Katakana).'
      },
      {
        id: 'n5-u1-l2-q3',
        type: 'listening',
        questionText: 'Dengarkan pelafalan audio berikut dan tentukan arti kata yang tepat!',
        audioText: 'みず',
        options: ['Air', 'Teh', 'Kopi', 'Nasi'],
        answer: 'Air',
        hint: 'Zat cair vital bebas rasa (Mizu).'
      },
      {
        id: 'n5-u1-l2-q4',
        type: 'multiple-choice',
        questionText: 'Manakah penulisan Katakana yang tepat untuk kata mi khas Jepang "Ramen"?',
        options: ['ラーメン', 'うどん', 'そば', 'パスタ'],
        answer: 'ラーメン',
        hint: 'Kombinasi mi kenyal dan kuah kaldu gurih.'
      },
      {
        id: 'n5-u1-l2-q5',
        type: 'typing',
        questionText: 'Ketik arti bahasa Indonesia dari kata "おちゃ" (ocha):',
        options: [],
        answer: 'teh',
        hint: 'Minuman teh hijau khas Jepang.'
      }
    ]
  },
  {
    id: 'n5-u1-l3',
    level: 'N5',
    unitId: 'n5-u1',
    unitTitle: 'Unit 1: Ordering Food & Drinks at a Restaurant 🎌',
    unitDescription: 'Master how to order food/drinks politely in a Japanese restaurant.',
    unitColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    title: 'Particles & Counting',
    description: 'Learn hitotsu, futatsu, mittsu, and object particle wo.',
    expReward: 20,
    icon: '🔢',
    badge: 'Grammar',
    questions: [
      {
        id: 'n5-u1-l3-q1',
        type: 'multiple-choice',
        questionText: 'Manakah kata bantu bilangan untuk menyatakan pesanan sebanyak "satu porsi/buah"?',
        options: ['ひとつ (hitotsu)', 'ふたつ (futatsu)', 'みっつ (mittsu)', 'よっつ (yottsu)'],
        answer: 'ひとつ (hitotsu)',
        hint: 'Hitungan universal dasar berakhiran ~tsu.'
      },
      {
        id: 'n5-u1-l3-q2',
        type: 'multiple-choice',
        questionText: 'Manakah kata bantu bilangan untuk menyatakan pesanan sebanyak "tiga porsi/buah"?',
        options: ['みっつ (mittsu)', 'ひとつ (hitotsu)', 'ふたつ (futatsu)', 'よっつ (yottsu)'],
        answer: 'みっつ (mittsu)',
        hint: 'Hitotsu (1), futatsu (2), mittsu (3).'
      },
      {
        id: 'n5-u1-l3-q3',
        type: 'fill-in-the-blank',
        questionText: 'Lengkapi partikel objek penderita yang tepat saat memesan Sushi: \n「すし ___ ふたつください。」',
        options: ['を', 'は', 'が', 'に'],
        answer: 'を',
        hint: 'Partikel penanda objek penderita adalah wo/o (を).'
      },
      {
        id: 'n5-u1-l3-q4',
        type: 'sentence-builder',
        questionText: 'Susun kalimat bahasa Jepang: "Minta air satu porsi."',
        options: ['みず', 'を', 'ひとつ', 'ください'],
        answer: 'みず を ひとつ ください',
        hint: 'Benda + wo + Kuantitas + kudasai.'
      },
      {
        id: 'n5-u1-l3-q5',
        type: 'typing',
        questionText: 'Ketik dalam Hiragana cara membaca Kanji air berikut: 水',
        options: [],
        answer: 'みず',
        hint: 'Dilafalkan sebagai "mizu".'
      }
    ]
  },
  {
    id: 'n5-u1-l4',
    level: 'N5',
    unitId: 'n5-u1',
    unitTitle: 'Unit 1: Ordering Food & Drinks at a Restaurant 🎌',
    unitDescription: 'Master how to order food/drinks politely in a Japanese restaurant.',
    unitColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    title: 'Making Ordering Sentences',
    description: 'Learn kudasai, kore wa nan desu ka, and onegaishimasu sentence patterns.',
    expReward: 20,
    icon: '🗣️',
    badge: 'Percakapan',
    questions: [
      {
        id: 'n5-u1-l4-q1',
        type: 'multiple-choice',
        questionText: 'Manakah pola kalimat tanya yang tepat untuk menanyakan "Ini apa?"',
        options: ['これはなんですか', 'これをください', 'これをお願いします', 'これはいくらですか'],
        answer: 'これはなんですか',
        hint: 'Kore wa (ini adalah) + nan (apa) + desu ka (tanya).'
      },
      {
        id: 'n5-u1-l4-q2',
        type: 'multiple-choice',
        questionText: 'Jika ingin meminta sesuatu dengan nuansa yang sangat halus dan sopan, akhiran manakah yang ditambahkan?',
        options: ['をお願いします (wo onegaishimasu)', 'をください (wo kudasai)', 'はなんですか (wa nan desu ka)', 'はいくらですか (wa ikura desu ka)'],
        answer: 'をお願いします (wo onegaishimasu)',
        hint: 'Onegaishimasu memberikan tingkat kesopanan yang lebih tinggi di restoran/toko.'
      },
      {
        id: 'n5-u1-l4-q3',
        type: 'fill-in-the-blank',
        questionText: 'Lengkapi kalimat memesan ramen: \n「ラーメン ___ お願いします。」',
        options: ['を', 'は', 'が', 'に'],
        answer: 'を',
        hint: 'Sama seperti kudasai, onegaishimasu diawali partikel objek を.'
      },
      {
        id: 'n5-u1-l4-q4',
        type: 'sentence-builder',
        questionText: 'Susun kalimat bahasa Jepang: "Tolong berikan ini (sambil menunjuk menu)."',
        options: ['これ', 'を', 'ください'],
        answer: 'これ を ください',
        hint: 'Kore (ini) + wo + kudasai.'
      },
      {
        id: 'n5-u1-l4-q5',
        type: 'typing',
        questionText: 'Ketik ejaan romaji huruf kecil semua untuk kata penunjuk dekat "Ini":',
        options: [],
        answer: 'kore',
        hint: 'Ditulis dengan empat huruf Romaji.'
      }
    ]
  },
  {
    id: 'n5-u1-l5',
    level: 'N5',
    unitId: 'n5-u1',
    unitTitle: 'Unit 1: Ordering Food & Drinks at a Restaurant 🎌',
    unitDescription: 'Master how to order food/drinks politely in a Japanese restaurant.',
    unitColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    title: 'Unit 1 Final Challenge',
    description: 'Final synthesis of all materials on ordering food and drinks in a restaurant.',
    expReward: 30,
    icon: '🏆',
    badge: 'Sintesis',
    questions: [
      {
        id: 'n5-u1-l5-q1',
        type: 'multiple-choice',
        questionText: 'Manakah kalimat yang tepat untuk mengatakan "Tolong berikan air" di restoran?',
        options: ['みずをください', 'おちゃをください', 'これをください', 'コーヒーをください'],
        answer: 'みずをください',
        hint: 'みず (Mizu) berarti air, sedangkan "をください" (wo kudasai) digunakan untuk meminta sesuatu.'
      },
      {
        id: 'n5-u1-l5-q2',
        type: 'multiple-choice',
        questionText: 'Apakah arti dari kosakata katakana "コーヒー" (koohii)?',
        options: ['Kopi', 'Teh Hijau', 'Air', 'Susu'],
        answer: 'Kopi',
        hint: 'コーヒー (koohii) adalah kata serapan Katakana dari bahasa Inggris "coffee".'
      },
      {
        id: 'n5-u1-l5-q3',
        type: 'fill-in-the-blank',
        questionText: 'Pilihlah partikel penanda objek yang tepat untuk melengkapi pesanan Sushi berikut: \n「すし ___ ください。」',
        options: ['を', 'は', 'が', 'に'],
        answer: 'を',
        hint: 'Partikel を (o/wo) berfungsi sebagai penanda objek penderita dari tindakan meminta.'
      },
      {
        id: 'n5-u1-l5-q4',
        type: 'multiple-choice',
        questionText: 'Apakah arti yang tepat untuk kosakata bahasa Jepang berikut: 「すし」?',
        options: ['Sushi', 'Kopi', 'Ramen', 'Air'],
        answer: 'Sushi',
        hint: 'Nasi kepal khas Jepang dengan ikan mentah.'
      },
      {
        id: 'n5-u1-l5-q5',
        type: 'multiple-choice',
        questionText: 'Anda ingin menanyakan makanan tidak dikenal yang dihidangkan oleh pelayan di meja Anda. Kalimat tanya manakah yang paling tepat?',
        options: ['これはなんですか', 'これはみずですか', 'これをください', 'これはいくらですか'],
        answer: 'これはなんですか',
        hint: 'Pola kalimat "これはなんですか" digunakan untuk menanyakan "Ini apa?".'
      },
      {
        id: 'n5-u1-l5-q6',
        type: 'sentence-builder',
        questionText: 'Susunlah kata-kata acak berikut menjadi kalimat permohonan yang tepat: "Tolong berikan ini." (Memesan dengan menunjuk menu langsung)',
        options: ['ください', 'を', 'これ'],
        answer: 'これ を ください',
        hint: 'Struktur kalimat: これ (Ini) + を (wo) + ください (kudasai).'
      },
      {
        id: 'n5-u1-l5-q7',
        type: 'multiple-choice',
        questionText: 'Manakah cara baca kunyomi yang tepat untuk karakter Kanji air berikut: "水"?',
        options: ['みず (mizu)', 'おちゃ (ocha)', 'ごはん (gohan)', 'おにく (oniku)'],
        answer: 'みず (mizu)',
        hint: 'Karakter Kanji "水" dibaca sebagai "mizu".'
      },
      {
        id: 'n5-u1-l5-q8',
        type: 'fill-in-the-blank',
        questionText: 'Lengkapi bagian rumpang berikut saat ingin memesan ramen sebanyak "dua mangkuk/porsi": \n「ラーメンを ___ ください。」',
        options: ['ひとつ', 'ふたつ', 'みっつ', 'よっつ'],
        answer: 'ふたつ',
        hint: 'Kata bantu hitung benda: ひとつ (1), ふたつ (2), みっつ (3).'
      },
      {
        id: 'n5-u1-l5-q9',
        type: 'sentence-builder',
        questionText: 'Susunlah potongan kata acak berikut menjadi kalimat pesanan: "Tolong ramen satu porsi."',
        options: ['ください', 'を', 'ひとつ', 'ラーメン'],
        answer: 'ラーメン を ひとつ ください',
        hint: 'Pola kuantitas pesanan: [Makanan] + を + [Kuantitas] + ください.'
      },
      {
        id: 'n5-u1-l5-q10',
        type: 'multiple-choice',
        questionText: 'Jika Anda ingin memesan hidangan dengan kalimat yang sangat sopan dan formal seperti "Tolong / Mohon berikan ini", ungkapan manakah yang paling tepat?',
        options: ['これをください', 'これをお願いします', 'これはなんですか', 'これと整いです'],
        answer: 'これをお願いします',
        hint: 'Frasa "をお願いします" (wo onegaishimasu) jauh lebih formal dan santun.'
      }
    ]
  },

  // ==========================================
  // UNIT 2: BERBELANJA KEBUTUHAN DI MINIMARKET
  // ==========================================
  {
    id: 'n5-u2-l1',
    level: 'N5',
    unitId: 'n5-u2',
    unitTitle: 'Unit 2: Shopping for Needs at a Convenience Store (Konbini) 🏪',
    unitDescription: 'Master how to shop at a Japanese convenience store.',
    unitColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    title: 'Convenience Store Vocabulary',
    description: 'Learn the words for ocha, bento, fukuro, and convenience store items.',
    expReward: 20,
    icon: '🏪',
    badge: 'Kosakata',
    questions: [
      {
        id: 'n5-u2-l1-q1',
        type: 'multiple-choice',
        questionText: 'Apa arti dari kosakata minimarket "おかんじょう" (okanjo)?',
        options: ['Tagihan / Kasir', 'Kantong Belanja', 'Nasi Kotak', 'Teh Hijau'],
        answer: 'Tagihan / Kasir',
        hint: 'Digunakan saat menyatakan pembayaran atau menanyakan total tagihan.'
      },
      {
        id: 'n5-u2-l1-q2',
        type: 'multiple-choice',
        questionText: 'Apakah terjemahan dari kata "お弁当" (obento)?',
        options: ['Nasi Kotak / Bekal Makanan', 'Kantong Belanja', 'Kasir Pembayaran', 'Teh Jepang'],
        answer: 'Nasi Kotak / Bekal Makanan',
        hint: 'Makanan praktis yang sangat populer dijual di Konbini.'
      },
      {
        id: 'n5-u2-l1-q3',
        type: 'listening',
        questionText: 'Dengarkan audio berikut dan tentukan arti kata yang diucapkan!',
        audioText: 'ふくろ',
        options: ['Kantong plastik / kantong belanja', 'Nasi kotak', 'Teh', 'Tagihan kasir'],
        answer: 'Kantong plastik / kantong belanja',
        hint: 'Fukuro berarti kantong pembungkus.'
      },
      {
        id: 'n5-u2-l1-q4',
        type: 'multiple-choice',
        questionText: 'Manakah penulisan Kanji yang tepat untuk mata uang Jepang "Yen"?',
        options: ['円', '百', '千', '万'],
        answer: '円',
        hint: 'Yen digambarkan sebagai lingkaran Kanji "en" (円).'
      },
      {
        id: 'n5-u2-l1-q5',
        type: 'typing',
        questionText: 'Ketik arti bahasa Indonesia dari "お茶" (ocha):',
        options: [],
        answer: 'teh',
        hint: 'Minuman teh hijau tawar yang menyehatkan.'
      }
    ]
  },
  {
    id: 'n5-u2-l2',
    level: 'N5',
    unitId: 'n5-u2',
    unitTitle: 'Unit 2: Shopping for Needs at a Convenience Store (Konbini) 🏪',
    unitDescription: 'Master how to shop at a Japanese convenience store.',
    unitColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    title: 'Demonstrative Pronouns',
    description: 'Learn the words kore, sore, and are.',
    expReward: 20,
    icon: '👉',
    badge: 'Grammar',
    questions: [
      {
        id: 'n5-u2-l2-q1',
        type: 'multiple-choice',
        questionText: 'Manakah kata penunjuk untuk benda yang jauh dari pembicara dan lawan pembicara (Itu di sana)?',
        options: ['これ (kore)', 'それ (sore)', 'あれ (are)', 'どれ (dore)'],
        answer: 'あれ (are)',
        hint: 'Kore (dekat pembicara), sore (dekat lawan bicara), are (jauh dari keduanya).'
      },
      {
        id: 'n5-u2-l2-q2',
        type: 'multiple-choice',
        questionText: 'Kata penunjuk "それ" (sore) digunakan untuk menunjuk benda yang...',
        options: ['Dekat dengan lawan bicara', 'Dekat dengan pembicara', 'Jauh dari pembicara & lawan bicara', 'Tidak terlihat'],
        answer: 'Dekat dengan lawan bicara',
        hint: 'Sore tertuju pada ranah lawan bicara.'
      },
      {
        id: 'n5-u2-l2-q3',
        type: 'fill-in-the-blank',
        questionText: 'Lengkapi dengan kata penunjuk yang tepat saat memegang benda di tangan Anda: \n「___は私のです。(Ini adalah milik saya.)」',
        options: ['これ', 'それ', 'あれ', 'どれ'],
        answer: 'これ',
        hint: 'Gunakan kore saat benda berada dekat/dalam genggaman pembicara.'
      },
      {
        id: 'n5-u2-l2-q4',
        type: 'sentence-builder',
        questionText: 'Susun kalimat bahasa Jepang: "Itu adalah air."',
        options: ['それ', 'は', 'みず', 'です'],
        answer: 'それ は みず です',
        hint: 'Sore (itu) + wa + mizu + desu.'
      },
      {
        id: 'n5-u2-l2-q5',
        type: 'typing',
        questionText: 'Ketik ejaan romaji huruf kecil semua untuk kata penunjuk jauh "Itu di sana":',
        options: [],
        answer: 'are',
        hint: 'Ditulis dengan tiga huruf Romaji.'
      }
    ]
  },
  {
    id: 'n5-u2-l3',
    level: 'N5',
    unitId: 'n5-u2',
    unitTitle: 'Unit 2: Shopping for Needs at a Convenience Store (Konbini) 🏪',
    unitDescription: 'Master how to shop at a Japanese convenience store.',
    unitColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    title: 'Numbers & Prices',
    description: 'Learn the words ikura, en, hyaku, and sen.',
    expReward: 20,
    icon: '💴',
    badge: 'Hitungan',
    questions: [
      {
        id: 'n5-u2-l3-q1',
        type: 'multiple-choice',
        questionText: 'Manakah kata tanya yang digunakan untuk menanyakan harga barang (Berapa)?',
        options: ['いくら (ikura)', 'どこ (doko)', 'なん (nan)', 'いつ (itsu)'],
        answer: 'いくら (ikura)',
        hint: 'Ikura desu ka berarti berapa harganya.'
      },
      {
        id: 'n5-u2-l3-q2',
        type: 'multiple-choice',
        questionText: 'Apakah arti dari Kanji ratusan "百" (hyaku) dan ribuan "千" (sen)?',
        options: ['100 dan 1000', '10 dan 100', '1000 dan 10000', '1 dan 10'],
        answer: '100 dan 1000',
        hint: 'Hyaku dibaca sebagai 100, sedangkan Sen dibaca 1000.'
      },
      {
        id: 'n5-u2-l3-q3',
        type: 'fill-in-the-blank',
        questionText: 'Lengkapi kalimat tanya harga berikut: \n「これはいくら___か。」',
        options: ['です', 'ます', 'ください', 'の'],
        answer: 'です',
        hint: 'Gunakan kopula desu untuk mengakhiri kalimat nominal.'
      },
      {
        id: 'n5-u2-l3-q4',
        type: 'sentence-builder',
        questionText: 'Susun kalimat bahasa Jepang: "Bento ini 500 Yen."',
        options: ['この', 'お弁当', 'は', '五百円', 'です'],
        answer: 'この お弁当 は 五百円 です',
        hint: 'Kono obento wa gohyaku-en desu.'
      },
      {
        id: 'n5-u2-l3-q5',
        type: 'typing',
        questionText: 'Ketik dalam Romaji huruf kecil semua padanan mata uang Yen Jepang (円):',
        options: [],
        answer: 'en',
        hint: 'Ejaan Romajinya dibaca sebagai "en".'
      }
    ]
  },
  {
    id: 'n5-u2-l4',
    level: 'N5',
    unitId: 'n5-u2',
    unitTitle: 'Unit 2: Shopping for Needs at a Convenience Store (Konbini) 🏪',
    unitDescription: 'Master how to shop at a Japanese convenience store.',
    unitColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    title: 'Payment Methods',
    description: 'Learn the words okanjo, kaikei, and payment actions.',
    expReward: 20,
    icon: '💳',
    badge: 'Transaksi',
    questions: [
      {
        id: 'n5-u2-l4-q1',
        type: 'multiple-choice',
        questionText: 'Kosakata manakah yang digunakan untuk meminta tagihan pembayaran di kasir konbini?',
        options: ['お会計 (okaikei)', 'お弁当 (obento)', 'お袋 (ofukuro)', 'お茶 (ocha)'],
        answer: 'お会計 (okaikei)',
        hint: 'Okaikei atau okanjo merujuk pada urusan pembayaran kasir.'
      },
      {
        id: 'n5-u2-l4-q2',
        type: 'multiple-choice',
        questionText: 'Apa arti kata "お会計をお願いします" (Okaikei wo onegaishimasu)?',
        options: ['Tolong total tagihannya / Mohon pembayarannya', 'Tolong berikan saya bento hangat', 'Mohon berikan kantong plastik', 'Tolong teh hangat satu'],
        answer: 'Tolong total tagihannya / Mohon pembayarannya',
        hint: 'Pola memesan tagihan/pembayaran sopan.'
      },
      {
        id: 'n5-u2-l4-q3',
        type: 'fill-in-the-blank',
        questionText: 'Lengkapi kalimat meminta kantong belanja plastik: \n「袋を ___ ください。」',
        options: ['を', 'は', 'が', 'に'],
        answer: 'を',
        hint: 'Fukuro (kantong) adalah objek penderita tindakan meminta, sehingga gunakan partikel wo.'
      },
      {
        id: 'n5-u2-l4-q4',
        type: 'sentence-builder',
        questionText: 'Susun kalimat bahasa Jepang: "Mohon pembayarannya (sopan)." ',
        options: ['お会計', 'を', 'お願いします'],
        answer: 'お会計 を お願いします',
        hint: 'Okaikei + wo + onegaishimasu.'
      },
      {
        id: 'n5-u2-l4-q5',
        type: 'typing',
        questionText: 'Ketik dalam Hiragana cara membaca kata bekal makanan bento berikut: お弁当',
        options: [],
        answer: 'おべんとう',
        hint: 'Ditulis dengan lima huruf Hiragana.'
      }
    ]
  },
  {
    id: 'n5-u2-l5',
    level: 'N5',
    unitId: 'n5-u2',
    unitTitle: 'Unit 2: Shopping for Needs at a Convenience Store (Konbini) 🏪',
    unitDescription: 'Master how to shop at a Japanese convenience store.',
    unitColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    title: 'Unit 2 Final Challenge',
    description: 'Comprehensive final synthesis of transactions and shopping in convenience stores.',
    expReward: 30,
    icon: '🏆',
    badge: 'Sintesis',
    questions: [
      {
        id: 'n5-u2-l5-q1',
        type: 'multiple-choice',
        questionText: 'Manakah kata penunjuk untuk benda yang jauh dari pembicara dan lawan pembicara (Itu di sana)?',
        options: ['これ (kore)', 'それ (sore)', 'あれ (are)', 'どれ (dore)'],
        answer: 'あれ (are)',
        hint: 'Kore (dekat pembicara), sore (dekat lawan bicara), are (jauh dari keduanya).'
      },
      {
        id: 'n5-u2-l5-q2',
        type: 'multiple-choice',
        questionText: 'Apa arti dari kosakata minimarket "おかんじょう" (okanjo)?',
        options: ['Tagihan / Kasir', 'Kantong Belanja', 'Nasi Kotak', 'Teh Hijau'],
        answer: 'Tagihan / Kasir',
        hint: 'Digunakan saat menyatakan pembayaran atau menanyakan total tagihan.'
      },
      {
        id: 'n5-u2-l5-q3',
        type: 'fill-in-the-blank',
        questionText: 'Lengkapi kalimat tanya harga berikut: \n「これはいくら___か。」',
        options: ['です', 'ます', 'ください', 'の'],
        answer: 'です',
        hint: 'Kalimat tanya nominal benda diakhiri kopula desu + partikel ka.'
      },
      {
        id: 'n5-u2-l5-q4',
        type: 'sentence-builder',
        questionText: 'Susun kalimat bahasa Jepang yang tepat: "Bento ini 500 Yen."',
        options: ['この', 'お弁当', 'は', '五百円', 'です'],
        answer: 'この お弁当 は 五百円 です',
        hint: 'Penyusunan: Kata tunjuk benda + Topik + Partikel wa + Harga + desu.'
      },
      {
        id: 'n5-u2-l5-q5',
        type: 'typing',
        questionText: 'Ketik dalam Romaji huruf kecil semua padanan mata uang Yen Jepang (円):',
        options: [],
        answer: 'en',
        hint: 'Ejaan Romajinya dibaca sebagai "en".'
      }
    ]
  },

// ==========================================
  // UNIT 3: MENYAPA ORANG BARU & MEMPERKENALKAN DIRI (JIKOSHOUKAI) 🤝
  // ==========================================
  {
    "id": "n5-u3-l1",
    "level": "N5",
    "unitId": "n5-u3",
    "unitTitle": "Unit 3: Greeting New People & Introducing Yourself (Jikoshoukai) 🤝",
    "unitDescription": "Learn how to introduce yourself, basic greetings, and state your country of origin.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Basic Jikoshoukai Vocabulary",
    "description": "Kuasai kata-kata kunci perkenalan: hajimemashite, watashi, namae, dan dozo yoroshiku.",
    "expReward": 20,
    "icon": "🤝",
    "badge": "Kosakata",
    "questions": [
      {
        "id": "n5-u3-l1-q1",
        "type": "multiple-choice",
        "questionText": "Ungkapan manakah yang diucapkan saat pertama kali menyapa seseorang dalam perkenalan diri?",
        "options": ["はじめまして (hajimemashite)", "お元気ですか (o-genki desu ka)", "こんにちは (konnichiwa)", "ありがとうございます (arigatou gozaimasu)"],
        "answer": "はじめまして (hajimemashite)",
        "hint": "Memiliki arti harfiah \"kita bertemu untuk pertama kalinya\"."
      },
      {
        "id": "n5-u3-l1-q2",
        "type": "typing",
        "questionText": "Ketiklah ejaan Romaji huruf kecil semua untuk kata \"Saya\":",
        "options": [],
        "answer": "watashi",
        "hint": "Ditulis dalam Hiragana: わたし."
      },
      {
        "id": "n5-u3-l1-q3",
        "type": "listening",
        "questionText": "Dengarkan audio berikut dan pilih kata yang diucapkan!",
        "audioText": "なまえ",
        "options": ["なまえ (namae)", "わたし (watashi)", "くに (kuni)", "ともだち (tomodachi)"],
        "answer": "なまえ (namae)",
        "hint": "Memiliki arti \"nama\"."
      },
      {
        "id": "n5-u3-l1-q4",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi kalimat perkenalan diri berikut: \n「わたし ___ 田中 です。(Saya adalah Tanaka.)」",
        "options": ["は", "を", "が", "に"],
        "answer": "は",
        "hint": "Partikel penanda topik utama kalimat dibaca \"wa\"."
      },
      {
        "id": "n5-u3-l1-q5",
        "type": "sentence-builder",
        "questionText": "Susunlah kalimat berikut menjadi: \"Mohon bimbingannya (Sopan).\"",
        "options": ["どうぞ", "よろしく", "おねがいします"],
        "answer": "どうぞ よろしく おねがいします",
        "hint": "Gabungkan kata \"douzo\" + \"yoroshiku\" + \"onegaishimasu\"."
      }
    ]
  },
  {
    "id": "n5-u3-l2",
    "level": "N5",
    "unitId": "n5-u3",
    "unitTitle": "Unit 3: Greeting New People & Introducing Yourself (Jikoshoukai) 🤝",
    "unitDescription": "Learn how to introduce yourself, basic greetings, and state your country of origin.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Kanji & Country of Origin",
    "description": "Master the Kanji 人 (person) and 国 (country) and names of countries.",
    "expReward": 20,
    "icon": "🗻",
    "badge": "Kanji & Negara",
    "questions": [
      {
        "id": "n5-u3-l2-q1",
        "type": "multiple-choice",
        "questionText": "Manakah cara baca kunyomi yang tepat untuk Kanji \"人\" (orang)?",
        "options": ["ひと (hito)", "じん (jin)", "にん (nin)", "くに (kuni)"],
        "answer": "ひと (hito)",
        "hint": "Digunakan saat berdiri sendiri sebagai kata benda orang."
      },
      {
        "id": "n5-u3-l2-q2",
        "type": "multiple-choice",
        "questionText": "Bagaimanakah penulisan Katakana yang tepat untuk negara \"Indonesia\"?",
        "options": ["インドネシア", "インド", "マレーシア", "アメリカ"],
        "answer": "インドネシア",
        "hint": "Negara kita tercinta ditulis dalam Katakana."
      },
      {
        "id": "n5-u3-l2-q3",
        "type": "listening",
        "questionText": "Dengarkan pelafalan audio negara berikut dan pilih tulisan Hiragana yang tepat!",
        "audioText": "にほん",
        "options": ["にほん", "インド", "アメリカ", "ちゅうごく"],
        "answer": "にほん",
        "hint": "Nama negara Jepang."
      },
      {
        "id": "n5-u3-l2-q4",
        "type": "typing",
        "questionText": "Ketik cara baca Kanji \"国\" (negara) dalam Romaji huruf kecil semua:",
        "options": [],
        "answer": "kuni",
        "hint": "Kunyomi dari Kanji negara."
      },
      {
        "id": "n5-u3-l2-q5",
        "type": "sentence-builder",
        "questionText": "Susun kalimat bahasa Jepang: \"Saya orang Jepang (Nihon-jin).\"",
        "options": ["わたし", "は", "日本人", "です"],
        "answer": "わたし は 日本人 です",
        "hint": "Struktur: Saya + wa + Jepang-orang + desu."
      }
    ]
  },
  {
    "id": "n5-u3-l3",
    "level": "N5",
    "unitId": "n5-u3",
    "unitTitle": "Unit 3: Greeting New People & Introducing Yourself (Jikoshoukai) 🤝",
    "unitDescription": "Learn how to introduce yourself, basic greetings, and state your country of origin.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Grammar ~kara kimashita & ~jin",
    "description": "Learn how to state country of origin and nationality using grammatical patterns.",
    "expReward": 20,
    "icon": "📝",
    "badge": "Tata Bahasa",
    "questions": [
      {
        "id": "n5-u3-l3-q1",
        "type": "multiple-choice",
        "questionText": "Pola kalimat manakah yang tepat untuk menyatakan \"Saya datang dari Indonesia\"?",
        "options": ["インドネシアから来ました", "インドネシアに行きます", "インドネシア人です", "インドネシアにいます"],
        "answer": "インドネシアから来ました",
        "hint": "Pola: [Tempat] + kara (dari) + kimashita (telah datang)."
      },
      {
        "id": "n5-u3-l3-q2",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi akhiran kebangsaan untuk kalimat \"Dia adalah orang Amerika\": \n「かれはアメリカ___です。」",
        "options": ["人 (jin)", "人 (hito)", "国 (kuni)", "語 (go)"],
        "answer": "人 (jin)",
        "hint": "Gunakan cara baca onyomi 'jin' (人) untuk menyatakan kebangsaan."
      },
      {
        "id": "n5-u3-l3-q3",
        "type": "listening",
        "questionText": "Dengarkan pelafalan kalimat berikut dan pilih artinya yang paling tepat!",
        "audioText": "わたしはインドネシアからきました",
        "options": ["Saya datang dari Indonesia", "Saya pergi ke Indonesia", "Saya orang Indonesia", "Saya suka Indonesia"],
        "answer": "Saya datang dari Indonesia",
        "hint": "Frasa \"kara kimashita\" merujuk pada asal usul tempat."
      },
      {
        "id": "n5-u3-l3-q4",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Apakah Budi orang Jepang?\"",
        "options": ["ブディさん", "は", "日本人", "です", "か"],
        "answer": "ブディさん は 日本人 です か",
        "hint": "Subjek + wa + Kebangsaan + desu + ka (partikel tanya)."
      },
      {
        "id": "n5-u3-l3-q5",
        "type": "typing",
        "questionText": "Ketiklah bentuk lampau formal sopan dari kata kerja \"datang\" (kuru -> telah datang) dalam Hiragana:",
        "options": [],
        "answer": "きました",
        "hint": "Dilafalkan sebagai \"kimashita\"."
      }
    ]
  },
  {
    "id": "n5-u3-l4",
    "level": "N5",
    "unitId": "n5-u3",
    "unitTitle": "Unit 3: Greeting New People & Introducing Yourself (Jikoshoukai) 🤝",
    "unitDescription": "Learn how to introduce yourself, basic greetings, and state your country of origin.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Introduction Conversation App",
    "description": "Practice two-way dialogue patterns often used when introducing yourself in Japan.",
    "expReward": 20,
    "icon": "🗣️",
    "badge": "Percakapan",
    "questions": [
      {
        "id": "n5-u3-l4-q1",
        "type": "multiple-choice",
        "questionText": "Lawan bicara Anda berkata \"はじめまして。どうぞよろしく。\" Jawaban sopan apa yang harus Anda berikan?",
        "options": ["こちらこそ、どうぞよろしくおねがいします (kochira koso, douzo yoroshiku onegaishimasu)", "ありがとうございます (arigatou gozaimasu)", "お元気ですか (o-genki desu ka)", "こんにちは (konnichiwa)"],
        "answer": "こちらこそ、どうぞよろしくおねがいします (kochira koso, douzo yoroshiku onegaishimasu)",
        "hint": "\"Kochira koso\" berarti \"saya pun juga/sama-sama\"."
      },
      {
        "id": "n5-u3-l4-q2",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang berikut untuk menanyakan asal seseorang: \n「お国は ___ ですか。」",
        "options": ["どちら", "だれ", "なん", "いくつ"],
        "answer": "どちら",
        "hint": "O-kuni wa dochira desu ka berarti \"Asal negaranya dari mana (sopan)?\""
      },
      {
        "id": "n5-u3-l4-q3",
        "type": "listening",
        "questionText": "Dengarkan audio dan pilihlah arti percakapan pendek berikut!",
        "audioText": "おなまえは？わたしはブディです",
        "options": ["Namamu siapa? Saya Budi", "Negaramu di mana? Indonesia", "Budi adalah teman saya", "Sampai jumpa, Budi"],
        "answer": "Namamu siapa? Saya Budi",
        "hint": "Menanyakan nama secara ringkas dalam percakapan akrab."
      },
      {
        "id": "n5-u3-l4-q4",
        "type": "sentence-builder",
        "questionText": "Susun kalimat dialog: \"Sama-sama, mohon bimbingannya.\"",
        "options": ["こちらこそ", "よろしく", "お願いします"],
        "answer": "こちらこそ よろしく お願いします",
        "hint": "Gunakan \"kochira koso\" di awal kalimat."
      },
      {
        "id": "n5-u3-l4-q5",
        "type": "typing",
        "questionText": "Ketik dalam Hiragana cara membaca hormat/sopan untuk kata \"Negara\" yang diawali awalan o-:",
        "options": [],
        "answer": "おくに",
        "hint": "Tulis \"o-kuni\" dalam Hiragana."
      }
    ]
  },
  {
    "id": "n5-u3-l5",
    "level": "N5",
    "unitId": "n5-u3",
    "unitTitle": "Unit 3: Greeting New People & Introducing Yourself (Jikoshoukai) 🤝",
    "unitDescription": "Learn how to introduce yourself, basic greetings, and state your country of origin.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Unit 3 Final Challenge",
    "description": "Test your self-introduction skills thoroughly to master Unit 3.",
    "expReward": 30,
    "icon": "🏆",
    "badge": "Sintesis",
    "questions": [
      {
        "id": "n5-u3-l5-q1",
        "type": "multiple-choice",
        "questionText": "Ungkapan manakah yang tepat diucapkan pertama kali saat perkenalan diri?",
        "options": ["はじめまして (hajimemashite)", "こんにちは (konnichiwa)", "どうぞよろしく (douzo yoroshiku)", "さようなら (sayounara)"],
        "answer": "はじめまして (hajimemashite)",
        "hint": "Bermakna awal perkenalan."
      },
      {
        "id": "n5-u3-l5-q2",
        "type": "multiple-choice",
        "questionText": "Apakah arti dari kalimat \"インドネシアから来ました\"?",
        "options": ["Saya datang dari Indonesia", "Saya pergi ke Indonesia", "Saya orang Indonesia", "Saya lahir di Indonesia"],
        "answer": "Saya datang dari Indonesia",
        "hint": "Menggunakan pola asal tempat ~kara kimashita."
      },
      {
        "id": "n5-u3-l5-q3",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang berikut untuk menyatakan topik diri sendiri: \n「わたし ___ ブディです。」",
        "options": ["は", "を", "が", "に"],
        "answer": "は",
        "hint": "Partikel penanda topik."
      },
      {
        "id": "n5-u3-l5-q4",
        "type": "multiple-choice",
        "questionText": "Manakah Kanji yang tepat untuk kata \"orang\" (hito / jin)?",
        "options": ["人", "国", "日", "本"],
        "answer": "人",
        "hint": "Kanji berbentuk kaki orang melangkah."
      },
      {
        "id": "n5-u3-l5-q5",
        "type": "multiple-choice",
        "questionText": "Bagaimanakah cara menyebut \"Orang Jepang\" secara formal?",
        "options": ["日本人 (Nihon-jin)", "日本国 (Nihon-koku)", "日本 (Nihon)", "日人 (Hi-to)"],
        "answer": "日本人 (Nihon-jin)",
        "hint": "Negara Jepang + Kanji Orang."
      },
      {
        "id": "n5-u3-l5-q6",
        "type": "sentence-builder",
        "questionText": "Susun kalimat perkenalan: \"Nama saya adalah Budi.\"",
        "options": ["わたし", "の", "なまえ", "は", "ブディ", "です"],
        "answer": "わたし の なまえ は ブディ です",
        "hint": "Saya + partikel milik + nama + wa + Budi + desu."
      },
      {
        "id": "n5-u3-l5-q7",
        "type": "listening",
        "questionText": "Dengarkan audio and pilihlah negara asal pembicara!",
        "audioText": "わたしはアメリカからきました",
        "options": ["Amerika", "Indonesia", "Jepang", "Cina"],
        "answer": "Amerika",
        "hint": "Ditulis dalam Katakana: アメリカ."
      },
      {
        "id": "n5-u3-l5-q8",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi respon sopan dari perkenalan lawan bicara: \n「___、どうぞよろしくおねがいします。」",
        "options": ["こちらこそ", "はじめまして", "ありがとう", "こんにちは"],
        "answer": "こちらこそ",
        "hint": "Artinya \"Saya juga\"."
      },
      {
        "id": "n5-u3-l5-q9",
        "type": "sentence-builder",
        "questionText": "Susunlah kalimat tanya berikut: \"Siapakah nama Anda? (Sopan)\"",
        "options": ["お名前", "は", "何", "です", "か"],
        "answer": "お名前 は 何 です か",
        "hint": "O-namae + wa + nan + desu + ka."
      },
      {
        "id": "n5-u3-l5-q10",
        "type": "typing",
        "questionText": "Ketiklah padanan kata \"Negara\" dalam huruf Hiragana (tanpa awalan o-):",
        "options": [],
        "answer": "くに",
        "hint": "Ejaan Romaji adalah \"kuni\"."
      }
    ]
  },

  // ==========================================
  // UNIT 4: MENANYAKAN JALAN DAN LOKASI (DOKO, TOILET, EKI) 🗺️
  // ==========================================
  {
    "id": "n5-u4-l1",
    "level": "N5",
    "unitId": "n5-u4",
    "unitTitle": "Unit 4: Asking for Directions and Locations (Doko, Toilet, Eki) 🗺️",
    "unitDescription": "Master navigation vocabulary, asking for public locations, and basic directions.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Location & Public Places Vocabulary",
    "description": "Kuasai nama fasilitas umum penting: eki, toilet, konbini, hoteru, dan kata tunjuk soko/koko/asoko.",
    "expReward": 20,
    "icon": "🗺️",
    "badge": "Kosakata",
    "questions": [
      {
        "id": "n5-u4-l1-q1",
        "type": "multiple-choice",
        "questionText": "Apakah arti dari fasilitas umum \"駅\" (eki)?",
        "options": ["Stasiun", "Hotel", "Minimarket", "Rumah Sakit"],
        "answer": "Stasiun",
        "hint": "Tempat naik kereta densha."
      },
      {
        "id": "n5-u4-l1-q2",
        "type": "typing",
        "questionText": "Ketik ejaan katakana dari kata \"Toilet\" dalam bahasa Jepang:",
        "options": [],
        "answer": "トイレ",
        "hint": "Menggunakan tiga huruf Katakana: ト・イ・レ."
      },
      {
        "id": "n5-u4-l1-q3",
        "type": "listening",
        "questionText": "Dengarkan audio lokasi berikut and pilih artinya!",
        "audioText": "ホテル",
        "options": ["Hotel", "Stasiun", "Minimarket", "Taman"],
        "answer": "Hotel",
        "hint": "Kata serapan asing dari \"Hotel\"."
      },
      {
        "id": "n5-u4-l1-q4",
        "type": "fill-in-the-blank",
        "questionText": "Pilih kata tunjuk yang tepat untuk daerah dekat dengan lawan bicara: \n「___はコンビニです。(Di situ adalah minimarket.)」",
        "options": ["そこ (soko)", "ここ (koko)", "あそこ (asoko)", "doko"],
        "answer": "そこ (soko)",
        "hint": "Koko (dekat saya), soko (dekat kamu), asoko (jauh dari kita)."
      },
      {
        "id": "n5-u4-l1-q5",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Di sini adalah hotel.\"",
        "options": ["ここ", "は", "ホテル", "です"],
        "answer": "ここ は ホテル です",
        "hint": "Koko (Di sini) + wa + hoteru + desu."
      }
    ]
  },
  {
    "id": "n5-u4-l2",
    "level": "N5",
    "unitId": "n5-u4",
    "unitTitle": "Unit 4: Asking for Directions and Locations (Doko, Toilet, Eki) 🗺️",
    "unitDescription": "Master navigation vocabulary, asking for public locations, and basic directions.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Kanji Directions & Locations",
    "description": "Kuasai Kanji 右 (migi), 左 (hidari), dan 駅 (eki).",
    "expReward": 20,
    "icon": "🧭",
    "badge": "Kanji",
    "questions": [
      {
        "id": "n5-u4-l2-q1",
        "type": "multiple-choice",
        "questionText": "Manakah cara baca kunyomi yang tepat untuk Kanji \"右\" (kanan)?",
        "options": ["みぎ (migi)", "ひだり (hidari)", "うえ (ue)", "した (shita)"],
        "answer": "みぎ (migi)",
        "hint": "Arah kanan, berlawanan dengan hidari."
      },
      {
        "id": "n5-u4-l2-q2",
        "type": "multiple-choice",
        "questionText": "Manakah cara baca kunyomi yang tepat untuk Kanji \"左\" (kiri)?",
        "options": ["ひだり (hidari)", "みぎ (migi)", "なか (naka)", "そと (soto)"],
        "answer": "ひだり (hidari)",
        "hint": "Arah kiri."
      },
      {
        "id": "n5-u4-l2-q3",
        "type": "listening",
        "questionText": "Dengarkan pelafalan audio Kanji berikut dan tentukan artinya!",
        "audioText": "みぎ",
        "options": ["Kanan", "Kiri", "Atas", "Bawah"],
        "answer": "Kanan",
        "hint": "Pelafalan dari kata \"migi\"."
      },
      {
        "id": "n5-u4-l2-q4",
        "type": "typing",
        "questionText": "Ketiklah cara baca Hiragana dari Kanji stasiun berikut: 駅",
        "options": [],
        "answer": "えき",
        "hint": "Terdiri dari dua huruf Hiragana."
      },
      {
        "id": "n5-u4-l2-q5",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Stasiun ada di sebelah kanan.\"",
        "options": ["駅", "は", "右", "です"],
        "answer": "駅 は 右 です",
        "hint": "Eki + wa + migi + desu."
      }
    ]
  },
  {
    "id": "n5-u4-l3",
    "level": "N5",
    "unitId": "n5-u4",
    "unitTitle": "Unit 4: Asking for Directions and Locations (Doko, Toilet, Eki) 🗺️",
    "unitDescription": "Master navigation vocabulary, asking for public locations, and basic directions.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Grammar ~wa doko desu ka",
    "description": "Learn grammatical patterns to ask for the location of a place politely.",
    "expReward": 20,
    "icon": "🧭",
    "badge": "Tata Bahasa",
    "questions": [
      {
        "id": "n5-u4-l3-q1",
        "type": "multiple-choice",
        "questionText": "Pola kalimat manakah yang tepat untuk menanyakan \"Di mana toilet?\"",
        "options": ["トイレはどこですか", "トイレはこれですか", "トイレはなんですか", "トイレがありますか"],
        "answer": "トイレはどこですか",
        "hint": "Menggunakan kata tanya doko (どこ) yang berarti di mana."
      },
      {
        "id": "n5-u4-l3-q2",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi partikel untuk melengkapi kalimat \"Hotel ada di sana\": \n「ホテルはあそこ ___ です。」",
        "options": ["- (tanpa partikel/langsung desu)", "を", "に", "は"],
        "answer": "- (tanpa partikel/langsung desu)",
        "hint": "Setelah kata tunjuk arah/tempat seperti 'asoko', 'koko', 'soko' dapat langsung ditutup dengan 'desu'."
      },
      {
        "id": "n5-u4-l3-q3",
        "type": "listening",
        "questionText": "Dengarkan audio dan pilihlah terjemahan yang paling tepat!",
        "audioText": "えきはどこですか",
        "options": ["Stasiun ada di mana?", "Hotel ada di mana?", "Di mana minimarket?", "Apakah stasiun dekat?"],
        "answer": "Stasiun ada di mana?",
        "hint": "Eki berarti stasiun, doko desu ka berarti di mana."
      },
      {
        "id": "n5-u4-l3-q4",
        "type": "sentence-builder",
        "questionText": "Susun kalimat tanya: \"Di manakah stasiun?\"",
        "options": ["駅", "は", "どこ", "です", "か"],
        "answer": "駅 は どこ です か",
        "hint": "Eki + wa + doko + desu + ka."
      },
      {
        "id": "n5-u4-l3-q5",
        "type": "typing",
        "questionText": "Ketiklah kata tanya \"di mana\" dalam Hiragana:",
        "options": [],
        "answer": "どこ",
        "hint": "Ejaan Romajinya adalah \"doko\"."
      }
    ]
  },
  {
    "id": "n5-u4-l4",
    "level": "N5",
    "unitId": "n5-u4",
    "unitTitle": "Unit 4: Asking for Directions and Locations (Doko, Toilet, Eki) 🗺️",
    "unitDescription": "Master navigation vocabulary, asking for public locations, and basic directions.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Navigation Conversation App",
    "description": "Practice conversations when lost on the street or asking locals for directions.",
    "expReward": 20,
    "icon": "🗣️",
    "badge": "Percakapan",
    "questions": [
      {
        "id": "n5-u4-l4-q1",
        "type": "multiple-choice",
        "questionText": "Sebelum bertanya jalan kepada orang tidak dikenal, ucapan permisi/maaf apakah yang paling sopan digunakan?",
        "options": ["すみません (sumimasen)", "ありがとう (arigatou)", "はじめまして (hajimemashite)", "さようなら (sayounara)"],
        "answer": "すみません (sumimasen)",
        "hint": "Digunakan untuk menarik perhatian dengan sopan sebelum bertanya."
      },
      {
        "id": "n5-u4-l4-q2",
        "type": "fill-in-the-blank",
        "questionText": "Seseorang bertanya arah dan Anda ingin menjawab \"Di sebelah kiri.\" Lengkapi kalimat rumpang berikut: \n「___です。」",
        "options": ["左 (hidari)", "右 (migi)", "あそこ (asoko)", "doko"],
        "answer": "左 (hidari)",
        "hint": "Kiri dibaca 'hidari' (左)."
      },
      {
        "id": "n5-u4-l4-q3",
        "type": "listening",
        "questionText": "Dengarkan audio dan pilihlah terjemahan dialog pendek berikut!",
        "audioText": "すみません、トイレはどこですか？あそこです。",
        "options": ["Permisi, toilet di mana? Di sebelah sana.", "Permisi, stasiun di mana? Di sini.", "Tolong berikan tiket toilet. Ini.", "Maaf, hotel di mana? Di sebelah kiri."],
        "answer": "Permisi, toilet di mana? Di sebelah sana.",
        "hint": "Asoko merujuk pada letak yang jauh dari kedua pembicara (di sebelah sana)."
      },
      {
        "id": "n5-u4-l4-q4",
        "type": "sentence-builder",
        "questionText": "Susun kalimat percakapan: \"Permisi, stasiun di mana?\"",
        "options": ["すみません", "駅", "は", "どこ", "です", "か"],
        "answer": "すみません 駅 は どこ です か",
        "hint": "Awali dengan kata maaf/permisi 'sumimasen'."
      },
      {
        "id": "n5-u4-l4-q5",
        "type": "typing",
        "questionText": "Ketiklah arti bahasa Indonesia dari kata penunjuk arah jauh \"あそこ\" (asoko):",
        "options": [],
        "answer": "di sana",
        "hint": "Menunjuk tempat yang jauh dari keduanya."
      }
    ]
  },
  {
    "id": "n5-u4-l5",
    "level": "N5",
    "unitId": "n5-u4",
    "unitTitle": "Unit 4: Asking for Directions and Locations (Doko, Toilet, Eki) 🗺️",
    "unitDescription": "Master navigation vocabulary, asking for public locations, and basic directions.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Unit 4 Final Challenge",
    "description": "Test your comprehensive understanding of road navigation and public locations.",
    "expReward": 30,
    "icon": "🏆",
    "badge": "Sintesis",
    "questions": [
      {
        "id": "n5-u4-l5-q1",
        "type": "multiple-choice",
        "questionText": "Manakah kata tanya yang berarti \"Di mana\"?",
        "options": ["どこ (doko)", "なん (nan)", "だれ (dare)", "いつ (itsu)"],
        "answer": "どこ (doko)",
        "hint": "Menanyakan keberadaan lokasi."
      },
      {
        "id": "n5-u4-l5-q2",
        "type": "multiple-choice",
        "questionText": "Apa arti kata \"駅\" (eki)?",
        "options": ["Stasiun", "Kamar Mandi", "Minimarket", "Hotel"],
        "answer": "Stasiun",
        "hint": "Pusat transportasi kereta."
      },
      {
        "id": "n5-u4-l5-q3",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi kalimat berikut: \"Kamar mandi ada di situ (dekat Anda)\": \n「トイレは ___ です。」",
        "options": ["そこ (soko)", "ここ (koko)", "あそこ (asoko)", "doko"],
        "answer": "そこ (soko)",
        "hint": "Kata tunjuk tempat dekat lawan bicara."
      },
      {
        "id": "n5-u4-l5-q4",
        "type": "multiple-choice",
        "questionText": "Bagaimanakah membaca kunyomi dari karakter Kanji kanan \"右\"?",
        "options": ["みぎ (migi)", "ひだり (hidari)", "うえ (ue)", "した (shita)"],
        "answer": "みぎ (migi)",
        "hint": "Migi berarti kanan."
      },
      {
        "id": "n5-u4-l5-q5",
        "type": "multiple-choice",
        "questionText": "Bagaimanakah membaca kunyomi dari karakter Kanji kiri \"左\"?",
        "options": ["ひだり (hidari)", "みぎ (migi)", "なか (naka)", "そと (soto)"],
        "answer": "ひだり (hidari)",
        "hint": "Hidari berarti kiri."
      },
      {
        "id": "n5-u4-l5-q6",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Maaf, hotel ada di mana?\"",
        "options": ["すみません", "ホテル", "は", "どこ", "です", "か"],
        "answer": "すみません ホテル は どこ です か",
        "hint": "Kata panggil sopan + Topik hotel + wa doko desu ka."
      },
      {
        "id": "n5-u4-l5-q7",
        "type": "listening",
        "questionText": "Dengarkan audio dan pilihlah letak stasiun yang diucapkan!",
        "audioText": "えきはひだりです",
        "options": ["Stasiun di sebelah kiri", "Stasiun di sebelah kanan", "Stasiun di sana", "Stasiun di sini"],
        "answer": "Stasiun di sebelah kiri",
        "hint": "Eki (stasiun) + wa + hidari (kiri) + desu."
      },
      {
        "id": "n5-u4-l5-q8",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang dialog berikut: \nA: 「すみません、コンビニはどこですか。」\nB: 「コンビニはあそこ ___ 。」",
        "options": ["です", "をください", "ですか", "にいます"],
        "answer": "です",
        "hint": "Pernyataan diakhiri dengan desu."
      },
      {
        "id": "n5-u4-l5-q9",
        "type": "sentence-builder",
        "questionText": "Susun kalimat jawaban arah: \"Stasiun ada di sebelah kanan.\"",
        "options": ["駅", "は", "右", "です"],
        "answer": "駅 は 右 です",
        "hint": "Eki + wa + migi (右) + desu."
      },
      {
        "id": "n5-u4-l5-q10",
        "type": "typing",
        "questionText": "Ketiklah arti bahasa Indonesia dari kata penunjuk arah dekat \"ここ\" (koko):",
        "options": [],
        "answer": "di sini",
        "hint": "Menunjuk tempat dekat si pembicara."
      }
    ]
  },

  // ==========================================
  // UNIT 5: JADWAL DAN WAKTU (JI, FUN, NAN-JI, ~KARA ~MADE) ⏰
  // ==========================================
  {
    "id": "n5-u5-l1",
    "level": "N5",
    "unitId": "n5-u5",
    "unitTitle": "Unit 5: Schedule and Time (Ji, Fun, Nan-ji, ~kara ~made) ⏰",
    "unitDescription": "Learn how to read hours, minutes, ask for daily time, and activity duration.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Hours & Time Vocabulary",
    "description": "Kuasai kata-kira waktu: ima, ji, fun, nan-ji, asa, yoru, asa, gogo, dan gozen.",
    "expReward": 20,
    "icon": "⏰",
    "badge": "Kosakata",
    "questions": [
      {
        "id": "n5-u5-l1-q1",
        "type": "multiple-choice",
        "questionText": "Kosakata apakah yang memiliki arti \"sekarang\" dalam keterangan waktu Jepang?",
        "options": ["いま (ima)", "きょう (kyou)", "あした (ashita)", "きのう (kinou)"],
        "answer": "いま (ima)",
        "hint": "Ditulis dengan Kanji: 今."
      },
      {
        "id": "n5-u5-l1-q2",
        "type": "typing",
        "questionText": "Ketiklah sebutan jam 3 (jam tiga) dalam Hiragana (hati-hati pengucapannya khusus):",
        "options": [],
        "answer": "さんじ",
        "hint": "San + ji (jam) -> さんじ."
      },
      {
        "id": "n5-u5-l1-q3",
        "type": "listening",
        "questionText": "Dengarkan audio keterangan waktu berikut and pilih artinya!",
        "audioText": "あさ",
        "options": ["Pagi", "Siang", "Malam", "Sore"],
        "answer": "Pagi",
        "hint": "Asa berarti pagi hari."
      },
      {
        "id": "n5-u5-l1-q4",
        "type": "fill-in-the-blank",
        "questionText": "Pilih kosakata PM (setelah jam 12 siang) yang tepat untuk melengkapi jam: \n「いまは ___ 三時です。(Sekarang jam 3 sore.)」",
        "options": ["ごご (gogo)", "ごぜん (gozen)", "あさ (asa)", "よる (yoru)"],
        "answer": "ごご (gogo)",
        "hint": "Gozen (AM), Gogo (PM)."
      },
      {
        "id": "n5-u5-l1-q5",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Sekarang adalah pagi hari.\"",
        "options": ["いま", "は", "あさ", "です"],
        "answer": "いま は あさ です",
        "hint": "Ima + wa + asa + desu."
      }
    ]
  },
  {
    "id": "n5-u5-l2",
    "level": "N5",
    "unitId": "n5-u5",
    "unitTitle": "Unit 5: Schedule and Time (Ji, Fun, Nan-ji, ~kara ~made) ⏰",
    "unitDescription": "Learn how to read hours, minutes, ask for daily time, and activity duration.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Kanji Time Expressions",
    "description": "Kuasai Kanji 今 (sekarang), 時 (jam), dan 分 (menit).",
    "expReward": 20,
    "icon": "⏳",
    "badge": "Kanji",
    "questions": [
      {
        "id": "n5-u5-l2-q1",
        "type": "multiple-choice",
        "questionText": "Manakah cara baca kunyomi yang tepat untuk Kanji \"今\" (sekarang)?",
        "options": ["いま (ima)", "きょう (kyou)", "あした (ashita)", "とき (toki)"],
        "answer": "いま (ima)",
        "hint": "Ima berarti sekarang."
      },
      {
        "id": "n5-u5-l2-q2",
        "type": "multiple-choice",
        "questionText": "Manakah Kanji yang melambangkan kata \"Jam\" (ji)?",
        "options": ["時", "分", "今", "日"],
        "answer": "時",
        "hint": "Digunakan sebagai sufiks hitungan jam, dibaca 'ji'."
      },
      {
        "id": "n5-u5-l2-q3",
        "type": "listening",
        "questionText": "Dengarkan pelafalan audio berikut and tentukan kombinasi angka-waktu yang tepat!",
        "audioText": "ごじ",
        "options": ["Jam 5", "Jam 4", "Jam 9", "Jam 7"],
        "answer": "Jam 5",
        "hint": "Pelafalan dari 'go' (5) + 'ji' (jam)."
      },
      {
        "id": "n5-u5-l2-q4",
        "type": "typing",
        "questionText": "Ketiklah cara baca Hiragana sufiks menit berikut (untuk bilangan 5 menit): 五分",
        "options": [],
        "answer": "ごふん",
        "hint": "Go + fun (menit) -> ごふん."
      },
      {
        "id": "n5-u5-l2-q5",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Sekarang jam satu.\"",
        "options": ["いま", "は", "一時", "です"],
        "answer": "いま は 一時 です",
        "hint": "Ima (いま) + wa + ichi-ji (一時) + desu."
      }
    ]
  },
  {
    "id": "n5-u5-l3",
    "level": "N5",
    "unitId": "n5-u5",
    "unitTitle": "Unit 5: Schedule and Time (Ji, Fun, Nan-ji, ~kara ~made) ⏰",
    "unitDescription": "Learn how to read hours, minutes, ask for daily time, and activity duration.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Grammar ~kara ~made & Time",
    "description": "Master sentence patterns expressing start and end limits of activities (from... to...).",
    "expReward": 20,
    "icon": "📝",
    "badge": "Tata Bahasa",
    "questions": [
      {
        "id": "n5-u5-l3-q1",
        "type": "multiple-choice",
        "questionText": "Partikel manakah yang berarti \"dari\" dan \"sampai\" berturut-turut untuk menyatakan durasi?",
        "options": ["から (kara) dan まで (made)", "まで (made) dan から (kara)", "に (ni) dan へ (he)", "と (to) dan から (kara)"],
        "answer": "から (kara) dan まで (made)",
        "hint": "Dari jam A sampai jam B: A-kara B-made desu."
      },
      {
        "id": "n5-u5-l3-q2",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi partikel penunjuk waktu spesifik untuk kalimat \"Bangun pada jam 6\": \n「六時 ___ おきます。」",
        "options": ["に", "を", "は", "へ"],
        "answer": "に",
        "hint": "Partikel に (ni) digunakan setelah angka waktu spesifik untuk menandai kapan tindakan dilakukan."
      },
      {
        "id": "n5-u5-l3-q3",
        "type": "listening",
        "questionText": "Dengarkan pelafalan kalimat berikut and pilih maknanya!",
        "audioText": "九時から五時までです",
        "options": ["Dari jam 9 sampai jam 5", "Dari jam 5 sampai jam 9", "Jam 9 lewat 5 menit", "Mulai jam 9 tepat"],
        "answer": "Dari jam 9 sampai jam 5",
        "hint": "Kyuu-ji (jam 9) + kara (dari) + go-ji (jam 5) + made (sampai)."
      },
      {
        "id": "n5-u5-l3-q4",
        "type": "sentence-builder",
        "questionText": "Susun kalimat: \"Belajar dari jam satu sampai jam tiga.\"",
        "options": ["一時", "から", "三時", "まで", "べんきょうします"],
        "answer": "一時 から 三時 まで べんきょうします",
        "hint": "Ichi-ji + kara + san-ji + made + benkyou-shimasu."
      },
      {
        "id": "n5-u5-l3-q5",
        "type": "typing",
        "questionText": "Ketiklah pola tanya \"jam berapa\" dalam huruf Hiragana:",
        "options": [],
        "answer": "なんじ",
        "hint": "Nan (apa/berapa) + ji (jam) -> なんじ."
      }
    ]
  },
  {
    "id": "n5-u5-l4",
    "level": "N5",
    "unitId": "n5-u5",
    "unitTitle": "Unit 5: Schedule and Time (Ji, Fun, Nan-ji, ~kara ~made) ⏰",
    "unitDescription": "Learn how to read hours, minutes, ask for daily time, and activity duration.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Daily Activity Schedule App",
    "description": "Latih percakapan tentang jam kerja, jam sekolah, dan waktu tidur sehari-hari.",
    "expReward": 20,
    "icon": "🗣️",
    "badge": "Percakapan",
    "questions": [
      {
        "id": "n5-u5-l4-q1",
        "type": "multiple-choice",
        "questionText": "Lawan bicara Anda bertanya \"いま何時ですか。\" (Ima nan-ji desu ka?) Jam menunjukkan pukul 08:00 pagi. Jawaban apakah yang tepat?",
        "options": ["ごぜん八時です (gozen hachi-ji desu)", "ごご八時です (gogo hachi-ji desu)", "八分です (hachi-fun desu)", "八時から五時までです (hachi-ji kara go-ji made desu)"],
        "answer": "ごぜん八時です (gozen hachi-ji desu)",
        "hint": "Pagi menggunakan Gozen (ごぜん). Angka 8 adalah hachi."
      },
      {
        "id": "n5-u5-l4-q2",
        "type": "fill-in-the-blank",
        "questionText": "Seseorang bertanya jam mulai kerja perusahaan: \"かいしゃは何時からですか。\" Anda ingin menjawab \"Mulai jam 9.\" Lengkapi kalimat rumpang berikut: \n「___時から来ます。」",
        "options": ["九 (ku/kyuu)", "七 (shichi)", "四 (yo/yon)", "八 (hachi)"],
        "answer": "九 (ku/kyuu)",
        "hint": "Jam 9 dilafalkan khusus sebagai \"ku-ji\" (九時)."
      },
      {
        "id": "n5-u5-l4-q3",
        "type": "listening",
        "questionText": "Dengarkan audio dan pilihlah jam tidur pembicara!",
        "audioText": "十一時にねます",
        "options": ["Tidur jam 11", "Tidur jam 10", "Bangun jam 11", "Tidur jam 12"],
        "answer": "Tidur jam 11",
        "hint": "Juu-ichi-ji (jam 11) + ni (pada) + nemasu (tidur)."
      },
      {
        "id": "n5-u5-l4-q4",
        "type": "sentence-builder",
        "questionText": "Susun kalimat percakapan: \"Sekarang jam berapa?\"",
        "options": ["いま", "は", "何時", "です", "か"],
        "answer": "いま は 何時 です か",
        "hint": "Ima + wa + nan-ji + desu + ka."
      },
      {
        "id": "n5-u5-l4-q5",
        "type": "typing",
        "questionText": "Ketiklah arti bahasa Indonesia dari kata kerja \"ねます\" (nemasu):",
        "options": [],
        "answer": "tidur",
        "hint": "Tindakan beristirahat di malam hari."
      }
    ]
  },
  {
    "id": "n5-u5-l5",
    "level": "N5",
    "unitId": "n5-u5",
    "unitTitle": "Unit 5: Schedule and Time (Ji, Fun, Nan-ji, ~kara ~made) ⏰",
    "unitDescription": "Learn how to read hours, minutes, ask for daily time, and activity duration.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Unit 5 Final Challenge",
    "description": "Test your proficiency in reading time and scheduling daily activities.",
    "expReward": 30,
    "icon": "🏆",
    "badge": "Sintesis",
    "questions": [
      {
        "id": "n5-u5-l5-q1",
        "type": "multiple-choice",
        "questionText": "Jam 4 sore dalam bahasa Jepang diucapkan sebagai:",
        "options": ["ごごよじ (gogo yo-ji)", "ごごよんじ (gogo yon-ji)", "ごぜんよじ (gozen yo-ji)", "ごぜんよんじ (gozen yon-ji)"],
        "answer": "ごごよじ (gogo yo-ji)",
        "hint": "Jam 4 dilafalkan khusus sebagai 'yo-ji'. Sore hari adalah 'gogo'."
      },
      {
        "id": "n5-u5-l5-q2",
        "type": "multiple-choice",
        "questionText": "Keterangan waktu manakah yang dibaca \"いま\" (ima)?",
        "options": ["今", "時", "分", "日"],
        "answer": "今",
        "hint": "Kanji sekarang."
      },
      {
        "id": "n5-u5-l5-q3",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi kalimat \"Toko buka dari jam 8\": \n「みせは八時 ___ です。」",
        "options": ["から (kara)", "まで (made)", "に (ni)", "を (wo)"],
        "answer": "から (kara)",
        "hint": "Kara berarti 'dari' atau 'mulai dari'."
      },
      {
        "id": "n5-u5-l5-q4",
        "type": "multiple-choice",
        "questionText": "Bagaimanakah pengucapan \"Jam 7\" yang tepat dalam bahasa Jepang?",
        "options": ["しちじ (shichi-ji)", "ななじ (nana-ji)", "ひちじ (hichi-ji)", "ななじかん (nana-jikan)"],
        "answer": "しちじ (shichi-ji)",
        "hint": "Jam 7 menggunakan sebutan shichi-ji."
      },
      {
        "id": "n5-u5-l5-q5",
        "type": "multiple-choice",
        "questionText": "Apa arti dari pola \"~から~まで\"?",
        "options": ["Dari... sampai...", "Sebelum... sesudah...", "Di... ke...", "Dengan... bersama..."],
        "answer": "Dari... sampai...",
        "hint": "Menandakan awal dan akhir."
      },
      {
        "id": "n5-u5-l5-q6",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Saya tidur pada jam sepuluh.\"",
        "options": ["わたし", "は", "十時", "に", "ねます"],
        "answer": "わたし は 十時 に ねます",
        "hint": "Subjek + wa + waktu + partikel ni + nemasu."
      },
      {
        "id": "n5-u5-l5-q7",
        "type": "listening",
        "questionText": "Dengarkan audio and pilih jam bangun tidur pembicara!",
        "audioText": "ろくじにおきます",
        "options": ["Bangun jam 6", "Bangun jam 7", "Tidur jam 6", "Pergi jam 6"],
        "answer": "Bangun jam 6",
        "hint": "Roku-ji (jam 6) + ni + okimasu (bangun)."
      },
      {
        "id": "n5-u5-l5-q8",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang kalimat tanya jam: \n「いま ___ 時ですか。」",
        "options": ["何 (nan)", "どこ (doko)", "だれ (dare)", "いつ (itsu)"],
        "answer": "何 (nan)",
        "hint": "Kombinasi 'nan' + 'ji' (何時) berarti jam berapa."
      },
      {
        "id": "n5-u5-l5-q9",
        "type": "sentence-builder",
        "questionText": "Susun kalimat: \"Kerja dari jam delapan pagi.\"",
        "options": ["ごぜん八時", "から", "はたらきます"],
        "answer": "ごぜん八時 から はたらきます",
        "hint": "Gozen hachi-ji + kara + hatarakimasu (kerja)."
      },
      {
        "id": "n5-u5-l5-q10",
        "type": "typing",
        "questionText": "Ketiklah arti bahasa Indonesia dari kata kerja \"おきます\" (okimasu):",
        "options": [],
        "answer": "bangun",
        "hint": "Tindakan bangun tidur di pagi hari."
      }
    ]
  },

  // ==========================================
  // UNIT 6: TRANSPORTASI UMUM (KIPPU, CHIKATETSU, BUS, ~DE IKIMASU) 🚌
  // ==========================================
  {
    "id": "n5-u6-l1",
    "level": "N5",
    "unitId": "n5-u6",
    "unitTitle": "Unit 6: Public Transportation (Kippu, Chikatetsu, Bus, ~de ikimasu) 🚌",
    "unitDescription": "Master vehicle vocabulary, buying tickets, and stating travel modes using the means particle.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Transportation & Tickets Vocabulary",
    "description": "Kuasai kata-kata perjalanan: densha, bus, chikatetsu, taxi, kippu, dan kata kerja perpindahan.",
    "expReward": 20,
    "icon": "🚌",
    "badge": "Kosakata",
    "questions": [
      {
        "id": "n5-u6-l1-q1",
        "type": "multiple-choice",
        "questionText": "Kosakata kendaraan \"電車\" (densha) memiliki arti:",
        "options": ["Kereta Api Listrik", "Bus Kota", "Taksi", "Pesawat Terbang"],
        "answer": "Kereta Api Listrik",
        "hint": "Moda transportasi publik rel paling populer di perkotaan Jepang."
      },
      {
        "id": "n5-u6-l1-q2",
        "type": "typing",
        "questionText": "Ketiklah sebutan \"Tiket Perjalanan\" dalam Hiragana:",
        "options": [],
        "answer": "きっぷ",
        "hint": "Kippu -> きっぷ (menggunakan sokuon kecil tsu)."
      },
      {
        "id": "n5-u6-l1-q3",
        "type": "listening",
        "questionText": "Dengarkan audio kendaraan berikut and pilih tulisan Katakana yang tepat!",
        "audioText": "バス",
        "options": ["バス (basu)", "タクシー (takushii)", "ヘリコプター (herikoputaa)", "バイク (baiku)"],
        "answer": "バス (basu)",
        "hint": "Bus kota ditulis dalam Katakana basu."
      },
      {
        "id": "n5-u6-l1-q4",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi kata kerja perpindahan untuk menyatakan \"datang\": \n「ともだちがうちへ ___ ます。」",
        "options": ["き (ki)", "いき (iki)", "かえり (kaeri)", "nomi"],
        "answer": "き (ki)",
        "hint": "Kimasu berarti datang (kemari)."
      },
      {
        "id": "n5-u6-l1-q5",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Naik kereta densha.\"",
        "options": ["電車", "に", "のります"],
        "answer": "電車 に のります",
        "hint": "Densha + partikel penunjuk naik ni + norimasu."
      }
    ]
  },
  {
    "id": "n5-u6-l2",
    "level": "N5",
    "unitId": "n5-u6",
    "unitTitle": "Unit 6: Public Transportation (Kippu, Chikatetsu, Bus, ~de ikimasu) 🚌",
    "unitDescription": "Master vehicle vocabulary, buying tickets, and stating travel modes using the means particle.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Kanji Movement & Vehicles",
    "description": "Kuasai Kanji 車 (kendaraan/mobil), 行 (pergi), dan 来 (datang).",
    "expReward": 20,
    "icon": "🚶",
    "badge": "Kanji",
    "questions": [
      {
        "id": "n5-u6-l2-q1",
        "type": "multiple-choice",
        "questionText": "Manakah cara baca kunyomi yang tepat untuk Kanji kendaraan/mobil \"車\"?",
        "options": ["くるま (kuruma)", "でんしゃ (densha)", "じてんしゃ (jitensha)", "ばしゃ (basha)"],
        "answer": "くるま (kuruma)",
        "hint": "Kuruma berarti mobil/kendaraan beroda."
      },
      {
        "id": "n5-u6-l2-q2",
        "type": "multiple-choice",
        "questionText": "Kanji \"行\" memiliki arti dasar gerakan yaitu:",
        "options": ["Pergi", "Datang", "Pulang", "Lari"],
        "answer": "Pergi",
        "hint": "Digunakan dalam kata kerja 'ikimasu' (行きます)."
      },
      {
        "id": "n5-u6-l2-q3",
        "type": "listening",
        "questionText": "Dengarkan pelafalan audio Kanji gerakan berikut and tentukan artinya!",
        "audioText": "きます",
        "options": ["Datang", "Pergi", "Pulang", "Makan"],
        "answer": "Datang",
        "hint": "Onyomi/Kunyomi dari Kanji 来 (rai/ki)."
      },
      {
        "id": "n5-u6-l2-q4",
        "type": "typing",
        "questionText": "Ketiklah cara baca Hiragana untuk kata kerja pergi berikut: 行きます",
        "options": [],
        "answer": "いきます",
        "hint": "Ikimasu ditulis dengan Hiragana."
      },
      {
        "id": "n5-u6-l2-q5",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Mobil (kuruma) datang.\"",
        "options": ["車", "が", "来ます"],
        "answer": "車 が 来ます",
        "hint": "Kuruma + partikel ga + kimasu."
      }
    ]
  },
  {
    "id": "n5-u6-l3",
    "level": "N5",
    "unitId": "n5-u6",
    "unitTitle": "Unit 6: Public Transportation (Kippu, Chikatetsu, Bus, ~de ikimasu) 🚌",
    "unitDescription": "Master vehicle vocabulary, buying tickets, and stating travel modes using the means particle.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Grammar Means Particle ~de",
    "description": "Learn the function of the particle ~de to mark means of transport in travel sentences.",
    "expReward": 20,
    "icon": "📝",
    "badge": "Tata Bahasa",
    "questions": [
      {
        "id": "n5-u6-l3-q1",
        "type": "multiple-choice",
        "questionText": "Partikel manakah yang digunakan untuk menyatakan sarana transportasi (naik/dengan)?",
        "options": ["で (de)", "に (ni)", "を (wo)", "へ (he)"],
        "answer": "で (de)",
        "hint": "Pola: [Kendaraan] + de + ikimasu."
      },
      {
        "id": "n5-u6-l3-q2",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi partikel arah tujuan perjalanan berikut: \"Tokyo ___ pergi naik kereta\": \n「電車で東京 ___ 行きます。」",
        "options": ["へ (dibaca e)", "で", "を", "が"],
        "answer": "へ (dibaca e)",
        "hint": "Partikel へ (he/dibaca e) digunakan untuk menandai arah/tujuan perpindahan."
      },
      {
        "id": "n5-u6-l3-q3",
        "type": "listening",
        "questionText": "Dengarkan pelafalan kalimat berikut and pilihlah artinya!",
        "audioText": "タクシーでいきます",
        "options": ["Pergi dengan taksi", "Datang dengan taksi", "Naik taksi di stasiun", "Membayar uang taksi"],
        "answer": "Pergi dengan taksi",
        "hint": "Takushii (taksi) + de (dengan) + ikimasu (pergi)."
      },
      {
        "id": "n5-u6-l3-q4",
        "type": "sentence-builder",
        "questionText": "Susun kalimat: \"Pergi ke sekolah naik bus.\"",
        "options": ["バス", "で", "がっこう", "へ", "いきます"],
        "answer": "バス で がっこう へ いきます",
        "hint": "Basu + de + gakkou + he + ikimasu."
      },
      {
        "id": "n5-u6-l3-q5",
        "type": "typing",
        "questionText": "Ketiklah partikel arah dibaca \"e\" tetapi ditulis dengan huruf Hiragana:",
        "options": [],
        "answer": "へ",
        "hint": "Huruf Hiragana 'he'."
      }
    ]
  },
  {
    "id": "n5-u6-l4",
    "level": "N5",
    "unitId": "n5-u6",
    "unitTitle": "Unit 6: Public Transportation (Kippu, Chikatetsu, Bus, ~de ikimasu) 🚌",
    "unitDescription": "Master vehicle vocabulary, buying tickets, and stating travel modes using the means particle.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Train & Bus Riding App",
    "description": "Practice conversations about buying tickets at vending machines and asking for stop locations.",
    "expReward": 20,
    "icon": "🗣️",
    "badge": "Percakapan",
    "questions": [
      {
        "id": "n5-u6-l4-q1",
        "type": "multiple-choice",
        "questionText": "Anda ingin membeli tiket kereta sebanyak satu lembar. Kalimat manakah yang harus Anda ucapkan di loket?",
        "options": ["きっぷをひとつください (kippu wo hitotsu kudasai)", "きっぷをふたつください (kippu wo futatsu kudasai)", "きっぷがありますか (kippu ga arimasu ka)", "きっぷはいくらですか (kippu wa ikura desu ka)"],
        "answer": "きっぷをひとつください (kippu wo hitotsu kudasai)",
        "hint": "Kippu (tiket) + wo + hitotsu (satu lembar) + kudasai (tolong berikan)."
      },
      {
        "id": "n5-u6-l4-q2",
        "type": "fill-in-the-blank",
        "questionText": "Seseorang bertanya letak halte bus: \"バスのりばはどこですか。\" Anda menjawab \"Halte bus ada di stasiun.\" Lengkapi kalimat berikut: \n「バスのりばは ___ です。」",
        "options": ["駅 (eki)", "ホテル (hoteru)", "トイレ (toire)", "コンビニ (konbini)"],
        "answer": "駅 (eki)",
        "hint": "Eki berarti stasiun kereta api."
      },
      {
        "id": "n5-u6-l4-q3",
        "type": "listening",
        "questionText": "Dengarkan audio percakapan berikut and tentukan moda kendaraan yang ditunjuk!",
        "audioText": "ちかてつでいきましょう",
        "options": ["Kereta bawah tanah", "Kereta biasa", "Bus kota", "Berjalan kaki"],
        "answer": "Kereta bawah tanah",
        "hint": "Chikatetsu berarti kereta api bawah tanah (subway)."
      },
      {
        "id": "n5-u6-l4-q4",
        "type": "sentence-builder",
        "questionText": "Susun kalimat dialog: \"Tolong berikan tiket dua buah.\"",
        "options": ["きっぷ", "を", "ふたつ", "ください"],
        "answer": "きっぷ を ふたつ ください",
        "hint": "Kippu + wo + futatsu (2) + kudasai."
      },
      {
        "id": "n5-u6-l4-q5",
        "type": "typing",
        "questionText": "Ketiklah arti bahasa Indonesia dari kata tanya \"なんの\" (contoh: nanno noriba -> tempat naik apa?):",
        "options": [],
        "answer": "apa",
        "hint": "Menanyakan jenis dari kata benda berikutnya."
      }
    ]
  },
  {
    "id": "n5-u6-l5",
    "level": "N5",
    "unitId": "n5-u6",
    "unitTitle": "Unit 6: Public Transportation (Kippu, Chikatetsu, Bus, ~de ikimasu) 🚌",
    "unitDescription": "Master vehicle vocabulary, buying tickets, and stating travel modes using the means particle.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Unit 6 Final Challenge",
    "description": "Test your competency in traveling using public transportation.",
    "expReward": 30,
    "icon": "🏆",
    "badge": "Sintesis",
    "questions": [
      {
        "id": "n5-u6-l5-q1",
        "type": "multiple-choice",
        "questionText": "Kereta bawah tanah dalam bahasa Jepang disebut sebagai:",
        "options": ["ちかてつ (chikatetsu)", "でんしゃ (densha)", "バス (basu)", "タクシー (takushii)"],
        "answer": "ちかてつ (chikatetsu)",
        "hint": "Subway Jepang."
      },
      {
        "id": "n5-u6-l5-q2",
        "type": "multiple-choice",
        "questionText": "Manakah cara baca Kanji \"車\" yang tepat?",
        "options": ["くるま (kuruma)", "しゃ (sha)", "い (i)", "らい (rai)"],
        "answer": "くるま (kuruma)",
        "hint": "Kunyomi dari Kanji mobil."
      },
      {
        "id": "n5-u6-l5-q3",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang kalimat berikut: \"Pergi naik taksi\": \n「タクシー ___ 行きます。」",
        "options": ["で (de)", "を (wo)", "に (ni)", "が (ga)"],
        "answer": "で (de)",
        "hint": "Partikel penanda sarana alat."
      },
      {
        "id": "n5-u6-l5-q4",
        "type": "multiple-choice",
        "questionText": "Bagaimanakah arti kata kerja perpindahan \"帰ります\" (kaerimasu)?",
        "options": ["Pulang", "Pergi", "Datang", "Naik"],
        "answer": "Pulang",
        "hint": "Pergi kembali ke rumah atau tanah air."
      },
      {
        "id": "n5-u6-l5-q5",
        "type": "multiple-choice",
        "questionText": "Bagaimanakah menyatakan \"Tolong berikan tiket satu lembar\" secara sopan?",
        "options": ["きっぷをひとつください", "きっぷはいくらですか", "きっぷはあそこです", "きっぷをのります"],
        "answer": "きっぷをひとつください",
        "hint": "Kippu + objek + hitotsu + kudasai."
      },
      {
        "id": "n5-u6-l5-q6",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Pergi ke stasiun naik mobil.\"",
        "options": ["車", "de", "駅", "へ", "行きます"],
        "answer": "車 で 駅 へ 行きます",
        "hint": "Kuruma de + eki he + ikimasu."
      },
      {
        "id": "n5-u6-l5-q7",
        "type": "listening",
        "questionText": "Dengarkan audio and pilihlah tujuan perjalanan pembicara!",
        "audioText": "くるまでいきます",
        "options": ["Pergi naik mobil", "Pergi naik kereta", "Datang naik mobil", "Membeli mobil baru"],
        "answer": "Pergi naik mobil",
        "hint": "Kuruma de ikimasu."
      },
      {
        "id": "n5-u6-l5-q8",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang arah perjalanan berikut: \n「日本 ___ 来ました。(Telah datang ke Jepang.)」",
        "options": ["へ", "で", "を", "が"],
        "answer": "へ",
        "hint": "Partikel penunjuk arah perjalanan 'he'."
      },
      {
        "id": "n5-u6-l5-q9",
        "type": "sentence-builder",
        "questionText": "Susun kalimat: \"Saya datang naik bus kota.\"",
        "options": ["わたし", "は", "バス", "で", "来ました"],
        "answer": "わたし は バス で 来ました",
        "hint": "Watashi wa + basu de + kimashita."
      },
      {
        "id": "n5-u6-l5-q10",
        "type": "typing",
        "questionText": "Ketiklah arti bahasa Indonesia dari kata benda \"じてんしゃ\" (jitensha):",
        "options": [],
        "answer": "sepeda",
        "hint": "Kendaraan beroda dua tanpa mesin yang dikayuh."
      }
    ]
  },

  // ==========================================
  // UNIT 7: CHECK-IN HOTEL & KEBERADAAN BARANG (~GA ARIMASU/IMASU) 🏨
  // ==========================================
  {
    "id": "n5-u7-l1",
    "level": "N5",
    "unitId": "n5-u7",
    "unitTitle": "Unit 7: Hotel Check-in & Presence of Objects (~ga arimasu/imasu) 🏨",
    "unitDescription": "Master vocabulary for hotel rooms, keys, and stating the existence of inanimate objects and living things around you.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Room Facilities & Hotel Goods Vocabulary",
    "description": "Kuasai kata benda penting: heya (kamar), kagi (kunci), pasupooto (paspor), dan kata hewan neko, inu.",
    "expReward": 20,
    "icon": "🏨",
    "badge": "Kosakata",
    "questions": [
      {
        "id": "n5-u7-l1-q1",
        "type": "multiple-choice",
        "questionText": "Kosakata apakah yang memiliki arti \"Kamar\" dalam bahasa Jepang?",
        "options": ["へや (heya)", "かぎ (kagi)", "ベッド (beddo)", "おふろ (ofuro)"],
        "answer": "へや (heya)",
        "hint": "Sering ditulis dengan Kanji: 部屋."
      },
      {
        "id": "n5-u7-l1-q2",
        "type": "typing",
        "questionText": "Ketiklah sebutan \"Kunci\" dalam huruf Hiragana:",
        "options": [],
        "answer": "かぎ",
        "hint": "Kagi -> かぎ."
      },
      {
        "id": "n5-u7-l1-q3",
        "type": "listening",
        "questionText": "Dengarkan audio kata berikut and pilihlah terjemahan yang tepat!",
        "audioText": "パスポート",
        "options": ["Paspor", "Kamar hotel", "Kunci hotel", "Dompet"],
        "answer": "Paspor",
        "hint": "Dokumen perjalanan resmi luar negeri (Pasupooto)."
      },
      {
        "id": "n5-u7-l1-q4",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang kata benda hidup kucing berikut: \n「へやに ___ がいます。(Di kamar ada kucing.)」",
        "options": ["ねこ (neko)", "いぬ (inu)", "つくえ (tsukue)", "かぎ (kagi)"],
        "answer": "ねこ (neko)",
        "hint": "Hewan lucu berbulu mengeong."
      },
      {
        "id": "n5-u7-l1-q5",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Ada paspor di sini.\"",
        "options": ["パスポート", "が", "あります"],
        "answer": "パスポート が あります",
        "hint": "Pasupooto + partikel ga + arimasu."
      }
    ]
  },
  {
    "id": "n5-u7-l2",
    "level": "N5",
    "unitId": "n5-u7",
    "unitTitle": "Unit 7: Hotel Check-in & Presence of Objects (~ga arimasu/imasu) 🏨",
    "unitDescription": "Master vocabulary for hotel rooms, keys, and stating the existence of inanimate objects and living things around you.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Kanji Position & Existence",
    "description": "Kuasai Kanji 中 (dalam), 外 (luar), dan 友 (teman).",
    "expReward": 20,
    "icon": "📦",
    "badge": "Kanji",
    "questions": [
      {
        "id": "n5-u7-l2-q1",
        "type": "multiple-choice",
        "questionText": "Manakah cara baca kunyomi yang tepat untuk Kanji \"中\" (dalam/tengah)?",
        "options": ["なか (naka)", "そと (soto)", "うえ (ue)", "した (shita)"],
        "answer": "なか (naka)",
        "hint": "Naka berarti bagian dalam atau tengah."
      },
      {
        "id": "n5-u7-l2-q2",
        "type": "multiple-choice",
        "questionText": "Manakah cara baca kunyomi yang tepat untuk Kanji \"外\" (luar)?",
        "options": ["そと (soto)", "なか (naka)", "となり (tonari)", "よこ (yoko)"],
        "answer": "そと (soto)",
        "hint": "Soto berarti bagian luar."
      },
      {
        "id": "n5-u7-l2-q3",
        "type": "listening",
        "questionText": "Dengarkan pelafalan audio Kanji berikut and pilih artinya!",
        "audioText": "ともだち",
        "options": ["Teman", "Kamar", "Kunci", "Petugas Hotel"],
        "answer": "Teman",
        "hint": "Kunyomi dari Kanji 友 (tomo) -> Tomodachi."
      },
      {
        "id": "n5-u7-l2-q4",
        "type": "typing",
        "questionText": "Ketik cara baca Hiragana Kanji tengah berikut: 部屋の中 (Dalam kamar)",
        "options": [],
        "answer": "へやのなか",
        "hint": "Heya + no + naka -> へやのなか."
      },
      {
        "id": "n5-u7-l2-q5",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Teman (tomodachi) ada di luar.\"",
        "options": ["友だち", "は", "外", "に", "います"],
        "answer": "友だち は 外 に います",
        "hint": "Tomodachi wa + soto ni + imasu."
      }
    ]
  },
  {
    "id": "n5-u7-l3",
    "level": "N5",
    "unitId": "n5-u7",
    "unitTitle": "Unit 7: Hotel Check-in & Presence of Objects (~ga arimasu/imasu) 🏨",
    "unitDescription": "Master vocabulary for hotel rooms, keys, and stating the existence of inanimate objects and living things around you.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Grammar ~ga arimasu & imasu",
    "description": "Learn the basic differences between the existence pattern of arimasu (inanimate) vs imasu (living things).",
    "expReward": 20,
    "icon": "📝",
    "badge": "Tata Bahasa",
    "questions": [
      {
        "id": "n5-u7-l3-q1",
        "type": "multiple-choice",
        "questionText": "Kata kerja keberadaan manakah yang digunakan saat menyatakan \"Ada kucing (makhluk hidup)\"?",
        "options": ["います (imasu)", "あります (arimasu)", "おきます (okimasu)", "のります (norimasu)"],
        "answer": "います (imasu)",
        "hint": "Neko adalah hewan, maka gunakan imasu."
      },
      {
        "id": "n5-u7-l3-q2",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi kata kerja keberadaan yang tepat untuk kalimat \"Ada paspor (benda mati) di kamar\": \n「部屋にパスポートが ___ 。」",
        "options": ["あります (arimasu)", "います (imasu)", "きます (kimasu)", "いきます (ikimasu)"],
        "answer": "あります (arimasu)",
        "hint": "Paspor adalah benda mati, sehingga gunakan arimasu."
      },
      {
        "id": "n5-u7-l3-q3",
        "type": "listening",
        "questionText": "Dengarkan pelafalan kalimat berikut and pilihlah artinya!",
        "audioText": "へやにともだちがいます",
        "options": ["Ada teman di kamar", "Ada teman di luar", "Saya pergi ke kamar teman", "Teman datang ke kamar"],
        "answer": "Ada teman di kamar",
        "hint": "Heya ni (di kamar) + tomodachi ga (teman) + imasu (ada)."
      },
      {
        "id": "n5-u7-l3-q4",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Di dalam kamar ada kucing.\"",
        "options": ["部屋の", "中に", "ねこ", "が", "います"],
        "answer": "部屋の 中に ねこ が います",
        "hint": "Heya no naka ni + neko ga + imasu."
      },
      {
        "id": "n5-u7-l3-q5",
        "type": "typing",
        "questionText": "Ketiklah bentuk negatif formal (tidak ada) dari kata kerja keberadaan benda mati \"あります\":",
        "options": [],
        "answer": "ありません",
        "hint": "Arimasu berubah menjadi arimasen."
      }
    ]
  },
  {
    "id": "n5-u7-l4",
    "level": "N5",
    "unitId": "n5-u7",
    "unitTitle": "Unit 7: Hotel Check-in & Presence of Objects (~ga arimasu/imasu) 🏨",
    "unitDescription": "Master vocabulary for hotel rooms, keys, and stating the existence of inanimate objects and living things around you.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Hotel Check-in App",
    "description": "Latih dialog check-in resepsionis hotel, meminta kunci kamar, dan menanyakan fasilitas.",
    "expReward": 20,
    "icon": "🗣️",
    "badge": "Percakapan",
    "questions": [
      {
        "id": "n5-u7-l4-q1",
        "type": "multiple-choice",
        "questionText": "Resepsionis hotel meminta paspor Anda: \"パスポートをお願いします。\" Tindakan/jawaban apa yang tepat?",
        "options": ["はい、どうぞ (hai, douzo - Sambil menyerahkan paspor)", "ありがとうございます (arigatou gozaimasu)", "すみません、ありません (sumimasen, arimasen)", "いいえ、ちがいます (iie, chigaimasu)"],
        "answer": "はい、どうぞ (hai, douzo - Sambil menyerahkan paspor)",
        "hint": "Hai, douzo digunakan saat memberikan sesuatu kepada orang lain."
      },
      {
        "id": "n5-u7-l4-q2",
        "type": "fill-in-the-blank",
        "questionText": "Anda ingin menanyakan kunci kamar di resepsionis hotel: \"部屋のかぎは ___ ですか。\"",
        "options": ["どこ", "だれ", "なん", "いくつ"],
        "answer": "どこ",
        "hint": "Doko desu ka berarti 'di mana'."
      },
      {
        "id": "n5-u7-l4-q3",
        "type": "listening",
        "questionText": "Dengarkan audio percakapan berikut and pilih arti benda yang dimaksud!",
        "audioText": "かぎがありますか？はい、ここにあります。",
        "options": ["Apakah kuncinya ada? Ya, ada di sini.", "Apakah kamarnya ada? Ya, ada di sini.", "Apakah paspornya ada? Tidak ada.", "Apakah kuncinya hilang? Tidak."],
        "answer": "Apakah kuncinya ada? Ya, ada di sini.",
        "hint": "Kagi (kunci) + arimasu ka (apakah ada) + koko (sini)."
      },
      {
        "id": "n5-u7-l4-q4",
        "type": "sentence-builder",
        "questionText": "Susun kalimat dialog: \"Tolong berikan kunci kamar.\"",
        "options": ["部屋の", "かぎ", "を", "ください"],
        "answer": "部屋の かぎ を ください",
        "hint": "Heya no kagi (kunci kamar) + wo + kudasai."
      },
      {
        "id": "n5-u7-l4-q5",
        "type": "typing",
        "questionText": "Ketiklah arti bahasa Indonesia dari frasa penyerahan barang \"はい、どうぞ\":",
        "options": [],
        "answer": "ya silakan",
        "hint": "Atau \"ini, silakan\"."
      }
    ]
  },
  {
    "id": "n5-u7-l5",
    "level": "N5",
    "unitId": "n5-u7",
    "unitTitle": "Unit 7: Hotel Check-in & Presence of Objects (~ga arimasu/imasu) 🏨",
    "unitDescription": "Master vocabulary for hotel rooms, keys, and stating the existence of inanimate objects and living things around you.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Unit 7 Final Challenge",
    "description": "Test your understanding of hotel check-in and mastery of arimasu/imasu.",
    "expReward": 30,
    "icon": "🏆",
    "badge": "Sintesis",
    "questions": [
      {
        "id": "n5-u7-l5-q1",
        "type": "multiple-choice",
        "questionText": "Kata kerja keberadaan yang tepat untuk menyatakan \"Ada anjing (makhluk hidup)\" adalah:",
        "options": ["います (imasu)", "あります (arimasu)", "きます (kimasu)", "ねます (nemasu)"],
        "answer": "います (imasu)",
        "hint": "Anjing (inu) adalah makhluk hidup."
      },
      {
        "id": "n5-u7-l5-q2",
        "type": "multiple-choice",
        "questionText": "Kamar hotel dalam bahasa Jepang disebut:",
        "options": ["へya (heya)", "かgi (kagi)", "うみ (umi)", "まtsuri (matsuri)"],
        "answer": "へya (heya)",
        "hint": "Dibaca heya."
      },
      {
        "id": "n5-u7-l5-q3",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang keberadaan berikut: \"Ada kunci di dalam kamar\": \n「部屋の中にかぎ ___ あります。」",
        "options": ["が (ga)", "を (wo)", "は (wa)", "に (ni)"],
        "answer": "が (ga)",
        "hint": "Subjek penanda keberadaan di depan arimasu/imasu menggunakan partikel ga."
      },
      {
        "id": "n5-u7-l5-q4",
        "type": "multiple-choice",
        "questionText": "Bagaimanakah arti kunyomi dari karakter Kanji \"中\"?",
        "options": ["Dalam", "Luar", "Atas", "Bawah"],
        "answer": "Dalam",
        "hint": "Dibaca 'naka' yang berarti dalam/tengah."
      },
      {
        "id": "n5-u7-l5-q5",
        "type": "multiple-choice",
        "questionText": "Bagaimanakah arti kunyomi dari karakter Kanji \"外\"?",
        "options": ["Luar", "Dalam", "Kanan", "Kiri"],
        "answer": "Luar",
        "hint": "Dibaca 'soto'."
      },
      {
        "id": "n5-u7-l5-q6",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Di dalam kamar ada kucing.\"",
        "options": ["部屋の", "中に", "ねco", "が", "います"],
        "answer": "部屋の 中に ねco が います",
        "hint": "Kamar + partikel no + dalam + ni + neko + ga + imasu."
      },
      {
        "id": "n5-u7-l5-q7",
        "type": "listening",
        "questionText": "Dengarkan audio dan pilihlah terjemahan yang tepat!",
        "audioText": "パスポートがありません",
        "options": ["Tidak ada paspor", "Ada paspor", "Paspor saya hilang", "Membawa paspor"],
        "answer": "Tidak ada paspor",
        "hint": "Pasupooto ga arimasen."
      },
      {
        "id": "n5-u7-l5-q8",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang dialog check-in berikut: \nA: 「パスポートをお願いします。」\nB: 「はい、___ 。」",
        "options": ["どうぞ", "はじめまして", "ありがとう", "こんにちは"],
        "answer": "どうぞ",
        "hint": "Hai, douzo."
      },
      {
        "id": "n5-u7-l5-q9",
        "type": "sentence-builder",
        "questionText": "Susun kalimat: \"Ada teman di luar kamar.\"",
        "options": ["部屋の", "外に", "友だち", "が", "います"],
        "answer": "部屋の 外に 友だち が います",
        "hint": "Heya no soto ni + tomodachi ga + imasu."
      },
      {
        "id": "n5-u7-l5-q10",
        "type": "typing",
        "questionText": "Ketiklah arti bahasa Indonesia dari kata benda \"かぎ\" (kagi):",
        "options": [],
        "answer": "kunci",
        "hint": "Alat logam untuk membuka pintu atau gembok."
      }
    ]
  },

  // ==========================================
  // UNIT 8: ANGGOTA KELUARGA (KAZOKU, CHICHI, HAHA, ~NIN DESU) 👨‍👩‍👧‍👦
  // ==========================================
  {
    "id": "n5-u8-l1",
    "level": "N5",
    "unitId": "n5-u8",
    "unitTitle": "Unit 8: Family Members (Kazoku, Chichi, Haha, ~nin desu) 👨‍👩‍👧‍👦",
    "unitDescription": "Learn how to name family members and state the number of people in a family.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Family Members Vocabulary",
    "description": "Kuasai kata anggota keluarga sendiri: chichi (ayah), haha (ibu), kazoku (keluarga), kyoudai, otouto, imouto.",
    "expReward": 20,
    "icon": "👨‍👩‍👧‍👦",
    "badge": "Kosakata",
    "questions": [
      {
        "id": "n5-u8-l1-q1",
        "type": "multiple-choice",
        "questionText": "Bagaimanakah Anda menyebut \"Ibu saya sendiri\" kepada orang lain dalam bahasa Jepang?",
        "options": ["はは (haha)", "おかあさん (okaasan)", "ちち (chichi)", "おとうさん (otousan)"],
        "answer": "はは (haha)",
        "hint": "Haha digunakan untuk menyebut ibu kandung sendiri saat berbicara dengan pihak luar."
      },
      {
        "id": "n5-u8-l1-q2",
        "type": "typing",
        "questionText": "Ketiklah kata \"Keluarga\" dalam Hiragana:",
        "options": [],
        "answer": "かぞく",
        "hint": "Kazoku -> かぞく."
      },
      {
        "id": "n5-u8-l1-q3",
        "type": "listening",
        "questionText": "Dengarkan audio anggota keluarga berikut and tentukan artinya!",
        "audioText": "ちち",
        "options": ["Ayah saya", "Ibu saya", "Adik laki-laki", "Adik perempuan"],
        "answer": "Ayah saya",
        "hint": "Chichi digunakan untuk menyebut ayah kandung sendiri."
      },
      {
        "id": "n5-u8-l1-q4",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang untuk menyebut adik laki-laki sendiri: \n「わたしには ___ がいます。(Saya memiliki adik laki-laki.)」",
        "options": ["おとうと (otouto)", "いもうと (imouto)", "あに (ani)", "あね (ane)"],
        "answer": "おとうと (otouto)",
        "hint": "Otouto berarti adik laki-laki."
      },
      {
        "id": "n5-u8-l1-q5",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Ada keluarga.\"",
        "options": ["かぞく", "が", "います"],
        "answer": "かぞく が います",
        "hint": "Kazoku + partikel ga + imasu (makhluk hidup)."
      }
    ]
  },
  {
    "id": "n5-u8-l2",
    "level": "N5",
    "unitId": "n5-u8",
    "unitTitle": "Unit 8: Family Members (Kazoku, Chichi, Haha, ~nin desu) 👨‍👩‍👧‍👦",
    "unitDescription": "Learn how to name family members and state the number of people in a family.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Kanji Family Relations",
    "description": "Kuasai Kanji 父 (ayah), 母 (ibu), dan 子 (anak).",
    "expReward": 20,
    "icon": "👨‍👩‍👧‍👦",
    "badge": "Kanji",
    "questions": [
      {
        "id": "n5-u8-l2-q1",
        "type": "multiple-choice",
        "questionText": "Manakah cara baca kunyomi yang tepat untuk Kanji ayah \"父\"?",
        "options": ["ちち (chichi)", "はは (haha)", "あに (ani)", "おとうと (otouto)"],
        "answer": "ちち (chichi)",
        "hint": "Chichi dibaca sebagai ayah sendiri."
      },
      {
        "id": "n5-u8-l2-q2",
        "type": "multiple-choice",
        "questionText": "Manakah cara baca kunyomi yang tepat untuk Kanji ibu \"母\"?",
        "options": ["はは (haha)", "ちち (chichi)", "あね (ane)", "いもうto (imouto)"],
        "answer": "はは (haha)",
        "hint": "Haha dibaca sebagai ibu sendiri."
      },
      {
        "id": "n5-u8-l2-q3",
        "type": "listening",
        "questionText": "Dengarkan pelafalan audio Kanji keluarga berikut and pilih artinya!",
        "audioText": "こども",
        "options": ["Anak", "Orang Tua", "Kakak", "Adik"],
        "answer": "Anak",
        "hint": "Kunyomi dari Kanji 子 (ko) + domo -> Kodomo."
      },
      {
        "id": "n5-u8-l2-q4",
        "type": "typing",
        "questionText": "Ketik cara baca Hiragana Kanji ibu berikut: 私の母",
        "options": [],
        "answer": "わたしのはは",
        "hint": "Watashi + no + haha -> わたしのはは."
      },
      {
        "id": "n5-u8-l2-q5",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Ayah (chichi) ada di kamar.\"",
        "options": ["父", "は", "部屋", "に", "います"],
        "answer": "父 は 部屋 に います",
        "hint": "Chichi + wa + heya + ni + imasu."
      }
    ]
  },
  {
    "id": "n5-u8-l3",
    "level": "N5",
    "unitId": "n5-u8",
    "unitTitle": "Unit 8: Family Members (Kazoku, Chichi, Haha, ~nin desu) 👨‍👩‍👧‍👦",
    "unitDescription": "Learn how to name family members and state the number of people in a family.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Grammar Counting People ~nin",
    "description": "Pelajari cara menghitung jumlah orang (hitori, futari, ~nin) untuk menyatakan anggota keluarga.",
    "expReward": 20,
    "icon": "📝",
    "badge": "Tata Bahasa",
    "questions": [
      {
        "id": "n5-u8-l3-q1",
        "type": "multiple-choice",
        "questionText": "Bagaimanakah cara menyebut hitungan \"satu orang\" dan \"dua orang\" yang tidak teratur dalam bahasa Jepang?",
        "options": ["ひとり (hitori) dan ふたり (futari)", "いちにん (ichinin) dan ににん (ninin)", "ひとつ (hitotsu) dan ふたつ (futatsu)", "ひだり (hidari) dan みぎ (migi)"],
        "answer": "ひとり (hitori) dan ふたり (futari)",
        "hint": "Hitungan satu dan dua orang bersifat tidak teratur (irregular)."
      },
      {
        "id": "n5-u8-l3-q2",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi sufiks hitungan orang untuk \"Tiga orang\": \n「家族は三 ___ です。(Keluarga saya tiga orang.)」",
        "options": ["人 (nin)", "人 (jin)", "人 (hito)", "つ (tsu)"],
        "answer": "人 (nin)",
        "hint": "Mulai dari angka 3, hitungan orang menggunakan sufiks 'nin' (人)."
      },
      {
        "id": "n5-u8-l3-q3",
        "type": "listening",
        "questionText": "Dengarkan pelafalan kalimat berikut and pilihlah artinya!",
        "audioText": "あねがふたりいます",
        "options": ["Memiliki dua orang kakak perempuan", "Memiliki dua orang adik perempuan", "Kakak perempuan saya ada satu", "Ada dua orang adik laki-laki"],
        "answer": "Memiliki dua orang kakak perempuan",
        "hint": "Ane (kakak pr) + ga + futari (2 orang) + imasu (ada/punya)."
      },
      {
        "id": "n5-u8-l3-q4",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Keluarga saya terdiri dari empat orang.\"",
        "options": ["家族", "は", "四人", "です"],
        "answer": "家族 は 四人 です",
        "hint": "Kazoku wa + yonin (4 orang - cara baca khusus) + desu."
      },
      {
        "id": "n5-u8-l3-q5",
        "type": "typing",
        "questionText": "Ketiklah sebutan \"empat orang\" dalam huruf Hiragana (hati-hati pengucapannya khusus):",
        "options": [],
        "answer": "よにん",
        "hint": "Bukan yonin tapi 'yonin' ditulis 'よにん'."
      }
    ]
  },
  {
    "id": "n5-u8-l4",
    "level": "N5",
    "unitId": "n5-u8",
    "unitTitle": "Unit 8: Family Members (Kazoku, Chichi, Haha, ~nin desu) 👨‍👩‍👧‍👦",
    "unitDescription": "Learn how to name family members and state the number of people in a family.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Family Storytelling App",
    "description": "Practice conversations introducing your family members and number of siblings to others.",
    "expReward": 20,
    "icon": "🗣️",
    "badge": "Percakapan",
    "questions": [
      {
        "id": "n5-u8-l4-q1",
        "type": "multiple-choice",
        "questionText": "Seseorang bertanya jumlah keluarga Anda: \"ご家族は何人ですか。\" Anda ingin menjawab \"Keluarga saya lima orang.\" Kalimat manakah yang tepat?",
        "options": ["家族は五人です (kazoku wa go-nin desu)", "家族は五つです (kazoku wa itsutsu desu)", "家族は五人います (kazoku wa go-nin imasu)", "家族は五人から来ました (kazoku wa go-nin kara kimashita)"],
        "answer": "家族は五人です (kazoku wa go-nin desu)",
        "hint": "Jawaban sopan nominal jumlah anggota keluarga."
      },
      {
        "id": "n5-u8-l4-q2",
        "type": "fill-in-the-blank",
        "questionText": "Anda ingin menceritakan saudara kandung \"Saya memiliki satu orang adik perempuan.\" Lengkapi kalimat berikut: \n「いもうとが ___ います。」",
        "options": ["ひとり (hitori)", "ひとつ (hitotsu)", "ふたり (futari)", "一人 (ichinin)"],
        "answer": "ひとり (hitori)",
        "hint": "Satu orang adalah hitori (一人)."
      },
      {
        "id": "n5-u8-l4-q3",
        "type": "listening",
        "questionText": "Dengarkan audio percakapan berikut and tentukan jumlah anggota keluarga pembicara!",
        "audioText": "かぞくはさんにんです",
        "options": ["3 orang", "4 orang", "2 orang", "5 orang"],
        "answer": "3 orang",
        "hint": "San-nin berarti 3 orang."
      },
      {
        "id": "n5-u8-l4-q4",
        "type": "sentence-builder",
        "questionText": "Susun kalimat dialog: \"Saya dan ibu.\"",
        "options": ["わたし", "と", "はは", "です"],
        "answer": "わたし と はは です",
        "hint": "Watashi + partikel gabung 'to' (dan) + haha + desu."
      },
      {
        "id": "n5-u8-l4-q5",
        "type": "typing",
        "questionText": "Ketiklah arti bahasa Indonesia dari kata benda \"きょうだい\" (kyoudai):",
        "options": [],
        "answer": "saudara kandung",
        "hint": "Merujuk pada saudara laki-laki dan perempuan."
      }
    ]
  },
  {
    "id": "n5-u8-l5",
    "level": "N5",
    "unitId": "n5-u8",
    "unitTitle": "Unit 8: Family Members (Kazoku, Chichi, Haha, ~nin desu) 👨‍👩‍👧‍👦",
    "unitDescription": "Learn how to name family members and state the number of people in a family.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Unit 8 Final Challenge",
    "description": "Test your proficiency in introducing family structure and family size.",
    "expReward": 30,
    "icon": "🏆",
    "badge": "Sintesis",
    "questions": [
      {
        "id": "n5-u8-l5-q1",
        "type": "multiple-choice",
        "questionText": "Cara menyebut ayah kandung sendiri secara sopan saat bercerita kepada orang lain adalah:",
        "options": ["ちち (chichi)", "おとうさん (otousan)", "はは (haha)", "おかあさん (okaasan)"],
        "answer": "ちち (chichi)",
        "hint": "Chichi untuk ayah sendiri."
      },
      {
        "id": "n5-u8-l5-q2",
        "type": "multiple-choice",
        "questionText": "Sufiks hitungan untuk menyatakan \"2 orang\" adalah:",
        "options": ["ふたり (futari)", "ひとり (hitori)", "ににん (ninin)", "にっつ (nittu)"],
        "answer": "ふたり (futari)",
        "hint": "Futari dibaca untuk 2 orang."
      },
      {
        "id": "n5-u8-l5-q3",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi kalimat \"Ada ayah di kamar\": \n「部屋にちち ___ います。」",
        "options": ["が (ga)", "を (wo)", "は (wa)", "に (ni)"],
        "answer": "が (ga)",
        "hint": "Penanda subjek keberadaan."
      },
      {
        "id": "n5-u8-l5-q4",
        "type": "multiple-choice",
        "questionText": "Apakah arti dari Kanji \"母\"?",
        "options": ["Ibu", "Ayah", "Anak", "Teman"],
        "answer": "Ibu",
        "hint": "Dibaca haha."
      },
      {
        "id": "n5-u8-l5-q5",
        "type": "multiple-choice",
        "questionText": "Apakah arti dari Kanji \"父\"?",
        "options": ["Ayah", "Ibu", "Adik", "Kakak"],
        "answer": "Ayah",
        "hint": "Dibaca chichi."
      },
      {
        "id": "n5-u8-l5-q6",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Keluarga saya terdiri dari tiga orang.\"",
        "options": ["家族", "は", "三人", "です"],
        "answer": "家族 は 三人 です",
        "hint": "Kazoku + wa + san-nin (三人) + desu."
      },
      {
        "id": "n5-u8-l5-q7",
        "type": "listening",
        "questionText": "Dengarkan audio dan pilihlah jumlah adik laki-laki yang dimiliki!",
        "audioText": "おとうとがひとりいます",
        "options": ["Memiliki satu orang adik laki-laki", "Memiliki dua orang adik laki-laki", "Tidak memiliki adik laki-laki", "Kakak laki-laki saya satu"],
        "answer": "Memiliki satu orang adik laki-laki",
        "hint": "Otouto ga hitori imasu."
      },
      {
        "id": "n5-u8-l5-q8",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang hitungan orang untuk \"Empat orang\": \n「きょうだいは ___ です。」",
        "options": ["四人 (yonin)", "四人 (yonin)", "四人 (yonin)", "四人 (yoyin)"],
        "answer": "四人 (yonin)",
        "hint": "Dibaca 'yonin' ditulis 四人."
      },
      {
        "id": "n5-u8-l5-q9",
        "type": "sentence-builder",
        "questionText": "Susun kalimat: \"Saya memiliki dua orang kakak perempuan.\"",
        "options": ["あね", "が", "ふたり", "います"],
        "answer": "あね が ふたり います",
        "hint": "Ane (kakak pr) + ga + futari (2 orang) + imasu."
      },
      {
        "id": "n5-u8-l5-q10",
        "type": "typing",
        "questionText": "Ketiklah arti bahasa Indonesia dari kata benda \"いもうと\" (imouto):",
        "options": [],
        "answer": "adik perempuan",
        "hint": "Anggota keluarga saudara perempuan yang lebih muda."
      }
    ]
  },

  // ==========================================
  // UNIT 9: KEPEMILIKAN BARANG (PARTIKEL ~NO, DARE NO) 🎒
  // ==========================================
  {
    "id": "n5-u9-l1",
    "level": "N5",
    "unitId": "n5-u9",
    "unitTitle": "Unit 9: Item Ownership (Particle ~no, Dare no) 🎒",
    "unitDescription": "Master vocabulary for personal belongings, the particle of ownership, and how to ask about the owner of items.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Personal Belongings Vocabulary",
    "description": "Kuasai kata benda barang: kaban (tas), hon (buku), kasa (payung), keitai (HP), dan kata tanya dare (siapa).",
    "expReward": 20,
    "icon": "🎒",
    "badge": "Kosakata",
    "questions": [
      {
        "id": "n5-u9-l1-q1",
        "type": "multiple-choice",
        "questionText": "Kosakata barang bawaan \"かばん\" (kaban) memiliki arti:",
        "options": ["Tas", "Buku", "Payung", "Ponsel"],
        "answer": "Tas",
        "hint": "Wadah portabel bertali untuk membawa buku atau barang."
      },
      {
        "id": "n5-u9-l1-q2",
        "type": "typing",
        "questionText": "Ketiklah sebutan \"Payung\" dalam huruf Hiragana:",
        "options": [],
        "answer": "かさ",
        "hint": "Kasa -> かさ."
      },
      {
        "id": "n5-u9-l1-q3",
        "type": "listening",
        "questionText": "Dengarkan audio benda berikut and pilihlah terjemahan yang tepat!",
        "audioText": "ほん",
        "options": ["Buku", "Tas", "Ponsel", "Kunci"],
        "answer": "Buku",
        "hint": "Bahan cetak terjilid dibaca hon."
      },
      {
        "id": "n5-u9-l1-q4",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang kata tanya \"siapa\" berikut: \n「これは ___ のですか。(Ini milik siapa?)」",
        "options": ["だれ (dare)", "なん (nan)", "どこ (doko)", "いつ (itsu)"],
        "answer": "だれ (dare)",
        "hint": "Dare berarti siapa."
      },
      {
        "id": "n5-u9-l1-q5",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Tas milik saya.\"",
        "options": ["わたし", "の", "かばん", "です"],
        "answer": "わたし の かばん です",
        "hint": "Watashi (saya) + partikel kepemilikan no + kaban + desu."
      }
    ]
  },
  {
    "id": "n5-u9-l2",
    "level": "N5",
    "unitId": "n5-u9",
    "unitTitle": "Unit 9: Item Ownership (Particle ~no, Dare no) 🎒",
    "unitDescription": "Master vocabulary for personal belongings, the particle of ownership, and how to ask about the owner of items.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Kanji Goods & Titles",
    "description": "Kuasai Kanji 本 (buku/asal), 先 (dahulu), dan 生 (hidup).",
    "expReward": 20,
    "icon": "🎒",
    "badge": "Kanji",
    "questions": [
      {
        "id": "n5-u9-l2-q1",
        "type": "multiple-choice",
        "questionText": "Manakah cara baca kunyomi yang tepat untuk Kanji \"本\" (buku)?",
        "options": ["ほん (hon)", "もと (moto)", "せん (sen)", "せい (sei)"],
        "answer": "ほん (hon)",
        "hint": "Dibaca hon saat berdiri sendiri sebagai buku."
      },
      {
        "id": "n5-u9-l2-q2",
        "type": "multiple-choice",
        "questionText": "Kanji gabungan \"先生\" memiliki arti:",
        "options": ["Guru / Dosen", "Siswa", "Teman", "Orang Tua"],
        "answer": "Guru / Dosen",
        "hint": "Ditulis dengan Kanji 'dahulu' (先) dan 'hidup' (生), dibaca 'sensei'."
      },
      {
        "id": "n5-u9-l2-q3",
        "type": "listening",
        "questionText": "Dengarkan pelafalan audio Kanji berikut and tentukan artinya!",
        "audioText": "せんせい",
        "options": ["Guru", "Murid", "Buku", "Dokter"],
        "answer": "Guru",
        "hint": "Sensei berarti guru."
      },
      {
        "id": "n5-u9-l2-q4",
        "type": "typing",
        "questionText": "Ketik cara baca Hiragana dari Kanji guru berikut: 先生",
        "options": [],
        "answer": "せんせい",
        "hint": "Dibaca sebagai sen-sei."
      },
      {
        "id": "n5-u9-l2-q5",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Ini adalah buku Guru (sensei).\"",
        "options": ["これ", "は", "先生の", "本", "です"],
        "answer": "これ は 先生の 本 です",
        "hint": "Kore wa + sensei no + hon + desu."
      }
    ]
  },
  {
    "id": "n5-u9-l3",
    "level": "N5",
    "unitId": "n5-u9",
    "unitTitle": "Unit 9: Item Ownership (Particle ~no, Dare no) 🎒",
    "unitDescription": "Master vocabulary for personal belongings, the particle of ownership, and how to ask about the owner of items.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Grammar Ownership Particle ~no",
    "description": "Learn how to connect possessive nouns using the particle ~no (A belongs to B).",
    "expReward": 20,
    "icon": "📝",
    "badge": "Tata Bahasa",
    "questions": [
      {
        "id": "n5-u9-l3-q1",
        "type": "multiple-choice",
        "questionText": "Partikel manakah yang digunakan untuk menyatakan kepemilikan (punya/milik)?",
        "options": ["の (no)", "に (ni)", "を (wo)", "は (wa)"],
        "answer": "の (no)",
        "hint": "A no B = B milik A (contoh: watashi no hon = buku milik saya)."
      },
      {
        "id": "n5-u9-l3-q2",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi partikel untuk kalimat \"Apakah ini tas milik Anda?\": \n「これはあなた ___ かばんですか。」",
        "options": ["の", "を", "は", "が"],
        "answer": "の",
        "hint": "Anata (Anda) + partikel kepemilikan no + kaban."
      },
      {
        "id": "n5-u9-l3-q3",
        "type": "listening",
        "questionText": "Dengarkan pelafalan kalimat berikut and pilih artinya!",
        "audioText": "これはだれのかさですか",
        "options": ["Ini payung milik siapa?", "Apakah ini payung Anda?", "Ini payung milik saya", "Di mana payung saya?"],
        "answer": "Ini payung milik siapa?",
        "hint": "Kore wa (ini adalah) + dare no (siapa punya) + kasa desu ka (payung tanya)."
      },
      {
        "id": "n5-u9-l3-q4",
        "type": "sentence-builder",
        "questionText": "Susun kalimat: \"Itu (sore) adalah HP milik teman.\"",
        "options": ["それ", "は", "友だちの", "スマホ", "です"],
        "answer": "それ は 友だちの スマホ です",
        "hint": "Sore wa + tomodachi no (teman punya) + sumaho (HP) + desu."
      },
      {
        "id": "n5-u9-l3-q5",
        "type": "typing",
        "questionText": "Ketiklah partikel kepemilikan dalam Hiragana:",
        "options": [],
        "answer": "の",
        "hint": "Sufiks penyambung kata benda kepunyaan."
      }
    ]
  },
  {
    "id": "n5-u9-l4",
    "level": "N5",
    "unitId": "n5-u9",
    "unitTitle": "Unit 9: Item Ownership (Particle ~no, Dare no) 🎒",
    "unitDescription": "Master vocabulary for personal belongings, the particle of ownership, and how to ask about the owner of items.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Finding Items App",
    "description": "Practice conversations returning a left-behind umbrella or asking for the owner of items in class.",
    "expReward": 20,
    "icon": "🗣️",
    "badge": "Percakapan",
    "questions": [
      {
        "id": "n5-u9-l4-q1",
        "type": "multiple-choice",
        "questionText": "Seseorang menemukan payung Anda dan bertanya \"これはあなたの傘ですか。\" Anda menjawab \"Bukan, bukan milik saya.\" Kalimat manakah yang tepat?",
        "options": ["いいえ、わたしのではありません (iie, watashi no dewa arimasen)", "はい、わたしのです (hai, watashi no desu)", "いいえ, あります (iie, arimasen)", "いいえ、ちがいます (iie, chigaimasu)"],
        "answer": "いいえ、わたしのではありません (iie, watashi no dewa arimasen)",
        "hint": "Menolak kepemilikan: Bukan milik saya (iie, watashi no dewa arimasen)."
      },
      {
        "id": "n5-u9-l4-q2",
        "type": "fill-in-the-blank",
        "questionText": "Anda ingin mengembalikan tas tertinggal ke Guru: \"先生、これは先生の ___ ですか。\"",
        "options": ["かばん (tas)", "ほん (buku)", "かさ (payung)", "かぎ (kunci)"],
        "answer": "かばん (tas)",
        "hint": "Tas dalam bahasa Jepang adalah kaban."
      },
      {
        "id": "n5-u9-l4-q3",
        "type": "listening",
        "questionText": "Dengarkan audio percakapan berikut and pilih arti benda yang dimaksud!",
        "audioText": "これはだれのかばんですか。わたしのです。",
        "options": ["Tas", "Buku", "Payung", "Kunci"],
        "answer": "Tas",
        "hint": "Kaban berarti tas."
      },
      {
        "id": "n5-u9-l4-q4",
        "type": "sentence-builder",
        "questionText": "Susun kalimat dialog: \"Ini adalah tas milik Guru.\"",
        "options": ["これ", "は", "先生", "の", "かばん", "です"],
        "answer": "これ は 先生 の かばん です",
        "hint": "Kore + wa + sensei + no + kaban + desu."
      },
      {
        "id": "n5-u9-l4-q5",
        "type": "typing",
        "questionText": "Ketiklah arti bahasa Indonesia dari kata tanya \"だれ\" (dare):",
        "options": [],
        "answer": "siapa",
        "hint": "Kata tanya orang."
      }
    ]
  },
  {
    "id": "n5-u9-l5",
    "level": "N5",
    "unitId": "n5-u9",
    "unitTitle": "Unit 9: Item Ownership (Particle ~no, Dare no) 🎒",
    "unitDescription": "Master vocabulary for personal belongings, the particle of ownership, and how to ask about the owner of items.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Unit 9 Final Challenge",
    "description": "Test your synthesis ability on the concept of ownership of goods in Japanese.",
    "expReward": 30,
    "icon": "🏆",
    "badge": "Sintesis",
    "questions": [
      {
        "id": "n5-u9-l5-q1",
        "type": "multiple-choice",
        "questionText": "Partikel yang digunakan untuk menyatakan kepemilikan benda adalah:",
        "options": ["の (no)", "を (wo)", "は (wa)", "に (ni)"],
        "answer": "の (no)",
        "hint": "Partikel no."
      },
      {
        "id": "n5-u9-l5-q2",
        "type": "multiple-choice",
        "questionText": "Payung dalam bahasa Jepang disebut:",
        "options": ["かさ (kasa)", "かばん (kaban)", "ほん (hon)", "スマホ (sumaho)"],
        "answer": "かさ (kasa)",
        "hint": "Benda pelindung hujan dibaca kasa."
      },
      {
        "id": "n5-u9-l5-q3",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang kalimat: \"Tas ini milik Budi\": \n「このかばんはブディさん ___ です。」",
        "options": ["の (no)", "は (wa)", "が (ga)", "を (wo)"],
        "answer": "の (no)",
        "hint": "Partikel kepemilikan."
      },
      {
        "id": "n5-u9-l5-q4",
        "type": "multiple-choice",
        "questionText": "Apakah arti dari Kanji \"本\"?",
        "options": ["Buku", "Teman", "Mobil", "Stasiun"],
        "answer": "Buku",
        "hint": "Dibaca hon."
      },
      {
        "id": "n5-u9-l5-q5",
        "type": "multiple-choice",
        "questionText": "Apakah arti dari Kanji gabungan \"先生\"?",
        "options": ["Guru", "Murid", "Teman", "Keluarga"],
        "answer": "Guru",
        "hint": "Dibaca sensei."
      },
      {
        "id": "n5-u9-l5-q6",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Ini adalah tas milik saya.\"",
        "options": ["これ", "は", "わたし", "の", "かばん", "です"],
        "answer": "これ は わたし の かばん です",
        "hint": "Kore + wa + watashi + no + kaban + desu."
      },
      {
        "id": "n5-u9-l5-q7",
        "type": "listening",
        "questionText": "Dengarkan audio dan pilihlah terjemahan yang tepat!",
        "audioText": "これは先生のスマホです",
        "options": ["Ini ponsel milik Guru", "Ini buku milik Guru", "Apakah ini ponsel Guru?", "Ini ponsel milik saya"],
        "answer": "Ini ponsel milik Guru",
        "hint": "Kore wa + sensei no + sumaho desu."
      },
      {
        "id": "n5-u9-l5-q8",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang tanya pemilik berikut: \n「それは ___ のですか。(Itu milik siapa?)」",
        "options": ["だれ (dare)", "なん (nan)", "どこ (doko)", "いつ (itsu)"],
        "answer": "だれ (dare)",
        "hint": "Dare berarti siapa."
      },
      {
        "id": "n5-u9-l5-q9",
        "type": "sentence-builder",
        "questionText": "Susun kalimat: \"Payung ini milik Guru.\"",
        "options": ["この", "かさ", "は", "先生の", "です"],
        "answer": "この かさ は 先生の です",
        "hint": "Kono kasa wa + sensei no + desu (benda ditiadakan karena dipindah ke depan)."
      },
      {
        "id": "n5-u9-l5-q10",
        "type": "typing",
        "questionText": "Ketiklah arti bahasa Indonesia dari kata benda \"かばん\" (kaban):",
        "options": [],
        "answer": "tas",
        "hint": "Tempat membawa buku."
      }
    ]
  },

  // ==========================================
  // UNIT 10: MENGAJAK BERWISATA (~NI IKIMASU, ~MASHOU) 🗼
  // ==========================================
  {
    "id": "n5-u10-l1",
    "level": "N5",
    "unitId": "n5-u10",
    "unitTitle": "Unit 10: Inviting Someone to Travel (~ni ikimasu, ~mashou) 🗼",
    "unitDescription": "Master vocabulary for nature/city tourist attractions, inviting someone, and stating travel to a destination.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Tourist Places & Invitation Vocabulary",
    "description": "Kuasai kata benda alam/wisata: umi (laut), yama (gunung), kouen (taman), matsuri, dan issho ni.",
    "expReward": 20,
    "icon": "🗼",
    "badge": "Kosakata",
    "questions": [
      {
        "id": "n5-u10-l1-q1",
        "type": "multiple-choice",
        "questionText": "Kosakata wisata alam \"海\" (umi) memiliki arti:",
        "options": ["Laut / Pantai", "Gunung", "Sungai", "Taman"],
        "answer": "Laut / Pantai",
        "hint": "Tempat berair asin yang luas, dibaca umi."
      },
      {
        "id": "n5-u10-l1-q2",
        "type": "typing",
        "questionText": "Ketiklah sebutan \"Taman Kota\" dalam huruf Hiragana:",
        "options": [],
        "answer": "kouen",
        "hint": "Kouen -> こうえん."
      },
      {
        "id": "n5-u10-l1-q3",
        "type": "listening",
        "questionText": "Dengarkan audio berikut and pilihlah terjemahan festival yang tepat!",
        "audioText": "まつり",
        "options": ["Festival / Perayaan", "Liburan", "Taman", "Keramaian"],
        "answer": "Festival / Perayaan",
        "hint": "Perayaan festival tradisional Jepang dibaca matsuri."
      },
      {
        "id": "n5-u10-l1-q4",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang kata keterangan \"bersama-sama\" berikut: \n「___ に行きましょう。(Ayo pergi bersama-sama.)」",
        "options": ["いっしょ (issho)", "いつも (itsumo)", "とても (totemo)", "ゆっくり (yukkuri)"],
        "answer": "いっしょ (issho)",
        "hint": "Issho ni berarti bersama-sama."
      },
      {
        "id": "n5-u10-l1-q5",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Pergi ke taman.\"",
        "options": ["こうえん", "へ", "いきます"],
        "answer": "こうえん へ いきます",
        "hint": "Kouen + partikel arah he + ikimasu."
      }
    ]
  },
  {
    "id": "n5-u10-l2",
    "level": "N5",
    "unitId": "n5-u10",
    "unitTitle": "Unit 10: Inviting Someone to Travel (~ni ikimasu, ~mashou) 🗼",
    "unitDescription": "Master vocabulary for nature/city tourist attractions, inviting someone, and stating travel to a destination.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Kanji Nature & Travel Movements",
    "description": "Kuasai Kanji 山 (gunung), 川 (sungai), dan 行 (pergi).",
    "expReward": 20,
    "icon": "⛰️",
    "badge": "Kanji",
    "questions": [
      {
        "id": "n5-u10-l2-q1",
        "type": "multiple-choice",
        "questionText": "Manakah cara baca kunyomi yang tepat untuk Kanji gunung \"山\"?",
        "options": ["やま (yama)", "かわ (kawa)", "うみ (umi)", "いけ (ike)"],
        "answer": "やま (yama)",
        "hint": "Gunung dibaca yama."
      },
      {
        "id": "n5-u10-l2-q2",
        "type": "multiple-choice",
        "questionText": "Manakah cara baca kunyomi yang tepat untuk Kanji sungai \"川\"?",
        "options": ["かわ (kawa)", "やま (yama)", "うみ (umi)", "もり (mori)"],
        "answer": "かわ (kawa)",
        "hint": "Aliran air alami dibaca kawa."
      },
      {
        "id": "n5-u10-l2-q3",
        "type": "listening",
        "questionText": "Dengarkan pelafalan audio Kanji alam berikut and pilih artinya!",
        "audioText": "やま",
        "options": ["Gunung", "Sungai", "Laut", "Danau"],
        "answer": "Gunung",
        "hint": "Yama berarti gunung."
      },
      {
        "id": "n5-u10-l2-q4",
        "type": "typing",
        "questionText": "Ketik cara baca Hiragana Kanji pergi berikut: Kyotoへ行きます",
        "options": [],
        "answer": "きょうとへいきます",
        "hint": "Kyoto + he + ikimasu."
      },
      {
        "id": "n5-u10-l2-q5",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Pergi ke gunung Fuji.\"",
        "options": ["富士山", "へ", "行きます"],
        "answer": "富士山 へ 行きます",
        "hint": "Fujisan + he + ikimasu."
      }
    ]
  },
  {
    "id": "n5-u10-l3",
    "level": "N5",
    "unitId": "n5-u10",
    "unitTitle": "Unit 10: Inviting Someone to Travel (~ni ikimasu, ~mashou) 🗼",
    "unitDescription": "Master vocabulary for nature/city tourist attractions, inviting someone, and stating travel to a destination.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Grammar Invitation ~mashou",
    "description": "Learn polite invitation patterns ~mashou (let's) and invitation question pattern ~masen ka.",
    "expReward": 20,
    "icon": "📝",
    "badge": "Tata Bahasa",
    "questions": [
      {
        "id": "n5-u10-l3-q1",
        "type": "multiple-choice",
        "questionText": "Bentuk ajakan sopan \"Ayo makan\" diubah dari kata \"たべます\" (tabemasu) menjadi:",
        "options": ["たべましょう (tabemashou)", "たべますか (tabemasu ka)", "たべましょうか (tabemashou ka)", "たべません (tabemasen)"],
        "answer": "たべましょう (tabemashou)",
        "hint": "Hilangkan 'masu' lalu tambahkan 'mashou' untuk menyatakan ayo."
      },
      {
        "id": "n5-u10-l3-q2",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang kalimat ajakan bersahabat: \"Bagaimana kalau pergi ke laut bersama?\": \n「いっしょに海へ行き ___ か。」",
        "options": ["ません (masen)", "ます (masu)", "ましょう (mashou)", "たい (tai)"],
        "answer": "ません (masen)",
        "hint": "Pola '~masen ka' digunakan untuk mengajak seseorang secara sopan dan memberikan ruang menolak."
      },
      {
        "id": "n5-u10-l3-q3",
        "type": "listening",
        "questionText": "Dengarkan pelafalan kalimat berikut and pilih artinya!",
        "audioText": "いっしょにいきましょう",
        "options": ["Ayo pergi bersama-sama", "Mau pergi ke mana?", "Apakah Anda pergi bersama?", "Saya tidak ingin pergi bersama"],
        "answer": "Ayo pergi bersama-sama",
        "hint": "Issho ni (bersama) + ikimashou (ayo pergi)."
      },
      {
        "id": "n5-u10-l3-q4",
        "type": "sentence-builder",
        "questionText": "Susun kalimat: \"Ayo makan sushi di restoran.\"",
        "options": ["すし", "を", "たべましょう"],
        "answer": "すし を たべましょう",
        "hint": "Sushi + wo + tabemashou."
      },
      {
        "id": "n5-u10-l3-q5",
        "type": "typing",
        "questionText": "Ketiklah bentuk ajakan dari kata kerja \"いきます\" (pergi -> ayo pergi):",
        "options": [],
        "answer": "いきましょう",
        "hint": "Hilangkan masu tambah mashou."
      }
    ]
  },
  {
    "id": "n5-u10-l4",
    "level": "N5",
    "unitId": "n5-u10",
    "unitTitle": "Unit 10: Inviting Someone to Travel (~ni ikimasu, ~mashou) 🗼",
    "unitDescription": "Master vocabulary for nature/city tourist attractions, inviting someone, and stating travel to a destination.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Vacation Plans App",
    "description": "Practice dialogue making plans to travel to Kyoto or watch the matsuri summer festival.",
    "expReward": 20,
    "icon": "🗣️",
    "badge": "Percakapan",
    "questions": [
      {
        "id": "n5-u10-l4-q1",
        "type": "multiple-choice",
        "questionText": "Teman Anda mengajak: \"いっしょに京都へ行きませんか。\" Anda setuju dan menjawab \"Ya, ayo pergi.\" Kalimat manakah yang paling tepat?",
        "options": ["ええ、行きましょう (ee, ikimashou)", "いいえ、行きません (iie, ikimasen)", "はい、どうぞ (hai, douzo)", "すみません、どこですか (sumimasen, doko desu ka)"],
        "answer": "ええ、行きましょう (ee, ikimashou)",
        "hint": "Ee (ya) + ikimashou (ayo pergi) adalah cara menyetujui ajakan."
      },
      {
        "id": "n5-u10-l4-q2",
        "type": "fill-in-the-blank",
        "questionText": "Anda ingin mengajak melihat festival kembang api matsuri: \"いっしょにまつりへ ___ か。」",
        "options": ["行きませんか", "行きます", "行きましょう", "行きたいです"],
        "answer": "行きませんか",
        "hint": "Gunakan bentuk '~masen ka' untuk kalimat ajakan tanya."
      },
      {
        "id": "n5-u10-l4-q3",
        "type": "listening",
        "questionText": "Dengarkan audio percakapan berikut and tentukan destinasi yang diajak!",
        "audioText": "うみへいきましょう。ええ、いきましょう。",
        "options": ["Laut / Pantai", "Gunung", "Taman Kota", "Kuil Kyoto"],
        "answer": "Laut / Pantai",
        "hint": "Umi berarti laut."
      },
      {
        "id": "n5-u10-l4-q4",
        "type": "sentence-builder",
        "questionText": "Susun kalimat dialog: \"Ayo pergi bersama-sama.\"",
        "options": ["いっしょ", "に", "行きましょう"],
        "answer": "いっしょ に 行きましょう",
        "hint": "Issho ni + ikimashou."
      },
      {
        "id": "n5-u10-l4-q5",
        "type": "typing",
        "questionText": "Ketiklah arti bahasa Indonesia dari persetujuan ajakan \"ええ、行きましょう\":",
        "options": [],
        "answer": "ya ayo pergi",
        "hint": "Atau \"baiklah, ayo pergi\"."
      }
    ]
  },
  {
    "id": "n5-u10-l5",
    "level": "N5",
    "unitId": "n5-u10",
    "unitTitle": "Unit 10: Inviting Someone to Travel (~ni ikimasu, ~mashou) 🗼",
    "unitDescription": "Master vocabulary for nature/city tourist attractions, inviting someone, and stating travel to a destination.",
    "unitColor": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    "title": "Unit 1 Final Challenge0",
    "description": "Test your competence in discussing plans and inviting someone to vacation together.",
    "expReward": 30,
    "icon": "🏆",
    "badge": "Sintesis",
    "questions": [
      {
        "id": "n5-u10-l5-q1",
        "type": "multiple-choice",
        "questionText": "Kata kerja \"Ayo pergi\" dalam ragam ajakan sopan adalah:",
        "options": ["いきましょう (ikimashou)", "いきますか (ikimasu ka)", "いきました (ikimashita)", "いきたいです (ikitai desu)"],
        "answer": "いきましょう (ikimashou)",
        "hint": "Ikimashou."
      },
      {
        "id": "n5-u10-l5-q2",
        "type": "multiple-choice",
        "questionText": "Festival musim panas dalam bahasa Jepang dinamakan:",
        "options": ["まつり (matsuri)", "うみ (umi)", "やま (yama)", "こうえん (kouen)"],
        "answer": "まつり (matsuri)",
        "hint": "Matsuri."
      },
      {
        "id": "n5-u10-l5-q3",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang kalimat: \"Ayo minum teh bersama\": \n「いっしょにお茶を ___ 。」",
        "options": ["のみましょう (nomimashou)", "のみます (nomimasu)", "のみたい (nomitai)", "のみません (nomimasen)"],
        "answer": "のみましょう (nomimashou)",
        "hint": "Bentuk ajakan untuk kata kerja minum."
      },
      {
        "id": "n5-u10-l5-q4",
        "type": "multiple-choice",
        "questionText": "Apakah arti kunyomi dari karakter Kanji \"山\"?",
        "options": ["Gunung", "Sungai", "Laut", "Taman"],
        "answer": "Gunung",
        "hint": "Dibaca yama."
      },
      {
        "id": "n5-u10-l5-q5",
        "type": "multiple-choice",
        "questionText": "Apakah arti kunyomi dari karakter Kanji \"川\"?",
        "options": ["Sungai", "Gunung", "Danau", "Laut"],
        "answer": "Sungai",
        "hint": "Dibaca kawa."
      },
      {
        "id": "n5-u10-l5-q6",
        "type": "sentence-builder",
        "questionText": "Susun kalimat berikut: \"Ayo pergi ke taman kota.\"",
        "options": ["こうえん", "へ", "行きましょう"],
        "answer": "こうえん へ 行きましょう",
        "hint": "Kouen + he + ikimashou."
      },
      {
        "id": "n5-u10-l5-q7",
        "type": "listening",
        "questionText": "Dengarkan audio dan pilihlah tujuan wisata yang diucapkan!",
        "audioText": "いっしょにうみへいきませんか",
        "options": ["Mengajak pergi ke laut", "Mengajak pergi ke gunung", "Pergi ke taman sendirian", "Ayo pulang ke rumah"],
        "answer": "Mengajak pergi ke laut",
        "hint": "Issho ni umi he ikimasen ka."
      },
      {
        "id": "n5-u10-l5-q8",
        "type": "fill-in-the-blank",
        "questionText": "Lengkapi rumpang dialog ajakan berikut: \nA: 「いっしょに山へ行きませんか。」\nB: 「ええ、___。」",
        "options": ["行きましょう", "行きます", "どうぞ", "こんにちは"],
        "answer": "行きましょう",
        "hint": "Ee, ikimashou."
      },
      {
        "id": "n5-u10-l5-q9",
        "type": "sentence-builder",
        "questionText": "Susun kalimat: \"Ayo pergi ke Kyoto bersama-sama.\"",
        "options": ["いっしょ", "に", "京都", "へ", "行きましょう"],
        "answer": "いっしょ に 京都 へ 行きましょう",
        "hint": "Issho ni + Kyoto + he + ikimashou."
      },
      {
        "id": "n5-u10-l5-q10",
        "type": "typing",
        "questionText": "Ketiklah arti bahasa Indonesia dari kata benda \"こうえん\" (kouen):",
        "options": [],
        "answer": "taman",
        "hint": "Tempat bersantai publik yang asri."
      }
    ]
  },

  // ==========================================
  // JLPT N4: ELEMENTARY GRAMMAR & CONJUGATION
  // ==========================================
  {id: 'n4-u1-l1',
    level: 'N4',
    unitId: 'n4-u1',
    unitTitle: 'Unit 11: Directions, Desires & Life 🗺️',
    unitDescription: 'Master vocabulary for navigation, personal desires, and N4 casual expressions.',
    unitColor: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    title: 'Asking for Directions & Locations',
    description: 'Learn how to navigate and ask for the position of public places in Japan.',
    expReward: 25,
    icon: '🗺️',
    badge: 'Tanya Jawab',
    questions: [
      {
        id: 'n4-u1-l1-q1',
        type: 'multiple-choice',
        questionText: 'Kosakata "えき" (eki) memiliki arti:',
        options: ['Bandara', 'Stasiun', 'Taman', 'Rumah Sakit'],
        answer: 'Stasiun',
        hint: 'Tempat kereta api berhenti dan berangkat.'
      },
      {
        id: 'n4-u1-l1-q2',
        type: 'listening',
        questionText: 'Dengarkan audio dan pilihlah kata tanya lokasi yang tepat!',
        audioText: 'どこ',
        options: ['だれ', 'どこ', 'いつ', 'なに'],
        answer: 'どこ',
        hint: 'Kata tanya untuk menanyakan tempat ("Di mana").'
      },
      {
        id: 'n4-u1-l1-q3',
        type: 'sentence-builder',
        questionText: 'Susun kalimat tanya: "Stasiun ada di mana?"',
        options: ['えき', 'は', 'どこ', 'です', 'か', 'に'],
        answer: 'えき は どこ です か',
        hint: 'Topik (eki wa) + Tanya (doko) + Copula tanya (desu ka).'
      },
      {
        id: 'n4-u1-l1-q4',
        type: 'fill-in-the-blank',
        questionText: 'Lengkapi partikel subjek penanda keberadaan: "トイレ___あります。"',
        options: ['は', 'が', 'を', 'に'],
        answer: 'が',
        hint: 'Menggunakan kata "arimasu", partikel subjek di depan biasanya menggunakan "ga" (が).'
      },
      {
        id: 'n4-u1-l1-q5',
        type: 'typing',
        questionText: 'Ketik arti bahasa Jepang dari kata penunjuk "Di sana (jauh dari pembicara & lawan bicara)" dalam Hiragana:',
        options: [],
        answer: 'あそこ',
        hint: 'Koko (sini), soko (situ), ... (sana).'
      }
    ]
  },
  {
    id: 'n4-u1-l2',
    level: 'N4',
    unitId: 'n4-u1',
    unitTitle: 'Unit 11: Directions, Desires & Life 🗺️',
    unitDescription: 'Master vocabulary for navigation, personal desires, and N4 casual expressions.',
    unitColor: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    title: 'Expressing Desires (~tai)',
    description: 'Learn how to express what you want to do using the ~tai grammar pattern.',
    expReward: 25,
    icon: '💭',
    badge: 'Tata Bahasa',
    questions: [
      {
        id: 'n4-u1-l2-q1',
        type: 'multiple-choice',
        questionText: 'Bagaimana cara mengubah kata kerja "たべます" (tabemono/makan) menjadi "ingin makan"?',
        options: ['たべたい', 'たべた', 'たべるそう', 'たべます'],
        answer: 'たべたい',
        hint: 'Hilangkan akhiran "masu" lalu tambahkan akhiran "tai".'
      },
      {
        id: 'n4-u1-l2-q2',
        type: 'listening',
        questionText: 'Dengarkan kalimat berikut dan pilihlah artinya!',
        audioText: '日本に行きたいです',
        options: ['Saya ingin pergi ke Jepang', 'Saya sudah pergi ke Jepang', 'Saya tidak mau pergi ke Jepang', 'Saya suka Jepang'],
        answer: 'Saya ingin pergi ke Jepang',
        hint: 'Nihon (Jepang) + ni (ke) + ikitai (ingin pergi) + desu.'
      },
      {
        id: 'n4-u1-l2-q3',
        type: 'fill-in-the-blank',
        questionText: 'Lengkapi dengan bentuk ~tai dari kata kerja "のむ" (minum): "みずを___です。"',
        options: ['のみたい', 'のむたい', 'のみたい', 'のまたい'],
        answer: 'のみたい',
        hint: 'Nomu -> stem-masu nya adalah nomi, gabung dengan tai menjadi "nomitai".'
      },
      {
        id: 'n4-u1-l2-q4',
        type: 'sentence-builder',
        questionText: 'Susun kalimat: "Saya ingin makan sushi."',
        options: ['すし', 'が', 'たべたい', 'です', 'を', 'のみたい'],
        answer: 'すし が たべたい です',
        hint: 'Pada pola ~tai, partikel "o" sering digantikan oleh "ga" untuk memberikan penekanan objek keinginan.'
      },
      {
        id: 'n4-u1-l2-q5',
        type: 'typing',
        questionText: 'Ketik lawan kata dari "Ikitai" (Ingin pergi) yaitu "Tidak ingin pergi" (Ikitakunai) dalam Hiragana:',
        options: [],
        answer: 'いきたくない',
        hint: 'Ikitai -> ubah "i" terakhir menjadi "kunai".'
      }
    ]
  },
  {
    id: 'n4-u2-l1',
    level: 'N4',
    unitId: 'n4-u2',
    unitTitle: 'Unit 12: Past Activities & Future Plans 📅',
    unitDescription: 'Learn how to talk about the past and formulate future plans.',
    unitColor: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    title: 'The Past (~ta form)',
    description: 'Use the informal past tense (~ta) to tell history or past events.',
    expReward: 25,
    icon: '⏳',
    badge: 'Konjugasi',
    questions: [
      {
        id: 'n4-u2-l1-q1',
        type: 'multiple-choice',
        questionText: 'Apa bentuk lampau informal (~ta form) dari kata kerja "かう" (membeli)?',
        options: ['かった', 'かいた', 'かったり', 'かいます'],
        answer: 'かった',
        hint: 'Kata kerja berakhiran -u, -tsu, -ru berubah menjadi -tta.'
      },
      {
        id: 'n4-u2-l1-q2',
        type: 'listening',
        questionText: 'Dengarkan kalimat ini dan tentukan maknanya!',
        audioText: '昨日テレビを見た',
        options: ['Kemarin melihat televisi', 'Besok mau nonton televisi', 'Sekarang sedang nonton tv', 'Tidak suka tv'],
        answer: 'Kemarin melihat televisi',
        hint: 'Kinoo (kemarin) + terebi (TV) + o (objek) + mita (sudah melihat).'
      },
      {
        id: 'n4-u2-l1-q3',
        type: 'sentence-builder',
        questionText: 'Susun kalimat: "Sudah makan roti."',
        options: ['パン', 'を', 'たべた', 'のみた', 'ごはん'],
        answer: 'パン を たべた',
        hint: 'Pan + wo + tabeta (bentuk lampau dari taberu).'
      },
      {
        id: 'n4-u2-l1-q4',
        type: 'fill-in-the-blank',
        questionText: 'Lengkapi kalimat pengandaian: "雨が___たら、行きません。"',
        options: ['ふる', 'ふっ', 'ふり', 'ふれ'],
        answer: 'ふっ',
        hint: 'Menggunakan pola pengandaian ~tara: bentuk lampau "futta" + "ra" -> "futtara".'
      },
      {
        id: 'n4-u2-l1-q5',
        type: 'typing',
        questionText: 'Ketik bentuk lampau (~ta form) dari kata kerja "する" (melakukan) dalam Hiragana:',
        options: [],
        answer: 'した',
        hint: 'Suru berubah menjadi "shita".'
      }
    ]
  },

  // ==========================================
  // JLPT N3: INTERMEDIATE GRAMMAR & SPEECH
  // ==========================================
  {
    id: 'n3-u1-l1',
    level: 'N3',
    unitId: 'n3-u1',
    unitTitle: 'Unit 13: Speculation & N3 Conversational Language 🔄',
    unitDescription: 'Master expressions of speculation, advanced conditionals, and formal polite language.',
    unitColor: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
    title: 'Appearance & Hearsay (~sou)',
    description: 'Bedakan penggunaan pola ~sou yang menyatakan "kelihatannya" vs "katanya".',
    expReward: 30,
    icon: '🔄',
    badge: 'Tata Bahasa N3',
    questions: [
      {
        id: 'n3-u1-l1-q1',
        type: 'multiple-choice',
        questionText: 'Ungkapan "おいしそう" (oishisou) memiliki arti:',
        options: ['Katanya enak', 'Kelihatannya enak', 'Sangat enak', 'Tidak enak'],
        answer: 'Kelihatannya enak',
        hint: 'Mengubah kata sifat-i "oishii" dengan membuang "i" lalu ditambah "sou".'
      },
      {
        id: 'n3-u1-l1-q2',
        type: 'listening',
        questionText: 'Dengarkan kalimat ini dan tentukan arti gramatikanya!',
        audioText: '雨が降りそうです',
        options: ['Kelihatannya akan turun hujan', 'Hujan sudah turun deras', 'Hujan jarang turun di sini', 'Saya tidak suka hujan'],
        answer: 'Kelihatannya akan turun hujan',
        hint: 'Ame (hujan) + ga + furisou (kelihatannya akan turun).'
      },
      {
        id: 'n3-u1-l1-q3',
        type: 'fill-in-the-blank',
        questionText: 'Pilih akhiran yang tepat untuk menyatakan "katanya besok cerah": "明日は晴れる___です。"',
        options: ['そう', 'らしい', 'みたい', 'はず'],
        answer: 'そう',
        hint: 'Bentuk kamus + "sou desu" menyatakan kabar angin / perkataan orang lain ("katanya").'
      },
      {
        id: 'n3-u1-l1-q4',
        type: 'sentence-builder',
        questionText: 'Susun kalimat: "Katanya dia (laki-laki) akan datang."',
        options: ['かれ', 'は', 'くる', 'そう', 'です', 'おいしい'],
        answer: 'かれ は くる そう です',
        hint: 'Kare (dia lk) + wa + kuru (datang - kamus) + sou desu (katanya).'
      },
      {
        id: 'n3-u1-l1-q5',
        type: 'typing',
        questionText: 'Ketik dalam Hiragana padanan kata sifat "Kelihatannya sehat/praktis" dari kata dasar "Genki" (sehat):',
        options: [],
        answer: 'げんきそう',
        hint: 'Kata sifat-na langsung ditambahkan "sou" -> genkisou.'
      }
    ]
  },
  {
    id: 'n3-u1-l2',
    level: 'N3',
    unitId: 'n3-u1',
    unitTitle: 'Unit 13: Speculation & N3 Conversational Language 🔄',
    unitDescription: 'Master expressions of speculation, advanced conditionals, and formal polite language.',
    unitColor: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
    title: 'Basic Polite Language (Keigo)',
    description: 'Understand the division of honorific language Sonkeigo and humble language Keigo.',
    expReward: 30,
    icon: '👔',
    badge: 'Keigo',
    questions: [
      {
        id: 'n3-u1-l2-q1',
        type: 'multiple-choice',
        questionText: 'Manakah kosakata Kenjougo (merendah) yang digunakan untuk menggantikan kata "いきます" (pergi)?',
        options: ['まいります', 'いらっしゃいます', 'めしあがります', 'おっしゃいます'],
        answer: 'まいります',
        hint: 'Mairimasu digunakan saat merendahkan diri sendiri di depan atasan/klien.'
      },
      {
        id: 'n3-u1-l2-q2',
        type: 'listening',
        questionText: 'Dengarkan kalimat hormat ini dan tentukan maknanya!',
        audioText: '何をお召し上がりになりますか',
        options: ['Anda mau makan/minum apa?', 'Kapan Anda akan datang?', 'Di mana rumah Anda?', 'Apa nama proyek Anda?'],
        answer: 'Anda mau makan/minum apa?',
        hint: 'Nani (apa) + o + meshiagari ni narimasu ka (bentuk hormat makan/minum).'
      },
      {
        id: 'n3-u1-l2-q3',
        type: 'fill-in-the-blank',
        questionText: 'Lengkapi sapaan resepsionis: "いらっしゃい___。"',
        options: ['ます', 'ませ', 'です', 'ください'],
        answer: 'ませ',
        hint: 'Sapaan selamat datang standar di toko/restoran Jepang: "Iraisshaimase".'
      },
      {
        id: 'n3-u1-l2-q4',
        type: 'sentence-builder',
        questionText: 'Susun kalimat merendah: "Saya Tanaka (yang bernama Tanaka)."',
        options: ['たなか', 'と', 'もうします', 'おっしゃいます', 'わたし', 'は'],
        answer: 'たなか と もうします',
        hint: 'Nama + to + moushimasu (bentuk Kenjougo dari iu/berkata).'
      },
      {
        id: 'n3-u1-l2-q5',
        type: 'typing',
        questionText: 'Ketik padanan Sonkeigo (hormat) untuk kata kerja "いう" (berkata) dalam Hiragana:',
        options: [],
        answer: 'おっしゃる',
        hint: 'Mengatakan dalam bentuk kamus hormat (Oshiyaru -> oosshaimasu).'
      }
    ]
  },

  // ==========================================
  // JLPT N2: PRE-ADVANCED & SPECIALIZED THEMES
  // ==========================================
  {
    id: 'n2-u1-l1',
    level: 'N2',
    unitId: 'n2-u1',
    unitTitle: 'Unit 14: Nuances of Formal & Business Writing 💼',
    unitDescription: 'Master particle usage in articles, opinions, and N2 complex grammatical relations.',
    unitColor: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    title: 'About & Based On (~ni tsuite)',
    description: 'Use formal writing particles like ~ni tsuite and ~ni oite with precision.',
    expReward: 40,
    icon: '💼',
    badge: 'Grammar N2',
    questions: [
      {
        id: 'n2-u1-l1-q1',
        type: 'multiple-choice',
        questionText: 'Tata bahasa "~について" (~ni tsuite) memiliki fungsi utama untuk:',
        options: ['Menjelaskan perbandingan', 'Menyatakan topik pembicaraan/tentang', 'Menunjukkan durasi waktu', 'Menyatakan sebab-akibat'],
        answer: 'Menyatakan topik pembicaraan/tentang',
        hint: 'Sering diterjemahkan sebagai "mengenai" atau "tentang".'
      },
      {
        id: 'n2-u1-l1-q2',
        type: 'listening',
        questionText: 'Dengarkan kalimat akademik berikut dan pilih artinya!',
        audioText: 'この問題について考えます',
        options: ['Saya akan memikirkan tentang masalah ini', 'Masalah ini sudah selesai dipecahkan', 'Jangan memikirkan masalah tersebut', 'Masalah ini tidak penting'],
        answer: 'Saya akan memikirkan tentang masalah ini',
        hint: 'Kono mondai (masalah ini) + ni tsuite (tentang) + kangaemasu (memikirkan).'
      },
      {
        id: 'n2-u1-l1-q3',
        type: 'fill-in-the-blank',
        questionText: 'Lengkapi partikel penanda tempat formal N2 (di/pada): "東京___オリンピックが行われた。"',
        options: ['において', 'について', 'にとって', 'として'],
        answer: 'において',
        hint: '~ni oite adalah bentuk formal/tertulis dari partikel "de" (di/pada).'
      },
      {
        id: 'n2-u1-l1-q4',
        type: 'sentence-builder',
        questionText: 'Susun kalimat formal: "Rapat diadakan di perusahaan."',
        options: ['かいしゃ', 'において', 'かいぎ', 'が', 'おこなわれる', 'について'],
        answer: 'かいしゃ において かいぎ が おこなわれる',
        hint: 'Tempat (kaisha ni oite) + Subjek (kaigi ga) + diadakan (okonawareru).'
      },
      {
        id: 'n2-u1-l1-q5',
        type: 'typing',
        questionText: 'Ketik cara baca Kanji berikut dalam Hiragana: 会議',
        options: [],
        answer: 'かいぎ',
        hint: 'Ejaan Romajinya "kaigi" (rapat/pertemuan).'
      }
    ]
  },

  // ==========================================
  // JLPT N1: ADVANCED MASTERY & ABSTRACT CONCEPTS
  // ==========================================
  {
    id: 'n1-u1-l1',
    level: 'N1',
    unitId: 'n1-u1',
    unitTitle: 'Unit 15: Classical Literature & Abstract Concepts 🎓',
    unitDescription: 'Master archaic expressions, advanced literary structures, and N1 proverbs.',
    unitColor: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
    title: 'Final Limit Pattern (~wo motte)',
    description: 'Understand the use of Japan\'s highest literary writing styles to end events.',
    expReward: 50,
    icon: '🎓',
    badge: 'Mastery N1',
    questions: [
      {
        id: 'n1-u1-l1-q1',
        type: 'multiple-choice',
        questionText: 'Pola kalimat N1 "~をもって" (~wo motte) saat mengakhiri suatu kegiatan memiliki arti:',
        options: ['Dengan menggunakan / dengan ini', 'Karena alasan darurat', 'Segera setelah', 'Hanya terbatas pada'],
        answer: 'Dengan menggunakan / dengan ini',
        hint: 'Menyatakan batas waktu formal ("Dengan ini, [kegiatan] dinyatakan berakhir").'
      },
      {
        id: 'n1-u1-l1-q2',
        type: 'listening',
        questionText: 'Dengarkan kalimat pengumuman resmi berikut dan tentukan maknanya!',
        audioText: '本日をもって閉店いたします',
        options: ['Dengan ini toko tutup per hari ini', 'Toko akan dibuka besok hari', 'Toko kami mengalami kebakaran hari ini', 'Kami akan merenovasi toko segera'],
        answer: 'Dengan ini toko tutup per hari ini',
        hint: 'Honjitsu (hari ini) + wo motte (dengan/batas) + heiten itashimasu (tutup toko).'
      },
      {
        id: 'n1-u1-l1-q3',
        type: 'fill-in-the-blank',
        questionText: 'Pilih partikel sastra N1 pilihan alternatif: "行く___行かない___、返事をしてください。"',
        options: ['なり / なり', 'とか / とか', 'だの / だo', 'つつ / つつ'],
        answer: 'なり / なり',
        hint: '~nari ~nari berarti "apakah... atau..." (pilihlah salah satu untuk melakukan tindakan).'
      },
      {
        id: 'n1-u1-l1-q4',
        type: 'sentence-builder',
        questionText: 'Susun kalimat N1: "Apabila ada keluhan, silakan hubungi kami."',
        options: ['質問', 'なり', '意見', 'なり', '連絡', 'してください'],
        answer: '質問 なり 意見 なり 連絡 してください',
        hint: 'Shitsumon (pertanyaan) nari + iken (opini) nari + renraku shite kudasai.'
      },
      {
        id: 'n1-u1-l1-q5',
        type: 'typing',
        questionText: 'Ketik dalam Hiragana cara membaca kata kebajikan formal "謙遜" (Rendah Hati):',
        options: [],
        answer: 'けんそん',
        hint: 'Ejaan Romaji-nya adalah "kenson".'
      }
    ]
  }
];
