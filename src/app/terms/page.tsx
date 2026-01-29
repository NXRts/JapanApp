'use client';

import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  color: var(--foreground);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LastUpdated = styled.p`
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 3rem;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 4px;
    height: 24px;
    background: var(--primary);
    border-radius: 2px;
    display: inline-block;
  }
`;

const Paragraph = styled.p`
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 1rem;
  text-align: justify;
  
  a {
    color: var(--primary);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
  line-height: 1.8;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

export default function TermsOfService() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <Container>
            <Title>Terms of Service</Title>
            <LastUpdated>Last updated: {currentDate}</LastUpdated>

            <Section>
                <SectionTitle>1. Introduction</SectionTitle>
                <Paragraph>
                    Welcome to Japan App. These Terms of Service ("Terms") govern your use of our website and mobile application (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>2. Educational Content</SectionTitle>
                <Paragraph>
                    The content provided on Japan App, including but not limited to Kanji, Kana, vocabulary, and quizzes, is for educational purposes only. While we strive for accuracy, we cannot guarantee that all information is entirely free of errors. We reserve the right to modify or remove content at any time without prior notice.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>3. User Accounts</SectionTitle>
                <Paragraph>
                    When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                </Paragraph>
                <Paragraph>
                    You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>4. Intellectual Property</SectionTitle>
                <Paragraph>
                    The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Japan App and its licensors. The Service is protected by copyright, trademark, and other laws of both the Indonesia and foreign countries.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>5. Termination</SectionTitle>
                <Paragraph>
                    We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </Paragraph>
                <Paragraph>
                    All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>6. Limitation of Liability</SectionTitle>
                <Paragraph>
                    In no event shall Japan App, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>7. Changes</SectionTitle>
                <Paragraph>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
                </Paragraph>
                <Paragraph>
                    By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>8. Contact Us</SectionTitle>
                <Paragraph>
                    If you have any questions about these Terms, please contact us via email at <a href="mailto:japanapp@gmail.com">japanapp@gmail.com</a>.
                </Paragraph>
            </Section>
        </Container>
    );
}
