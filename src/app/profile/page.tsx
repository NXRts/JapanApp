"use client";

import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import {
  UserIcon,
  TrophyIcon,
  TargetIcon,
  AwardIcon,
  FireIcon,
  SparklesIcon,
  BookIcon,
} from "@/components/icons/AppIcons";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    min-height: auto;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 32px;
  padding: 2.5rem;
  box-shadow: var(--shadow-md);

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
    gap: 1.25rem;
  }
`;

const AvatarCircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-light) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  font-weight: 800;
  box-shadow: 0 10px 25px rgba(var(--primary-rgb), 0.3);
  flex-shrink: 0;

  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Name = styled.h1`
  font-size: 2rem;
  font-weight: 850;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;

  @media (max-width: 600px) {
    font-size: 1.75rem;
  }
`;

const JoinedDate = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
`;

const LevelBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  border: 1px solid rgba(var(--primary-rgb), 0.2);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary-light);
    transform: translateY(-2px);
  }
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 850;
  color: var(--foreground);

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const SettingsSection = styled.div`
  margin-top: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    content: "";
    width: 4px;
    height: 1.25rem;
    background: var(--primary);
    border-radius: 2px;
  }
`;

const SettingItem = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  gap: 1rem;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SettingLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  span:first-child {
    font-weight: 700;
    color: var(--foreground);
  }

  span:last-child {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  padding: 0.6rem 1.25rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${({ $danger }) => ($danger ? "#ef4444" : "var(--border)")};
  background: transparent;
  color: ${({ $danger }) => ($danger ? "#ef4444" : "var(--foreground)")};
  text-decoration: none;

  &:hover {
    background: ${({ $danger }) => ($danger ? "#ef4444" : "var(--primary)")};
    color: white;
    border-color: ${({ $danger }) => ($danger ? "#ef4444" : "var(--primary)")};
  }

  @media (max-width: 500px) {
    width: 100%;
    text-align: center;
  }
`;

const AchievementGrid = styled.div<{ $isDragging?: boolean }>`
  display: flex;
  flex-wrap: nowrap;
  gap: 1.25rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding: 1rem 1.5rem;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  -webkit-overflow-scrolling: touch;
  cursor: ${({ $isDragging }) => ($isDragging ? "grabbing" : "grab")};
  user-select: none;
  scroll-behavior: ${({ $isDragging }) => ($isDragging ? "auto" : "smooth")};

  /* Force the container to allow its children to overflow */
  min-width: 100%;

  scrollbar-width: thin;
  scrollbar-color: var(--primary) transparent;

  &::-webkit-scrollbar {
    height: 4px;
    display: block;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(var(--primary-rgb), 0.2);
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    margin-left: -1rem;
    margin-right: -1rem;
    padding: 1rem;
  }
`;

const AchievementCard = styled.div<{ $unlocked: boolean }>`
  background: ${({ $unlocked }) =>
    $unlocked ? "var(--surface)" : "rgba(var(--primary-rgb), 0.02)"};
  border: 1px solid
    ${({ $unlocked }) => ($unlocked ? "var(--border)" : "dashed var(--border)")};
  padding: 1.25rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  filter: ${({ $unlocked }) =>
    $unlocked ? "none" : "grayscale(1) opacity(0.5)"};
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  width: 160px;
  min-width: 160px;
  flex-shrink: 0;

  &:hover {
    transform: ${({ $unlocked }) =>
      $unlocked ? "translateY(-5px) scale(1.02)" : "none"};
    border-color: var(--primary);
  }

  .icon-wrap {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: rgba(var(--primary-rgb), 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
  }

  h3 {
    font-size: 0.85rem;
    font-weight: 800;
    margin: 0;
  }

  p {
    font-size: 0.7rem;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.4;
  }
`;

const GoalCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(var(--primary-rgb), 0.08) 0%,
      transparent 100%
    );
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    content: "🎯";
    position: absolute;
    right: -5px;
    bottom: -15px;
    font-size: 6rem;
    opacity: 0.08;
    transform: rotate(-15deg);
    z-index: -1;
  }

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

const GoalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;

  h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 800;
  }
  span {
    font-size: 0.85rem;
    color: var(--primary);
    font-weight: 700;
  }
`;

const GoalProgress = styled.div`
  height: 12px;
  background: var(--border);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const GoalBar = styled.div<{ $width: number }>`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: linear-gradient(
    90deg,
    var(--primary) 0%,
    var(--primary-light) 100%
  );
  border-radius: 6px;
  transition: width 1s ease;
`;

export default function ProfilePage() {
  const { progress } = useProgress();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const level = useMemo(
    () => Math.floor(Math.sqrt(progress.exp / 100)) + 1,
    [progress.exp],
  );

  const totalCharacters = useMemo(
    () => Object.keys(progress.mastery).length,
    [progress.mastery],
  );
  const accuracy = useMemo(() => {
    let correct = 0;
    let total = 0;
    Object.values(progress.mastery).forEach((m: any) => {
      correct += m.correct;
      total += m.correct + m.incorrect;
    });
    return total === 0 ? 0 : Math.round((correct / total) * 100);
  }, [progress.mastery]);

  const achievements = [
    {
      id: "first_step",
      title: "First Steps",
      desc: "Reach Level 2",
      icon: <SparklesIcon />,
      unlocked: level >= 2,
    },
    {
      id: "streak_3",
      title: "Fire Starter",
      desc: "3 Day Streak",
      icon: <FireIcon />,
      unlocked: progress.streak >= 3,
    },
    {
      id: "mastery_10",
      title: "Kanji Apprentice",
      desc: "Learn 10 Kanji",
      icon: <BookIcon />,
      unlocked: totalCharacters >= 10,
    },
    {
      id: "accuracy_90",
      title: "Perfectionist",
      desc: "90% Accuracy",
      icon: <TargetIcon />,
      unlocked: accuracy >= 90 && totalCharacters >= 5,
    },
    {
      id: "elite",
      title: "JapanApp Elite",
      desc: "Reach Level 10",
      icon: <TrophyIcon />,
      unlocked: level >= 10,
    },
    {
      id: "streak_10",
      title: "Unstoppable",
      desc: "10 Day Streak",
      icon: <AwardIcon />,
      unlocked: progress.streak >= 10,
    },
  ];

  const targetGoal = parseInt(progress.profile?.dailyGoal || "50", 10);
  const todayStr = new Date().toISOString().split("T")[0];
  const todayExp = progress.activityLog?.[todayStr] || 0;
  const dailyGoal = {
    current: Math.min(todayExp, targetGoal),
    target: targetGoal,
  };
  const goalPercent = (dailyGoal.current / dailyGoal.target) * 100;

  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Profile" />

      <ProfileHeader>
        <AvatarCircle>
          {progress.profile?.avatar ? (
            <span style={{ fontSize: "3.5rem", lineHeight: 1 }}>
              {progress.profile.avatar}
            </span>
          ) : (
            <UserIcon size={64} />
          )}
        </AvatarCircle>
        <ProfileInfo>
          <Name>{progress.profile?.displayName || "JapanApp Learner"}</Name>
          <JoinedDate>
            Mastering {totalCharacters} items across Kanji & Vocabulary
          </JoinedDate>
          {progress.profile?.bio && (
            <p
              style={{
                margin: "0 0 1.25rem 0",
                fontStyle: "italic",
                color: "var(--text-secondary)",
                fontSize: "0.95rem",
                lineHeight: 1.5,
              }}
            >
              {progress.profile.bio}
            </p>
          )}
          <LevelBadge>
            <span>🏆</span> Level {level}
          </LevelBadge>
        </ProfileInfo>
      </ProfileHeader>

      <GoalCard>
        <GoalHeader>
          <h3>Daily Study Goal</h3>
          <span>
            {dailyGoal.current} / {dailyGoal.target} EXP
          </span>
        </GoalHeader>
        <GoalProgress>
          <GoalBar $width={goalPercent} />
        </GoalProgress>
        <p
          style={{
            margin: 0,
            fontSize: "0.8rem",
            color: "var(--text-secondary)",
          }}
        >
          {goalPercent >= 100
            ? "🎉 Daily goal achieved! You're amazing."
            : `Only ${dailyGoal.target - dailyGoal.current} EXP left to hit your daily target!`}
        </p>
      </GoalCard>

      <SectionTitle>Achievements</SectionTitle>
      <AchievementGrid
        ref={scrollRef}
        $isDragging={isDragging}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {achievements.map((a) => (
          <AchievementCard
            key={a.id}
            $unlocked={a.unlocked}
            title={a.unlocked ? "Unlocked!" : "Keep studying to unlock"}
          >
            <div className="icon-wrap">{a.icon}</div>
            <h3>{a.title}</h3>
            <p>{a.desc}</p>
          </AchievementCard>
        ))}
      </AchievementGrid>

      <SectionTitle>Core Statistics</SectionTitle>
      <StatsGrid>
        <StatCard>
          <StatLabel>Total EXP</StatLabel>
          <StatValue>{progress.exp.toLocaleString()}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Current Streak</StatLabel>
          <StatValue>{progress.streak} days</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Items Mastered</StatLabel>
          <StatValue>{totalCharacters}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Learning Accuracy</StatLabel>
          <StatValue>{accuracy}%</StatValue>
        </StatCard>
      </StatsGrid>

      <SettingsSection>
        <SectionTitle>Account Settings</SectionTitle>
        <SettingItem>
          <SettingLabel>
            <span>Display Name</span>
            <span>How you appear to others</span>
          </SettingLabel>
          <ActionButton as={Link} href="/profile/edit">
            Edit
          </ActionButton>
        </SettingItem>
        <SettingItem>
          <SettingLabel>
            <span>App Data</span>
            <span>Reset your progress and settings</span>
          </SettingLabel>
          <ActionButton
            $danger
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to reset all progress? This cannot be undone.",
                )
              ) {
                localStorage.clear();
                window.location.reload();
              }
            }}
          >
            Reset Data
          </ActionButton>
        </SettingItem>
      </SettingsSection>
    </Container>
  );
}
