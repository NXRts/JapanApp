'use client';

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useProgress } from '@/context/ProgressContext';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
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
    padding: 2rem 1.5rem;
  }
`;

const AvatarCircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  font-weight: 800;
  box-shadow: 0 10px 25px rgba(var(--primary-rgb), 0.3);
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Name = styled.h1`
  font-size: 2rem;
  font-weight: 850;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
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
    content: '';
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
  border: 1px solid ${({ $danger }) => $danger ? '#ef4444' : 'var(--border)'};
  background: transparent;
  color: ${({ $danger }) => $danger ? '#ef4444' : 'var(--foreground)'};

  &:hover {
    background: ${({ $danger }) => $danger ? '#ef4444' : 'var(--primary)'};
    color: white;
    border-color: ${({ $danger }) => $danger ? '#ef4444' : 'var(--primary)'};
  }
`;

export default function ProfilePage() {
  const { progress } = useProgress();

  const level = useMemo(() => Math.floor(Math.sqrt(progress.exp / 100)) + 1, [progress.exp]);
  
  const totalCharacters = useMemo(() => Object.keys(progress.mastery).length, [progress.mastery]);
  const totalQuizzes = useMemo(() => progress.quizHistory.length, [progress.quizHistory]);

  return (
    <Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }]} current="Profile" />
      
      <ProfileHeader>
        <AvatarCircle>👤</AvatarCircle>
        <ProfileInfo>
          <Name>Learner</Name>
          <JoinedDate>Studying Japanese since today</JoinedDate>
          <LevelBadge>
            <span>🏆</span> Level {level}
          </LevelBadge>
        </ProfileInfo>
      </ProfileHeader>

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
          <StatLabel>Characters Learned</StatLabel>
          <StatValue>{totalCharacters}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Quizzes Taken</StatLabel>
          <StatValue>{totalQuizzes}</StatValue>
        </StatCard>
      </StatsGrid>

      <SettingsSection>
        <SectionTitle>Account Settings</SectionTitle>
        <SettingItem>
          <SettingLabel>
            <span>Display Name</span>
            <span>How you appear to others</span>
          </SettingLabel>
          <ActionButton>Edit</ActionButton>
        </SettingItem>
        <SettingItem>
          <SettingLabel>
            <span>App Data</span>
            <span>Reset your progress and settings</span>
          </SettingLabel>
          <ActionButton $danger onClick={() => {
            if(confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
              localStorage.clear();
              window.location.reload();
            }
          }}>Reset Data</ActionButton>
        </SettingItem>
      </SettingsSection>
    </Container>
  );
}
