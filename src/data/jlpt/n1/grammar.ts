import { GrammarPoint } from '../n5/grammar';

export const n1Grammar: GrammarPoint[] = [
  {
    id: "nari-nari",
    level: "N1",
    title: "～なり～なり (~nari ~nari)",
    meaning: "Entah itu ... atau ...",
    structure: "[Kata Benda / Kata Kerja bentuk Biasa] + なり",
    explanation: "Memberikan beberapa contoh opsi tindakan lalu menyarankan untuk memilih salah satu di antaranya (atau sesuatu yang sejenisnya). Kesannya menuntut keputusan.",
    examples: [
      {
        japanese: "言葉がわからないときは、辞書を引くなり先生に聞くなりして、調べてください。",
        romaji: "Kotoba ga wakaranai toki wa, jisho o hiku nari sensei ni kiku nari shite, shirabete kudasai.",
        english: "Saat tidak mengerti sebuah kata, entah itu membuka kamus atau bertanya pada guru, silakan mencari tahu sendiri."
      },
      {
        japanese: "熱があるなら、薬を飲むなり寝るなりしたほうがいい。",
        romaji: "Netsu ga aru nara, kusuri o nomu nari neru nari shita hou ga ii.",
        english: "Kalau kamu demam, lebih baik kamu minum obat atau tidur."
      }
    ]
  },
  {
    id: "subeku",
    level: "N1",
    title: "～すべく (~su beku)",
    meaning: "Agar / Untuk tujuan...",
    structure: "[Kata Kerja Kamus] + すべく (Khusus する menjadi すべく atau するべく)",
    explanation: "Bersinonim dengan '~tame ni' namun terdengar sangat kaku (tertulis formal). Menunjukkan bahwa tindakan dilakukan dengan tujuan sadar untuk mencapai sesuatu.",
    examples: [
      {
        japanese: "彼は試験に合格すべく、昼夜寝ずに勉強した。",
        romaji: "Kare wa shiken ni goukaku su beku, chuuya nezu ni benkyou shita.",
        english: "Demi lulus ujian, dia belajar siang malam tanpa tidur."
      }
    ]
  },
  {
    id: "ni-shite-wa",
    level: "N1",
    title: "～にしては (~ni shite wa)",
    meaning: "Untuk ukuran...",
    structure: "[Kata Kerja Biasa / Noun] + にしては",
    explanation: "Mengekspresikan penilaian subjektif yang tidak lazim atau berkebalikan dari standar umum (mirip dengan 'noni' tetapi spesifik membandingkan dengan kriteria 'wajar').",
    examples: [
      {
        japanese: "外国人にしては、日本語がとても上手ですね。",
        romaji: "Gaikokujin ni shite wa, nihongo ga totemo jouzu desu ne.",
        english: "Untuk ukuran orang asing, bahasa Jepangnya sangat bagus ya."
      }
    ]
  }
];
