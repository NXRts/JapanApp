'use client';

import styled from 'styled-components';

const Section = styled.section`
  padding: 6rem 2rem;
  background: var(--surface);
  width: 100%;
`;

const FAQContainer = styled.div`
  max-width: 800px;
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

export function FAQSection() {
  return (
    <Section>
      <FAQContainer>
        <SectionTitle><span>Frequently Asked Questions</span></SectionTitle>
        <FAQItem>
          <Question>Is this app really free to use?</Question>
          <Answer>Yes! Our mission is to make Japanese language education accessible to everyone. You have full access to all Kanji, Kana, and quiz features completely free of charge.</Answer>
        </FAQItem>
        <FAQItem>
          <Question>Is this suitable for absolute beginners?</Question>
          <Answer>Absolutely. We recommend starting with the &quot;Hiragana &amp; Katakana&quot; section to master the alphabets before moving on to Kanji.</Answer>
        </FAQItem>
        <FAQItem>
          <Question>Do I need to create an account?</Question>
          <Answer>No account is required to start studying. We believe in removing barriers to entry so you can start learning immediately.</Answer>
        </FAQItem>
      </FAQContainer>
    </Section>
  );
}
