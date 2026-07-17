"use client";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useDeviceMode } from "@/context/DeviceModeContext";
import { useProgress } from "@/context/ProgressContext";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toRomaji } from "wanakana";

// Styled Components
const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(
    circle at center,
    rgba(79, 70, 229, 0.05) 0%,
    transparent 70%
  );

  @media (max-width: 1024px) {
    padding: 1rem 1rem 96px 1rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem 96px 0.5rem;
  }
`;

const BreadcrumbWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 0 1rem 0;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameCard = styled.div`
  background: var(--surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 32px;
  border: 1px solid var(--border);
  padding: 4rem 3rem;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 600px;

  @media (max-width: 600px) {
    padding: 2.5rem 1.5rem;
    border-radius: 24px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
  max-width: 600px;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const TitleBadge = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #4f46e5;
  background: rgba(79, 70, 229, 0.1);
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  border: 1px solid rgba(79, 70, 229, 0.2);
`;

const LessonHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const CloseLessonBtn = styled(Link)`
  color: var(--text-secondary);
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: var(--foreground);
  }
`;

const LessonProgressBarContainer = styled.div`
  flex: 1;
  height: 16px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 99px;
  overflow: hidden;
  border: 1px solid var(--border);
`;

const LessonProgressBarFill = styled.div<{ $percent: number }>`
  width: ${({ $percent }) => $percent}%;
  height: 100%;
  background: linear-gradient(90deg, #4f46e5 0%, #3b82f6 100%);
  border-radius: 99px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 8px rgba(79, 70, 229, 0.3);
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-secondary);

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const KanaDisplay = styled.div`
  font-size: 6rem;
  font-weight: 800;
  margin: 2rem 0;
  color: var(--foreground);
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    font-size: 4rem;
    margin: 1.5rem 0;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  text-align: center;
  border: 2px solid var(--border);
  border-radius: 16px;
  background: var(--background);
  color: var(--foreground);
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  }

  @media (max-width: 600px) {
    font-size: 1.25rem;
    padding: 0.875rem 1rem;
  }
`;

const Button = styled.button`
  padding: 1rem 3rem;
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);
  margin-top: 2rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 25px -5px rgba(79, 70, 229, 0.4);
  }
`;

export default function GamePage() {
  const { deviceMode, isMounted } = useDeviceMode();
  const isMobileView = isMounted && deviceMode === "mobile";

  const [kanaList, setKanaList] = useState<string[]>([]);
  const [currentKana, setCurrentKana] = useState<string>("");
  const [inputVal, setInputVal] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scoreRef = useRef(score);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Fetch Kana list on mount
  useEffect(() => {
    fetch("/api/kana?type=all")
      .then((res) => res.json())
      .then((data) => {
        setKanaList(data);
      })
      .catch((err) => console.error("Error fetching kana:", err));
  }, []);

  const getRandomKana = useCallback(() => {
    if (kanaList.length === 0) return "";
    const randomIndex = Math.floor(Math.random() * kanaList.length);
    return kanaList[randomIndex];
  }, [kanaList]);

  const { addExp } = useProgress();

  // Timer logic
  useEffect(() => {
    if (!isPlaying || isMobileView) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => {
            setIsPlaying(false);
            setIsGameOver(true);
            addExp(scoreRef.current * 4);
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, addExp]);

  const startGame = () => {
    if (kanaList.length === 0) return;
    setScore(0);
    setTimeLeft(isMobileView ? 0 : 60);
    setIsGameOver(false);
    setIsPlaying(true);
    setCurrentKana(getRandomKana());
    setInputVal("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);

    // Check if the input matches the romaji of the current kana
    const targetRomaji = toRomaji(currentKana);

    if (val.toLowerCase().trim() === targetRomaji) {
      const nextScore = score + 1;
      setScore(nextScore);

      if (isMobileView && nextScore >= 10) {
        setTimeout(() => {
          setIsPlaying(false);
          setIsGameOver(true);
          addExp(40); // 40 EXP for 10 Kana Mobile Challenge
        }, 0);
      } else {
        setCurrentKana(getRandomKana());
        setInputVal("");
      }
    }
  };

  return (
    <Container>
      <BreadcrumbWrapper>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Games Hub", href: "/game" },
          ]}
          current="Kana Speed Typing"
        />
      </BreadcrumbWrapper>

      <ContentWrapper>
        {isMobileView ? (
          <LessonHeader>
            <CloseLessonBtn href="/game" title="Tutup Sesi">
              ✕
            </CloseLessonBtn>
            <LessonProgressBarContainer>
              <LessonProgressBarFill
                $percent={score > 0 ? (score / 10) * 100 : 0}
              />
            </LessonProgressBarContainer>
            <div style={{ width: "38px" }} />
          </LessonHeader>
        ) : (
          <Header>
            <TitleBadge>Kana Speed Typing</TitleBadge>
          </Header>
        )}

        <GameCard>
          {!isPlaying && !isGameOver && (
            <div>
              <h2 style={{ marginBottom: "1rem" }}>Kana Speed Typing</h2>
              <p
                style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}
              >
                {isMobileView
                  ? "Type the Romaji mapping for the Kana character shown. Type 10 characters correctly to complete the challenge!"
                  : "Type the Romaji mapping for the Kana character shown. You have 60 seconds to get as many right as possible!"}
              </p>
              <Button onClick={startGame} disabled={kanaList.length === 0}>
                {kanaList.length === 0 ? "Loading..." : "Start Game"}
              </Button>
            </div>
          )}

          {isPlaying && (
            <div>
              {!isMobileView && (
                <div
                  style={{
                    fontSize: "1.25rem",
                    color: "var(--text-secondary)",
                    marginBottom: "1rem",
                  }}
                >
                  Time Left:{" "}
                  <span
                    style={{
                      color: timeLeft <= 10 ? "#ef4444" : "var(--foreground)",
                      fontWeight: "bold",
                    }}
                  >
                    {timeLeft}s
                  </span>
                </div>
              )}
              <div
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-secondary)",
                  marginBottom: "1.5rem",
                }}
              >
                Score:{" "}
                <span style={{ color: "var(--primary)", fontWeight: "bold" }}>
                  {score}
                </span>{" "}
                {isMobileView && "/ 10"}
              </div>
              <KanaDisplay>{currentKana}</KanaDisplay>

              <Input
                ref={inputRef}
                type="text"
                inputMode="text"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={inputVal}
                onChange={handleInputChange}
                placeholder="Type romaji here..."
                autoFocus
                autoComplete="off"
              />
            </div>
          )}

          {isGameOver && (
            <div>
              <h2>{isMobileView ? "Challenge Completed! 🎉" : "Time's Up!"}</h2>
              <KanaDisplay style={{ fontSize: "4rem", margin: "1rem 0" }}>
                {score}
              </KanaDisplay>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1.25rem",
                  marginBottom: "1.5rem",
                }}
              >
                {isMobileView
                  ? "You successfully matched 10 Kana characters."
                  : "characters typed correctly."}
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#3b82f6",
                  background: "rgba(59, 130, 246, 0.1)",
                  padding: "0.6rem 1.5rem",
                  borderRadius: "999px",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  marginBottom: "2rem",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.1)",
                }}
              >
                ⚡ +{isMobileView ? 40 : score * 4} EXP Gained
              </div>
              <br />
              <Button onClick={startGame}>Play Again</Button>
            </div>
          )}
        </GameCard>
      </ContentWrapper>
    </Container>
  );
}
