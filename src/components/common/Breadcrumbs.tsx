'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  color: var(--text-secondary);
  font-family: 'DM Mono', monospace;
  width: 100%;
  margin-bottom: 1.5rem;
  
  /* Layout alignment - stays left even in centered containers */
  justify-content: flex-start;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-bottom: 1rem;
  }
`;

const CrumbLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

const Separator = styled.span`
  color: rgba(var(--foreground-rgb), 0.3);
`;

const CurrentPage = styled.span`
  color: var(--foreground);
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
