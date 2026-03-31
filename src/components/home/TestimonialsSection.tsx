'use client';

import styled from 'styled-components';

const Section = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: var(--foreground);
  
  span {
    position: relative;
    z-index: 1;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: var(--primary);
      border-radius: 2px;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: var(--surface);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid var(--border);
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: 1rem;
    right: 2rem;
    font-size: 4rem;
    color: var(--primary);
    opacity: 0.1;
    font-family: serif;
  }
`;

const Text = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
  font-style: italic;
  margin-bottom: 1.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
`;

const UserMeta = styled.div`
  h4 {
    font-size: 1rem;
    font-weight: 700;
    color: var(--foreground);
  }
  
  span {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
`;

export function TestimonialsSection() {
  return (
    <Section>
      <SectionTitle><span>Community Stories</span></SectionTitle>
      <Grid>
        <Card>
          <Text>
            &quot;I struggled with Kanji for years until I found this app. The clean interface and daily quizzes kept me coming back. I finally passed N3!&quot;
          </Text>
          <UserInfo>
            <Avatar>JD</Avatar>
            <UserMeta>
              <h4>Jane Doe</h4>
              <span>JLPT N3 Certified</span>
            </UserMeta>
          </UserInfo>
        </Card>
        <Card>
          <Text>
            &quot;The best way to learn Kana. I memorized Hiragana in just a week using the visualization tools. Highly recommended for beginners.&quot;
          </Text>
          <UserInfo>
            <Avatar>AS</Avatar>
            <UserMeta>
              <h4>Alex Smith</h4>
              <span>Beginner Learner</span>
            </UserMeta>
          </UserInfo>
        </Card>
        <Card>
          <Text>
            &quot;Simple, effective, and beautiful. It cuts out the noise and focuses on what matters: learning the characters. Love the dark mode.&quot;
          </Text>
          <UserInfo>
            <Avatar>MK</Avatar>
            <UserMeta>
              <h4>Maria K.</h4>
              <span>Intermediate Student</span>
            </UserMeta>
          </UserInfo>
        </Card>
      </Grid>
    </Section>
  );
}
