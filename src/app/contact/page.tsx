"use client";

import styled, { keyframes } from "styled-components";
import { useState } from "react";

// --- Icons ---
const MailIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const DiscordIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6h-11a3 3 0 0 0 -3 3v7a3 3 0 0 0 3 3h11a3 3 0 0 0 3 -3v-7a3 3 0 0 0 -3 -3z" />
    <path d="M8 12l1 .5" />
    <path d="M15 12l1 .5" />
    <path d="M9 15h6" />
  </svg>
);

const GithubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SendIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polyline points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// --- Animations ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shiroGlow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 5px rgba(var(--primary-rgb), 0.3)); }
  50% { filter: drop-shadow(0 0 15px rgba(var(--primary-rgb), 0.5)); }
`;

// --- Styled Components ---
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    gap: 2.5rem;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--accent), var(--primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactCard = styled.a`
  background: var(--surface);
  padding: 1.5rem;
  border-radius: 24px;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 1.25rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    padding: 1.25rem 1rem;
    gap: 1rem;
  }

  &:hover {
    transform: translateX(8px);
    border-color: var(--primary);
    box-shadow: var(--shadow-lg);
    background: var(--surface);
  }
`;

const IconWrapper = styled.div<{ $color: string }>`
  width: 54px;
  height: 54px;
  flex-shrink: 0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => `rgba(${props.$color}, 0.1)`};
  color: ${(props) => `rgb(${props.$color})`};
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    border-radius: 12px;
  }

  ${ContactCard}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow: hidden;
`;

const CardLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const CardValue = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ResponseBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(var(--secondary-rgb), 0.1);
  color: var(--secondary);
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 1rem;
  width: fit-content;
  border: 1px solid rgba(var(--secondary-rgb), 0.2);

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.6rem 1rem;
  }
`;

const FormContainer = styled.div`
  background: var(--surface);
  padding: 3rem;
  border-radius: 32px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-xl);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
    background: radial-gradient(
      circle at top right,
      rgba(var(--accent-rgb), 0.1),
      transparent
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--foreground);
  margin-left: 0.25rem;
`;

const Input = styled.input`
  padding: 1rem 1.25rem;
  border-radius: 16px;
  border: 2px solid var(--border);
  background: var(--background);
  color: var(--foreground);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.1);
    background: var(--surface);
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem 1.25rem;
  border-radius: 16px;
  border: 2px solid var(--border);
  background: var(--background);
  color: var(--foreground);
  font-size: 1rem;
  font-family: inherit;
  min-height: 160px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.1);
    background: var(--surface);
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const SubmitButton = styled.button`
  padding: 1.1rem;
  border-radius: 16px;
  border: none;
  background: var(--primary);
  color: white;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 14px 0 rgba(var(--primary-rgb), 0.39);

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.45);
    background: var(--primary-light);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    filter: grayscale(0.5);
  }
`;

const SuccessOverlay = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(var(--secondary-rgb), 0.1);
  color: var(--secondary);
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  animation: ${shiroGlow} 2s infinite;
`;

const FaqSection = styled.div`
  margin-top: 2rem;
`;

const FaqTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--foreground);

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const FaqGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const FaqCard = styled.div`
  background: var(--surface);
  padding: 1.75rem;
  border-radius: 20px;
  border: 1px solid var(--border);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary-light);
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: var(--primary-light);
  }

  p {
    font-size: 0.95rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }
`;

// --- Components ---
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <PageContainer>
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Contact" />
      <HeroSection>
        <Title>Say Konnichiwa!</Title>
        <Subtitle>
          Have questions about materials, quizzes, or just want to say hi? We
          always love to hear from our learning community.
        </Subtitle>
      </HeroSection>

      <ContentGrid>
        <InfoSection>
          <ContactCard href="mailto:support@japanapp.com">
            <IconWrapper $color="79, 70, 229">
              <MailIcon />
            </IconWrapper>
            <CardContent>
              <CardLabel>Quick Email</CardLabel>
              <CardValue>support@japanapp.com</CardValue>
            </CardContent>
          </ContactCard>

          <ContactCard href="https://discord.gg/japanapp" target="_blank">
            <IconWrapper $color="88, 101, 242">
              <DiscordIcon />
            </IconWrapper>
            <CardContent>
              <CardLabel>Community Discord</CardLabel>
              <CardValue>Join JapanApp Community</CardValue>
            </CardContent>
          </ContactCard>

          <ContactCard href="https://github.com/japanapp" target="_blank">
            <IconWrapper $color="255, 255, 255">
              <GithubIcon />
            </IconWrapper>
            <CardContent>
              <CardLabel>GitHub / X</CardLabel>
              <CardValue>@JapanApp_Official</CardValue>
            </CardContent>
          </ContactCard>

          <ResponseBadge>
            <ClockIcon />
            Usually responds in less than 24 hours
          </ResponseBadge>
        </InfoSection>

        <FormContainer>
          {submitted ? (
            <SuccessOverlay>
              <SuccessIcon>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </SuccessIcon>
              <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>
                Message Sent!
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
                Thank you for contacting us. Our team will review your message
                and reply as soon as possible.
              </p>
              <SubmitButton
                onClick={() => setSubmitted(false)}
                style={{
                  marginTop: "1rem",
                  width: "auto",
                  padding: "0.9rem 2rem",
                }}
              >
                Send Another Message
              </SubmitButton>
            </SuccessOverlay>
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label>Full Name</Label>
                  <Input type="text" placeholder="Enter your name" required />
                </FormGroup>
                <FormGroup>
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="name@email.com" required />
                </FormGroup>
              </FormRow>
              <FormGroup>
                <Label>Subject (Optional)</Label>
                <Input
                  type="text"
                  placeholder="What would you like to talk about?"
                />
              </FormGroup>
              <FormGroup>
                <Label>Your Message</Label>
                <TextArea
                  placeholder="Write the details of your question or feedback here..."
                  required
                />
              </FormGroup>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <SendIcon />
                  </>
                )}
              </SubmitButton>
            </Form>
          )}
        </FormContainer>
      </ContentGrid>

      <FaqSection>
        <FaqTitle>Frequently Asked Questions</FaqTitle>
        <FaqGrid>
          <FaqCard>
            <h3>How do I reset my learning progress?</h3>
            <p>
              You can do it through Settings &gt; Learning Data &gt; Reset
              Progress. Be careful, this action cannot be undone.
            </p>
          </FaqCard>
          <FaqCard>
            <h3>Is this app completely free?</h3>
            <p>
              Yes, the main material and quiz features are available for free to
              everyone. We rely on community support for server operations.
            </p>
          </FaqCard>
          <FaqCard>
            <h3>How do I report an error in the material?</h3>
            <p>
              Use the form above with the subject "Error Report" or contact us
              directly via Discord for a faster response.
            </p>
          </FaqCard>
        </FaqGrid>
      </FaqSection>
    </PageContainer>
  );
}
