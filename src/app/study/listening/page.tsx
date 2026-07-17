"use client";

import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { listeningExercises } from "@/data/listening";
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

const ExerciseCard = styled(Link)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-decoration: none;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    border-color: #3b82f6;
    box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.3);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at top right,
      rgba(59, 130, 246, 0.05),
      transparent 50%
    );
    pointer-events: none;
  }
`;

const LevelBadge = styled.span<{ $level: string }>`
  background: ${(props) =>
    props.$level === "N5"
      ? "var(--primary)"
      : props.$level === "N4"
        ? "#10b981"
        : props.$level === "N3"
          ? "#f59e0b"
          : "#3b82f6"};
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
`;

const ExerciseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ExerciseTitle = styled.h2`
  font-size: 1.6rem;
  color: var(--foreground);
  margin-bottom: 0.5rem;
  font-weight: 800;
  line-height: 1.4;
`;

const ScenarioText = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: auto;
`;

const Tag = styled.span`
  font-size: 0.85rem;
  color: var(--text-secondary);
  background: var(--background);
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  font-weight: 500;
`;

const FilterBtn = styled.button<{ $active: boolean }>`
  padding: 0.6rem 1.75rem;
  border-radius: 99px;
  border: ${(props) => (props.$active ? "none" : "1px solid var(--border)")};
  background: ${(props) => (props.$active ? "#3b82f6" : "var(--surface)")};
  color: ${(props) => (props.$active ? "white" : "var(--foreground)")};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.$active
        ? "0 5px 15px rgba(59, 130, 246, 0.3)"
        : "0 5px 15px rgba(0,0,0,0.05)"};
  }
`;

export default function ListeningHub() {
  const [filter, setFilter] = useState<string>("All");
  const { progress } = useProgress();

  const filteredExercises =
    filter === "All"
      ? listeningExercises
      : listeningExercises.filter((e) => e.level === filter);

  const levels = ["All", "N5", "N4", "N3", "N2", "N1"];

  return (
    <Container>
      <BreadcrumbWrapper>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Study", href: "/study" },
          ]}
          current="Listening"
        />
      </BreadcrumbWrapper>

      <ContentWrapper>
        <Header>
          <Title>Listening Comprehension 🎧</Title>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.2rem",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Simulate JLPT Choukai. Listen to the audio and answer without
            reading the text.
          </p>

          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {levels.map((level) => (
              <FilterBtn
                key={level}
                $active={filter === level}
                onClick={() => setFilter(level)}
              >
                {level}
              </FilterBtn>
            ))}
          </div>
        </Header>

        <Grid>
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              href={`/study/listening/${exercise.id}`}
            >
              <ExerciseHeader>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
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
                <span style={{ fontSize: "1.2rem" }}>🔊</span>
              </ExerciseHeader>
              <ExerciseTitle>{exercise.title}</ExerciseTitle>
              <ScenarioText>{exercise.scenario}</ScenarioText>
              <Tags>
                {exercise.tags.map((tag) => (
                  <Tag key={tag}>#{tag}</Tag>
                ))}
              </Tags>
            </ExerciseCard>
          ))}
        </Grid>
      </ContentWrapper>
    </Container>
  );
}
