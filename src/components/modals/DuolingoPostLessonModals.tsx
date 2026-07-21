"use client";

import React, { useState, useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { useProgress } from "@/context/ProgressContext";
import { getDailyQuests, Quest } from "@/utils/dailyQuests";

/* ─── Keyframe Animations ────────────────────────────────────────────────── */
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.94); }
  to { opacity: 1; transform: scale(1); }
`;

const flamePulse = keyframes`
  0%, 100% { transform: scale(1) translateY(0); filter: drop-shadow(0 0 15px rgba(245, 158, 11, 0.6)); }
  50% { transform: scale(1.08) translateY(-6px); filter: drop-shadow(0 0 30px rgba(245, 158, 11, 0.9)); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 12px #f59e0b, 0 0 25px #f59e0b; }
  50% { box-shadow: 0 0 22px #f59e0b, 0 0 40px #f59e0b; }
`;

/* ─── Body Scroll Lock Hook ──────────────────────────────────────────────── */
function useLockBodyScroll() {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, []);
}

/* ─── Shared Overlay & Container ─────────────────────────────────────────── */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 15, 26, 0.92);
  backdrop-filter: blur(12px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  touch-action: none;
`;

const ModalBox = styled.div<{ $maxWidth?: string }>`
  background: #111827;
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  border-radius: 28px;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || "460px"};
  padding: 2.25rem 2rem;
  color: white;
  animation: ${fadeIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;

  @media (max-width: 640px) {
    padding: 1.75rem 1.25rem;
    border-radius: 22px;
  }
`;

const PrimaryBtn = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
  color: white;
  font-size: 1.05rem;
  font-weight: 900;
  padding: 0.95rem 1.5rem;
  border-radius: 16px;
  border: none;
  border-bottom: 4px solid #b45309;
  cursor: pointer;
  margin-top: 1.75rem;
  letter-spacing: 0.05em;
  transition: all 0.15s ease;
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.35);

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(2px);
    border-bottom-width: 1px;
  }
`;

/* ─── GAMBAR 1: STREAK CELEBRATION MODAL ─────────────────────────────────── */
const FlameBox = styled.div`
  font-size: 5rem;
  margin-bottom: 0.5rem;
  animation: ${flamePulse} 2s infinite ease-in-out;
`;

const StreakNumber = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  color: #f59e0b;
  line-height: 1;
  margin-bottom: 0.2rem;

  @media (max-width: 640px) {
    font-size: 3.75rem;
  }
`;

const StreakLabel = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  color: #f59e0b;
  margin-bottom: 1.75rem;
`;

const CalendarCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 1.25rem 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DayLabelsRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
`;

const DayLabelCell = styled.span<{ $active?: boolean }>`
  font-size: 0.8rem;
  font-weight: 900;
  color: ${({ $active }) => ($active ? "#f59e0b" : "rgba(255, 255, 255, 0.5)")};
`;

const TrackLineOuter = styled.div`
  width: 100%;
  height: 20px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  position: relative;
  overflow: visible;
  display: flex;
  align-items: center;
`;

const TrackLineFill = styled.div<{ $pct: number }>`
  width: ${({ $pct }) => Math.min(100, Math.max(0, $pct))}%;
  height: 100%;
  background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%);
  border-radius: 999px;
  position: relative;
  transition: width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const GlowingDot = styled.div`
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  background: #ffffff;
  border-radius: 50%;
  animation: ${glowPulse} 1.5s infinite ease-in-out;
`;

const FlameTipIcon = styled.div`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  opacity: 0.5;
`;

const WarningText = styled.p`
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.45;
  margin-top: 0.25rem;

  strong {
    color: #f59e0b;
  }
`;

export function StreakCelebrationModal({
  streak,
  onNext,
}: {
  streak: number;
  onNext: () => void;
}) {
  useLockBodyScroll();
  const { progress } = useProgress();

  const fillPct = useMemo(() => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
    const dayIdx = day === 0 ? 6 : day - 1; // 0 = Mon ... 6 = Sun
    return Math.max(12, ((dayIdx + 1) / 7) * 100);
  }, []);

  const days = ["M", "S", "S", "R", "K", "J", "S"];

  return (
    <Overlay>
      <ModalBox>
        <FlameBox>🔥</FlameBox>
        <StreakNumber>{streak}</StreakNumber>
        <StreakLabel>hari beruntun</StreakLabel>

        <CalendarCard>
          <DayLabelsRow>
            {days.map((d, i) => (
              <DayLabelCell key={i} $active={i <= 1}>
                {d}
              </DayLabelCell>
            ))}
          </DayLabelsRow>

          <TrackLineOuter>
            <TrackLineFill $pct={fillPct}>
              <GlowingDot />
            </TrackLineFill>
            <FlameTipIcon>💧</FlameTipIcon>
          </TrackLineOuter>

          <WarningText>
            Bolos sehari akan mereset progres <strong>runtunan sempurnamu</strong> minggu ini. Hati-hati!
          </WarningText>
        </CalendarCard>

        <PrimaryBtn onClick={onNext}>Lanjutkan</PrimaryBtn>
      </ModalBox>
    </Overlay>
  );
}

/* ─── GAMBAR 2: DAILY QUESTS UPDATE MODAL ─────────────────────────────────── */
const QuestModalTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 900;
  color: #eab308;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
`;

const QuestCardStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const QuestProgressCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 1.15rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.15rem;
  text-align: left;
`;

const QuestIconWrapper = styled.div`
  font-size: 2rem;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const QuestTextGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const QuestCardTitle = styled.div`
  font-size: 0.92rem;
  font-weight: 800;
  color: white;
`;

const YellowTrackOuter = styled.div`
  width: 100%;
  height: 18px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const YellowTrackFill = styled.div<{ $pct: number }>`
  width: ${({ $pct }) => Math.min(100, Math.max(0, $pct))}%;
  height: 100%;
  background: linear-gradient(90deg, #eab308 0%, #f59e0b 100%);
  border-radius: 999px;
  transition: width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const YellowTrackText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.72rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
`;

const ChestEndIcon = styled.div`
  font-size: 1.4rem;
  flex-shrink: 0;
`;

export function DailyQuestsUpdateModal({
  onNext,
}: {
  onNext: () => void;
}) {
  useLockBodyScroll();
  const { progress, claimQuestReward } = useProgress();
  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);
  const dailyQuests = useMemo(
    () => getDailyQuests(todayStr, progress),
    [todayStr, progress],
  );
  const claimedQuests = progress.claimedQuests || [];

  useEffect(() => {
    dailyQuests.forEach((q) => {
      if (q.isCompleted && !claimedQuests.includes(q.id)) {
        claimQuestReward(q.id, q.rewardGems);
      }
    });
  }, [dailyQuests, claimedQuests, claimQuestReward]);

  return (
    <Overlay>
      <ModalBox $maxWidth="500px">
        <QuestModalTitle>Update Misi Harian!</QuestModalTitle>

        <QuestCardStack>
          {dailyQuests.map((q) => {
            const pct = (q.current / q.target) * 100;
            const isClaimed = q.isCompleted || claimedQuests.includes(q.id);
            return (
              <QuestProgressCard key={q.id}>
                <QuestIconWrapper>{q.icon}</QuestIconWrapper>
                <QuestTextGroup>
                  <QuestCardTitle>{q.title}</QuestCardTitle>
                  <YellowTrackOuter>
                    <YellowTrackFill $pct={pct} />
                    <YellowTrackText>
                      {q.current} / {q.target}
                    </YellowTrackText>
                  </YellowTrackOuter>
                </QuestTextGroup>
                <ChestEndIcon title={isClaimed ? `Hadiah Diklaim (+${q.rewardGems} 💎)` : "Belum Selesai"}>
                  {isClaimed ? "✅" : "🎁"}
                </ChestEndIcon>
              </QuestProgressCard>
            );
          })}
        </QuestCardStack>

        <PrimaryBtn onClick={onNext}>Lanjutkan</PrimaryBtn>
      </ModalBox>
    </Overlay>
  );
}

/* ─── GAMBAR 3: PROGRESSIVE ACHIEVEMENT MILESTONE MODAL ───────────────────── */
const MascotEmblemBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const GoldenOwlIcon = styled.div`
  font-size: 5.5rem;
  filter: drop-shadow(0 0 20px rgba(234, 179, 8, 0.6));
`;

const BadgeBanner = styled.div`
  background: linear-gradient(90deg, #fef08a 0%, #fde047 100%);
  color: #854d0e;
  font-weight: 900;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  padding: 0.4rem 1.25rem;
  border-radius: 12px;
  text-transform: uppercase;
  margin-top: -10px;
  box-shadow: 0 4px 12px rgba(234, 179, 8, 0.4);
`;

const AchievementCaption = styled.p`
  font-size: 1.05rem;
  font-weight: 800;
  color: white;
  line-height: 1.5;
  margin-top: 1.5rem;
  max-width: 360px;
`;

export function ProgressiveAchievementModal({
  onNext,
}: {
  onNext: () => void;
}) {
  useLockBodyScroll();
  const { progress } = useProgress();
  const streak = progress.streak || 1;
  const targetDays = 365;
  const pct = (streak / targetDays) * 100;

  return (
    <Overlay>
      <ModalBox $maxWidth="480px">
        <MascotEmblemBox>
          <GoldenOwlIcon>🦉</GoldenOwlIcon>
          <BadgeBanner>SULTAN RUNTUNAN</BadgeBanner>
        </MascotEmblemBox>

        <div style={{ width: "100%" }}>
          <YellowTrackOuter style={{ height: "22px", borderRadius: "999px" }}>
            <YellowTrackFill $pct={pct} />
            <YellowTrackText style={{ fontSize: "0.8rem" }}>
              {streak} / {targetDays}
            </YellowTrackText>
          </YellowTrackOuter>
        </div>

        <AchievementCaption>
          Kamu sudah lebih dari setengah jalan menuju hadiah Sultan Runtunan 365 harimu!
        </AchievementCaption>

        <PrimaryBtn onClick={onNext}>Lanjutkan</PrimaryBtn>
      </ModalBox>
    </Overlay>
  );
}

/* ─── UNIFIED POST-LESSON FLOW CONTROLLER ────────────────────────────────── */
export function PostLessonFlow({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const { progress } = useProgress();
  const [step, setStep] = useState<number>(1);

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);
  const isFirstOfDay = progress.activityLog?.[todayStr] === undefined || progress.activityLog?.[todayStr] <= 20;

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      onComplete();
    }
  };

  if (step === 1 && isFirstOfDay) {
    return <StreakCelebrationModal streak={progress.streak || 1} onNext={handleNext} />;
  }

  if (step <= 2) {
    return <DailyQuestsUpdateModal onNext={handleNext} />;
  }

  if (step === 3) {
    return <ProgressiveAchievementModal onNext={handleNext} />;
  }

  return null;
}
