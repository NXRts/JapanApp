'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { jobs } from '../data';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: color 0.2s;
  
  &:hover {
    color: var(--primary);
  }
`;

const JobHeader = styled.div`
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 2rem;
`;

const JobTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--foreground);
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const JobMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  li {
    position: relative;
    padding-left: 1.5rem;
    color: var(--text-secondary);
    line-height: 1.6;
    
    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--primary);
      font-weight: bold;
    }
  }
`;

const ApplySection = styled.div`
  background: var(--surface);
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid var(--border);
  text-align: center;
  margin-top: 4rem;
`;

const ApplyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const ApplyText = styled.p`
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ApplyButton = styled.a`
  display: inline-block;
  padding: 1rem 3rem;
  background: var(--primary);
  color: white;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.2s;
  
  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

export default function JobDetailsPage() {
    const { slug } = useParams();
    const job = jobs.find((j) => j.slug === slug);

    if (!job) {
        return (
            <Container>
                <BackLink href="/careers">← Back to Careers</BackLink>
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Job Not Found</h1>
                    <p>The position you are looking for might have been filled or removed.</p>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <BackLink href="/careers">← Back to Careers</BackLink>

            <JobHeader>
                <JobTitle>{job.title}</JobTitle>
                <JobMeta>
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                </JobMeta>
            </JobHeader>

            <Section>
                <SectionTitle>About the Role</SectionTitle>
                <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>{job.description}</p>
            </Section>

            <Section>
                <SectionTitle>Responsibilities</SectionTitle>
                <List>
                    {job.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </List>
            </Section>

            <Section>
                <SectionTitle>Requirements</SectionTitle>
                <List>
                    {job.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </List>
            </Section>

            <ApplySection>
                <ApplyTitle>Ready to Join Us?</ApplyTitle>
                <ApplyText>
                    Send your resume and a short introduction to our recruiting team.
                    We can't wait to meet you!
                </ApplyText>
                <ApplyButton href={`mailto:careers@japanapp.example?subject=Application for ${job.title}`}>
                    Apply Now
                </ApplyButton>
            </ApplySection>
        </Container>
    );
}
