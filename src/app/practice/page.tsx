'use client';

import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--foreground) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 800px;
`;

const Card = styled(Link)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2.5rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    box-shadow: var(--shadow-lg);
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(79, 70, 229, 0.05));
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

export default function PracticePage() {
    return (
        <Container>
            <Header>
                <Title>Practice Mode</Title>
                <Subtitle>
                    Reinforce your learning with interactive quizzes and writing exercises.
                    Choose a category to get started.
                </Subtitle>
            </Header>

            <Grid>
                <Card href="/practice/kana">
                    <IconWrapper>あ</IconWrapper>
                    <CardTitle>Kana Quiz</CardTitle>
                    <CardDescription>
                        Test your knowledge of Hiragana and Katakana with quick-fire multiple choice questions.
                    </CardDescription>
                </Card>

                <Card href="/practice/kanji">
                    <IconWrapper>✍️</IconWrapper>
                    <CardTitle>Kanji Flashcards</CardTitle>
                    <CardDescription>
                        Practice writing Kanji and memorize meanings with our digital flashcard system.
                    </CardDescription>
                </Card>
            </Grid>
        </Container>
    );
}
