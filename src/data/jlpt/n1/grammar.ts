import { GrammarPoint } from '../n5/grammar';

export const n1Grammar: GrammarPoint[] = [
  {
    id: "kaneru",
    level: "N1",
    title: "〜かねる (kaneru)",
    meaning: "Sulit untuk / Tidak bisa (karena alasan psikologis)",
    structure: "Kata Kerja (Bentuk Masu dicoret) + かねる",
    explanation: "Menyatakan ketidakmampuan untuk melakukan sesuatu bukan karena kurangnya keterampilan fisik, melainkan karena alasan psikologis, norma sosial, atau etika (keberatan, sungkan, sulit diterima hati). Sering digunakan dalam bisnis formal.",
    examples: [
      {
        japanese: "そのご提案には賛同しかねます。",
        romaji: "Sono goteian ni wa sandou shikanemasu.",
        english: "Saya sulit (tidak bisa) menyetujui usulan tersebut."
      },
      {
        japanese: "私個人の立場からは、お答えしかねます。",
        romaji: "Watashi kojin no tachiba kara wa, okotaeshikanemasu.",
        english: "Dari sudut pandang saya pribadi, hal itu sulit untuk saya jawab."
      }
    ]
  },
  {
    id: "zaru-o-enai",
    level: "N1",
    title: "〜ざるを得ない (zaru o enai)",
    meaning: "Terpaksa harus / Tidak ada pilihan lain selain",
    structure: "Kata Kerja (Nai dicoret) + ざるを得ない (*Suru menjadi sezaru)",
    explanation: "Situasi ekstrem di mana meskipun seseorang mungkin tidak ingin melakukan sesuatu, keadaan memaksanya demikian sehingga tidak ada pilihan lain selain melakukannya.",
    examples: [
      {
        japanese: "これだけ証拠があれば、彼が犯人だと認めざるを得ない。",
        romaji: "Koredake shouko ga areba, kare ga hannin da to mitomezaru o enai.",
        english: "Dengan bukti sebanyak ini, kita terpaksa harus mengakui bahwa dia adalah pelakunya."
      },
      {
        japanese: "台風のため、旅行は中止せざるを得なかった。",
        romaji: "Taifuu no tame, ryokou wa chuushi sezaru o enakatta.",
        english: "Karena topan, mau tidak mau perjalanan tersebut terpaksa dibatalkan."
      }
    ]
  },
  {
    id: "koto-naku",
    level: "N1",
    title: "〜ことなしに (koto nashi ni)",
    meaning: "Tanpa melakukan...",
    structure: "Kata Kerja Kamus + ことなしに",
    explanation: "Sangat formal. Menekankan bahwa jika tindakan utama dilakukan tanpa adanya prasyarat atau aksi sekunder tertentu (A), maka hasilnya (B) akan sulit dicapai atau mustahil.",
    examples: [
      {
        japanese: "過去を反省することなしに、明るい未来はない。",
        romaji: "Kako o hansei suru koto nashi ni, akarui mirai wa nai.",
        english: "Tanpa melakukan introspeksi terhadap masa lalu, masa depan yang cerah tidak akan ada."
      }
    ]
  },
  {
    id: "yogi-naku-sareru",
    level: "N1",
    title: "〜余儀なくされる (yogi naku sareru)",
    meaning: "Dipaksa untuk / Terpaksa karena keadaan luar",
    structure: "Kata Benda + を余儀なくされる",
    explanation: "Digunakan pada berita atau tulisan sangat formal. Berarti subjek yang tidak memiliki daya untuk menolak didorong ke dalam situasi yang tidak diinginkan karena kondisi tak terduga (bencana alam, krisis, dsb).",
    examples: [
      {
        japanese: "資金不足のため、計画の変更を余儀なくされた。",
        romaji: "Shikin busoku no tame, keikaku no henkou o yoginaku sareta.",
        english: "Karena kurangnya dana, perubahan rencana terpaksa (dengan sangat menyesal) dilakukan."
      }
    ]
  },
  {
    id: "nari-ni",
    level: "N1",
    title: "〜なりに (nari ni)",
    meaning: "Sesuai porsinya / Dengan cara tersendiri",
    structure: "Kata Benda / Kata Sifat / Kata Kerja + なりに",
    explanation: "Walaupun memiliki keterbatasan (baik status, pengalaman, dll), seseorang telah melakukan usaha terbaik sepadan dengan batasan atau posisinya tersebut.",
    examples: [
      {
        japanese: "子供は子供なりに色々と悩んでいるのだ。",
        romaji: "Kodomo wa kodomo nari ni iro-iro to nayande iru no da.",
        english: "Anak-anak, dengan cara mereka sendiri (khas anak-anak), menghadapi berbagai macam kekhawatiran."
      },
      {
        japanese: "私なりに頑張ってみます。",
        romaji: "Watashi nari ni ganbatte mimasu.",
        english: "Saya akan berusaha sebaik-baiknya sesuai kemampuan (terbatas) saya."
      }
    ]
  },
  {
    id: "wo-yogi-naku-saseru",
    level: "N1",
    title: "〜を余儀なくさせる (o yoginaku saseru)",
    meaning: "Memaksa (seseorang/sesuatu) untuk melakukan...",
    structure: "Kata Benda + を余儀なくさせる",
    explanation: "Bentuk kausatif dari yoginaku sareru. Berarti suatu hal (seperti bencana, masalah besar) memaksa entitas lain ke dalam situasi yang tidak bisa dihindari.",
    examples: [
      {
        japanese: "突然の嵐は、船の出港延期を余儀なくさせた。",
        romaji: "Totsuzen no arashi wa, fune no shukkou enki o yoginaku saseta.",
        english: "Badai yang tiba-tiba memaksa penundaan keberangkatan kapal."
      }
    ]
  },
  {
    id: "gatera",
    level: "N1",
    title: "〜がてら (gatera)",
    meaning: "Sambil (melakukan aksi utama), kebetulan...",
    structure: "Kata Kerja (Masu dicoret) / Kata Benda Verbal + がてら",
    explanation: "Menyatakan bahwa saat melakukan tugas utama (yang biasanya berupa pergerakan ringan seperti berjalan), pembicara memanfaatkan kesempatan itu untuk melakukan tugas sekunder.",
    examples: [
      {
        japanese: "散歩がてら、タバコを買ってきます。",
        romaji: "Sanpo gatera, tabako o katte kimasu.",
        english: "Sambil jalan-jalan, saya akan sekalian beli rokok."
      }
    ]
  },
  {
    id: "katawara",
    level: "N1",
    title: "〜かたわら (katawara)",
    meaning: "Sambil (menjalani karir/kegiatan jangka panjang)",
    structure: "Kata Kerja (Kamus) / Benda+の + かたわら",
    explanation: "Menyatakan bahwa di samping melakukan profesi atau pekerjaan utama (sekolah, pekerjaan kantoran), seseorang juga memiliki aktivitas serius kedua (seperti menjalankan bisnis, menulis novel).",
    examples: [
      {
        japanese: "彼は会社員として働くかたわら、小説を書いている。",
        romaji: "Kare wa kaishain to shite hataraku katawara, shousetsu o kaite iru.",
        english: "Di samping bekerja sebagai pegawai kantoran, dia juga menulis novel."
      }
    ]
  },
  {
    id: "katagata",
    level: "N1",
    title: "〜かたがた (katagata)",
    meaning: "Sebagai cara untuk... sekaligus...",
    structure: "Kata Benda Verbal + かたがた",
    explanation: "Sangat formal. Digunakan dalam surat atau permohonan resmi untuk mengungkapkan bahwa satu kunjungan memiliki dua tujuan mulia sekaligus (misalnya berkunjung sekaligus mengucapkan terima kasih).",
    examples: [
      {
        japanese: "お礼かたがた、ご挨拶にお伺いしました。",
        romaji: "Orei katagata, goaisatsu ni oukagai shimashita.",
        english: "Saya berkunjung untuk memberikan salam sekaligus sebagai bentuk rasa terima kasih."
      }
    ]
  },
  {
    id: "de-are",
    level: "N1",
    title: "〜であれ (de are)",
    meaning: "Bahkan jika / Meskipun itu adalah...",
    structure: "Kata Benda / Kata Tanya + であれ",
    explanation: "Menunjukkan fakta bahwa apa pun kondisi yang ada (A), tidak akan mengubah tindakan atau prinsip si pembicara (B). Sama dengan 'de mo'.",
    examples: [
      {
        japanese: "どんな理由であれ、遅刻は許されない。",
        romaji: "Donna riyuu de are, chikoku wa yurusarenai.",
        english: "Apa pun alasannya, keterlambatan tidak dapat ditoleransi."
      }
    ]
  },
  {
    id: "de-are-de-are",
    level: "N1",
    title: "〜であれ〜であれ (de are... de are)",
    meaning: "Entah itu A, entah itu B",
    structure: "Benda1 + であれ + Benda2 + であれ",
    explanation: "Menyebutkan dua contoh kasus ekstrem (seperti tua atau muda, pria atau wanita), dan menyatakan bahwa prinsip kalimat berlaku sama tanpa membedakan keduanya.",
    examples: [
      {
        japanese: "大人であれ子供であれ、法律は守らなければならない。",
        romaji: "Otona de are kodomo de are, houritsu wa mamoranakereba naranai.",
        english: "Entah itu orang dewasa maupun anak-anak, hukum harus tetap dipatuhi."
      }
    ]
  },
  {
    id: "nari-nari",
    level: "N1",
    title: "〜なり〜なり (nari... nari)",
    meaning: "Entah A, entah B, silakan...",
    structure: "Kata Benda / Kerja Kamus + なり",
    explanation: "Mengusulkan pilihan dari grup benda sejenis. Ini memberi kesan 'jangan bingung, ambil tindakan apa pun dari salah satu di antaranya'.",
    examples: [
      {
        japanese: "お茶なりコーヒーなり、好きなものを飲んでください。",
        romaji: "Ocha nari koohii nari, sukinamono o nonde kudasai.",
        english: "Silakan minum apa saja yang disukai, entah itu teh, entah itu kopi."
      }
    ]
  },
  {
    id: "bakari-ni",
    level: "N1",
    title: "〜ばかりに (bakari ni)",
    meaning: "Hanya karena... (Berakibat fatal)",
    structure: "Bentuk Biasa + ばかりに",
    explanation: "Menunjukkan rasa penyesalan mendalam bahwa karena SATU hal kecil atau kesalahan kecil, akhirnya terjadi tragedi besar atau hal buruk yang permanen.",
    examples: [
      {
        japanese: "本当のことを言ったばかりに、彼を怒らせてしまった。",
        romaji: "Hontou no koto o itta bakari ni, kare o okorasete shimatta.",
        english: "Hanya karena saya mengatakan kebenarannya, saya akhirnya membuatnya marah besar."
      }
    ]
  },
  {
    id: "bekarazu",
    level: "N1",
    title: "〜べからず (bekarazu)",
    meaning: "Dilarang keras...",
    structure: "Kata Kerja Kamus + べからず",
    explanation: "Cara penulisan yang sangat kuno dan tegas untuk 'Tidak boleh'. Sering ditemui pada papan peringatan dan maklumat tertulis di masa lampau.",
    examples: [
      {
        japanese: "芝生に入るべからず。",
        romaji: "Shibafu ni hairu bekarazu.",
        english: "Dilarang keras menginjak rumput."
      }
    ]
  },
  {
    id: "ni-soku-shite",
    level: "N1",
    title: "〜に即して (ni soku shite)",
    meaning: "Disesuaikan secara tepat dengan (kenyataan/pengalaman)",
    structure: "Kata Benda + に即して",
    explanation: "Bertindak sesuai dengan standar ketat tertentu, biasanya hukum, fakta, aturan, atau kenyataan hidup, tanpa melenceng darinya.",
    examples: [
      {
        japanese: "事実に即して議論を進めよう。",
        romaji: "Jijitsu ni soku shite giron o susumeyou.",
        english: "Mari kita lanjutkan diskusi ini sesuai dengan fakta yang ada."
      }
    ]
  },
  {
    id: "naki-ni-shimo",
    level: "N1",
    title: "〜なきにしもあらず (naki ni shimo arazu)",
    meaning: "Tidak sepenuhnya tidak... / Masih ada kemungkinan kecil",
    structure: "Kata Benda + なきにしもあらず",
    explanation: "Ekspresi belit-belit yang pada dasarnya berarti 'Tidak bisa dibilang nol, jadi mungkin masih ada sedikit'. Bentuk sastra lama dari 'nai koto wa nai'.",
    examples: [
      {
        japanese: "努力すれば、合格の可能性はなきにしもあらずだ。",
        romaji: "Doryoku sureba, goukaku no kanousei wa nakinishimo arazu da.",
        english: "Jika kita berusaha, bukan berarti kemungkinan lulus itu sama sekali tidak ada."
      }
    ]
  },
  {
    id: "to-attewa",
    level: "N1",
    title: "〜とあっては (to attewa)",
    meaning: "Mengingat kondisinya sedemikian istimewa...",
    structure: "Bentuk Biasa + とあっては",
    explanation: "Menyatakan bahwa 'jika situasinya luar biasa/khusus seperti ini, maka reaksi yang wajar juga harus khusus/tidak ada pilihan lain'.",
    examples: [
      {
        japanese: "社長の命令とあっては、従うしかない。",
        romaji: "Shachou no meirei to attewa, shitagau shika nai.",
        english: "Karena ini adalah perintah dari direktur, tidak ada pilihan selain mematuhinya."
      }
    ]
  },
  {
    id: "ni-ataru",
    level: "N1",
    title: "〜に当たる (ni ataru)",
    meaning: "Setara dengan / Termasuk dalam kategori",
    structure: "Kata Benda + に当たる",
    explanation: "Menyatakan bahwa satu entitas sama bobotnya, sepadan nilainya, atau termasuk dalam kategori spesifik yang ada pada kelompok lain.",
    examples: [
      {
        japanese: "１ドルは１５０円に当たる。",
        romaji: "Ichidoru wa hyakugojuu en ni ataru.",
        english: "Satu dolar setara dengan 150 yen."
      }
    ]
  },
  {
    id: "majiki",
    level: "N1",
    title: "〜まじき (majiki)",
    meaning: "Tidak sepantasnya dilakukan oleh...",
    structure: "Kata Kerja Kamus + まじき + Benda(Orang/Posisi)",
    explanation: "Kritik keras secara moral. Mengindikasikan bahwa berdasarkan posisi atau profesinya, tindakan tersebut sama sekali tidak bisa dimaafkan atau diterima (seperti 'Hal yang tidak layak dilakukan seorang guru').",
    examples: [
      {
        japanese: "それは、プロにあるまじき態度だ。",
        romaji: "Sore wa, puro ni arumajiki taido da.",
        english: "Itu adalah sikap yang sungguh tidak sepantasnya dimiliki oleh seorang profesional."
      }
    ]
  },
  {
    id: "gotoki",
    level: "N1",
    title: "〜ごとき (gotoki)",
    meaning: "Sesuatu selevel... / Sesuatu seperti...",
    structure: "Kata Benda + のごとき",
    explanation: "Sangat merendahkan. Mengungkapkan penghinaan bahwa pihak yang disebut itu sangat rendah tingkatnya, tidak penting, atau hanya sekelas itu.",
    examples: [
      {
        japanese: "私ごときが意見を言うのはおこがましいが…",
        romaji: "Watashi gotoki ga iken o iu no wa okogamashii ga...",
        english: "Mungkin lancang bagi orang sekelas diriku ini untuk memberikan pendapat, tetapi..."
      }
    ]
  },
  {
    id: "iwanya",
    level: "N1",
    title: "いわんや (iwanya)",
    meaning: "Apalagi / Terlebih lagi",
    structure: "いわんや + Kata Benda / Subjek",
    explanation: "Gaya penulisan kuno dari bahasa literatur. Menyatakan 'Jika hal X saja tidak bisa, APALAGI hal Y (yang jauh lebih sulit)'.",
    examples: [
      {
        japanese: "大人でも解けない問題だ。いわんや子供をや。",
        romaji: "Otona demo tokenai mondai da. Iwanya kodomo o ya.",
        english: "Ini soal yang tidak bisa dipecahkan bahkan oleh orang dewasa. Apalagi oleh anak-anak."
      }
    ]
  },
  {
    id: "ni-taranai",
    level: "N1",
    title: "〜に足らない (ni taranai)",
    meaning: "Tidak pantas untuk... / Tidak layak untuk (dinilai/dibahas)",
    structure: "Kata Kerja Kamus / Benda + に（は）足らない",
    explanation: "Bermakna 'Nilainya terlalu rendah sehingga membuang waktu jika dibahas atau dikhawatirkan'.",
    examples: [
      {
        japanese: "あんな噂は、信じるに足らない。",
        romaji: "Anna uwasa wa, shinjiru ni taranai.",
        english: "Rumor seperti itu tidak pantas (tidak layak) untuk dipercaya."
      }
    ]
  },
  {
    id: "gatai",
    level: "N1",
    title: "〜がたい (gatai)",
    meaning: "Sulit dipercaya / Sulit diterima",
    structure: "Kata Kerja (Masu dicoret) + がたい",
    explanation: "Berbeda dengan Nikui (sulit secara fisik). Gatai berarti mustahil secara mental/emosional. Biasa dipasangkan dengan kata kerja kognitif (percaya, memaafkan, membayangkan, dll).",
    examples: [
      {
        japanese: "彼が犯罪を犯したなんて、信じがたい。",
        romaji: "Kare ga hanzai o okashita nante, shinjigatai.",
        english: "Sangat sulit dipercaya bahwa dia telah melakukan kejahatan."
      }
    ]
  },
  {
    id: "nagara-mo",
    level: "N1",
    title: "〜ながらも (nagara mo)",
    meaning: "Meskipun (dalam keterbatasan)...",
    structure: "Kata Benda / Kata Sifat / Kata Kerja(Masu dicoret) + ながらも",
    explanation: "Sama artinya dengan keredomo (meskipun). Memberikan kesan bahwa dengan segala kondisi negatif, suatu hal tetap terjadi.",
    examples: [
      {
        japanese: "狭いながらも、楽しい我が家です。",
        romaji: "Semai nagara mo, tanoshii wagaya desu.",
        english: "Meskipun sempit, inilah rumah kita yang menyenangkan."
      }
    ]
  },
  {
    id: "shimatsu-da",
    level: "N1",
    title: "〜始末だ (shimatsu da)",
    meaning: "Berujung pada keadaan buruk (akhir yang memalukan)",
    structure: "Bentuk Biasa + 始末だ",
    explanation: "Digunakan ketika masalah demi masalah menumpuk, dan pada akhirnya berakhir pada konsekuensi yang sangat negatif atau menyedihkan/memalukan.",
    examples: [
      {
        japanese: "彼は何度も遅刻し、とうとうクビになる始末だ。",
        romaji: "Kare wa nando mo chikoku shi, toutou kubi ni naru shimatsu da.",
        english: "Dia berkali-kali datang terlambat, dan pada akhirnya berujung (memalukan) dipecat."
      }
    ]
  }
];
