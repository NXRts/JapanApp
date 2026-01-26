'use client';

import Link from 'next/link';
import styled from 'styled-components';

const FooterRoot = styled.footer`
  background: var(--surface);
  border-top: 1px solid var(--border);
  padding: 4rem 2rem 2rem;
  margin-top: auto;
  color: var(--text-secondary);
  font-size: 0.95rem;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem 2rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: left;
  }
`;

const BrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  p {
    line-height: 1.6;
    max-width: 300px;
    opacity: 0.8;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--foreground);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const ColumnTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 0.25rem;
`;

const FooterLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    color: var(--primary);
    transform: translateX(2px);
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--border);
  margin: 0 auto 2rem;
  max-width: 1200px;
  opacity: 0.5;
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
`;

const Copyright = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  
  a {
    color: var(--primary-light);
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
      color: var(--primary);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  a {
    color: var(--text-secondary);
    transition: color 0.2s;
    
    &:hover {
      color: var(--primary);
    }
  }
`;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterRoot>
      <FooterContent>
        <BrandColumn>
          <Logo href="/">
            🇯🇵 <span>JapanApp</span>
          </Logo>
          <p>
            The comprehensive platform for mastering Japanese Kanji and Kana.
            Built for learners, by learners.
          </p>
        </BrandColumn>

        <FooterColumn>
          <ColumnTitle>Learn</ColumnTitle>
          <FooterLink href="/kanji">Kanji Library</FooterLink>
          <FooterLink href="/kana">Hiragana & Katakana</FooterLink>
          <FooterLink href="/practice">Practice Mode</FooterLink>
          <FooterLink href="/daily-quiz">Daily Quiz</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Company</ColumnTitle>
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/careers">Careers</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Legal</ColumnTitle>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/terms">Terms of Service</FooterLink>
          <FooterLink href="/cookies">Cookie Policy</FooterLink>
        </FooterColumn>
      </FooterContent>

      <Divider />

      <FooterBottom>
        <Copyright>
          &copy; {year} Japan Learning App by <a href="https://github.com/NXRts">NXRts</a>. All rights reserved.
        </Copyright>
        <SocialLinks>
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="Twitter">Twitter</a>
          <a href="https://github.com/NXRts/JapanApp" aria-label="GitHub">GitHub</a>
          <a href="#" aria-label="Discord">Discord</a>
        </SocialLinks>
      </FooterBottom>
    </FooterRoot>
  );
}
