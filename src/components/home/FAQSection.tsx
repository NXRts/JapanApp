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
  background: #0f172a;
  border: 1px solid ${props => props.$isOpen ? 'rgba(79, 70, 229, 0.3)' : 'rgba(255, 255, 255, 0.08)'};
  border-left: 4px solid ${props => props.$isOpen ? 'var(--primary-light)' : 'transparent'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.$isOpen ? '0 10px 40px -10px rgba(79, 70, 229, 0.2)' : 'none'};

  &:hover {
    border-color: rgba(var(--primary-rgb), 0.3);
    background: #1e293b;
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
  color: ${props => props.$isOpen ? 'var(--primary-light)' : 'white'};
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
  max-height: ${props => props.$isOpen ? '300px' : '0'};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.$isOpen ? '1' : '0'};
`;

const AnswerContent = styled.div`
  padding: 0 2rem 2rem;
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 1.05rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem 1.5rem;
    font-size: 0.95rem;
  }
`;

const faqs = [
  {
    question: "Is this app really free to use?",
    answer: "Yes! Our mission is to make Japanese language education accessible to everyone. You have full access to all Kanji, Kana, and quiz features completely free of charge."
  },
  {
    question: "Is this suitable for absolute beginners?",
    answer: "Absolutely. We recommend starting with the 'Hiragana & Katakana' section to master the basic alphabets before moving on to Kanji study."
  },
  {
    question: "What is the SRS Mastery System?",
    answer: "SRS (Spaced Repetition System) is an algorithm that predicts when you are about to forget a character and schedules a review at that exact moment for maximum retention."
  },
  {
    question: "Do I need to create an account?",
    answer: "No account is required to start studying. We believe in removing barriers so you can begin your learning journey immediately."
  },
  {
    question: "Can I use the app offline?",
    answer: "Most core learning data is cached on your device, allowing you to review your favorite Kanji and Kana even without an internet connection."
  },
  {
    question: "How is my progress saved?",
    answer: "Currently, progress is saved locally in your browser. We are working on an optional cloud sync feature for those who wish to switch between devices."
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
              <AnswerContent>
                {faq.answer}
              </AnswerContent>
            </AnswerWrapper>
          </AccordionItem>
        ))}
      </FAQContainer>
    </Section>
  );
}
