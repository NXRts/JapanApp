'use client';

import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 4rem;
  min-height: 80vh;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 1rem 4rem;
  
  @media (max-width: 768px) {
    padding: 4rem 1rem 3rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
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
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 700px;
  margin-bottom: 2.5rem;
  line-height: 1.8;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const GridSection = styled.section`
  padding: 2rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 1rem 1rem 3rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3.5rem;
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
    margin-bottom: 2.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Card = styled.div`
  background: var(--surface);
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid var(--border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-light);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
  
  @media (max-width: 768px) {
    padding: 1.75rem;
    border-radius: 20px;
  }
`;

const CardIcon = styled.div`
  width: 65px;
  height: 65px;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(79, 70, 229, 0.05));
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--primary);
  
  svg {
    width: 32px;
    height: 32px;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--foreground);
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 1.05rem;
`;

const FooterNote = styled.div`
  text-align: center;
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px dashed var(--border);
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.4);
  margin-top: 1.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.5);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const TextSection = styled.section`
  padding: 4rem 2rem;
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const ContentGrid = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const BlockTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--foreground);
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--primary);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const BlockParagraph = styled.p`
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

export default function AboutPage() {
  return (
    <Container>
      <HeroSection>
        <Title>
          About <span>Japan Learning App</span>
        </Title>
        <Subtitle>
          Your ultimate companion for mastering the Japanese writing system. 
          Our mission is to make learning Kanji, Hiragana, and Katakana accessible, interactive, and aesthetically pleasing.
        </Subtitle>
        <PrimaryButton href="/practice">
          Start Learning Now
        </PrimaryButton>
      </HeroSection>

      <TextSection>
        <ContentGrid>
          <TextBlock>
            <BlockTitle>Our Story</BlockTitle>
            <BlockParagraph>
              The Japanese language is incredibly rich and challenging, especially when it comes to mastering its unique writing systems. 
              Japan Learning App was born out of a passion for the language and a desire to build a tool that feels less like a chore and more 
              like a natural part of your daily routine.
            </BlockParagraph>
            <BlockParagraph>
              We noticed that many traditional learning resources were either too rigid or visually unappealing, making the 
              process of memorizing thousands of characters daunting. We wanted to build something different&mdash;a modern, beautiful, 
              and highly interactive platform tailored for learners at all levels, from complete beginners tackling Hiragana to advanced students 
              preparing for the JLPT N1.
            </BlockParagraph>
          </TextBlock>
          
          <TextBlock>
            <BlockTitle>Our Learning Approach</BlockTitle>
            <BlockParagraph>
              We believe that effective learning comes from consistent, engaging practice. That&#39;s why we&#39;ve built our platform around 
              proven educational methods. Our interactive flashcards employ spaced repetition principles and randomized modes to 
              ensure that characters move into your long-term memory.
            </BlockParagraph>
            <BlockParagraph>
              Beyond rote memorization, we emphasize context and culture. With features like stroke-order animations, native audio pronunciation, 
              and our immersive Japanese Culture Blog, we provide a holistic learning experience. We don&#39;t just want you to pass a test; 
              we want you to connect with the language and the culture it represents.
            </BlockParagraph>
          </TextBlock>
        </ContentGrid>
      </TextSection>

      <GridSection>
        <SectionTitle><span>Key Features</span></SectionTitle>
        <Grid>
          <Card>
            <CardIcon>
              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </CardIcon>
            <CardTitle>Interactive Flashcards</CardTitle>
            <CardDescription>
              Enjoy stroke-order font support and crystal-clear audio pronunciation. Enhance retention with smooth swipe animations and randomized practice modes.
            </CardDescription>
          </Card>
          
          <Card>
            <CardIcon>
              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </CardIcon>
            <CardTitle>Comprehensive JLPT Lists</CardTitle>
            <CardDescription>
              Access complete and organized Kanji lists spanning from beginner N5 to advanced N1 proficiency levels, tailored for exam preparation.
            </CardDescription>
          </Card>

          <Card>
            <CardIcon>
              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </CardIcon>
            <CardTitle>Kana Mastery Tables</CardTitle>
            <CardDescription>
              Learn the foundations of Japanese with detailed Hiragana and Katakana charts, complete with romaji equivalents and pronunciation guides.
            </CardDescription>
          </Card>

          <Card>
            <CardIcon>
              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
              </svg>
            </CardIcon>
            <CardTitle>Immersive Cultural Blog</CardTitle>
            <CardDescription>
              Dive deeper into Japan's rich heritage through our beautifully designed blog, featuring a distraction-free and highly readable UI.
            </CardDescription>
          </Card>

          <Card>
            <CardIcon>
              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </CardIcon>
            <CardTitle>Community Support</CardTitle>
            <CardDescription>
              Help keep the application continuously improving and growing through our new community-driven Donation Feature. Every bit helps us build more.
            </CardDescription>
          </Card>

          <Card>
            <CardIcon>
              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </CardIcon>
            <CardTitle>Localized Accessibility</CardTitle>
            <CardDescription>
              Fully supporting Indonesian language preferences for an inclusive and native-feeling educational experience.
            </CardDescription>
          </Card>
        </Grid>
        
        <FooterNote>
          <strong>Happy Learning!</strong><br />
          &mdash; The Japan Learning App Team
        </FooterNote>
      </GridSection>
    </Container>
  );
}
