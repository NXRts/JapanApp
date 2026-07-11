"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { CoffeeIcon } from "./icons/AppIcons";

const FooterRoot = styled.footer`
  background: var(--surface);
  border-top: 1px solid var(--border);
  padding: 0;
  margin-top: auto;
  color: var(--text-secondary);
  font-size: 0.95rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--primary-light),
      transparent
    );
    opacity: 0.3;
  }
`;

const NewsletterSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 968px) {
    flex-direction: column;
    text-align: center;
    padding: 3rem 1.5rem;
  }
`;

const NewsletterText = styled.div`
  h3 {
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--foreground);
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;

    span {
      background: linear-gradient(
        135deg,
        var(--primary) 0%,
        var(--primary-light) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  p {
    opacity: 0.8;
    max-width: 400px;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 0.75rem;
  width: 100%;
  max-width: 450px;

  input {
    flex: 1;
    padding: 0.875rem 1.25rem;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--background);
    color: var(--foreground);
    font-size: 0.95rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
    }
  }

  button {
    padding: 0.875rem 1.5rem;
    border-radius: 12px;
    background: var(--primary);
    color: white;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
      background: var(--primary-dark);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    button {
      width: 100%;
    }
  }
`;

const FooterMain = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 3rem 1rem;
  }
`;

const BrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  p {
    line-height: 1.6;
    max-width: 320px;
    opacity: 0.8;
  }
`;

const Logo = styled(Link)`
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--foreground);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;

  span {
    background: linear-gradient(
      135deg,
      var(--primary) 0%,
      var(--primary-light) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  svg {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const ColumnTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 0.5rem;
  position: relative;
  width: fit-content;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 20px;
    height: 2px;
    background: var(--primary-light);
    border-radius: 2px;
  }
`;

const FooterLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--primary);
    transform: translateX(4px);
  }
`;

const Badge = styled.span`
  background: rgba(79, 70, 229, 0.1);
  color: var(--primary);
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.4rem;
`;

const FooterBottom = styled.div`
  background: var(--background);
  padding: 2rem;
  border-top: 1px solid var(--border);
`;

const BottomContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.div`
  font-size: 0.9rem;
  opacity: 0.7;

  a {
    color: var(--foreground);
    text-decoration: none;
    font-weight: 600;

    &:hover {
      color: var(--primary);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: white;
    background: var(--primary);
    border-color: var(--primary);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4);
  }

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;

const SupportButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const SupportButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background: var(--background);
  border: 1px solid var(--border);
  color: var(--foreground);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-light);
    background: var(--surface);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }

  span.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-light);
  }
`;

export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname() || "";

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/onboarding"
  )
    return null;

  return (
    <FooterRoot>
      <NewsletterSection>
        <NewsletterText>
          <h3>
            Stay <span>Updated</span>
          </h3>
          <p>Get the latest lessons and Kanji tips directly in your inbox.</p>
        </NewsletterText>
        <NewsletterForm onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email address" required />
          <button type="submit">Join Newsletter</button>
        </NewsletterForm>
      </NewsletterSection>

      <FooterMain>
        <BrandColumn>
          <Logo href="/">
            🇯🇵 <span>JapanApp</span>
          </Logo>
          <p>
            The comprehensive platform for mastering Japanese Kanji and Kana.
            Built for learners, by learners, with a focus on immersive
            experience.
          </p>
        </BrandColumn>

        <FooterColumn>
          <ColumnTitle>Learn</ColumnTitle>
          <FooterLink href="/characters">Character</FooterLink>
          <FooterLink href="/jlpt">JLPT</FooterLink>
          <FooterLink href="/study">Study</FooterLink>
          <FooterLink href="/quiz">Quiz Hub</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Resources</ColumnTitle>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/materi">Learning Material</FooterLink>
          <FooterLink href="/practice-sheets">Practice Sheets</FooterLink>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <FooterLink href="/about">About</FooterLink>
            <span style={{ color: "var(--text-secondary)", opacity: 0.4 }}>•</span>
            <FooterLink href="/contact">Contact</FooterLink>
          </div>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Support Us</ColumnTitle>
          <SupportButtonGroup>
            <SupportButton
              href="https://saweria.co/yusufarrofi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon">
                <CoffeeIcon size={18} />
              </span>{" "}
              Saweria
            </SupportButton>
            <SupportButton
              href="https://ko-fi.com/yusufarrofi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon">
                <CoffeeIcon size={18} />
              </span>{" "}
              Ko-fi
            </SupportButton>
          </SupportButtonGroup>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Legal</ColumnTitle>
          <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink href="/terms">Terms of Service</FooterLink>
          <FooterLink href="/cookies">Cookie Policy</FooterLink>
        </FooterColumn>
      </FooterMain>

      <FooterBottom>
        <BottomContent>
          <Copyright>
            &copy; {year} Japan Learning App by{" "}
            <a href="https://github.com/NXRts">NXRts</a>. Built with ❤️ for
            learners.
          </Copyright>
          <SocialLinks>
            <SocialIcon href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.352.062-2.277.277-3.085.591-.834.324-1.542.756-2.248 1.462s-1.138 1.414-1.462 2.248c-.314.808-.529 1.733-.591 3.085-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.062 1.352.277 2.277.591 3.085.324.834.756 1.542 1.462 2.248s1.414 1.138 2.248 1.462c.808.314 1.733.529 3.085.591 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.352-.062 2.277-.277 3.085-.591.834-.324 1.542-.756 2.248-1.462s1.138-1.414 1.462-2.248c.314-.808.529-1.733.591-3.085.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.062-1.352-.277-2.277-.591-3.085-.324-.834-.756-1.542-1.462-2.248s-1.414-1.138-2.248-1.462c-.808-.314-1.733-.529-3.085-.591-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="#" aria-label="Twitter">
              <svg viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </SocialIcon>
            <SocialIcon
              href="https://github.com/NXRts/JapanApp"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="#" aria-label="Discord">
              <svg viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.579.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z" />
              </svg>
            </SocialIcon>
          </SocialLinks>
        </BottomContent>
      </FooterBottom>
    </FooterRoot>
  );
}
