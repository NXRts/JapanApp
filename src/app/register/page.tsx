'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/AuthLayout';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--foreground);
  margin-left: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1.25rem;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--foreground);
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    background: var(--surface);
    box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.1);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 20px -5px rgba(var(--primary-rgb), 0.4);
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px -5px rgba(var(--primary-rgb), 0.5);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TermsText = styled.p`
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.5;
  margin-top: 0.5rem;
  
  a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FooterText = styled.p`
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  
  a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 700;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function RegisterPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy registration logic
    alert('This is a dummy registration. Welcome to JapanApp!');
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join the community and start mastering Japanese"
    >
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Full Name</Label>
          <Input 
            type="text" 
            id="name" 
            placeholder="John Doe" 
            required 
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email Address</Label>
          <Input 
            type="email" 
            id="email" 
            placeholder="name@example.com" 
            required 
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input 
            type="password" 
            id="password" 
            placeholder="Min. 8 characters" 
            required 
            minLength={8}
          />
        </FormGroup>

        <SubmitButton type="submit">Get Started</SubmitButton>
        
        <TermsText>
          By signing up, you agree to our <Link href="/register">Terms of Service</Link> and <Link href="/register">Privacy Policy</Link>.
        </TermsText>
      </Form>
      
      <FooterText>
        Already have an account? <Link href="/login">Log In</Link>
      </FooterText>
    </AuthLayout>
  );
}
