const fs = require('fs');

let content = fs.readFileSync('/home/nxrts/Desktop/Japan-App/src/app/daily-quiz/page.tsx', 'utf-8');

// Replacements

// 1. Add MatchGrid styles
content = content.replace(/const OptionButton = styled\.button<{ \$state\?: 'correct' \| 'incorrect' \| 'neutral' }>.*?} \n`/s, 
`const OptionButton = styled.button<{ $state?: 'correct' | 'incorrect' | 'neutral' }>\`
  padding: 1.5rem;
  border-radius: 20px;
  border: 2px solid \\\${({ $state }) =>
        $state === 'correct' ? '#10b981' :
            $state === 'incorrect' ? '#ef4444' :
                'var(--border)'};
  background: \\\${({ $state }) =>
        $state === 'correct' ? 'rgba(16, 185, 129, 0.1)' :
            $state === 'incorrect' ? 'rgba(239, 68, 68, 0.1)' :
                'var(--surface)'};
  color: \\\${({ $state }) =>
        $state === 'correct' ? '#10b981' :
            $state === 'incorrect' ? '#ef4444' :
                'var(--foreground)'};
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: \\\${({ $state }) => $state && $state !== 'neutral' ? 'none' : 'auto'};
  box-shadow: \\\${({ $state }) =>
        $state === 'neutral' ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none'};

  &:hover {
    transform: \\\${({ $state }) => $state === 'neutral' ? 'translateY(-3px)' : 'none'};
    border-color: \\\${({ $state }) => $state === 'neutral' ? '#10b981' : ''};
  }
  
  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
    font-size: 1.1rem;
  }
\`;

const MatchGrid = styled.div\`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.5rem;
  }
\`;

const MatchColumn = styled.div\`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
\`;

const MatchButton = styled.button<{ $state?: 'selected' | 'matched' | 'neutral', $isRomaji?: boolean }>\`
  padding: 1.25rem;
  border-radius: 16px;
  border: 2px solid \\\${({ $state }) =>
        $state === 'matched' ? '#10b981' :
            $state === 'selected' ? '#4f46e5' :
                'var(--border)'};
  background: \\\${({ $state }) =>
        $state === 'matched' ? 'rgba(16, 185, 129, 0.1)' :
            $state === 'selected' ? 'rgba(79, 70, 229, 0.1)' :
                'var(--surface)'};
  color: \\\${({ $state }) =>
        $state === 'matched' ? '#10b981' :
            $state === 'selected' ? '#4f46e5' :
                'var(--foreground)'};
  font-size: \\\${({ $isRomaji }) => $isRomaji ? '1.25rem' : '1.5rem'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: \\\${({ $state }) => $state === 'matched' ? 'none' : 'auto'};
  
  &:hover {
    transform: \\\${({ $state }) => $state === 'neutral' ? 'translateY(-2px)' : 'none'};
    border-color: \\\${({ $state }) => $state === 'neutral' ? '#4f46e5' : ''};
  }
  
  @media (max-width: 600px) {
    padding: 1rem;
    font-size: \\\${({ $isRomaji }) => $isRomaji ? '1.1rem' : '1.25rem'};
  }
\`;`);

// 2. Interface Changes
content = content.replace(/\/\/ Types\ninterface Question {.*?}/s, 
`// Types
interface BaseQuestion {
    type: 'kana' | 'kanji' | 'match-pairs';
}

interface ChoiceQuestion extends BaseQuestion {
    type: 'kana' | 'kanji';
    char: string;
    answer: string;
    options: string[];
}

export interface MatchPairItem {
    id: string;
    kana: string;
    romaji: string;
}

interface MatchPairsQuestion extends BaseQuestion {
    type: 'match-pairs';
    pairs: MatchPairItem[];
    shuffledKana: MatchPairItem[];
    shuffledRomaji: MatchPairItem[];
}

type Question = ChoiceQuestion | MatchPairsQuestion;`);

// 3. State changes
content = content.replace(/const \[selectedOption, setSelectedOption\] = useState<string \| null>\(null\);/, 
`const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectedKanaPair, setSelectedKanaPair] = useState<string | null>(null);
    const [selectedRomajiPair, setSelectedRomajiPair] = useState<string | null>(null);
    const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);`);

// 4. Generation logic
content = content.replace(/\/\/ --- Generate Kana Questions \(5\) ---.*?setQuestions\(rng\.shuffle\(allQuestions\)\);/s, 
`// --- Generate Kana Questions (7) ---
                const allQuestions: Question[] = [];
                const choiceKana = shuffledKana.slice(0, 7);

                choiceKana.forEach(char => {
                    const correctRomaji = toRomaji(char);

                    // Generate distractors using RNG from UNIQUE Romaji pool
                    const availableDistractors = uniqueRomajiPool.filter(r => r !== correctRomaji);
                    const shuffledDistractors = rng.shuffle(availableDistractors);

                    const distractors = shuffledDistractors.slice(0, 3);

                    allQuestions.push({
                        char,
                        answer: correctRomaji,
                        options: rng.shuffle([...distractors, correctRomaji]),
                        type: 'kana'
                    });
                });

                // --- Generate Match Pairs Questions (3) ---
                let matchKanaIndex = 7;
                for (let i = 0; i < 3; i++) {
                    const pairs: MatchPairItem[] = [];
                    for (let j = 0; j < 4; j++) {
                        // Avoid out of bounds
                        if (matchKanaIndex >= shuffledKana.length) matchKanaIndex = 0;
                        const kana = shuffledKana[matchKanaIndex++];
                        pairs.push({
                            id: \`pair-\${i}-\${j}\`,
                            kana,
                            romaji: toRomaji(kana)
                        });
                    }
                    allQuestions.push({
                        type: 'match-pairs',
                        pairs,
                        shuffledKana: rng.shuffle([...pairs]),
                        shuffledRomaji: rng.shuffle([...pairs])
                    });
                }

                setQuestions(rng.shuffle(allQuestions));`);

// 5. handleAnswer logic & handleMatch
content = content.replace(/const handleAnswer = \(option: string\) => {.*?};/s, 
`const handleAnswer = (option: string) => {
        if (selectedOption) return;
        const currentQ = questions[currentIndex] as ChoiceQuestion;
        setSelectedOption(option);

        if (option === currentQ.answer) {
            setScore(s => s + 1);
        }

        setTimeout(() => {
            if (currentIndex < TOTAL_QUESTIONS - 1) {
                setCurrentIndex(i => i + 1);
                setSelectedOption(null);
            } else {
                setIsFinished(true);
            }
        }, 1500);
    };

    const handleMatchSelection = (id: string, isRomaji: boolean) => {
        if (isRomaji) {
            if (selectedRomajiPair === id) setSelectedRomajiPair(null);
            else setSelectedRomajiPair(id);
        } else {
            if (selectedKanaPair === id) setSelectedKanaPair(null);
            else setSelectedKanaPair(id);
        }
    };

    useEffect(() => {
        const currentQ = questions[currentIndex];
        if (!currentQ || currentQ.type !== 'match-pairs') return;
        
        if (selectedKanaPair && selectedRomajiPair) {
            if (selectedKanaPair === selectedRomajiPair) {
                const newMatched = [...matchedPairIds, selectedKanaPair];
                setMatchedPairIds(newMatched);
                setSelectedKanaPair(null);
                setSelectedRomajiPair(null);
                
                if (newMatched.length === (currentQ as MatchPairsQuestion).pairs.length) {
                    setScore(s => s + 1); // 1 point for solving the whole match puzzle
                    setTimeout(() => {
                        if (currentIndex < TOTAL_QUESTIONS - 1) {
                            setCurrentIndex(i => i + 1);
                            setMatchedPairIds([]);
                        } else {
                            setIsFinished(true);
                        }
                    }, 1000);
                }
            } else {
                // Incorrect match, flash logic or simple deselect
                setTimeout(() => {
                    setSelectedKanaPair(null);
                    setSelectedRomajiPair(null);
                }, 400); 
            }
        }
    }, [selectedKanaPair, selectedRomajiPair, matchedPairIds, currentIndex, questions, TOTAL_QUESTIONS]);`);

// 6. Template replacements
content = content.replace(/<Character>{currentQuestion\.char}<\/Character>.*?<\/OptionsGrid>/s, 
`{currentQuestion.type === 'kana' || currentQuestion.type === 'kanji' ? (
                    <>
                        <Character>{(currentQuestion as ChoiceQuestion).char}</Character>
                        <OptionsGrid>
                            {(currentQuestion as ChoiceQuestion).options.map((opt) => {
                                let state: 'neutral' | 'correct' | 'incorrect' = 'neutral';
                                if (selectedOption) {
                                    if (opt === (currentQuestion as ChoiceQuestion).answer) state = 'correct';
                                    else if (opt === selectedOption) state = 'incorrect';
                                }

                                return (
                                    <OptionButton
                                        key={opt}
                                        $state={state}
                                        onClick={() => handleAnswer(opt)}
                                    >
                                        {opt}
                                    </OptionButton>
                                );
                            })}
                        </OptionsGrid>
                    </>
                ) : (
                    <>
                        <h3 style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>Match the Pairs</h3>
                        <MatchGrid>
                            <MatchColumn>
                                {(currentQuestion as MatchPairsQuestion).shuffledKana.map((item) => {
                                    const isMatched = matchedPairIds.includes(item.id);
                                    const isSelected = selectedKanaPair === item.id;
                                    const state = isMatched ? 'matched' : (isSelected ? 'selected' : 'neutral');
                                    
                                    return (
                                        <MatchButton 
                                            key={\`kana-\${item.id}\`}
                                            $state={state}
                                            onClick={() => handleMatchSelection(item.id, false)}
                                        >
                                            {item.kana}
                                        </MatchButton>
                                    );
                                })}
                            </MatchColumn>
                            <MatchColumn>
                                {(currentQuestion as MatchPairsQuestion).shuffledRomaji.map((item) => {
                                    const isMatched = matchedPairIds.includes(item.id);
                                    const isSelected = selectedRomajiPair === item.id;
                                    const state = isMatched ? 'matched' : (isSelected ? 'selected' : 'neutral');
                                    
                                    return (
                                        <MatchButton 
                                            key={\`romaji-\${item.id}\`}
                                            $state={state}
                                            $isRomaji
                                            onClick={() => handleMatchSelection(item.id, true)}
                                        >
                                            {item.romaji}
                                        </MatchButton>
                                    );
                                })}
                            </MatchColumn>
                        </MatchGrid>
                    </>
                )}`);

fs.writeFileSync('/home/nxrts/Desktop/Japan-App/src/app/daily-quiz/page.tsx', content);
console.log('Done!');
