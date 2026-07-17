"use client";

import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { readingPassages } from "@/data/reading";
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

const ArticleCard = styled(Link)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2.5rem 2rem;
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
        : props.$level === "N3"
          ? "#f59e0b"
          : "#3b82f6"};
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
`;

const ArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ArticleTitle = styled.h2`
  font-size: 1.6rem;
  color: var(--foreground);
  margin-bottom: 1rem;
  font-weight: 800;
  line-height: 1.4;
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
  background: ${(props) =>
    props.$active ? "var(--primary)" : "var(--surface)"};
  color: ${(props) => (props.$active ? "white" : "var(--foreground)")};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.$active
        ? "0 5px 15px rgba(79, 70, 229, 0.3)"
        : "0 5px 15px rgba(0,0,0,0.05)"};
  }
`;

export default function ReadingHub() {
  const [filter, setFilter] = useState<string>("All");
  const { progress } = useProgress();

  const filteredPassages =
    filter === "All"
      ? readingPassages
      : readingPassages.filter((p) => p.level === filter);

  const levels = ["All", "N5", "N4", "N3", "N2", "N1"];

  return (
    <Container>
      <BreadcrumbWrapper>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Study", href: "/study" },
          ]}
          current="Reading"
        />
      </BreadcrumbWrapper>

      <ContentWrapper>
        <Header>
          <Title>Reading Comprehension</Title>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.2rem",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Improve your Japanese reading speed and comprehension with
            JLPT-graded stories.
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
          {filteredPassages.map((passage) => (
            <ArticleCard key={passage.id} href={`/study/reading/${passage.id}`}>
              <ArticleHeader>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <LevelBadge $level={passage.level}>
                    {passage.level}
                  </LevelBadge>
                  {progress.completedExercises?.includes(passage.id) && (
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
                  ⏱ {passage.estimatedTime}
                </span>
              </ArticleHeader>
              <ArticleTitle>{passage.title}</ArticleTitle>
              <Tags>
                {passage.tags.map((tag) => (
                  <Tag key={tag}>#{tag}</Tag>
                ))}
              </Tags>
            </ArticleCard>
          ))}
        </Grid>
      </ContentWrapper>
    </Container>
  );
}
