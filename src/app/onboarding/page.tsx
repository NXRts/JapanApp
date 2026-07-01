"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { AuthLayout } from "@/components/auth/AuthLayout";

// ─── Styled Components ────────────────────────────────────────────────────────
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
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

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 1rem 1.25rem;
  background: var(--background);
  border: 1px solid
    ${({ $hasError }) => ($hasError ? "var(--accent)" : "var(--border)")};
  border-radius: 12px;
  color: var(--foreground);
  font-size: 1rem;
  transition: all 0.2s ease;
  outline: none;

  /* Restore selectability for input */
  user-select: text;
  -webkit-user-select: text;
  -webkit-touch-callout: default;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? "var(--accent)" : "var(--primary)")};
    background: var(--surface);
    box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.1);
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const CharCount = styled.span`
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8rem;
  color: var(--text-secondary);
  opacity: 0.7;
  pointer-events: none;
`;

const ErrorMsg = styled.p`
  font-size: 0.8rem;
  color: var(--accent);
  margin-top: 0.25rem;
  min-height: 1.1rem;
  font-weight: 500;
`;

const SubmitButton = styled.button<{ $disabled: boolean }>`
  width: 100%;
  padding: 1rem;
  background: ${({ $disabled }) =>
    $disabled
      ? "var(--border)"
      : "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)"};
  color: ${({ $disabled }) => ($disabled ? "var(--text-secondary)" : "white")};
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 700;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $disabled }) =>
    $disabled ? "none" : "0 10px 20px -5px rgba(var(--primary-rgb), 0.4)"};
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px -5px rgba(var(--primary-rgb), 0.5);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const FooterText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;

  span {
    color: var(--primary);
    font-weight: 600;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
const MAX_NAME_LENGTH = 20;

function OnboardingForm() {
  const { progress, initializeName } = useProgress();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const redirectTarget = searchParams.get("redirect") || "/learning";

  // Auto-focus the input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // If user already has a name, redirect immediately to target
  useEffect(() => {
    if (progress.hasSetName) {
      router.replace(decodeURIComponent(redirectTarget));
    }
  }, [progress.hasSetName, redirectTarget, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, MAX_NAME_LENGTH);
    setName(val);
    if (error && val.trim().length >= 2) setError("");
  };

  const validate = (): boolean => {
    const trimmed = name.trim();
    if (!trimmed || trimmed.length < 2) {
      setError("Nama harus minimal 2 karakter.");
      return false;
    }
    if (/[<>{}[\]/\\|`^]/.test(trimmed)) {
      setError("Nama mengandung karakter yang tidak diizinkan.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    initializeName(name.trim());
    // Redirect will fire automatically via useEffect above
  };

  const isDisabled = name.trim().length < 2;

  return (
    <AuthLayout
      title="Siapa Namamu?"
      subtitle="Masukkan namamu untuk mulai perjalanan belajar bahasa Jepang."
    >
      <Form onSubmit={handleSubmit} noValidate>
        <FormGroup>
          <Label htmlFor="onboarding-name">Nama Kamu</Label>
          <InputWrapper>
            <Input
              ref={inputRef}
              id="onboarding-name"
              type="text"
              autoComplete="given-name"
              placeholder="Contoh: Budi, Sari, Aiko..."
              value={name}
              onChange={handleChange}
              $hasError={!!error}
              maxLength={MAX_NAME_LENGTH}
              aria-required="true"
            />
            {name.length > 0 && (
              <CharCount>
                {name.length}/{MAX_NAME_LENGTH}
              </CharCount>
            )}
          </InputWrapper>
          <ErrorMsg>{error}</ErrorMsg>
        </FormGroup>

        <SubmitButton
          type="submit"
          $disabled={isDisabled}
          disabled={isDisabled}
        >
          {isDisabled ? "Masukkan nama dulu..." : "Mulai Belajar →"}
        </SubmitButton>
      </Form>

      <FooterText>
        Tidak perlu email atau password.
        <br />
        <span>Progresmu tersimpan lokal di perangkat ini.</span>
      </FooterText>
    </AuthLayout>
  );
}

/**
 * Default export wraps the form in Suspense because useSearchParams()
 * requires a Suspense boundary when statically generating the page.
 */
export default function OnboardingPage() {
  return (
    <Suspense fallback={null}>
      <OnboardingForm />
    </Suspense>
  );
}
