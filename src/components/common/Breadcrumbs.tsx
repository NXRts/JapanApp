'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  width: 100%;
  
  /* Layout alignment - stays left even in centered containers */
  justify-content: flex-start;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const CrumbLink = styled(Link)`
  color: var(--foreground);
  text-decoration: none;
  font-weight: 800;
  letter-spacing: -0.02em;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

const Separator = styled.span`
  opacity: 0.3;
  font-weight: 300;
`;

const CurrentPage = styled.span`
  font-weight: 500;
  opacity: 0.6;
  color: var(--text-secondary);
`;

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  current: string;
}

export function Breadcrumbs({ items = [], current }: BreadcrumbsProps) {
  return (
    <Nav aria-label="Breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          <CrumbLink href={item.href}>
            {item.label}
          </CrumbLink>
          <Separator className="separator">/</Separator>
        </React.Fragment>
      ))}
      <CurrentPage className="current">{current}</CurrentPage>
    </Nav>
  );
}
