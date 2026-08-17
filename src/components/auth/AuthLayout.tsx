"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 450px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  box-shadow: var(--shadow-lg);
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(10px);

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: 800;
  text-decoration: none;
  color: var(--foreground);
  margin-bottom: 0.5rem;

  span {
    background: linear-gradient(
      135deg,
      var(--primary) 0%,
      var(--primary-light) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--foreground);
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
`;

const Glow = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(var(--primary-rgb), 0.15) 0%,
    transparent 70%
  );
  border-radius: 50%;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

import { JapanAppLogoIcon } from "@/components/common/JapanAppLogoIcon";

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <PageContainer>
      <Glow />
      <AuthCard>
        <LogoContainer>
          <Logo href="/">
            <JapanAppLogoIcon size={32} /> <span>JapanApp</span>
          </Logo>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </LogoContainer>
        {children}
      </AuthCard>
    </PageContainer>
  );
}
