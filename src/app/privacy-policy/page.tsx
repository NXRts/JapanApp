"use client";

import styled from "styled-components";

/* ─── Layout ─────────────────────────────────────────────────── */
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  color: var(--foreground);

  @media (max-width: 768px) {
    padding: 6rem 1.5rem 3rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-align: center;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Highlight = styled.div`
  background: rgba(79, 70, 229, 0.1);
  border: 1px solid rgba(79, 70, 229, 0.3);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 2.5rem;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
`;

const HighlightIcon = styled.span`
  font-size: 1.5rem;
  line-height: 1;
  flex-shrink: 0;
`;

const HighlightText = styled.p`
  color: var(--foreground);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;

  strong {
    color: var(--primary);
  }
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 0.6rem;

  &::before {
    content: "";
    width: 4px;
    height: 22px;
    background: linear-gradient(
      180deg,
      var(--primary) 0%,
      var(--secondary) 100%
    );
    border-radius: 2px;
    display: inline-block;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
`;

const Paragraph = styled.p`
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 0.975rem;

  @media (max-width: 768px) {
    font-size: 0.925rem;
    line-height: 1.65;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
`;

const ListItem = styled.li`
  color: var(--text-secondary);
  font-size: 0.975rem;
  line-height: 1.7;
  margin-bottom: 0.6rem;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: "→";
    position: absolute;
    left: 0;
    color: var(--primary);
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 0.925rem;
  }
`;

const TechBox = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 1rem 1.25rem;
  margin: 1rem 0;
  font-family: monospace;
  font-size: 0.875rem;
  color: var(--primary);
  line-height: 1.6;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin: 2rem 0;
`;

const ContactCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(79, 70, 229, 0.12),
    rgba(168, 85, 247, 0.12)
  );
  border: 1px solid rgba(79, 70, 229, 0.25);
  border-radius: 14px;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 0.5rem;

  a {
    color: var(--primary);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

/* ─── Page ───────────────────────────────────────────────────── */
export default function PrivacyPolicy() {
  const lastUpdated = "June 27, 2026";

  return (
    <Container>
      <Title>Privacy Policy</Title>
      <Subtitle>Last updated: {lastUpdated} · Effective immediately</Subtitle>

      {/* TL;DR callout */}
      <Highlight>
        <HighlightIcon>🔒</HighlightIcon>
        <HighlightText>
          <strong>TL;DR — Your data stays on your device.</strong> Japan
          Learning App is built offline-first. Your progress, quiz results, and
          learning data are stored locally in your browser&rsquo;s{" "}
          <code>localStorage</code> using AES-GCM encryption. We do not sell,
          share, or upload your personal learning data to any server.
        </HighlightText>
      </Highlight>

      {/* 1 */}
      <Section>
        <SectionTitle>1. Introduction</SectionTitle>
        <Paragraph>
          Welcome to <strong>Japan Learning App</strong> (&ldquo;we&rdquo;,
          &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We are committed to
          protecting your privacy and being transparent about the minimal data
          we interact with. This Privacy Policy describes our practices for the
          Japan Learning App website at{" "}
          <strong>https://japan-mee.vercel.app</strong> and the Android
          application distributed via Google Play.
        </Paragraph>
        <Paragraph>
          By using our services, you agree to this Privacy Policy. If you
          disagree, please discontinue use of the app.
        </Paragraph>
      </Section>

      <Divider />

      {/* 2 */}
      <Section>
        <SectionTitle>2. Data We Store Locally (On Your Device)</SectionTitle>
        <Paragraph>
          All learning-related data is stored{" "}
          <strong>exclusively on your device</strong> using the browser&apos;s{" "}
          <code>localStorage</code> API. We never transmit this data to our
          servers. The following data may be stored locally:
        </Paragraph>
        <List>
          <ListItem>
            <strong>Learning Progress</strong> — completed lessons, quiz scores,
            EXP points, and streak counts
          </ListItem>
          <ListItem>
            <strong>SRS Data</strong> — Spaced Repetition System cards with
            review schedules for Kanji and vocabulary
          </ListItem>
          <ListItem>
            <strong>Preferences</strong> — theme (dark/light), display settings,
            JLPT level selection
          </ListItem>
          <ListItem>
            <strong>Achievement Data</strong> — badges earned, milestones
            reached
          </ListItem>
        </List>
        <TechBox>
          Encryption: AES-GCM 256-bit (Web Crypto API){"\n"}
          Storage: Browser localStorage (client-side only){"\n"}
          Transmission: None — data never leaves your device
        </TechBox>
      </Section>

      <Divider />

      {/* 3 */}
      <Section>
        <SectionTitle>3. Data We Collect on Our Servers</SectionTitle>
        <Paragraph>
          Our servers collect <strong>minimal operational data</strong> required
          to keep the service running reliably and securely:
        </Paragraph>
        <List>
          <ListItem>
            <strong>Server Logs</strong> — IP address, request path, timestamp,
            HTTP status code. Retained for up to 30 days for security
            monitoring. These logs are never linked to your personal identity.
          </ListItem>
          <ListItem>
            <strong>Rate Limit Counters</strong> — Anonymous request counts
            stored in Redis (Upstash) to prevent API abuse. Reset every 60
            seconds. Contains no personal information.
          </ListItem>
          <ListItem>
            <strong>Error Logs</strong> — If a JavaScript error occurs, an
            anonymised error report (message + stack trace, no user data) may be
            sent to our <code>/api/log-error</code> endpoint to help us fix
            bugs.
          </ListItem>
        </List>
        <Paragraph>
          We do <strong>not</strong> collect: names, email addresses, payment
          information, precise location, contacts, or any other personally
          identifiable information (PII).
        </Paragraph>
      </Section>

      <Divider />

      {/* 4 */}
      <Section>
        <SectionTitle>4. Third-Party Services</SectionTitle>
        <Paragraph>
          We use a small number of trusted third-party services to deliver the
          app. Each has its own privacy policy:
        </Paragraph>
        <List>
          <ListItem>
            <strong>Vercel</strong> (hosting) — may collect standard web server
            logs.{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              vercel.com/legal/privacy-policy
            </a>
          </ListItem>
          <ListItem>
            <strong>Upstash Redis</strong> (rate limiting) — stores anonymous
            request counters.{" "}
            <a
              href="https://upstash.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              upstash.com/privacy
            </a>
          </ListItem>
          <ListItem>
            <strong>Google Fonts</strong> (typography) — fonts are loaded from
            Google servers; Google may log the request.{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              policies.google.com/privacy
            </a>
          </ListItem>
          <ListItem>
            <strong>Google Play</strong> (Android distribution) — subject to
            Google Play&apos;s own data collection practices.
          </ListItem>
        </List>
      </Section>

      <Divider />

      {/* 5 */}
      <Section>
        <SectionTitle>5. Cookies &amp; Local Storage</SectionTitle>
        <Paragraph>
          We use <strong>no tracking cookies</strong>. We use{" "}
          <code>localStorage</code> solely to persist your learning progress
          locally on your device. No cross-site tracking or advertising cookies
          are used.
        </Paragraph>
        <Paragraph>
          You can clear your local data at any time via your browser settings
          (Clear Site Data) or through the app&apos;s Settings → Reset Progress
          option.
        </Paragraph>
      </Section>

      <Divider />

      {/* 6 */}
      <Section>
        <SectionTitle>6. Data Security</SectionTitle>
        <Paragraph>
          We take security seriously. Here is what we do to protect your data:
        </Paragraph>
        <List>
          <ListItem>
            Local progress data is encrypted with{" "}
            <strong>AES-GCM 256-bit</strong> encryption using the Web Crypto API
            before being written to localStorage
          </ListItem>
          <ListItem>
            All network connections use <strong>HTTPS/TLS</strong> (enforced via
            Strict-Transport-Security header)
          </ListItem>
          <ListItem>
            API endpoints are protected by <strong>rate limiting</strong> (100
            requests/minute per IP via Redis)
          </ListItem>
          <ListItem>
            Security headers: CSP, X-Frame-Options DENY, X-Content-Type-Options
            nosniff, Permissions-Policy
          </ListItem>
          <ListItem>
            Input validation using <strong>Zod schemas</strong> on all API
            routes
          </ListItem>
        </List>
      </Section>

      <Divider />

      {/* 7 */}
      <Section>
        <SectionTitle>7. Your Rights (GDPR / CCPA)</SectionTitle>
        <Paragraph>
          Because we store no personal data on our servers, most GDPR/CCPA
          rights are automatically satisfied. Specifically:
        </Paragraph>
        <List>
          <ListItem>
            <strong>Right to Access</strong> — Your data lives in your browser.
            Open DevTools → Application → Local Storage to view it.
          </ListItem>
          <ListItem>
            <strong>Right to Deletion</strong> — Clear your browser&apos;s
            localStorage or use Settings → Reset Progress. Server logs are
            automatically deleted after 30 days.
          </ListItem>
          <ListItem>
            <strong>Right to Portability</strong> — Future update: export
            progress as JSON.
          </ListItem>
          <ListItem>
            <strong>Do Not Sell</strong> — We do not sell any data. Ever.
          </ListItem>
        </List>
      </Section>

      <Divider />

      {/* 8 */}
      <Section>
        <SectionTitle>8. Children&apos;s Privacy</SectionTitle>
        <Paragraph>
          Japan Learning App is designed for users aged 13 and above. We do not
          knowingly collect personal information from children under 13. If you
          believe a child under 13 is using the app, please contact us and we
          will take appropriate action. Users aged 13–17 should have parental
          consent.
        </Paragraph>
      </Section>

      <Divider />

      {/* 9 */}
      <Section>
        <SectionTitle>9. Changes to This Policy</SectionTitle>
        <Paragraph>
          We may update this Privacy Policy from time to time. When we do, we
          will update the &ldquo;Last updated&rdquo; date at the top of this
          page. Continued use of the app after changes constitutes acceptance of
          the updated policy.
        </Paragraph>
      </Section>

      <Divider />

      {/* 10 */}
      <Section>
        <SectionTitle>10. Contact Us</SectionTitle>
        <Paragraph>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy, please contact us:
        </Paragraph>
        <ContactCard>
          <ContactItem>
            <span>📧</span>
            <span>
              Email: <a href="mailto:japanapp@gmail.com">japanapp@gmail.com</a>
            </span>
          </ContactItem>
          <ContactItem>
            <span>🌐</span>
            <span>
              Website:{" "}
              <a
                href="https://japan-mee.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                japan-mee.vercel.app
              </a>
            </span>
          </ContactItem>
          <ContactItem>
            <span>📋</span>
            <span>
              Privacy Policy URL: https://japan-mee.vercel.app/privacy-policy
            </span>
          </ContactItem>
        </ContactCard>
      </Section>
    </Container>
  );
}
