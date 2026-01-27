'use client';

import Link from 'next/link';
import Image from 'next/image';
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
  /* background: radial-gradient removed as per user request */
  margin-top: -2rem; /* Offset navbar margin */
  
  @media (max-width: 768px) {
    padding: 8rem 1rem 6rem; /* Increased vertical spacing */
    min-height: auto;
  }
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
  
  @media (max-width: 768px) {
    font-size: 2.25rem; /* Much smaller */
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 320px; /* Constrain width for aesthetics */
    gap: 1.25rem;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.4);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.5);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  /* Shine effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255, 0.2), transparent);
    transition: 0.5s;
  }
  
  &:hover::after {
    left: 100%;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 1.25rem 2rem;
    font-size: 1.1rem;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background: var(--btn-secondary-bg);
  backdrop-filter: blur(10px);
  color: var(--btn-secondary-text);
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--btn-secondary-border);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 1);
    color: var(--primary);
    transform: translateY(-4px) scale(1.02);
    border-color: transparent;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), 0 10px 20px -5px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 1.25rem 2rem;
    font-size: 1.1rem;
    background: rgba(255, 255, 255, 0.05);
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
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

const StatsSection = styled.section`
  padding: 3rem 1rem;
  margin-bottom: 2rem;
  position: relative;
  
  /* Add a subtle separator instead of a box */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary-light), transparent);
    opacity: 0.5;
  }
`;

const StatsGrid = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack vertically for impact */
    gap: 2rem;
    padding: 0 1rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    text-align: left;
    padding: 1rem 1.5rem;
  }
`;

const StatNumber = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--primary);
  line-height: 1;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 4px rgba(79, 70, 229, 0.2));
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 0;
  }
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const StepsSection = styled.section`
  padding: 6rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
  counter-reset: step-counter;
  position: relative;
  
  /* Connecting line for desktop */
  @media (min-width: 768px) {
    &::before {
      content: '';
      position: absolute;
      top: 25px; /* Aligns with circle center roughly, depending on padding */
      left: 15%;
      right: 15%;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--border), transparent);
      z-index: 0;
    }
  }
  
  @media (max-width: 768px) {
    gap: 2rem;
    margin-top: 2rem;
  }
`;

const StepCard = styled.div`
  position: relative;
  text-align: center;
  padding: 2rem;
  background: var(--surface);
  border-radius: 24px;
  border: 1px solid var(--border);
  z-index: 1; /* Sit above the line */
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary-light);
  }
  
  &::before {
    counter-increment: step-counter;
    content: counter(step-counter);
    width: 50px;
    height: 50px;
    background: var(--surface);
    color: var(--primary);
    border: 2px solid var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1.5rem;
    margin: -45px auto 1.5rem; /* Pull up to sit on edge or overlap */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 20px;
    
    &::before {
        width: 40px;
        height: 40px;
        font-size: 1.25rem;
        margin: -35px auto 1rem;
    }
  }
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--foreground);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem; /* Tighter gap */
  }
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
  
  @media (max-width: 768px) {
    padding: 1.25rem; /* Very compact */
    border-radius: 16px;
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

const BenefitsSection = styled.section`
  padding: 6rem 2rem;
  background: var(--surface);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const BenefitsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BenefitContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BenefitItem = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
`;

const BenefitIcon = styled.div`
  min-width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(79, 70, 229, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  margin-top: 5px; /* Visual alignment */

  @media (max-width: 768px) {
    min-width: 60px;
    height: 60px;
    border-radius: 16px;
  }

  svg {
    width: 40px;
    height: 40px;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
  }
`;

const BenefitText = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--foreground);
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.6;
    font-size: 1rem;
  }
`;

const BenefitsMapContainer = styled.div`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  
  @media (max-width: 768px) {
    height: 250px;
    width: 100%;
    margin-top: 2rem;
  }
`;

const TestimonialsSection = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TestimonialCard = styled.div`
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

const TestimonialText = styled.p`
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

const FAQSection = styled.section`
  padding: 6rem 2rem;
  background: var(--surface);
  width: 100%;
`;

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 1.5rem;
  
  &:last-child {
    border-bottom: none;
  }
`;

const Question = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--foreground);
`;

const Answer = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
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
          <PrimaryButton href="/kana">Hiragana & Katakana</PrimaryButton>
          <SecondaryButton href="/kanji">Browse Kanji</SecondaryButton>
          <SecondaryButton href="/practice">Start Practicing</SecondaryButton>
          <SecondaryButton href="/daily-quiz" style={{ borderColor: '#10b981', color: '#10b981' }}>Daily Quiz</SecondaryButton>
        </ButtonGroup>
      </HeroSection>

      <StatsSection>
        <StatsGrid>
          <StatItem>
            <StatNumber>2,136</StatNumber>
            <StatLabel>Joyo Kanji</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>92</StatNumber>
            <StatLabel>Kana Characters</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>100%</StatNumber>
            <StatLabel>Free to Use</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsSection>

      <BenefitsSection>
        <SectionTitle><span>Why Learn Japanese?</span></SectionTitle>
        <BenefitsGrid>
          <BenefitContent>
            <BenefitItem>
              <BenefitIcon>
                <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </BenefitIcon>
              <BenefitText>
                <h3>Unlock a Rich Culture</h3>
                <p>Understand your favorite anime, manga, and music in their original language. Connect with history and tradition.</p>
              </BenefitText>
            </BenefitItem>
            <BenefitItem>
              <BenefitIcon>
                <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </BenefitIcon>
              <BenefitText>
                <h3>Travel with Confidence</h3>
                <p>Navigate Tokyo's streets, order food like a local, and make meaningful connections during your travels.</p>
              </BenefitText>
            </BenefitItem>
            <BenefitItem>
              <BenefitIcon>
                <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </BenefitIcon>
              <BenefitText>
                <h3>Career Opportunities</h3>
                <p>Open doors to one of the world's largest economies and stand out in the job market.</p>
              </BenefitText>
            </BenefitItem>
          </BenefitContent>
          <BenefitsMapContainer>
            <Image
              src="/jp.svg"
              alt="Map of Japan"
              fill
              style={{ objectFit: 'contain', padding: '2rem', opacity: 0.8 }}
            />
            <div style={{ position: 'absolute', bottom: '2rem', textAlign: 'center', width: '100%', zIndex: 2 }}>
              <p style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--foreground)', textShadow: '0 2px 4px var(--surface)' }}>Your Gateway</p>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>to Japan</p>
            </div>
          </BenefitsMapContainer>
        </BenefitsGrid>
      </BenefitsSection>

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
            <CardTitle>Interactive Practice</CardTitle>
            <CardDescription>
              Test your knowledge with Kana quizzes and practice checking your memory with
              Kanji flashcards and drawing exercises.
            </CardDescription>
          </Card>
        </Grid>
      </FeaturesSection>

      <StepsSection>
        <SectionTitle><span>How it works</span></SectionTitle>
        <StepsGrid>
          <StepCard>
            <StepTitle>Choose Your Level</StepTitle>
            <p style={{ color: 'var(--text-secondary)' }}>
              Start with the basics of Hiragana or challenge yourself with N1 Kanji.
            </p>
          </StepCard>
          <StepCard>
            <StepTitle>Study Details</StepTitle>
            <p style={{ color: 'var(--text-secondary)' }}>
              Learn stroke orders, onyomi/kunyomi readings, and example words.
            </p>
          </StepCard>
          <StepCard>
            <StepTitle>Test Yourself</StepTitle>
            <p style={{ color: 'var(--text-secondary)' }}>
              Reinforce your knowledge with interactive quizzes and writing practice.
            </p>
          </StepCard>
        </StepsGrid>
      </StepsSection>

      <TestimonialsSection>
        <SectionTitle><span>Community Stories</span></SectionTitle>
        <TestimonialsGrid>
          <TestimonialCard>
            <TestimonialText>
              "I struggled with Kanji for years until I found this app. The clean interface and daily quizzes kept me coming back. I finally passed N3!"
            </TestimonialText>
            <UserInfo>
              <Avatar>JD</Avatar>
              <UserMeta>
                <h4>Jane Doe</h4>
                <span>JLPT N3 Certified</span>
              </UserMeta>
            </UserInfo>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialText>
              "The best way to learn Kana. I memorized Hiragana in just a week using the visualization tools. Highly recommended for beginners."
            </TestimonialText>
            <UserInfo>
              <Avatar>AS</Avatar>
              <UserMeta>
                <h4>Alex Smith</h4>
                <span>Beginner Learner</span>
              </UserMeta>
            </UserInfo>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialText>
              "Simple, effective, and beautiful. It cuts out the noise and focuses on what matters: learning the characters. Love the dark mode."
            </TestimonialText>
            <UserInfo>
              <Avatar>MK</Avatar>
              <UserMeta>
                <h4>Maria K.</h4>
                <span>Intermediate Student</span>
              </UserMeta>
            </UserInfo>
          </TestimonialCard>
        </TestimonialsGrid>
      </TestimonialsSection>

      <FAQSection>
        <FAQContainer>
          <SectionTitle><span>Frequently Asked Questions</span></SectionTitle>
          <FAQItem>
            <Question>Is this app really free to use?</Question>
            <Answer>Yes! Our mission is to make Japanese language education accessible to everyone. You have full access to all Kanji, Kana, and quiz features completely free of charge.</Answer>
          </FAQItem>
          <FAQItem>
            <Question>Is this suitable for absolute beginners?</Question>
            <Answer>Absolutely. We recommend starting with the "Hiragana & Katakana" section to master the alphabets before moving on to Kanji.</Answer>
          </FAQItem>
          <FAQItem>
            <Question>Do I need to create an account?</Question>
            <Answer>No account is required to start studying. We believe in removing barriers to entry so you can start learning immediately.</Answer>
          </FAQItem>
        </FAQContainer>
      </FAQSection>

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
