export interface ParticleDrill {
  id: string;
  sentence: string; // The full sentence for internal use
  displaySentence: string; // The sentence with [ ] or similar markers
  options: string[]; // Options for the gap
  correctAnswer: string;
  translation: string;
  explanation: string;
  level: 'N5' | 'N4' | 'N3';
}

export const particleDrills: ParticleDrill[] = [
  {
    id: 'p1',
    sentence: '私は学生です。',
    displaySentence: '私 [ ] 学生です。',
    options: ['は', 'が', 'を', 'に'],
    correctAnswer: 'は',
    translation: 'Saya adalah seorang murid.',
    explanation: 'Partikel \"は\" (wa) menandai topik kalimat.',
    level: 'N5'
  },
  {
    id: 'p2',
    sentence: '水を飲みます。',
    displaySentence: '水 [ ] 飲みます。',
    options: ['は', 'が', 'を', 'も'],
    correctAnswer: 'を',
    translation: 'Minum air.',
    explanation: 'Partikel \"を\" (o) menandai objek langsung dari kata kerja.',
    level: 'N5'
  },
  {
    id: 'p3',
    sentence: '学校へ行きます。',
    displaySentence: '学校 [ ] 行きます。',
    options: ['は', 'が', 'を', 'へ'],
    correctAnswer: 'へ',
    translation: 'Pergi ke sekolah.',
    explanation: 'Partikel \"へ\" (e) menunjukkan arah atau tujuan pergerakan.',
    level: 'N5'
  },
  {
    id: 'p4',
    sentence: '公園で遊んでいます。',
    displaySentence: '公園 [ ] 遊んでいます。',
    options: ['に', 'で', 'を', 'は'],
    correctAnswer: 'で',
    translation: 'Sedang bermain di taman.',
    explanation: 'Partikel \"で\" (de) menunjukkan tempat terjadinya suatu aksi.',
    level: 'N5'
  },
  {
    id: 'p5',
    sentence: '猫がいます。',
    displaySentence: '猫 [ ] います。',
    options: ['は', 'が', 'を', 'に'],
    correctAnswer: 'が',
    translation: 'Ada kucing.',
    explanation: 'Partikel \"が\" (ga) menandai subjek, sering digunakan dengan kata kerja keberadaan (imasu/arimasu).',
    level: 'N5'
  },
  {
    id: 'p6',
    sentence: '日本に行きたいです。',
    displaySentence: '日本 [ ] 行きたいです。',
    options: ['に', 'で', 'を', 'は'],
    correctAnswer: 'に',
    translation: 'Ingin pergi ke Jepang.',
    explanation: 'Partikel \"に\" (ni) menunjukkan tujuan atau titik waktu.',
    level: 'N5'
  },
  {
    id: 'p7',
    sentence: '本を読みました。',
    displaySentence: '本 [ ] 読みました。',
    options: ['は', 'が', 'を', 'に'],
    correctAnswer: 'を',
    translation: 'Sudah membaca buku.',
    explanation: 'Partikel \"を\" (o) menandai objek langsung.',
    level: 'N5'
  },
  {
    id: 'p8',
    sentence: 'デパートまでバスで行きます。',
    displaySentence: 'デパート [ ] バスで行きます。',
    options: ['に', 'へ', 'まで', 'を'],
    correctAnswer: 'まで',
    translation: 'Pergi sampai ke departemen store dengan bus.',
    explanation: 'Partikel \"まで\" (made) berarti sampai atau hingga.',
    level: 'N5'
  },
  {
    id: 'p9',
    sentence: '明日テレビを見ます。',
    displaySentence: '明日 [ ] テレビを見ます。',
    options: ['は', 'が', 'に', '（空欄）'],
    correctAnswer: '（空欄）',
    translation: 'Besok akan menonton TV.',
    explanation: 'Kata keterangan waktu relatif seperti \"Ashita\" tidak memerlukan partikel \"ni\".',
    level: 'N5'
  },
  {
    id: 'p10',
    sentence: '田中さんと話しました。',
    displaySentence: '田中さん [ ] 話しました。',
    options: ['と', 'に', 'は', 'が'],
    correctAnswer: 'と',
    translation: 'Berbicara dengan Tuan Tanaka.',
    explanation: 'Partikel \"と\" (to) berarti \"dengan\" atau \"dan\".',
    level: 'N5'
  }
];
