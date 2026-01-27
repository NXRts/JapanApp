'use client';

import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 80vh;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.75rem; /* Slightly smaller for better wrapping */
    margin-bottom: 2rem;
    line-height: 1.3;
  }
`;

const Content = styled.div`
  background: var(--surface);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
  line-height: 1.8;
  color: var(--foreground);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: var(--text-secondary); /* Ensure consistent color */
  
  @media (max-width: 768px) {
    font-size: 1rem; /* Standard readable size */
    line-height: 1.6; /* Comfortable reading height */
  }
`;

export default function AboutPage() {
  return (
    <Container>
      <Title>About Japan Learning App</Title>
      <Content>
        <Paragraph>
          Welcome to the Japan Learning App, your ultimate companion for mastering the Japanese writing system.
          Our mission is to make learning Kanji, Hiragana, and Katakana accessible, interactive, and aesthetically pleasing.
        </Paragraph>
        <Paragraph>
          Whether you are studying for the JLPT N5 or aiming for advanced N1 proficiency, our tools are designed
          to support your journey. We combine modern web technologies with effective learning patterns to
          create a seamless experience.
        </Paragraph>
        <Paragraph>
          <strong>Key Features:</strong>
        </Paragraph>
        <ul style={{ paddingLeft: '20px', marginBottom: '1.5rem' }}>
          <li>Interactive Flashcards with stroke-order font support and audio pronunciation.</li>
          <li>Comprehensive JLPT N1-N5 Kanji lists.</li>
          <li>Kana (Hiragana & Katakana) mastery tables.</li>
          <li>Indonesian language support for accessibility.</li>
        </ul>
        <Paragraph>
          Happy Learning! <br />
          - The Japan Learning App Team
        </Paragraph>
      </Content>
    </Container>
  );
}
