'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { generatorBank, GeneratorItem, GrammarItem } from '@/data/generatorBank';
import { ArrowRightIcon } from '@/components/icons/AppIcons';
import Link from 'next/link';

// ==========================================
// ANIMATIONS
// ==========================================
const glow = keyframes`
  0%, 100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.15); }
  50% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.3); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

// ==========================================
// STYLED COMPONENTS
// ==========================================
const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  font-family: 'Nunito', 'Outfit', sans-serif;
  color: var(--foreground);
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  transition: color 0.2s;

  &:hover {
    color: var(--primary);
  }

  svg {
    transform: rotate(180deg);
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--foreground) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.75rem;
  box-shadow: var(--shadow-sm);
  position: relative;
`;

const GlowingCard = styled(Card)`
  animation: ${glow} 3s ease-in-out infinite;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Control Panel Elements
const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.85rem 1rem;
  background: var(--background);
  border: 2px solid var(--border);
  border-radius: 16px;
  color: var(--foreground);
  font-weight: 700;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.2s;

  &:focus {
    border-color: var(--primary);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  background: var(--background);
  border: 2px solid var(--border);
  border-radius: 16px;
  color: var(--foreground);
  font-weight: 700;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.2s;

  &:focus {
    border-color: var(--primary);
  }
`;

const GenerateBtn = styled.button`
  width: 100%;
  padding: 1rem;
  background: #10b981;
  color: white;
  border: none;
  border-bottom: 5px solid #059669;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 1rem;

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

// Guidelines Panel
const InfoBox = styled.div<{ $color: string }>`
  background: rgba(255, 255, 255, 0.03);
  border-left: 4px solid ${({ $color }) => $color};
  padding: 1rem;
  border-radius: 0 12px 12px 0;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  line-height: 1.5;

  .title {
    font-weight: 800;
    color: ${({ $color }) => $color};
    margin-bottom: 0.25rem;
  }
`;

// Output Panels & Code editor layout
const OutputTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid var(--border);
  margin-bottom: 1.5rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1.25rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid ${({ $active }) => ($active ? 'var(--primary)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--primary)' : 'var(--text-secondary)')};
  font-weight: 800;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
  outline: none;
`;

const CodeContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CodeEditor = styled.textarea`
  width: 100%;
  height: 420px;
  background: #111827;
  color: #34d399;
  border: 2px solid #1f2937;
  border-radius: 20px;
  padding: 1.25rem;
  font-family: 'DM Mono', 'Fira Code', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  outline: none;
  resize: vertical;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const ExportButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ActionBtn = styled.button<{ $secondary?: boolean }>`
  flex: 1;
  padding: 0.85rem;
  background: ${({ $secondary }) => ($secondary ? 'var(--surface)' : 'var(--primary)')};
  border: 2px solid ${({ $secondary }) => ($secondary ? 'var(--border)' : 'var(--primary-dark)')};
  border-bottom-width: 4px;
  color: ${({ $secondary }) => ($secondary ? 'var(--foreground)' : '#ffffff')};
  border-radius: 14px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

// Sandbox Panel Elements
const SandboxCard = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  background: var(--background);
  border: 2px solid var(--border);
  border-radius: 28px;
  padding: 2rem 1.5rem;
  box-shadow: var(--shadow-lg);
  min-height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--text-secondary);
`;

const SandboxQuestionText = styled.h3`
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 1.75rem;
  line-height: 1.4;
`;

const SandboxOptionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const SandboxOption = styled.button<{ $selected: boolean; $isCorrect?: boolean; $isChecked?: boolean }>`
  padding: 1rem 1.25rem;
  background: ${({ $selected, $isCorrect, $isChecked }) => {
    if ($isChecked) {
      if ($isCorrect) return 'rgba(16, 185, 129, 0.08)';
      if ($selected) return 'rgba(239, 68, 68, 0.08)';
    }
    return $selected ? 'rgba(59, 130, 246, 0.06)' : 'var(--surface)';
  }};
  border: 2px solid ${({ $selected, $isCorrect, $isChecked }) => {
    if ($isChecked) {
      if ($isCorrect) return '#10b981';
      if ($selected) return '#ef4444';
    }
    return $selected ? 'var(--primary)' : 'var(--border)';
  }};
  border-bottom-width: 4px;
  border-radius: 16px;
  color: var(--foreground);
  font-size: 1rem;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  transition: all 0.1s;
  outline: none;

  &:active:not(:disabled) {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

const CardFeedbackPanel = styled.div<{ $state: 'correct' | 'incorrect' }>`
  padding: 1rem 1.25rem;
  background: ${({ $state }) => ($state === 'correct' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)')};
  border: 1px solid ${({ $state }) => ($state === 'correct' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)')};
  border-radius: 16px;
  margin-bottom: 1.5rem;
  font-size: 0.88rem;

  .title {
    font-weight: 800;
    color: ${({ $state }) => ($state === 'correct' ? '#10b981' : '#ef4444')};
    margin-bottom: 0.25rem;
  }
`;

const SandboxCheckBtn = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 0.85rem;
  background: ${({ $active }) => ($active ? '#10b981' : 'var(--border)')};
  color: ${({ $active }) => ($active ? 'white' : 'var(--text-secondary)')};
  border: none;
  border-bottom: 4px solid ${({ $active }) => ($active ? '#059669' : 'rgba(0,0,0,0.05)')};
  border-radius: 14px;
  font-weight: 800;
  cursor: ${({ $active }) => ($active ? 'pointer' : 'not-allowed')};
  transition: all 0.1s;

  &:active {
    ${({ $active }) => $active && `
      transform: translateY(2px);
      border-bottom-width: 2px;
    `}
  }
`;

// Word construction sandbox elements
const SentenceRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-height: 48px;
  border-bottom: 2px solid var(--border);
  margin-bottom: 1.5rem;
  padding: 0.25rem 0;
`;

const SandboxWord = styled.button<{ $used: boolean }>`
  padding: 0.5rem 1rem;
  background: var(--surface);
  border: 2px solid var(--border);
  border-bottom-width: 3px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--foreground);
  cursor: pointer;

  ${({ $used }) => $used && `
    opacity: 0.25;
    cursor: default;
    transform: scale(0.95);
  `}
`;

// AI Settings styles
const AISettingsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(79, 70, 229, 0.05);
  border: 1px solid rgba(79, 70, 229, 0.15);
  border-radius: 18px;
  margin-bottom: 1.5rem;
`;

const AIToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 800;
  font-size: 0.95rem;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--border);
    transition: .4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: var(--primary);
  }

  input:checked + span:before {
    transform: translateX(24px);
  }
`;

// ==========================================
// INTERFACES
// ==========================================
interface GeneratedQuestion {
  id: string;
  level: string;
  unit: number;
  topic: string;
  question_type: 'multiple_choice' | 'tap_pairs' | 'sentence-builder' | 'fill_in_blank' | 'listening' | 'sentence_builder';
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  xp_reward: number;
  audio_url?: string | null;
}

// ==========================================
// MAIN DASHBOARD COMPONENT
// ==========================================
export default function GeneratorPage() {
  const [level, setLevel] = useState<'N5' | 'N4' | 'N3' | 'N2' | 'N1'>('N5');
  const [unit, setUnit] = useState(1);
  const [topic, setTopic] = useState('Hiragana Vokal & Sapaan Dasar');
  const [questionCount, setQuestionCount] = useState(10);
  const [activeTab, setActiveTab] = useState<'json' | 'sandbox' | 'ai'>('json');
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [jsonText, setJsonText] = useState('');
  
  // AI State
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Playtest state
  const [sandboxIndex, setSandboxIndex] = useState(0);
  const [sandboxSelectedOption, setSandboxSelectedOption] = useState<string | null>(null);
  const [sandboxSelectedWords, setSandboxSelectedWords] = useState<string[]>([]);
  const [sandboxIsChecked, setSandboxIsChecked] = useState(false);
  const [sandboxIsCorrect, setSandboxIsCorrect] = useState(false);

  // Level specific curricular guidelines
  const guidelines = {
    N5: {
      desc: 'Instruksi menggunakan bahasa Indonesia. Fokus mengenalkan alfabet Kana (Hiragana/Katakana), kosakata super dasar (makanan, barang, salam), dan partikel utama (wa, ka, no, ni, o).',
      color: '#10b981'
    },
    N4: {
      desc: 'Pengenalan sekitar 150 kanji dasar. Menekankan konjugasi kata kerja bentuk Te, Nai, dan Ta, ekspresi keinginan (~tai), serta tata bahasa percakapan praktis.',
      color: '#8b5cf6'
    },
    N3: {
      desc: 'Transisi menyeluruh. Paduan Kanji dengan Furigana. Fokus pada kosakata pergaulan sosial/sekolah, tata bahasa dugaan (~sou, ~rashii), serta ragam bahasa sopan Keigo dasar.',
      color: '#ea580c'
    },
    N2: {
      desc: 'Kanji umum diposisikan tanpa Furigana. Membahas tata bahasa ekspresi formal tulisan/opini (~ni tsuite, ~ni oite), artikel koran pendek, serta pemahaman bacaan bisnis.',
      color: '#3b82f6'
    },
    N1: {
      desc: 'Level tertinggi. Kosa kata sastra/akademik langka, peribahasa, tatabahasa sastra klasik tinggi (~wo motte, ~nari~nari), dan jebakan nuansa makna sinonim.',
      color: '#dc2626'
    }
  };

  const activeLevelConfig = guidelines[level];

  // Helper shuffle
  const shuffle = <T,>(arr: T[]): T[] => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // GENERATOR CORE LOGIC (LOCAL GENERATOR ENGINE)
  const handleGenerateQuestions = async () => {
    if (isAIEnabled) {
      if (!apiKey) {
        alert('Mohon masukkan Kunci API Gemini Anda di tab AI terlebih dahulu!');
        setActiveTab('ai');
        return;
      }
      setIsGenerating(true);
      try {
        const promptText = `Bertindaklah sebagai Senior Instructional Designer, Kurikulum Kurator Bahasa Jepang, dan Pakar JLPT (N5 hingga N1).
Buatkan paket soal sebanyak ${questionCount} soal progresif dan variatif untuk Level ${level}, Unit ${unit}, Topik "${topic}".

Patuhi kriteria tingkat kesulitan progresif berikut:
- N5: Instruksi Bahasa Indonesia, huruf Kana/Romaji, tata bahasa partikel dasar.
- N4: Kanji dasar, perubahan verba (Te, Nai, Ta), tata bahasa situasional.
- N3: Paduan Kanji/Furigana, percakapan sehari-hari/sekolah kompleks.
- N2: Kanji umum tanpa furigana, tata bahasa formal, berita pendek, bisnis.
- N1: Kosakata sastra, peribahasa, tatabahasa klasik, nuansa makna mirip (nuance-based).

Tipe soal harus variatif:
- multiple_choice: Pilihan ganda menerjemahkan kata/kalimat.
- tap_pairs: Mencocokkan pasangan kata/kanji/romaji (format options: ["A", "a", "B", "b"], correct_answer: "A:a,B:b").
- sentence_builder: Menyusun kalimat dari kata acak (correct_answer: kata dipisah spasi).
- fill_in_blank: Melengkapi bagian rumpang.

Sediakan output HANYA dalam format array JSON yang valid tanpa tanda pembungkus markdown seperti \`\`\`json atau \`\`\`. Output harus berupa array JSON murni dengan format objek persis seperti contoh berikut:
{
  "id": "q_${level.toLowerCase()}_u${unit}_001",
  "level": "${level}",
  "unit": ${unit},
  "topic": "${topic}",
  "question_type": "multiple_choice",
  "question_text": "Manakah karakter Hiragana untuk bunyi 'E'?",
  "audio_url": null,
  "options": ["あ", "い", "う", "え"],
  "correct_answer": "え",
  "explanation": "あ = A, い = I, う = U, え = E.",
  "xp_reward": 15
}`;

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: promptText }
                ]
              }
            ]
          })
        });

        const data = await res.json();
        const rawResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        // Clean markdown block wrappers if returned
        const cleanedJson = rawResponse
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();

        const parsed = JSON.parse(cleanedJson);
        setQuestions(parsed);
        setJsonText(JSON.stringify(parsed, null, 2));
        setSandboxIndex(0);
        resetSandboxStates();
        setActiveTab('json');
      } catch (err) {
        console.error('AI Generation failed', err);
        alert('Gagal generate menggunakan AI. Silakan periksa kunci API Anda atau gunakan generator lokal.');
      } finally {
        setIsGenerating(false);
      }
      return;
    }

    // Local procedural question generator
    const bank = generatorBank[level];
    const generated: GeneratedQuestion[] = [];

    for (let i = 0; i < questionCount; i++) {
      const id = `q_${level.toLowerCase()}_u${unit}_00${i + 1}`;
      const rng = Math.random();

      if (rng < 0.35 && bank.grammar.length > 0) {
        // Grammar Fill-in-the-blank question
        const item = bank.grammar[i % bank.grammar.length];
        generated.push({
          id,
          level,
          unit,
          topic,
          question_type: 'fill_in_blank',
          question_text: `Pilihlah partikel atau padanan tata bahasa yang tepat untuk melengkapi bagian rumpang berikut:\n「${item.exampleSentence.replace(item.answer, ' __ ')}」\n(${item.englishTranslation})`,
          options: item.options,
          correct_answer: item.answer,
          explanation: item.explanation,
          xp_reward: 20
        });
      } else if (rng < 0.65 && bank.matchingPairs.length >= 3) {
        // Tap pairs matching question
        const pairs = shuffle(bank.matchingPairs).slice(0, 3);
        const options = shuffle(pairs.flatMap(p => [p.jp, p.id]));
        const matches = pairs.map(p => `${p.jp}:${p.id}`).join(',');
        generated.push({
          id,
          level,
          unit,
          topic,
          question_type: 'tap_pairs',
          question_text: `Cocokkanlah pasangan istilah bahasa Jepang di bawah ini dengan arti/padanan yang tepat!`,
          options,
          correct_answer: matches,
          explanation: `Pencocokan kosakata yang tepat: ${pairs.map(p => `${p.jp} = ${p.id}`).join(', ')}.`,
          xp_reward: 20
        });
      } else if (rng < 0.85 && bank.grammar.length > 0) {
        // Sentence Builder question
        const item = bank.grammar[i % bank.grammar.length];
        const sentenceWords = item.exampleSentence.replace(/[。]/g, '').split(/(?!$)/u); // Splits by character/morpheme safely
        const distractors = ['ね', 'よ', 'が', 'を'].filter(d => !sentenceWords.includes(d));
        const options = shuffle([...sentenceWords, ...distractors.slice(0, 2)]);

        generated.push({
          id,
          level,
          unit,
          topic,
          question_type: 'sentence_builder',
          question_text: `Susunlah kartu-kartu kata di bawah ini menjadi kalimat yang tepat: "${item.englishTranslation}"`,
          options,
          correct_answer: sentenceWords.join(' '),
          explanation: `Urutan penyusunan kalimat yang tepat adalah: "${item.exampleSentence}".`,
          xp_reward: 25
        });
      } else {
        // Multiple Choice question
        const item = bank.vocabulary[i % bank.vocabulary.length];
        const categoryItems = bank.vocabulary.filter(v => v.category === item.category && v.japanese !== item.japanese);
        const remainingPool = bank.vocabulary.filter(v => v.japanese !== item.japanese);
        const pool = categoryItems.length >= 3 ? categoryItems : remainingPool;
        const distractors = shuffle(pool).slice(0, 3).map(p => p.english);
        const options = shuffle([...distractors, item.english]);

        generated.push({
          id,
          level,
          unit,
          topic,
          question_type: 'multiple_choice',
          question_text: `Apakah arti yang tepat untuk kosakata bahasa Jepang berikut: 「${item.japanese}」?`,
          options,
          correct_answer: item.english,
          explanation: `Kosakata 「${item.japanese}」 (${item.romaji || ''}) memiliki arti "${item.english}".`,
          xp_reward: 15
        });
      }
    }

    setQuestions(generated);
    setJsonText(JSON.stringify(generated, null, 2));
    setSandboxIndex(0);
    resetSandboxStates();
    setActiveTab('json');
  };

  // Run initial local generation on load so page is never blank
  useEffect(() => {
    handleGenerateQuestions();
  }, []);

  const resetSandboxStates = () => {
    setSandboxSelectedOption(null);
    setSandboxSelectedWords([]);
    setSandboxIsChecked(false);
    setSandboxIsCorrect(false);
  };

  // Playtest sandbox actions
  const handleSelectSandboxOption = (opt: string) => {
    if (sandboxIsChecked) return;
    setSandboxSelectedOption(opt);
  };

  const handleSandboxWordClick = (word: string) => {
    if (sandboxIsChecked) return;
    setSandboxSelectedWords(prev => [...prev, word]);
  };

  const handleRemoveSandboxWord = (index: number) => {
    if (sandboxIsChecked) return;
    setSandboxSelectedWords(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleCheckSandbox = () => {
    if (sandboxIsChecked) {
      // Go to next question
      if (sandboxIndex < questions.length - 1) {
        setSandboxIndex(idx => idx + 1);
        resetSandboxStates();
      } else {
        setSandboxIndex(0);
        resetSandboxStates();
      }
      return;
    }

    const currentQ = questions[sandboxIndex];
    let correct = false;

    if (currentQ.question_type === 'multiple_choice' || currentQ.question_type === 'fill_in_blank') {
      correct = sandboxSelectedOption === currentQ.correct_answer;
    } else if (currentQ.question_type === 'sentence_builder') {
      const userSentence = sandboxSelectedWords.join(' ');
      correct = userSentence === currentQ.correct_answer;
    } else if (currentQ.question_type === 'tap_pairs') {
      // Tap pairs auto correct in sandbox simulation
      correct = true;
    }

    setSandboxIsCorrect(correct);
    setSandboxIsChecked(true);
  };

  // Copy json to clipboard
  const handleCopyJSON = () => {
    navigator.clipboard.writeText(jsonText);
    alert('JSON berhasil disalin ke clipboard! 📋');
  };

  // Download json as file
  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonText);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `jlpt_${level.toLowerCase()}_unit_${unit}_questions.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const activeQuestion = questions[sandboxIndex];

  return (
    <AdminContainer>
      <BackLink href="/">
        <ArrowRightIcon size={16} /> Kembali ke Roadmap Belajar
      </BackLink>

      <PageHeader>
        <Title>JLPT Question Generator Dashboard ⚙️</Title>
        <Subtitle>
          Formulasikan kurikulum progresif dan buat paket soal JSON instan siap pakai untuk JapanApp.
        </Subtitle>
      </PageHeader>

      <DashboardGrid>
        {/* LEFT COLUMN: CONTROL PARAMETERS */}
        <GlowingCard>
          <SectionTitle>⚙️ Kurasi Parameter</SectionTitle>

          <FormGroup>
            <Label>Level Target JLPT</Label>
            <Select value={level} onChange={(e) => setLevel(e.target.value as 'N5' | 'N4' | 'N3' | 'N2' | 'N1')}>
              <option value="N5">JLPT N5 (Pemula)</option>
              <option value="N4">JLPT N4 (Dasar Atas)</option>
              <option value="N3">JLPT N3 (Menengah Bawah)</option>
              <option value="N2">JLPT N2 (Menengah Atas)</option>
              <option value="N1">JLPT N1 (Mahir Sastra)</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Nomor Unit</Label>
            <Input type="number" min={1} max={50} value={unit} onChange={(e) => setUnit(parseInt(e.target.value) || 1)} />
          </FormGroup>

          <FormGroup>
            <Label>Judul Topik Sesi</Label>
            <Input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label>Jumlah Soal yang Dibuat</Label>
            <Input type="number" min={1} max={30} value={questionCount} onChange={(e) => setQuestionCount(parseInt(e.target.value) || 5)} />
          </FormGroup>

          {/* Guidelines Sidebar */}
          <InfoBox $color={activeLevelConfig.color}>
            <div className="title">Kriteria Kesulitan {level}</div>
            {activeLevelConfig.desc}
          </InfoBox>

          <GenerateBtn onClick={handleGenerateQuestions} disabled={isGenerating}>
            {isGenerating ? 'Menyusun Soal...' : 'Buat Paket Soal ✨'}
          </GenerateBtn>
        </GlowingCard>

        {/* RIGHT COLUMN: TABS OUTPUT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <OutputTabs>
              <TabButton $active={activeTab === 'json'} onClick={() => setActiveTab('json')}>
                📄 Editor Kode JSON
              </TabButton>
              <TabButton $active={activeTab === 'sandbox'} onClick={() => questions.length > 0 && setActiveTab('sandbox')}>
                🎮 Playtest Sandbox
              </TabButton>
              <TabButton $active={activeTab === 'ai'} onClick={() => setActiveTab('ai')}>
                🧠 Konfigurasi AI Gemini
              </TabButton>
            </OutputTabs>

            {/* TAB 1: CODE EDITOR */}
            {activeTab === 'json' && (
              <CodeContainer>
                <CodeEditor
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  placeholder="JSON Soal akan muncul di sini..."
                  spellCheck={false}
                />
                <ExportButtonGroup>
                  <ActionBtn onClick={handleCopyJSON}>
                    📋 Salin ke Clipboard
                  </ActionBtn>
                  <ActionBtn onClick={handleDownloadJSON} $secondary>
                    💾 Unduh Berkas .json
                  </ActionBtn>
                </ExportButtonGroup>
              </CodeContainer>
            )}

            {/* TAB 2: SANDBOX PLAYTEST */}
            {activeTab === 'sandbox' && activeQuestion && (
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 800 }}>
                  PRATINJAU DRAIN CARD SOAL SECARA NYATA DI ATAS DEVICE MOBILE
                </p>

                <SandboxCard>
                  <CardProgressHeader>
                    <span>ID: {activeQuestion.id} ({activeQuestion.question_type.replace('_', ' ')})</span>
                    <span>Soal {sandboxIndex + 1} dari {questions.length}</span>
                  </CardProgressHeader>

                  <div>
                    <SandboxQuestionText>{activeQuestion.question_text}</SandboxQuestionText>

                    {/* RENDER MULTIPLE CHOICE OR FILL IN BLANK */}
                    {(activeQuestion.question_type === 'multiple_choice' || activeQuestion.question_type === 'fill_in_blank') && (
                      <SandboxOptionGrid>
                        {activeQuestion.options.map((opt) => (
                          <SandboxOption
                            key={opt}
                            $selected={sandboxSelectedOption === opt}
                            $isCorrect={opt === activeQuestion.correct_answer}
                            $isChecked={sandboxIsChecked}
                            onClick={() => handleSelectOptionSandbox(opt)}
                            disabled={sandboxIsChecked}
                          >
                            {opt}
                          </SandboxOption>
                        ))}
                      </SandboxOptionGrid>
                    )}

                    {/* RENDER SENTENCE BUILDER */}
                    {activeQuestion.question_type === 'sentence_builder' && (
                      <>
                        <SentenceRow>
                          {sandboxSelectedWords.map((word, idx) => (
                            <SandboxWord key={idx} onClick={() => handleRemoveSandboxWord(idx)} $used={false}>
                              {word}
                            </SandboxWord>
                          ))}
                        </SentenceRow>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                          {activeQuestion.options.map((word, idx) => {
                            const isUsed = sandboxSelectedWords.includes(word) && sandboxSelectedWords.indexOf(word) === sandboxSelectedWords.lastIndexOf(word); // Basic single-use mockup
                            return (
                              <SandboxWord
                                key={idx}
                                $used={isUsed}
                                onClick={() => !isUsed && handleSandboxWordClick(word)}
                                disabled={isUsed || sandboxIsChecked}
                              >
                                {word}
                              </SandboxWord>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {/* RENDER TAP PAIRS SIMULATION */}
                    {activeQuestion.question_type === 'tap_pairs' && (
                      <div style={{ padding: '1.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', border: '2px dashed var(--border)', borderRadius: '16px', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '2.5rem' }}>🧩</span>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontWeight: 700 }}>
                          Kombinasi Pasangan: {activeQuestion.correct_answer}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    {sandboxIsChecked && (
                      <CardFeedbackPanel $state={sandboxIsCorrect ? 'correct' : 'incorrect'}>
                        <div className="title">{sandboxIsCorrect ? 'Jawaban Benar! 🎉' : 'Jawaban Salah! 💡'}</div>
                        <p style={{ margin: 0 }}>{activeQuestion.explanation}</p>
                      </CardFeedbackPanel>
                    )}

                    <SandboxCheckBtn
                      $active={sandboxIsChecked || sandboxSelectedOption !== null || sandboxSelectedWords.length > 0 || activeQuestion.question_type === 'tap_pairs'}
                      onClick={handleCheckSandbox}
                    >
                      {sandboxIsChecked ? 'Lanjutkan' : 'Periksa'}
                    </SandboxCheckBtn>
                  </div>
                </SandboxCard>
              </div>
            )}

            {/* TAB 3: AI GEMINI CONFIGURATION */}
            {activeTab === 'ai' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <AISettingsBox>
                  <AIToggle>
                    <span>Aktifkan Gemini AI Generator</span>
                    <Switch>
                      <input type="checkbox" checked={isAIEnabled} onChange={(e) => setIsAIEnabled(e.target.checked)} />
                      <span></span>
                    </Switch>
                  </AIToggle>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Menyalakan opsi ini akan menggunakan AI Gemini untuk menyusun soal secara dinamis & tak terbatas berdasarkan prompt ahli instructional designer kami.
                  </p>
                </AISettingsBox>

                {isAIEnabled && (
                  <FormGroup>
                    <Label>Kunci API Gemini Anda (Gemini API Key)</Label>
                    <Input
                      type="password"
                      placeholder="Masukkan Kunci API Gemini Anda..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                      Kunci API Anda aman secara lokal dan hanya dipanggil dari peramban Anda langsung ke titik akhir Google.
                    </p>
                  </FormGroup>
                )}
              </div>
            )}
          </Card>
        </div>
      </DashboardGrid>
    </AdminContainer>
  );

  // Helper inside sandbox render to select options
  function handleSelectOptionSandbox(opt: string) {
    handleSelectSandboxOption(opt);
  }
}
