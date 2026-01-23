'use client';

import Link from 'next/link';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: var(--surface);
  border-top: 1px solid var(--border);
  padding: 3rem 2rem;
  margin-top: auto; /* Ensures it pushes down if flex parent exists */
  text-align: center;
  color: var(--text-secondary);
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
  font-size: 0.9rem;

  a {
    color: var(--primary);
    transition: color 0.2s;
    text-decoration: none;
    
    &:hover {
      color: var(--primary-dark);
      text-decoration: underline;
    }
  }
`;

export function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <Copyright>© {year} Japan Learning App. All rights reserved.</Copyright>
      <p style={{ fontSize: '0.85rem' }}>Designed for effective Kanji & Kana mastery.</p>
      
      <Links>
        <Link href="/about">About</Link>
        <Link href="#">Privacy Policy</Link>
        <Link href="#">Terms of Service</Link>
        <Link href="/contact">Contact</Link>
      </Links>
    </FooterContainer>
  );
}
