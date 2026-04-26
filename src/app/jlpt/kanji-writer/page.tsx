'use client';

import React from 'react';
import styled from 'styled-components';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;
  padding: 2rem;
  min-height: 100vh;
  color: var(--foreground);
`;

export default function KanjiWriterPage() {
  return (
    <PageContainer>
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'JLPT Mastery', href: '/jlpt' }
        ]} 
        current="Kanji Writer" 
      />
      <div>
        <h1>Kanji Writer</h1>
        <p>Halaman ini masih kosong. Silakan berikan contoh isinya.</p>
      </div>
    </PageContainer>
  );
}
