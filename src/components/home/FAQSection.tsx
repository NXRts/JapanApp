'use client';

import { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 8rem 2rem;
  background: var(--background);
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.75rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 5rem;
  color: var(--foreground);
  
  span {
    position: relative;
    z-index: 1;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 5px;
      background: var(--primary);
      border-radius: 2px;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

const AccordionItem = styled.div<{ $isOpen: boolean }>`
  margin-bottom: 1.25rem;
  border-radius: 24px;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid ${props => props.$isOpen ? 'rgba(var(--primary-rgb), 0.3)' : 'var(--border)'};
  border-left: 4px solid ${props => props.$isOpen ? 'var(--primary-light)' : 'transparent'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.$isOpen ? '0 10px 40px -10px rgba(var(--primary-rgb), 0.2)' : 'none'};

  &:hover {
    border-color: rgba(var(--primary-rgb), 0.3);
    background: var(--surface);
    filter: brightness(1.05);
    transform: translateX(5px);
  }
`;

const QuestionButton = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  padding: 1.75rem 2rem;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
  color: ${props => props.$isOpen ? 'var(--primary-light)' : 'var(--foreground)'};
  transition: color 0.3s ease;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 800;
    margin-right: 1.5rem;
    letter-spacing: -0.01em;
  }

  @media (max-width: 768px) {
    padding: 1.25rem 1.5rem;
    h3 { font-size: 1rem; }
  }
`;

const Chevron = styled.div<{ $isOpen: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$isOpen ? 'var(--primary-light)' : 'var(--text-secondary)'};
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotate(${props => props.$isOpen ? '180deg' : '0deg'});

  svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    stroke-width: 2.5;
    fill: none;
  }
`;

const AnswerWrapper = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? '350px' : '0'};
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.04, 0.62, 0.23, 0.98);
  opacity: ${props => props.$isOpen ? '1' : '0'};
`;

const AnswerContent = styled.div<{ $isOpen: boolean }>`
  padding: 0 2rem 2.25rem;
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1.05rem;
  transform: translateY(${props => props.$isOpen ? '0' : '15px'});
  transition: transform 0.6s cubic-bezier(0.04, 0.62, 0.23, 0.98), opacity 0.4s ease;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem 1.75rem;
    font-size: 0.95rem;
  }
`;

const faqs = [
  {
    question: "Is this app really free to use?",
    answer: "Yes! Our mission is to make Japanese language education accessible to everyone. You have full access to all Kanji, Kana, Roadmap, and Interactive Hub features completely free of charge."
  },
  {
    question: "How does the Interactive Kanji Writer work?",
    answer: "Our Kanji Writer uses a real-time recognition engine. It guides you through the correct stroke order and provides instant feedback on your writing accuracy, helping you build muscle memory."
  },
  {
    question: "What is the Learning Roadmap?",
    answer: "The Roadmap is a structured, step-by-step path designed to take you from absolute beginner (N5) to advanced proficiency (N1). It organizes Kanji, Vocabulary, and Grammar in the most logical learning order."
  },
  {
    question: "Can I practice specific Grammar like Particles or Verbs?",
    answer: "Absolutely! We have dedicated modules like 'Particle Master' and 'Verb Conjugator' that use interactive drills to help you master these traditionally difficult aspects of Japanese grammar."
  },
  {
    question: "What is the SRS Mastery System?",
    answer: "SRS (Spaced Repetition System) is an intelligent algorithm that tracks your memory for each character. It schedules reviews at the exact moment you're about to forget them, ensuring maximum long-term retention."
  },
  {
    question: "What kind of audio practice is in the Listening Lab?",
    answer: "The Listening Lab features various challenges ranging from simple character recognition to complex sentence comprehension, all using high-quality audio to sharpen your listening skills."
  },
  {
    question: "How is my progress saved?",
    answer: "Your progress is automatically saved locally in your browser. This includes your Roadmap status, Kanji mastery levels, and quiz scores, so you can pick up exactly where you left off."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section>
      <FAQContainer>
        <SectionTitle><span>Frequently Asked Questions</span></SectionTitle>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} $isOpen={openIndex === index}>
            <QuestionButton 
              $isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <h3>{faq.question}</h3>
              <Chevron $isOpen={openIndex === index}>
                <svg viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Chevron>
            </QuestionButton>
            <AnswerWrapper $isOpen={openIndex === index}>
              <AnswerContent $isOpen={openIndex === index}>
                {faq.answer}
              </AnswerContent>
            </AnswerWrapper>
          </AccordionItem>
        ))}
      </FAQContainer>
    </Section>
  );
}
