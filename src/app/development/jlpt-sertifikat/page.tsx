"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { JlptCertificate } from "@/components/jlpt/JlptCertificate";

export default function JlptCertificatePreviewPage() {
  // Mock data for previewing passing certificate
  const previewData = {
    totalPassed: true,
    totalScore: 145,
    sectionScores: {
      moji_goi: 52,
      bunpou_dokkai: 48,
      choukai: 45,
    },
    passThresholds: {
      total: 80,
      moji_goi: 19,
      bunpou_dokkai: 19,
      choukai: 19,
    },
  };

  return (
    <PageWrapper>
      <HeaderContainer className="no-print">
        <BreadcrumbNav>
          <Link href="/">Beranda</Link> &gt;{" "}
          <Link href="/development">Development Labs</Link> &gt;{" "}
          <span>Sertifikat JLPT N5</span>
        </BreadcrumbNav>

        <TitleCard>
          <BadgeTag>📜 CERTIFICATE PREVIEW LABS</BadgeTag>
          <h1>Pratinjau Sertifikat Resmi JLPT Level N5</h1>
          <p>
            Halaman khusus untuk melihat tampilan Sertifikat Resmi JLPT N5 (A4 Portrait), mengubah nama peserta, mengunggah pas foto 3x4 cm, serta mengunduh gambar (PNG) atau mencetak (PDF).
          </p>
        </TitleCard>
      </HeaderContainer>

      <JlptCertificate
        totalPassed={previewData.totalPassed}
        totalScore={previewData.totalScore}
        sectionScores={previewData.sectionScores}
        passThresholds={previewData.passThresholds}
      />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--background, #0f172a);
  color: var(--foreground, #f8fafc);
  padding: 2.5rem 1.5rem 6rem;

  @media print {
    background: #ffffff;
    padding: 0;
  }
`;

const HeaderContainer = styled.div`
  max-width: 820px;
  margin: 0 auto 1.5rem;
`;

const BreadcrumbNav = styled.nav`
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--foreground-secondary, #94a3b8);
  margin-bottom: 1.25rem;

  a {
    color: var(--primary, #3b82f6);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: var(--foreground);
  }
`;

const TitleCard = styled.div`
  background: var(--surface, #1e293b);
  border: 1px solid var(--border, #334155);
  border-radius: 20px;
  padding: 1.75rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  h1 {
    font-size: 1.75rem;
    font-weight: 900;
    color: var(--foreground);
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.95rem;
    color: var(--foreground-secondary, #94a3b8);
    line-height: 1.6;
  }
`;

const BadgeTag = styled.div`
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  padding: 4px 10px;
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
  margin-bottom: 0.75rem;
`;
