'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem 0;
  width: 100%;
`;

const ArrowIcon = styled.svg`
  width: 20px;
  height: 20px;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  fill: none;
  stroke: currentColor;
  stroke-width: 2.5; /* Slightly thicker for better visibility */
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  margin-left: -1rem; /* Visual alignment with content below */
  
  &:hover {
    color: var(--primary);
    background: rgba(79, 70, 229, 0.08); /* Light primary background */
    
    ${ArrowIcon} {
      transform: translateX(-4px);
    }
  }
`;

export function BackToHome() {
    const pathname = usePathname();

    if (pathname === '/') return null;

    return (
        <Container>
            <StyledLink href="/">
                <ArrowIcon viewBox="0 0 24 24">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </ArrowIcon>
                Back to Home
            </StyledLink>
        </Container>
    );
}
