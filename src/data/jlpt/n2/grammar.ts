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
    explanation: "Kecenderungan untuk berada dalam kondisi tertentu, atau tindakan yang sering terjadi dengan mudah, seringkali digunakan untuk menyiratkan keluhan atau peringatan.",
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
  },
  {
    id: "ni-shite-wa",
    level: "N2",
    title: "〜にしては (ni shite wa)",
    meaning: "Mengingat bahwa... / Untuk ukuran...",
    structure: "Kata Benda / Kata Kerja Biasa + にしては",
    explanation: "Menyatakan kejutan karena kenyataannya berbeda dari ekspektasi standar yang biasanya dilekatkan pada sesuatu.",
    examples: [
      {
        japanese: "彼は外国人にしては、日本語がとても上手だ。",
        romaji: "Kare wa gaikokujin ni shite wa, Nihongo ga totemo jouzu da.",
        english: "Untuk ukuran orang asing, dia sangat mahir berbahasa Jepang."
      },
      {
        japanese: "初めて作ったにしては、美味しいですね。",
        romaji: "Hajimete tsukutta ni shite wa, oishii desu ne.",
        english: "Mengingat bahwa ini pertama kali Anda memasak, rasanya enak ya."
      }
    ]
  },
  {
    id: "sai-ni",
    level: "N2",
    title: "〜際に (sai ni)",
    meaning: "Pada saat / Ketika",
    structure: "Kata Kerja (Kamus/Ta) / Benda+の + 際に",
    explanation: "Sama persis dengan 〜時 (toki) tapi bernuansa jauh lebih formal. Biasanya dipakai pada pengumuman tertulis, manual, atau pengumuman suara di publik.",
    examples: [
      {
        japanese: "お降りの際は、お忘れ物のないようご注意ください。",
        romaji: "Oorino sai wa, owasuremono no nai you gochuui kudasai.",
        english: "Pada saat turun, mohon berhati-hati agar tidak ada barang yang tertinggal."
      }
    ]
  },
  {
    id: "to-tomo-ni",
    level: "N2",
    title: "〜とともに (to tomo ni)",
    meaning: "Bersamaan dengan / Sekaligus",
    structure: "Kata Kerja Kamus / Benda + とともに",
    explanation: "Digunakan ketika dua perubahan atau peristiwa terjadi secara paralel di waktu yang sama, atau bisa juga bermakna 'A dan B (sekaligus)'.",
    examples: [
      {
        japanese: "春の訪れとともに、花が咲き始めた。",
        romaji: "Haru no otozure to tomo ni, hana ga sakihajimeta.",
        english: "Bersamaan dengan datangnya musim semi, bunga-bunga mulai mekar."
      }
    ]
  },
  {
    id: "monoka",
    level: "N2",
    title: "〜ものか (mono ka)",
    meaning: "Mana mungkin... / Sama sekali tidak akan...",
    structure: "Kata Kerja Biasa / Sifat / Benda + ものか",
    explanation: "Sebuah penolakan tegas, menunjukkan emosi pembicara bahwa mereka sungguh-sungguh tidak akan melakukan sesuatu atau menganggap sesuatu tidak mungkin.",
    examples: [
      {
        japanese: "あんな店、二度と行くものか。",
        romaji: "Anna mise, nido to iku mono ka.",
        english: "Toko (buruk) seperti itu, mana mungkin saya ke sana dua kali!"
      },
      {
        japanese: "疲れるものか。まだまだ大丈夫だ。",
        romaji: "Tsukareru mono ka. Mada mada daijoubu da.",
        english: "Mana mungkin saya capek. Saya masih sanggup."
      }
    ]
  },
  {
    id: "igai",
    level: "N2",
    title: "〜以外 (igai)",
    meaning: "Selain / Terkecuali",
    structure: "Kata Benda + 以外",
    explanation: "Menyatakan pengecualian. 'Kecuali hal ini, sisanya semuanya...' atau 'Selain hal ini'.",
    examples: [
      {
        japanese: "日曜日以外は、毎日働いています。",
        romaji: "Nichiyoubi igai wa, mainichi hataraite imasu.",
        english: "Selain hari Minggu, saya bekerja setiap hari."
      }
    ]
  },
  {
    id: "nuki-de",
    level: "N2",
    title: "〜抜きで (nuki de)",
    meaning: "Tanpa...",
    structure: "Kata Benda + 抜きで",
    explanation: "Sesuatu yang biasanya atau selayaknya ada/dilibatkan, tapi dengan sengaja dihilangkan atau tidak disertakan.",
    examples: [
      {
        japanese: "冗談抜きで、真面目に話しましょう。",
        romaji: "Joudan nuki de, majime ni hanashimashou.",
        english: "Tanpa bercanda, mari kita bicarakan dengan serius."
      },
      {
        japanese: "わさび抜きのお寿司をお願いします。",
        romaji: "Wasabi nuki no osushi o onegai shimasu.",
        english: "Saya pesan sushi tanpa wasabi."
      }
    ]
  },
  {
    id: "koso",
    level: "N2",
    title: "〜こそ (koso)",
    meaning: "Justru / Tepatnya",
    structure: "Kata Benda + こそ",
    explanation: "Memberikan penekanan yang sangat kuat pada kata yang mendahuluinya, menghilangkan kemungkinan hal lain.",
    examples: [
      {
        japanese: "こちらこそ、よろしくお願いします。",
        romaji: "Kochira koso, yoroshiku onegai shimasu.",
        english: "Justru pihak saya lah, yang mohon kerjasamanya."
      },
      {
        japanese: "今年こそ、N2に合格したい。",
        romaji: "Kotoshi koso, N2 ni goukaku shitai.",
        english: "Tahun ini (tanpa gagal lagi), saya ingin lulus N2."
      }
    ]
  },
  {
    id: "bakari-ka",
    level: "N2",
    title: "〜ばかりか (bakari ka)",
    meaning: "Tidak hanya..., tetapi juga...",
    structure: "Bentuk Biasa + ばかりか",
    explanation: "Menekankan bahwa selain hal A (yang mungkin buruk atau baik), bahkan bertambah hal B yang memperkuat derajatnya (menambah unsur kekaguman atau keterkejutan negatif).",
    examples: [
      {
        japanese: "このレストランは安いばかりか、とても美味しい。",
        romaji: "Kono resutoran wa yasui bakari ka, totemo oishii.",
        english: "Restoran ini tidak hanya murah, tetapi juga sangat lezat."
      }
    ]
  },
  {
    id: "karaniwa",
    level: "N2",
    title: "〜からには (kara ni wa)",
    meaning: "Karena sudah / Berhubung...",
    structure: "Kata Kerja (Kamus/Ta) + からには",
    explanation: "Menyatakan sebuah tanggung jawab atau niat kuat, 'karena suatu situasi sudah terjadi, maka secara alami seseorang harus (tindakan yang kuat)'",
    examples: [
      {
        japanese: "やると決めたからには、最後まで頑張ります。",
        romaji: "Yaru to kimeta kara ni wa, saigo made ganbarimasu.",
        english: "Karena sudah memutuskan untuk melakukannya, saya akan berusaha sampai akhir."
      }
    ]
  },
  {
    id: "wari-ni",
    level: "N2",
    title: "〜わりに (wari ni)",
    meaning: "Untuk ukuran / Di luar ekspektasi",
    structure: "Bentuk Biasa / Benda+の + わりに",
    explanation: "Mirip dengan にしては, menyatakan hasil yang terjadi tidak seimbang dengan kondisi dasar.",
    examples: [
      {
        japanese: "彼はたくさん食べるわりに、太らない。",
        romaji: "Kare wa takusan taberu wari ni, futoranai.",
        english: "Untuk ukuran orang yang banyak makan, dia tidak menjadi gemuk."
      }
    ]
  },
  {
    id: "gimi-n2",
    level: "N2",
    title: "〜気味 (gimi)",
    meaning: "Merasa sedikit... / Agak... (Kecenderungan negatif)",
    structure: "Kata Benda / Kata Kerja (Masu dicoret) + 気味",
    explanation: "Mengekspresikan bahwa seseorang memiliki gejala atau merasa cenderung pada suatu keadaan fisik/mental, biasanya berkonotasi negatif atau di luar kebiasaan.",
    examples: [
      {
        japanese: "最近、少し疲れ気味です。",
        romaji: "Saikin, sukoshi tsukaregimi desu.",
        english: "Akhir-akhir ini, saya merasa agak kelelahan."
      }
    ]
  },
  {
    id: "kuse-ni",
    level: "N2",
    title: "〜くせに (kuse ni)",
    meaning: "Padahal... (Nuansa Menyalahkan)",
    structure: "Bentuk Biasa + くせに",
    explanation: "Menyatakan kalimat pertentangan ('meskipun / padahal') yang disertai dengan perasaan mengkritik, meremehkan, atau menyalahkan orang lain.",
    examples: [
      {
        japanese: "知らないくせに、何でも知っているように話す。",
        romaji: "Shiranai kuse ni, nandemo shitte iru you ni hanasu.",
        english: "Padahal dia tidak tahu, dia berbicara seakan-akan tahu segalanya."
      }
    ]
  },
  {
    id: "to-i-nagara",
    level: "N2",
    title: "〜と言いながら (to ii nagara)",
    meaning: "Meskipun berkata bahwa... (kenyataannya berbeda)",
    structure: "Bentuk Biasa / Kalimat Kutipan + と言いながら",
    explanation: "Menggambarkan kontradiksi yang jelas antara perkataan seseorang dan perbuatannya secara langsung.",
    examples: [
      {
        japanese: "ダイエットすると言いながら、またケーキを食べている。",
        romaji: "Daietto suru to ii nagara, mata keeki o tabete iru.",
        english: "Meskipun (tadi) berkata akan diet, dia makan kue lagi."
      }
    ]
  },
  {
    id: "ni-sugimai",
    level: "N2",
    title: "〜に過ぎない (ni suginai)",
    meaning: "Hanya sekadar / Tidak lebih dari...",
    structure: "Bentuk Biasa / Kata Benda + に過ぎない",
    explanation: "Menekankan bahwa hal tersebut bukan sesuatu yang besar atau berlebihan, melainkan 'hanya' seperti itu. Dipakai untuk mengecilkan hal yang mungkin dianggap besar.",
    examples: [
      {
        japanese: "それは私の推測に過ぎない。",
        romaji: "Sore wa watashi no suisoku ni suginai.",
        english: "Itu hanya sekadar tebakanku (tidak lebih)."
      },
      {
        japanese: "彼はただの社員に過ぎないのに、偉そうだ。",
        romaji: "Kare wa tada no shain ni suginai noni, erasou da.",
        english: "Meskipun dia hanya sekadar karyawan biasa, dia sangat sombong."
      }
    ]
  },
  {
    id: "ue-ni",
    level: "N2",
    title: "〜上に (ue ni)",
    meaning: "Selain... juga... / Ditambah lagi",
    structure: "Bentuk Biasa (Kata Sifat/Benda+の) + 上に",
    explanation: "Menambahkan poin ekstra, seringkali memiliki polaritas yang sama (baik ditambah hal baik, buruk ditambah hal buruk).",
    examples: [
      {
        japanese: "彼は頭がいい上に、性格も優しい。",
        romaji: "Kare wa atama ga ii ue ni, seikaku mo yasashii.",
        english: "Selain dia pintar, sifatnya juga baik hati."
      }
    ]
  },
  {
    id: "kagiri",
    level: "N2",
    title: "〜限り (kagiri)",
    meaning: "Selama... / Sebatas...",
    structure: "Kata Kerja (Kamus/Te-iru/Ta) + 限り",
    explanation: "Menetapkan batasan, di mana selama kondisi A terpenuhi maka B akan terus berlanjut.",
    examples: [
      {
        japanese: "私が生きている限り、この会社は潰させない。",
        romaji: "Watashi ga ikite iru kagiri, kono kaisha wa tsubusasenai.",
        english: "Selama saya masih hidup, saya tidak akan membiarkan perusahaan ini bangkrut."
      }
    ]
  },
  {
    id: "nikaetai",
    level: "N2",
    title: "〜に代えて (ni kaete)",
    meaning: "Mewakili / Menggantikan",
    structure: "Kata Benda + に代えて",
    explanation: "Digunakan ketika posisi satu pihak diambil alih atau tindakan yang biasanya dilakukan A diwakili oleh B. Lebih formal daripada kawari ni.",
    examples: [
      {
        japanese: "社長に代えて、私がご挨拶申し上げます。",
        romaji: "Shachou ni kaete, watashi ga goaisatsu moushiagemasu.",
        english: "Mewakili direktur, saya akan menyampaikan sambutan."
      }
    ]
  }
];
