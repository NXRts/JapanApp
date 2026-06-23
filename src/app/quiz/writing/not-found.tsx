import Link from "next/link";
import styled from "styled-components";

export const dynamic = 'force-static';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background: var(--surface);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  color: var(--foreground);
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 500px;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Button = styled(Link)`
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
  border-bottom: 4px solid rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

export default function NotFound() {
  return (
    <Container>
      <Title>Writing Quiz Not Found</Title>
      <Message>
        The writing quiz page you're looking for doesn't exist. Please check the URL or return to the main page.
      </Message>
      <Button href="/quiz">Back to Quizzes</Button>
    </Container>
  );
}
