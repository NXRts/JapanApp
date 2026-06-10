"use client";

import styled from "styled-components";

const Section = styled.section`
  padding: 3rem 1rem;
  margin-bottom: 2rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--primary-light),
      transparent
    );
    opacity: 0.5;
  }
`;

const StatsGrid = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    text-align: left;
    padding: 1rem 1.5rem;
  }
`;

const StatNumber = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--primary);
  line-height: 1;
  margin-bottom: 0.5rem;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-light) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 4px rgba(79, 70, 229, 0.2));

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 0;
  }
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export function StatsSection() {
  return (
    <Section>
      <StatsGrid>
        <StatItem>
          <StatNumber>2,136</StatNumber>
          <StatLabel>Joyo Kanji</StatLabel>
        </StatItem>
        <StatItem
          style={{
            borderColor: "rgba(var(--primary-rgb), 0.3)",
            boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.1)",
          }}
        >
          <StatNumber>JLPT</StatNumber>
          <StatLabel>N5 to N1 Ready</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>100%</StatNumber>
          <StatLabel>Interactive</StatLabel>
        </StatItem>
      </StatsGrid>
    </Section>
  );
}
