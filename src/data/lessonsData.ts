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
  {
    id: 'n5-u1-l1',
    level: 'N5',
    unitId: 'n5-u1',
    unitTitle: 'Unit 1: Hiragana & Aisatsu Dasar 🎌',
    unitDescription: 'Kuasai bunyi dasar Hiragana dan sapaan penting sehari-hari',
    unitColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    title: 'Hiragana Vokal Dasar',
    description: 'Pelajari pengucapan dan huruf vokal dasar Jepang: あ, い, う, え, お.',
    expReward: 20,
    icon: '🎌',
    badge: 'Karakter Dasar',
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
    unitTitle: 'Unit 1: Hiragana & Aisatsu Dasar 🎌',
    unitDescription: 'Kuasai bunyi dasar Hiragana dan sapaan penting sehari-hari',
    unitColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    title: 'Sapaan Penting (Aisatsu)',
    description: 'Belajar menyapa orang lain secara sopan dan natural.',
    expReward: 20,
    icon: '🗣️',
    badge: 'Percakapan',
    questions: [
      {
        id: 'n5-u1-l2-q1',
        type: 'multiple-choice',
        questionText: 'Apa arti dari ungkapan "こんにちは" (Konnichiwa)?',
        options: ['Selamat Pagi', 'Selamat Siang / Halo', 'Selamat Malam', 'Sampai Jumpa'],
        answer: 'Selamat Siang / Halo',
        hint: 'Sapaan umum yang diucapkan dari siang hingga sore hari.'
      },
      {
        id: 'n5-u1-l2-q2',
        type: 'listening',
        questionText: 'Dengarkan dan pilihlah arti kata yang diucapkan!',
        audioText: 'ありがとう',
        options: ['Terima kasih', 'Maaf', 'Selamat tinggal', 'Selamat makan'],
        answer: 'Terima kasih',
        hint: 'Ungkapan rasa syukur yang sangat umum (Arigatou).'
      },
      {
        id: 'n5-u1-l2-q3',
        type: 'fill-in-the-blank',
        questionText: 'Lengkapi percakapan: "はじめまして、たなかです。どうぞよろしく___。"',
        options: ['です', 'ます', 'おねがいします', 'わ'],
        answer: 'おねがいします',
        hint: 'Ekspresi lengkap untuk menyatakan senang berkenalan: "douzo yoroshiku onegaishimasu".'
      },
      {
        id: 'n5-u1-l2-q4',
        type: 'sentence-builder',
        questionText: 'Susunlah kalimat perkenalan diri: "Halo, saya Tanaka."',
        options: ['こんにちは', 'わたし', 'は', 'たなか', 'です', 'さようなら'],
        answer: 'こんにちは わたし は たなか です',
        hint: 'Sapaan + Subjek (watashi) + Partikel Topik (wa) + Nama + Copula (desu).'
      },
      {
        id: 'n5-u1-l2-q5',
        type: 'typing',
        questionText: 'Ketik arti bahasa Jepang dari "Selamat Pagi" (dalam Hiragana):',
        options: [],
        answer: 'おはようございます',
        hint: 'Dimulai dengan "oha..." dan diakhiri dengan "...gozaimasu".'
      }
    ]
  },
  {
    id: 'n5-u1-l3',
    level: 'N5',
    unitId: 'n5-u1',
    unitTitle: 'Unit 1: Hiragana & Aisatsu Dasar 🎌',
    unitDescription: 'Kuasai bunyi dasar Hiragana dan sapaan penting sehari-hari',
    unitColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    title: 'Pengenalan Katakana',
    description: 'Pahami cara membaca huruf Katakana untuk kata serapan asing.',
    expReward: 20,
    icon: '☕',
    badge: 'Karakter Asing',
    questions: [
      {
        id: 'n5-u1-l3-q1',
        type: 'multiple-choice',
        questionText: 'Kata serapan "カメラ" (kamera) memiliki arti:',
        options: ['Komputer', 'Televisi', 'Kamera', 'Radio'],
        answer: 'Kamera',
        hint: 'Ucapkan dengan lantang, bunyinya sangat mirip bahasa Indonesia.'
      },
      {
        id: 'n5-u1-l3-q2',
        type: 'listening',
        questionText: 'Dengarkan suara audio ini dan tentukan kata Katakana yang tepat!',
        audioText: 'コーヒー',
        options: ['コヒー', 'コーヒー', 'ケーキ', 'コラ'],
        answer: 'コーヒー',
        hint: 'Minuman hitam berkafein yang diserap dari kata "Coffee" (Koo-hii).'
      },
      {
        id: 'n5-u1-l3-q3',
        type: 'typing',
        questionText: 'Ketik ejaan Romaji untuk negara "Amerika" dalam Katakana berikut: アメリカ',
        options: [],
        answer: 'amerika',
        hint: 'Gunakan huruf kecil semua.'
      },
      {
        id: 'n5-u1-l3-q4',
        type: 'sentence-builder',
        questionText: 'Susunlah kalimat: "Saya minum kopi."',
        options: ['わたし', 'は', 'コーヒー', 'を', 'のみます', 'たべます'],
        answer: 'わたし は コーヒー を のみます',
        hint: 'Subjek + Partikel wa + Objek (koo-hii) + Partikel o (wo) + Kata kerja minum (nomimasu).'
      },
      {
        id: 'n5-u1-l3-q5',
        type: 'multiple-choice',
        questionText: 'Manakah penulisan Katakana yang tepat untuk kata "Roti" (diserap dari bahasa Portugis "Pão")?',
        options: ['パン', 'ペン', 'ピン', 'ポン'],
        answer: 'パン',
        hint: 'Dibaca "pan".'
      }
    ]
  },
  {
    id: 'n5-u2-l1',
    level: 'N5',
    unitId: 'n5-u2',
    unitTitle: 'Unit 2: Kuliner & Kata Kerja Harian 🍱',
    unitDescription: 'Pelajari kosakata makanan dan menyusun kalimat aktivitas sehari-hari',
    unitColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    title: 'Kosakata Makanan (Tabemono)',
    description: 'Belajar kosakata seputar makanan khas Jepang dan barat.',
    expReward: 20,
    icon: '🍱',
    badge: 'Kosakata',
    questions: [
      {
        id: 'n5-u2-l1-q1',
        type: 'multiple-choice',
        questionText: 'Apa arti dari kosakata "すし" (sushi)?',
        options: ['Nasi kepal dengan ikan mentah', 'Mie kuah Jepang', 'Daging panggang', 'Sup kedelai'],
        answer: 'Nasi kepal dengan ikan mentah',
        hint: 'Makanan khas Jepang yang sangat mendunia.'
      },
      {
        id: 'n5-u2-l1-q2',
        type: 'listening',
        questionText: 'Dengarkan audio dan tentukan kosakata makanan apa yang diucapkan!',
        audioText: 'みず',
        options: ['おちゃ', 'みず', 'ごはん', 'にく'],
        answer: 'みず',
        hint: 'Zat cair esensial bebas kalori (Mizu).'
      },
      {
        id: 'n5-u2-l1-q3',
        type: 'fill-in-the-blank',
        questionText: 'Pilih partikel objek yang tepat: "わたしはすし___たべます。"',
        options: ['は', 'が', 'を', 'に'],
        answer: 'を',
        hint: 'Partikel penanda objek penderita kata kerja transitif adalah "wo/o" (を).'
      },
      {
        id: 'n5-u2-l1-q4',
        type: 'sentence-builder',
        questionText: 'Susun kalimat: "Minum air."',
        options: ['みず', 'を', 'のみます', 'たべます', 'おちゃ'],
        answer: 'みず を のみます',
        hint: 'Objek (mizu) + Partikel (wo) + Kata kerja minum (nomimasu).'
      },
      {
        id: 'n5-u2-l1-q5',
        type: 'typing',
        questionText: 'Ketik dalam Hiragana padanan kata "Nasi / Makanan":',
        options: [],
        answer: 'ごはん',
        hint: 'Ejaan Romaji-nya adalah "gohan".'
      }
    ]
  },
  {
    id: 'n5-u2-l2',
    level: 'N5',
    unitId: 'n5-u2',
    unitTitle: 'Unit 2: Kuliner & Kata Kerja Harian 🍱',
    unitDescription: 'Pelajari kosakata makanan dan menyusun kalimat aktivitas sehari-hari',
    unitColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    title: 'Aktivitas Sehari-hari',
    description: 'Gunakan kata kerja aktif golongan sopan (~masu) untuk menceritakan kegiatanmu.',
    expReward: 20,
    icon: '🏃',
    badge: 'Kata Kerja',
    questions: [
      {
        id: 'n5-u2-l2-q1',
        type: 'multiple-choice',
        questionText: 'Kata kerja "よみます" (yomimasu) memiliki arti:',
        options: ['Menulis', 'Membaca', 'Melihat', 'Mendengar'],
        answer: 'Membaca',
        hint: 'Contoh: Membaca buku (hon o yomimasu).'
      },
      {
        id: 'n5-u2-l2-q2',
        type: 'listening',
        questionText: 'Dengarkan audio dan pilih padanan kata kerja bahasa Jepangnya!',
        audioText: 'いきます',
        options: ['きます', 'いきます', 'かえります', 'ねます'],
        answer: 'いきます',
        hint: 'Berpindah tempat menuju suatu tujuan (Ikimasu).'
      },
      {
        id: 'n5-u2-l2-q3',
        type: 'sentence-builder',
        questionText: 'Susunlah kalimat: "Saya membaca buku."',
        options: ['わたし', 'は', 'ほん', 'を', 'よみます', 'かきます'],
        answer: 'わたし は ほん を よみます',
        hint: 'Watashi + wa + hon (buku) + wo + yomimasu.'
      },
      {
        id: 'n5-u2-l2-q4',
        type: 'fill-in-the-blank',
        questionText: 'Lengkapi partikel arah tujuan: "がっこう___いきます。"',
        options: ['を', 'に', 'は', 'が'],
        answer: 'に',
        hint: 'Partikel penanda arah/tujuan pergi adalah "ni" (に) atau "e" (へ).'
      },
      {
        id: 'n5-u2-l2-q5',
        type: 'typing',
        questionText: 'Ketik bentuk dasar kamus dari kata "Tidur" (Nemasu) dalam Hiragana:',
        options: [],
        answer: 'ねる',
        hint: 'Bentuk kamus/kasual dari nemasu adalah "neru".'
      }
    ]
  },

  // ==========================================
  // JLPT N4: ELEMENTARY GRAMMAR & CONJUGATION
  // ==========================================
  {
    id: 'n4-u1-l1',
    level: 'N4',
    unitId: 'n4-u1',
    unitTitle: 'Unit 3: Arah, Keinginan & Kehidupan 🗺️',
    unitDescription: 'Kuasai kosakata navigasi, keinginan diri, dan ungkapan kasual N4',
    unitColor: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    title: 'Menanyakan Arah & Lokasi',
    description: 'Pelajari cara bernavigasi dan menanyakan posisi tempat umum di Jepang.',
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
    unitTitle: 'Unit 3: Arah, Keinginan & Kehidupan 🗺️',
    unitDescription: 'Kuasai kosakata navigasi, keinginan diri, dan ungkapan kasual N4',
    unitColor: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    title: 'Menyatakan Keinginan (~tai)',
    description: 'Belajar menyatakan apa yang ingin kamu lakukan menggunakan pola tata bahasa ~tai.',
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
    unitTitle: 'Unit 4: Kegiatan Lampau & Rencana Masa Depan 📅',
    unitDescription: 'Pelajari cara menceritakan masa lalu dan menyusun rencana masa depan.',
    unitColor: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    title: 'Masa Lalu (Bentuk ~ta)',
    description: 'Gunakan bentuk lampau informal (~ta) untuk menceritakan sejarah atau kejadian lampau.',
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
    unitTitle: 'Unit 5: Dugaan & Bahasa Percakapan N3 🔄',
    unitDescription: 'Kuasai ekspresi dugaan, pengandaian tingkat lanjut, dan bahasa sopan formal.',
    unitColor: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
    title: 'Kelihatannya & Kabar Angin (~sou)',
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
    unitTitle: 'Unit 5: Dugaan & Bahasa Percakapan N3 🔄',
    unitDescription: 'Kuasai ekspresi dugaan, pengandaian tingkat lanjut, dan bahasa sopan formal.',
    unitColor: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
    title: 'Bahasa Sopan Keigo Dasar',
    description: 'Pahami pembagian bahasa hormat Sonkeigo dan bahasa merendah Kenjougo.',
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
    unitTitle: 'Unit 6: Nuansa Tulisan Formal & Bisnis 💼',
    unitDescription: 'Kuasai partikel penulisan artikel, opini, serta relasi gramatikal kompleks N2',
    unitColor: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    title: 'Mengenai & Berdasarkan (~ni tsuite)',
    description: 'Gunakan partikel penulisan formal seperti ~ni tsuite dan ~ni oite secara presisi.',
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
    unitTitle: 'Unit 7: Literatur Klasik & Abstrak 🎓',
    unitDescription: 'Kuasai ekspresi tertua, struktur sastra tingkat tinggi, dan peribahasa N1',
    unitColor: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
    title: 'Pola Batas Akhir (~wo motte)',
    description: 'Pahami penggunaan ragam tulisan sastra tertinggi Jepang untuk mengakhiri peristiwa.',
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
