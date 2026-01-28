'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { jobs, values } from './data';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 4rem;
`;

const HeroSection = styled.section`
  padding: 8rem 2rem 6rem;
  text-align: center;
  background: radial-gradient(circle at center, rgba(79, 70, 229, 0.05) 0%, transparent 70%);
  margin-top: -70px;
  padding-top: calc(8rem + 70px);

  @media (max-width: 768px) {
    padding: 6rem 1.5rem 4rem;
    padding-top: calc(6rem + 70px);
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--foreground);
  
  span {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2.25rem;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const ValuesSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--foreground);
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ValueCard = styled.div`
  background: var(--surface);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid var(--border);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ValueIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  color: var(--primary);
  
  svg {
    width: 48px;
    height: 48px;
    stroke-width: 1.5;
  }
`;

const ValueTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--foreground);
`;

const ValueDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.5;
`;

const JobsSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
`;

const JobList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const JobCard = styled.div`
  background: var(--surface);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 1.5rem;
  }
`;

const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const JobTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--foreground);
`;

const JobMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
    font-size: 0.85rem;
    
    span {
      white-space: nowrap;
    }
  }
`;

const ApplyButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: white;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: var(--primary-dark);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default function CareersPage() {
  return (
    <Container>
      <HeroSection>
        <Title>Join our <span>Mission</span></Title>
        <Subtitle>
          We're building the future of language learning.
          Help us connect the world through Japanese culture and language.
        </Subtitle>
      </HeroSection>

      <ValuesSection>
        <SectionTitle>Our Values</SectionTitle>
        <ValuesGrid>
          {values.map((value, index) => (
            <ValueCard key={index}>
              <ValueIcon>{value.icon}</ValueIcon>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDescription>{value.description}</ValueDescription>
            </ValueCard>
          ))}
        </ValuesGrid>
      </ValuesSection>

      <JobsSection>
        <SectionTitle>Open Positions</SectionTitle>
        <JobList>
          {jobs.map((job) => (
            <JobCard key={job.id}>
              <JobInfo>
                <JobTitle>{job.title}</JobTitle>
                <JobMeta>
                  <span>{job.department}</span> • <span>{job.location}</span> • <span>{job.type}</span>
                </JobMeta>
              </JobInfo>
              <ApplyButton href={`/careers/${job.slug}`}>View Details</ApplyButton>
            </JobCard>
          ))}
        </JobList>
      </JobsSection>
    </Container>
  );
}
