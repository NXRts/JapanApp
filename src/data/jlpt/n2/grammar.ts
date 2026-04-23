import { GrammarPoint } from '../n5/grammar';

export const n2Grammar: GrammarPoint[] = [
  {
    id: "ni-tsuite",
    level: "N2",
    title: "〜について (ni tsuite)",
    meaning: "Tentang / Mengenai",
    structure: "Kata Benda + について",
    explanation: "Digunakan ketika membicarakan, memikirkan, atau menyelidiki suatu topik. Setara dengan 'about' dalam bahasa Inggris.",
    examples: [
      {
        japanese: "日本の歴史について調べています。",
        romaji: "Nihon no rekishi ni tsuite shirabete imasu.",
        english: "Saya sedang menyelidiki tentang sejarah Jepang."
      }
    ]
  },
  {
    id: "ni-kanshite",
    level: "N2",
    title: "〜に関して (ni kanshite)",
    meaning: "Berkenaan dengan / Terkait dengan",
    structure: "Kata Benda + に関して",
    explanation: "Mirip dengan について (ni tsuite) tapi tingkatnya lebih formal dan sering digunakan dalam teks tulis, bisnis, atau pengumuman resmi.",
    examples: [
      {
        japanese: "この問題に関して、ご意見はありませんか。",
        romaji: "Kono mondai ni kanshite, go-iken wa arimasen ka.",
        english: "Terkait dengan masalah ini, apakah ada pendapat?"
      }
    ]
  },
  {
    id: "ue-de",
    level: "N2",
    title: "〜上で (ue de)",
    meaning: "Setelah (melakukan ini) barulah...",
    structure: "Kata Kerja (Ta) / Benda+の + 上で",
    explanation: "Menyatakan suatu syarat atau proses yang harus dilalui lebih dulu. Sering digunakan pada situasi di mana tahap pertama menjadi prasyarat untuk mengambil keputusan atau tindakan di tahap kedua.",
    examples: [
      {
        japanese: "家族と相談した上で、お返事いたします。",
        romaji: "Kazoku to soudan shita ue de, ohenji itashimasu.",
        english: "Saya akan memberi balasan setelah berkonsultasi dengan keluarga (saya)."
      },
      {
        japanese: "内容をご確認の上で、サインをお願いします。",
        romaji: "Naiyou o gokakunin no ue de, sain o onegai shimasu.",
        english: "Mohon tanda tangan setelah memeriksa isi/kandungannya."
      }
    ]
  },
  {
    id: "ni-sotte",
    level: "N2",
    title: "〜に沿って (ni sotte)",
    meaning: "Sepanjang / Sesuai dengan (pedoman)",
    structure: "Kata Benda + に沿って",
    explanation: "Bermakna sejajar atau mengikuti alur sesuatu (seperti jalan, sungai). Dalam arti abstrak, berarti bertindak mematuhi atau sesuai dengan harapan, buku petunjuk, rencana, kebijakan.",
    examples: [
      {
        japanese: "川に沿って桜の木が植えられている。",
        romaji: "Kawa ni sotte sakura no ki ga uerarete iru.",
        english: "Pohon sakura ditanam di sepanjang sungai."
      },
      {
        japanese: "マニュアルに沿って作業を進めてください。",
        romaji: "Manyuaru ni sotte sagyou o susumete kudasai.",
        english: "Tolong lanjutkan pekerjaan sesuai dengan buku manual."
      }
    ]
  },
  {
    id: "beki-da",
    level: "N2",
    title: "〜べきだ (beki da)",
    meaning: "Seharusnya / Semestinya",
    structure: "Kata Kerja (Kamus) + べきだ",
    explanation: "Mengandung unsur kewajiban moral, etika, atau akal sehat bahwa sesuatu itu 'memang sepantasnya' dilakukan. Lebih tegas daripada 〜ほうがいい.",
    examples: [
      {
        japanese: "約束は守るべきだ。",
        romaji: "Yakusoku wa mamoru beki da.",
        english: "Janji itu semestinya ditepati."
      },
      {
        japanese: "学生はもっと勉強すべきだ。",
        romaji: "Gakusei wa motto benkyou subeki da.",
        english: "Pelajar seharusnya belajar lebih giat. (*suru beki -> subeki)"
      }
    ]
  },
  {
    id: "kiri",
    level: "N2",
    title: "〜きり / っきり (kiri)",
    meaning: "Hanya / Semenjak (tidak berubah)",
    structure: "Kata Kerja (Ta) / Kata Benda + きり",
    explanation: "1) Menyatakan 'hanya' (limitasi kuat). 2) Sesuatu tetap tidak berubah semenjak kejadian terakhir (sering diikuti konotasi hasil yang diharapkan tidak pernah terjadi).",
    examples: [
      {
        japanese: "彼に会ったのは、10年前に一度きりです。",
        romaji: "Kare ni atta no wa, juunen mae ni ichido kiri desu.",
        english: "Saya bertemu dengannya hanya sekali saja 10 tahun yang lalu."
      },
      {
        japanese: "息子は朝出かけたきり、まだ帰ってこない。",
        romaji: "Musuko wa asa dekaketa kiri, mada kaette konai.",
        english: "Semenjak anak saya pergi tadi pagi, dia belum pulang."
      }
    ]
  },
  {
    id: "gachi",
    level: "N2",
    title: "〜がち (gachi)",
    meaning: "Cenderung / Sering kali (berkonotasi negatif)",
    structure: "Kata Benda / Kata Kerja (Masu dicoret) + がち",
    explanation: "Kecenderungan untuk berada dalam kondisi tertentu, atau tindakan yang sering terjadi dengan mudah, seringkali digunakan untuk menyiratkan keluhan atau peringatan (mudah lupa, mudah sakit).",
    examples: [
      {
        japanese: "私は最近、忘れ物をしがちだ。",
        romaji: "Watashi wa saikin, wasuremono o shigachi da.",
        english: "Akhir-akhir ini, saya sering kali melupakan barang bawaan."
      },
      {
        japanese: "曇りがちの天気が続いています。",
        romaji: "Kumorigachi no tenki ga tsudzuite imasu.",
        english: "Cuaca yang cenderung berawan sedang berlanjut."
      }
    ]
  },
  {
    id: "ni-tsurete",
    level: "N2",
    title: "〜につれて (ni tsurete)",
    meaning: "Seiring dengan / Sejalan dengan",
    structure: "Kata Kerja Kamus / Kata Benda Verbal + につれて",
    explanation: "Menunjukkan perubahan bertahap dan proporsional. Seiring kondisi A berubah, hal B juga ikut berubah bersamaan.",
    examples: [
      {
        japanese: "年を取るにつれて、記憶力が悪くなる。",
        romaji: "Toshi o toru ni tsurete, kiokuryoku ga waruku naru.",
        english: "Seiring bertambahnya usia, daya ingat menjadi menurun."
      }
    ]
  }
];
