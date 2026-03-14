'use client';

import styled from 'styled-components';
import Link from 'next/link';

// Styled Components
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 90vh;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.1rem;
  background: linear-gradient(135deg, var(--foreground) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const HubCardLink = styled(Link)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2.5rem;
  text-decoration: none;
  color: var(--foreground);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.06), transparent 40%);
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.2);
    border-color: var(--primary);

    &::before {
      opacity: 1;
    }
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
`;

const IconWrapper = styled.div<{ $color: string }>`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: ${({ $color }) => `rgba(${$color}, 0.1)`};
  color: ${({ $color }) => `rgb(${$color})`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  svg {
    width: 32px;
    height: 32px;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const ActionButton = styled.div<{ $color: string }>`
  align-self: flex-start;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  background: ${({ $color }) => `rgba(${$color}, 0.1)`};
  color: ${({ $color }) => `rgb(${$color})`};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${HubCardLink}:hover & {
    background: ${({ $color }) => `rgb(${$color})`};
    color: white;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export default function MateriHubPage() {
  return (
    <Container>
      <Header>
        <Title>Materi Belajar</Title>
        <Subtitle>
          Kuasai Bahasa Jepang secara terstruktur melalui materi Tata Bahasa dan Kosakata pilihan.
        </Subtitle>
      </Header>

      <HubGrid>
        {/* Grammar Hub */}
        <HubCardLink href="/grammar">
          <CardContent>
            <IconWrapper $color="59, 130, 246"> {/* Blue color */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </IconWrapper>
            <CardTitle>Tata Bahasa (Grammar)</CardTitle>
            <CardDescription>
              Pelajari struktur kalimat, partikel, dan pola bahasa Jepang dari level N5 hingga N4 dengan penjelasan mendalam.
            </CardDescription>
            <ActionButton $color="59, 130, 246">
              Mulai Belajar
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </ActionButton>
          </CardContent>
        </HubCardLink>

        {/* Vocabulary Hub */}
        <HubCardLink href="/vocabulary">
          <CardContent>
            <IconWrapper $color="16, 185, 129"> {/* Emerald color */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </IconWrapper>
            <CardTitle>Kosakata (Vocabulary)</CardTitle>
            <CardDescription>
              Perkaya perbendaharaan kata Anda dengan ribuan kosakata yang disertai contoh kalimat dan audio cara pengucapan.
            </CardDescription>
            <ActionButton $color="16, 185, 129">
              Perkaya Kosakata
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </ActionButton>
          </CardContent>
        </HubCardLink>
      </HubGrid>
    </Container>
  );
}
