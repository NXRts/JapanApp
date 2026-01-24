'use client';

import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 80vh;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, var(--accent), var(--primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  background: var(--surface);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
    gap: 1.25rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-secondary);
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--background);
  color: var(--foreground);
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--background);
  color: var(--foreground);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const SubmitButton = styled.button`
  padding: 1rem;
  border-radius: 12px;
  border: none;
  background: var(--primary);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background: var(--text-secondary);
    cursor: not-allowed;
  }
`;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  return (
    <Container>
      <Title>Contact Us</Title>
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--surface)', borderRadius: '20px', border: '1px solid var(--border)' }}>
          <h2 style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>Message Sent!</h2>
          <p>Thank you for reaching out. We will get back to you shortly.</p>
          <button
            onClick={() => setSubmitted(false)}
            style={{ marginTop: '1.5rem', padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', borderRadius: '8px', cursor: 'pointer' }}
          >
            Send another message
          </button>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Name</Label>
            <Input type="text" placeholder="Your Name" required />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" placeholder="your@email.com" required />
          </FormGroup>
          <FormGroup>
            <Label>Message</Label>
            <TextArea placeholder="How can we help you?" required />
          </FormGroup>
          <SubmitButton type="submit">Send Message</SubmitButton>
        </Form>
      )}
    </Container>
  );
}
