'use client';

import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-bottom: 4rem;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8rem 1rem 6rem;
  background: radial-gradient(circle at top center, rgba(79, 70, 229, 0.15) 0%, transparent 70%);
  margin-top: -2rem; /* Offset navbar margin */
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  color: var(--foreground);
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  
  span {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 10px rgba(79, 70, 229, 0.2));
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: var(--primary);
  color: white;
  font-weight: 600;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px 0 rgba(79, 70, 229, 0.39);

  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px 0 rgba(79, 70, 229, 0.23);
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: var(--surface);
  color: var(--foreground);
  font-weight: 600;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid var(--border);

  &:hover {
    background: var(--background);
    transform: translateY(-2px);
    border-color: var(--primary);
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
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
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
`;

const Card = styled.div`
  background: var(--surface);
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-light);
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(79, 70, 229, 0.05));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--primary);
  font-size: 1.75rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--foreground);
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 1.05rem;
`;

const CTASection = styled.section`
  margin: 4rem auto 6rem;
  max-width: 1000px;
  width: 90%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border-radius: 32px;
  padding: 5rem 2rem;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(79, 70, 229, 0.3), 0 8px 10px -6px rgba(79, 70, 229, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 24px 24px;
    opacity: 0.3;
  }
`;

const CTATitle = styled.h2`
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  position: relative;
`;

export default function Home() {
  return (
    <Container>
      <HeroSection>
        <Title>
          Master Japanese <br />
          <span>Kanji & Kana</span>
        </Title>
        <Subtitle>
          The most effective way to learn, practice, and memorize Japanese characters.
          Start your journey to fluency today.
        </Subtitle>
        <ButtonGroup>
          <PrimaryButton href="/kanji">Start Learning Kanji</PrimaryButton>
          <SecondaryButton href="/kana">Practice Kana</SecondaryButton>
        </ButtonGroup>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle><span>Everything you need</span></SectionTitle>
        <Grid>
          <Card>
            <CardIcon>字</CardIcon>
            <CardTitle>2000+ Kanji</CardTitle>
            <CardDescription>
              Comprehensive library of Joyo Kanji tailored for all JLPT levels.
              Master readings, meanings, and stroke orders.
            </CardDescription>
          </Card>
          <Card>
            <CardIcon>あ</CardIcon>
            <CardTitle>Hiragana & Katakana</CardTitle>
            <CardDescription>
              Visualize and practice the essential alphabets of Japanese.
              Perfect for beginners starting their journey.
            </CardDescription>
          </Card>
          <Card>
            <CardIcon>✍️</CardIcon>
            <CardTitle>Draw & Practice</CardTitle>
            <CardDescription>
              Coming soon: Interactive writing practice to help build
              muscle memory and perfect your stroke order.
            </CardDescription>
          </Card>
        </Grid>
      </FeaturesSection>

      <CTASection>
        <CTATitle>Ready to start?</CTATitle>
        <p style={{ color: '#cbd5e1', marginBottom: '2rem', position: 'relative' }}>
          Join thousands of learners mastering Japanese every day.
        </p>
        <PrimaryButton href="/kanji" style={{ position: 'relative', background: 'white', color: 'var(--primary)' }}>
          Get Started Now
        </PrimaryButton>
      </CTASection>
    </Container>
  );
}
