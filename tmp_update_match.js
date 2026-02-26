const fs = require('fs');

let content = fs.readFileSync('/home/nxrts/Desktop/Japan-App/src/app/match-pairs/page.tsx', 'utf-8');

// 1. Update State to handle mistakes
content = content.replace(/const \[score, setScore\] = useState\(0\);\n    const \[isFinished, setIsFinished\] = useState\(false\);/,
`const [score, setScore] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [gameOver, setGameOver] = useState(false); // separate state for losing`);

// 2. Change variables
content = content.replace(/const TOTAL_QUESTIONS = 5; \/\/ e\.g\. 5 rounds of matching/,
`const TOTAL_QUESTIONS = 1; // 1 round per game
    const MAX_MISTAKES = 2; // allowance`);

// 3. Update init logic
content = content.replace(/setScore\(0\);\n            setIsFinished\(false\);/,
`setScore(0);
            setMistakes(0);
            setIsFinished(false);
            setGameOver(false);`);

// 4. Update match checking logic
content = content.replace(/} else {\n                \/\/ Incorrect match setup\n                setTimeout\(\(\) => {\n                    setSelectedKanaPair\(null\);\n                    setSelectedRomajiPair\(null\);\n                }, 400\); \n            }/,
`} else {
                // Incorrect match setup
                setMistakes(m => m + 1);
                
                if (mistakes + 1 >= MAX_MISTAKES) {
                    // Game Over condition
                    setTimeout(() => {
                        setGameOver(true);
                        setIsFinished(true); // end the game
                    }, 500);
                } else {
                    setTimeout(() => {
                        setSelectedKanaPair(null);
                        setSelectedRomajiPair(null);
                    }, 400); 
                }
            }`);

// 5. Update UI for Mistakes and GameOver
content = content.replace(/<ProgressInfo>\n                    Round {currentIndex \+ 1} \/ {TOTAL_QUESTIONS}\n                <\/ProgressInfo>/,
`<div style={{ position: 'absolute', top: 30, right: 30, display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <ProgressInfo style={{ position: 'relative', top: 0, right: 0 }}>
                        Round {currentIndex + 1} / {TOTAL_QUESTIONS}
                    </ProgressInfo>
                    <div style={{ color: mistakes >= MAX_MISTAKES - 1 ? '#ef4444' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.95rem' }}>
                        Mistakes: {mistakes} / {MAX_MISTAKES}
                    </div>
                </div>`);

// 6. Update Result screen
content = content.replace(/<h2>Quiz Complete!<\/h2>\n                    <p>You matched all <strong>{TOTAL_QUESTIONS \* PAIRS_PER_ROUND}<\/strong> pairs!<\/p>/,
`<h2>{gameOver ? 'Game Over!' : 'Round Complete!'}</h2>
                    <p>
                        {gameOver 
                            ? \`You made \${MAX_MISTAKES} mistakes. Keep practicing!\` 
                            : \`Good job! You matched all pairs with \${mistakes} mistake(s).\`}
                    </p>`);
                    
// 7. Update button text
content = content.replace(/<Button onClick={generateQuiz}>Play Again<\/Button>/,
`<Button onClick={generateQuiz}>Next Quiz</Button>`);

fs.writeFileSync('/home/nxrts/Desktop/Japan-App/src/app/match-pairs/page.tsx', content);
console.log('Update Complete!');
