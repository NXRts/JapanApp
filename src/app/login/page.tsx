"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  padding: 1rem 1.25rem;
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

const ForgotPassword = styled(Link)`
  font-size: 0.85rem;
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  align-self: flex-end;

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark) 100%
  );
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

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy login logic
    alert("This is a dummy login. Feel free to explore the UI!");
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Log in to your account to continue your journey"
    >
      <Form onSubmit={handleSubmit}>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Label htmlFor="password">Password</Label>
            <ForgotPassword href="/login">Forgot Password?</ForgotPassword>
          </div>
          <Input
            type="password"
            id="password"
            placeholder="••••••••"
            required
          />
        </FormGroup>

        <SubmitButton type="submit">Log In</SubmitButton>
      </Form>

      <FooterText>
        Don't have an account? <Link href="/register">Sign Up</Link>
      </FooterText>
    </AuthLayout>
  );
}
