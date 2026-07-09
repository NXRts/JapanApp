"use client";

import styled from "styled-components";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { speakingExercises } from "@/data/speaking";
import { useProgress } from "@/context/ProgressContext";

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem 4rem;
  min-height: 90vh;

  @media (max-width: 1024px) {
    padding: 1rem 1rem 96px 1rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem 96px 0.5rem;
  }
`;

const BreadcrumbWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 0 1rem 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`;

const CategoryCard = styled(Link)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2rem;
  text-decoration: none;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    box-shadow: 0 10px 30px -10px rgba(79, 70, 229, 0.3);
  }
`;

const LevelBadge = styled.span<{ $level: string }>`
  background: ${(props) =>
    props.$level === "N5"
      ? "var(--primary)"
      : props.$level === "N4"
        ? "#10b981"
        : "#f59e0b"};
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  display: inline-block;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--foreground);
  margin-bottom: 0.5rem;
  font-weight: 800;
  line-height: 1.4;
`;

const ScenarioText = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

export default function SpeakingHub() {
  const { progress } = useProgress();

  return (
    <Container>
      <BreadcrumbWrapper>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Study", href: "/study" },
          ]}
          current="Speaking Roleplay"
        />
      </BreadcrumbWrapper>

      <ContentWrapper>
        <Header>
        <Title>Speaking Roleplay 🗣️</Title>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.2rem",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Practice Japanese conversation by shadowing real-life scenarios. Use
          your microphone to speak and respond to the AI.
        </p>
      </Header>

      <Grid>
        {speakingExercises.map((exercise) => (
          <CategoryCard
            key={exercise.id}
            href={`/study/speaking/${exercise.id}`}
          >
            <CardHeader>
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <LevelBadge $level={exercise.level}>
                  {exercise.level}
                </LevelBadge>
                {progress.completedExercises?.includes(exercise.id) && (
                  <span
                    style={{
                      background: "#10b981",
                      color: "white",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "99px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.2rem",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Completed
                  </span>
                )}
              </div>
              <span
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                }}
              >
                ⏱ {exercise.estimatedTime}
              </span>
            </CardHeader>
            <CardTitle>{exercise.title}</CardTitle>
            <ScenarioText>{exercise.scenario}</ScenarioText>

            <div
              style={{
                color: "var(--primary)",
                fontWeight: 600,
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>Start Roleplay &rarr;</span>
            </div>
          </CategoryCard>
        ))}
      </Grid>
      </ContentWrapper>
    </Container>
  );
}
