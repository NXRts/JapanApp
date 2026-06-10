"use client";

import styled from "styled-components";
import React from "react";

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  color: var(--foreground);
  font-family: "Inter", sans-serif;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 50px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  @media (prefers-color-scheme: dark) {
    background-color: var(--surface);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }
`;

const PageTitle = styled.h1`
  color: var(--foreground);
  border-bottom: 4px solid var(--primary);
  padding-bottom: 15px;
  margin-bottom: 30px;
  font-size: 2.25rem;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SectionTitle = styled.h2`
  border-bottom: 2px solid var(--border);
  padding-bottom: 8px;
  margin-top: 50px;
  margin-bottom: 20px;
  color: var(--foreground);
  font-size: 1.5rem;
  font-weight: 700;
`;

const ActionableBox = styled.div`
  background-color: #f0fdf4;
  border-left: 5px solid #10b981;
  padding: 20px;
  margin-top: 20px;
  border-radius: 0 8px 8px 0;

  @media (prefers-color-scheme: dark) {
    background-color: rgba(16, 185, 129, 0.1);
  }

  h4 {
    margin-top: 0;
    color: #065f46;
    margin-bottom: 10px;
    font-size: 1.1rem;

    @media (prefers-color-scheme: dark) {
      color: #34d399;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 0.95rem;

  th,
  td {
    text-align: left;
    padding: 14px;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
  }

  th {
    background-color: var(--background);
    color: var(--text-secondary);
    font-weight: 600;
  }
`;

const Code = styled.code`
  background: var(--background);
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  color: #db2777;
  font-family: monospace;
`;

const Pre = styled.pre`
  background: #1e293b;
  color: #f8fafc;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.9rem;
  margin: 15px 0;
`;

const ColorSwatchBox = styled.div<{ bg: string }>`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  margin-right: 12px;
  vertical-align: middle;
  border: 1px solid var(--border);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  background-color: ${(props) => props.bg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 20px;
`;

const InteractiveCard = styled.div`
  background: var(--surface);
  padding: 2rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
`;

const Button = styled.button<{
  variant?: "primary" | "secondary" | "outline" | "specialty";
}>`
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${(props) =>
    props.variant === "primary" &&
    `
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: white;
    box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);
    &:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(79, 70, 229, 0.3); }
  `}

  ${(props) =>
    props.variant === "secondary" &&
    `
    background: var(--secondary);
    color: white;
    &:hover { transform: translateY(-2px); opacity: 0.9; }
  `}

  ${(props) =>
    props.variant === "outline" &&
    `
    background: transparent;
    border: 2px solid var(--primary);
    color: var(--primary);
    &:hover { background: var(--primary); color: white; }
  `}
  
  ${(props) =>
    props.variant === "specialty" &&
    `
    background: rgba(0, 212, 255, 0.05);
    border: 1px solid rgba(0, 212, 255, 0.3);
    color: #00d4ff;
    &:hover { background: #00d4ff; color: white; transform: translateY(-3px); }
  `}

  ${(props) =>
    !props.variant &&
    `
    background: var(--surface);
    color: var(--foreground);
    border: 1px solid var(--border);
    &:hover { background: var(--background); }
  `}
`;

export default function DesignSystemPage() {
  return (
    <PageWrapper>
      <Container>
        <PageTitle>Comprehensive Technical & UI/UX Audit</PageTitle>
        <p style={{ marginBottom: "20px", color: "var(--text-secondary)" }}>
          <strong>Auditor Roles:</strong> Senior UI/UX Auditor, Frontend
          Engineer, & Software Architect
          <br />
          <strong>Audit Focus:</strong> System Design, Frontend Architecture,
          Data Flow, and Quality Standards.
        </p>

        {/* SECTION 1 */}
        <SectionTitle>
          1. Color System (Color Palette & Accessibility)
        </SectionTitle>
        <p>
          The application uses a theme-based color scheme (Light/Dark mode) with
          pure CSS Variables implementation.
        </p>

        <Table>
          <thead>
            <tr>
              <th>Color Role</th>
              <th>HEX Code</th>
              <th>Preview</th>
              <th>Contrast Analysis (WCAG)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Primary (Indigo)</td>
              <td>
                <Code>#4F46E5</Code>
              </td>
              <td>
                <ColorSwatchBox bg="var(--primary)" />
              </td>
              <td>
                <span style={{ color: "#10B981", fontWeight: 700 }}>
                  Pass (AAA)
                </span>{" "}
                against white text. Very safe.
              </td>
            </tr>
            <tr>
              <td>Primary Light</td>
              <td>
                <Code>#818CF8</Code>
              </td>
              <td>
                <ColorSwatchBox bg="var(--primary-light)" />
              </td>
              <td>
                <span style={{ color: "#F59E0B", fontWeight: 700 }}>
                  Warning (AA)
                </span>{" "}
                - Low contrast if used for small text on a white background.
              </td>
            </tr>
            <tr>
              <td>Secondary (Emerald)</td>
              <td>
                <Code>#10B981</Code>
              </td>
              <td>
                <ColorSwatchBox bg="var(--secondary)" />
              </td>
              <td>
                <span style={{ color: "#10B981", fontWeight: 700 }}>Pass</span>{" "}
                against a white background.
              </td>
            </tr>
            <tr>
              <td>Background (Light)</td>
              <td>
                <Code>#F1F5F9</Code>
              </td>
              <td>
                <ColorSwatchBox bg="var(--background)" />
              </td>
              <td>
                <span style={{ color: "#10B981", fontWeight: 700 }}>Pass</span>{" "}
                High contrast with dark text.
              </td>
            </tr>
            <tr>
              <td>Background (Dark)</td>
              <td>
                <Code>#0F172A</Code>
              </td>
              <td>
                <ColorSwatchBox bg="var(--background)" />
              </td>
              <td>
                <span style={{ color: "#10B981", fontWeight: 700 }}>Pass</span>{" "}
                High contrast with light text.
              </td>
            </tr>
          </tbody>
        </Table>

        {/* SECTION 2 */}
        <SectionTitle>2. Typography (Typography & Hierarchy)</SectionTitle>
        <ul>
          <li style={{ marginBottom: "10px" }}>
            <strong>Font Family:</strong> <Code>'Inter'</Code> (Latin Alphabet)
            & <Code>'Noto Sans JP'</Code> (Japanese Characters). The best choice
            for language applications.
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>Text Hierarchy:</strong>
            <ul style={{ marginTop: "10px", marginLeft: "20px" }}>
              <li style={{ marginBottom: "5px" }}>
                <strong>Hero Title (H1):</strong> <Code>4.5rem</Code>, Font
                Weight <Code>900</Code>, Line Height <Code>1.1</Code>. Highly
                appropriate for Display Type.
              </li>
              <li>
                <strong>Body Text & Caption:</strong> Body size uses{" "}
                <Code>1rem</Code>. Caption/Level uses <Code>0.72rem</Code>{" "}
                monospace.
              </li>
            </ul>
          </li>
        </ul>
        <div
          style={{
            background: "var(--background)",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            marginTop: "20px",
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: 800, margin: 0 }}>
            Large Heading (H1)
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
              marginTop: "10px",
            }}
          >
            Subtitle with secondary contrast (H2/P)
          </p>
          <p style={{ fontSize: "1rem", marginTop: "10px" }}>
            Regular body text with a standard size that is very comfortable for
            users to read. 日本語のテキスト。
          </p>
        </div>

        {/* SECTION 3 */}
        <SectionTitle>
          3. Interactive UI Components (Live Showcase)
        </SectionTitle>
        <p style={{ marginBottom: "20px" }}>
          Below are the actual (Live) UI components rendered directly on this
          page based on the system CSS styles:
        </p>

        <h3 style={{ marginBottom: "15px" }}>A. Button Styles</h3>
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button>Default Button</Button>
          <Button variant="specialty">JLPT Challenge</Button>
        </div>

        <h3 style={{ marginBottom: "15px" }}>B. Interactive Cards</h3>
        <Grid>
          <InteractiveCard>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              Hiragana Materials
            </h3>
            <p
              style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}
            >
              Learn the basics of Japanese characters with interactive methods.
            </p>
            <Button variant="primary" style={{ width: "100%" }}>
              Start Learning
            </Button>
          </InteractiveCard>
          <InteractiveCard>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              Kanji Practice
            </h3>
            <p
              style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}
            >
              Test your Kanji writing and reading skills.
            </p>
            <Button variant="outline" style={{ width: "100%" }}>
              Practice Now
            </Button>
          </InteractiveCard>
        </Grid>

        {/* SECTION 4 */}
        <SectionTitle>4. Visual Asset Audit & Icon References</SectionTitle>
        <p>
          Examination of the <Code>src/components/icons/AppIcons.tsx</Code> file
          reveals manual (*hardcoded*) SVG creation.
        </p>
        <ActionableBox>
          <h4>💡 Actionable Insight (Software Architect):</h4>
          <p style={{ marginBottom: "10px" }}>
            Building manual SVGs in one large file is not scalable. It is highly
            recommended to switch to third-party libraries that are guaranteed
            consistent and optimized (Tree-shakable).
          </p>
          <strong>Modern Icon References:</strong>
          <ul style={{ marginTop: "10px", marginLeft: "20px" }}>
            <li>
              <strong>Lucide React:</strong> Pure outline style, uniform
              thickness (2px default). (<Code>npm install lucide-react</Code>).
            </li>
            <li>
              <strong>Heroicons:</strong> Created by the makers of Tailwind,
              perfectly complementing this application's UI style.
            </li>
          </ul>
        </ActionableBox>

        {/* SECTION 5 */}
        <SectionTitle>5. Data Flow Mapping & API References</SectionTitle>
        <p>
          Based on <Code>ProgressContext.tsx</Code>, this application relies
          heavily on <em>Client-Side Storage</em> (<Code>localStorage</Code>) to
          save vital user data.
        </p>

        <Pre>
          {`{
  "user_id": "usr_9a8b7c6d",
  "level": 5,
  "total_exp": 1240,
  "current_streak": 3,
  "srs_items": {
    "日": {
      "level": 3,
      "correct": 5,
      "next_review": "2026-05-18T10:00:00Z"
    }
  }
}`}
        </Pre>
        <ActionableBox>
          <h4>💡 Actionable Insight (Data Flow):</h4>
          <p>
            The <Code>localStorage</Code> save logic in <Code>useEffect</Code>{" "}
            runs <em>synchronously</em>. If data grows large (thousands of
            kanji), this will cause <strong>UI Blocking (Lag)</strong>. Consider
            switching to <strong>IndexedDB</strong> via a lightweight library
            like <Code>localforage</Code> or direct integration with Supabase
            PostgreSQL.
          </p>
        </ActionableBox>

        {/* SECTION 6 */}
        <SectionTitle>
          6. Interaction Design & User Experience (UX)
        </SectionTitle>
        <ul style={{ marginLeft: "20px" }}>
          <li style={{ marginBottom: "10px" }}>
            <strong>Reading Pattern (F-Shape):</strong> The layout follows
            Western reading habits. The main CTA is centrally highlighted
            (Central Focus).
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>Hamburger Button (Mobile):</strong> The touch area (
            <em>padding: 0.2rem</em> on screens &lt; 600px) is far below
            ergonomic standards (min 44px).
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>Mobile Menu Animation:</strong> The menu drops from the top,
            but there is no <em>overlay/backdrop</em> covering the remaining
            content below it.
          </li>
        </ul>

        <hr
          style={{
            marginTop: "50px",
            border: 0,
            borderTop: "1px solid var(--border)",
          }}
        />
        <p
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            fontSize: "0.85rem",
            marginTop: "20px",
          }}
        >
          Comprehensive Audit &copy; 2026 - Japan-App System Design & Technical
          Report.
        </p>
      </Container>
    </PageWrapper>
  );
}
