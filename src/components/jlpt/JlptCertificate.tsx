"use client";

import React, { useState, useRef } from "react";
import styled from "styled-components";

export interface JlptCertificateProps {
  totalPassed: boolean;
  totalScore: number;
  sectionScores: {
    moji_goi: number;
    bunpou_dokkai: number;
    choukai: number;
  };
  passThresholds: {
    total: number;
    moji_goi: number;
    bunpou_dokkai: number;
    choukai: number;
  };
  onRetake?: () => void;
}

export function JlptCertificate({
  totalPassed,
  totalScore,
  sectionScores,
  passThresholds,
}: JlptCertificateProps) {
  const [participantName, setParticipantName] = useState("Learner JapanApp");
  const [isDownloading, setIsDownloading] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  // Generate deterministic serial number
  const certSerial = useRef(
    `JLPT-N5-${new Date().getFullYear()}-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`
  ).current;

  const todayDate = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPNG = async () => {
    if (!certRef.current) return;
    setIsDownloading(true);

    try {
      const element = certRef.current;
      const width = element.offsetWidth;
      const height = element.offsetHeight;

      const canvas = document.createElement("canvas");
      const scale = 2; // 2x DPI for ultra crisp image
      canvas.width = width * scale;
      canvas.height = height * scale;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get 2D context");

      ctx.scale(scale, scale);

      // SVG ForeignObject rendering technique
      const data = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml">
              ${new XMLSerializer().serializeToString(element)}
            </div>
          </foreignObject>
        </svg>
      `;

      const img = new Image();
      const svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        const a = document.createElement("a");
        a.download = `sertifikat-jlpt-n5-${participantName
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")}.png`;
        a.href = canvas.toDataURL("image/png");
        a.click();
        setIsDownloading(false);
      };

      img.onerror = () => {
        // Fallback for canvas print fallback
        window.print();
        setIsDownloading(false);
      };

      img.src = url;
    } catch (err) {
      console.error("PNG export error, falling back to print", err);
      window.print();
      setIsDownloading(false);
    }
  };

  return (
    <CertificateContainer>
      {/* Controls Bar */}
      <ControlBar className="no-print">
        <NameInputGroup>
          <label htmlFor="participant-name-input">👤 Nama di Sertifikat:</label>
          <input
            id="participant-name-input"
            type="text"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="Nama Lengkap Anda"
            maxLength={40}
          />
        </NameInputGroup>

        <ButtonGroup>
          <ActionButton onClick={handleDownloadPNG} disabled={isDownloading}>
            {isDownloading ? "⏳ Memproses..." : "📥 Unduh Gambar (PNG)"}
          </ActionButton>
          <ActionButton $variant="primary" onClick={handlePrint}>
            🖨️ Cetak / Simpan PDF
          </ActionButton>
        </ButtonGroup>
      </ControlBar>

      {/* Printable Certificate Frame */}
      <CertFrameWrapper ref={certRef} className="print-target">
        <CertOuterBorder>
          <CertInnerBorder $passed={totalPassed}>
            {/* Japanese Decorative Corner Motifs */}
            <CornerDecoration className="top-left">🌸</CornerDecoration>
            <CornerDecoration className="top-right">🌸</CornerDecoration>
            <CornerDecoration className="bottom-left">🌸</CornerDecoration>
            <CornerDecoration className="bottom-right">🌸</CornerDecoration>

            {/* Header Header */}
            <CertHeader>
              <CrestLogo>🇯🇵</CrestLogo>
              <CertKanjiTitle>日本語能力試験 模擬試験 成績証明書</CertKanjiTitle>
              <CertSubTitle>
                OFFICIAL JLPT N5 SIMULATION CERTIFICATE OF PERFORMANCE
              </CertSubTitle>
            </CertHeader>

            {/* Recipient Greeting */}
            <CertRecipientSection>
              <PresentedToText>Diberikan kepada / Presented to:</PresentedToText>
              <RecipientName>{participantName || "Participant"}</RecipientName>
              <RecipientDesc>
                Telah menyelesaikan Ujian Simulasi Resmi <b>JLPT Level N5</b> pada platform <b>JapanApp</b> dengan rincian pencapaian sebagai berikut:
              </RecipientDesc>
            </CertRecipientSection>

            {/* Score Grid Table */}
            <ScoreTableContainer>
              <ScoreTableHeader>
                <div>Bidang Uji (Subject)</div>
                <div>Skor (Score)</div>
                <div>Ambang Lulus (Cut-off)</div>
                <div>Status</div>
              </ScoreTableHeader>
              <ScoreTableRow>
                <div>言語知識 (文字・語彙) / Moji & Goi</div>
                <div>
                  <strong>{sectionScores.moji_goi}</strong> / 60
                </div>
                <div>{passThresholds.moji_goi} Poin</div>
                <StatusTag $passed={sectionScores.moji_goi >= passThresholds.moji_goi}>
                  {sectionScores.moji_goi >= passThresholds.moji_goi ? "LULUS" : "TDK LULUS"}
                </StatusTag>
              </ScoreTableRow>
              <ScoreTableRow>
                <div>言語知識 (文法)・読解 / Bunpou & Dokkai</div>
                <div>
                  <strong>{sectionScores.bunpou_dokkai}</strong> / 60
                </div>
                <div>{passThresholds.bunpou_dokkai} Poin</div>
                <StatusTag $passed={sectionScores.bunpou_dokkai >= passThresholds.bunpou_dokkai}>
                  {sectionScores.bunpou_dokkai >= passThresholds.bunpou_dokkai ? "LULUS" : "TDK LULUS"}
                </StatusTag>
              </ScoreTableRow>
              <ScoreTableRow>
                <div>聴解 / Listening (Choukai)</div>
                <div>
                  <strong>{sectionScores.choukai}</strong> / 60
                </div>
                <div>{passThresholds.choukai} Poin</div>
                <StatusTag $passed={sectionScores.choukai >= passThresholds.choukai}>
                  {sectionScores.choukai >= passThresholds.choukai ? "LULUS" : "TDK LULUS"}
                </StatusTag>
              </ScoreTableRow>
              <ScoreTableTotalRow $passed={totalPassed}>
                <div>TOTAL SKOR KESELURUHAN</div>
                <div>
                  <big>{totalScore}</big> / 180 Poin
                </div>
                <div>Min. {passThresholds.total} Poin</div>
                <FinalStatusBadge $passed={totalPassed}>
                  {totalPassed ? "合格 (PASSED)" : "不合格 (FAILED)"}
                </FinalStatusBadge>
              </ScoreTableTotalRow>
            </ScoreTableContainer>

            {/* Footer Signatures & Hanko Stamp */}
            <CertFooterSection>
              <FooterMeta>
                <div><strong>No. Seri Sertifikat:</strong> {certSerial}</div>
                <div><strong>Tanggal Terbit:</strong> {todayDate}</div>
                <div><strong>Penyelenggara:</strong> JapanApp Learning Labs</div>
              </FooterMeta>

              <HankoStampBox $passed={totalPassed}>
                <div className="hanko-circle">
                  <span>{totalPassed ? "合格" : "完了"}</span>
                  <small>JapanApp</small>
                </div>
                <div className="hanko-label">
                  {totalPassed ? "Official Verification Stamp" : "Participation Stamp"}
                </div>
              </HankoStampBox>
            </CertFooterSection>
          </CertInnerBorder>
        </CertOuterBorder>
      </CertFrameWrapper>
    </CertificateContainer>
  );
}

// --- Styled Components ---
const CertificateContainer = styled.div`
  margin: 2rem 0;
  width: 100%;

  @media print {
    @page {
      size: A4 landscape;
      margin: 0.5cm;
    }

    margin: 0;
    padding: 0;

    .no-print {
      display: none !important;
    }

    .print-target {
      box-shadow: none !important;
      border-radius: 0 !important;
    }
  }
`;

const ControlBar = styled.div`
  background: var(--surface, #1e293b);
  border: 1px solid var(--border, #334155);
  border-radius: 20px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.25rem;
  align-items: center;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const NameInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  width: 100%;

  label {
    font-size: 0.9rem;
    font-weight: 800;
    white-space: nowrap;
    color: var(--foreground);
    flex-shrink: 0;
  }

  input {
    flex: 1;
    min-width: 0;
    width: 100%;
    background: rgba(var(--foreground-rgb), 0.05);
    border: 1.5px solid var(--border);
    color: var(--foreground);
    padding: 0.65rem 1rem;
    border-radius: 12px;
    font-size: 0.92rem;
    font-weight: 700;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.2);
    }
  }

  @media (max-width: 550px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;

  @media (max-width: 850px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

const ActionButton = styled.button<{ $variant?: "primary" | "secondary" }>`
  background: ${({ $variant }) =>
    $variant === "primary"
      ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
      : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"};
  color: white;
  border: none;
  padding: 0.7rem 1.1rem;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.88rem;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  @media (max-width: 850px) {
    width: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CertFrameWrapper = styled.div`
  background: #ffffff;
  color: #0f172a;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
`;

const CertOuterBorder = styled.div`
  border: 4px double #d97706;
  border-radius: 14px;
  padding: 6px;
  background: #fffbeb;
`;

const CertInnerBorder = styled.div<{ $passed: boolean }>`
  border: 2px solid ${({ $passed }) => ($passed ? "#059669" : "#dc2626")};
  border-radius: 10px;
  padding: 2.5rem 2rem;
  position: relative;
  background: #ffffff;
  text-align: center;
`;

const CornerDecoration = styled.div`
  position: absolute;
  font-size: 1.4rem;

  &.top-left { top: 8px; left: 12px; }
  &.top-right { top: 8px; right: 12px; }
  &.bottom-left { bottom: 8px; left: 12px; }
  &.bottom-right { bottom: 8px; right: 12px; }
`;

const CertHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const CrestLogo = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.25rem;
`;

const CertKanjiTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 900;
  color: #1e3a8a;
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
`;

const CertSubTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 800;
  color: #b45309;
  letter-spacing: 0.15em;
`;

const CertRecipientSection = styled.div`
  margin-bottom: 1.75rem;
`;

const PresentedToText = styled.div`
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 0.35rem;
`;

const RecipientName = styled.h1`
  font-size: 2.2rem;
  font-weight: 900;
  color: #0f172a;
  border-bottom: 2px solid #cbd5e1;
  display: inline-block;
  padding: 0 2rem 0.25rem;
  margin-bottom: 0.75rem;
`;

const RecipientDesc = styled.p`
  font-size: 0.92rem;
  color: #334155;
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.5;
`;

const ScoreTableContainer = styled.div`
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1.75rem;
  font-size: 0.88rem;
`;

const ScoreTableHeader = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr 1fr;
  background: #f1f5f9;
  padding: 0.6rem 1rem;
  font-weight: 800;
  color: #1e293b;
  border-bottom: 1px solid #cbd5e1;
  text-align: center;

  div:first-child { text-align: left; }
`;

const ScoreTableRow = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr 1fr;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  align-items: center;
  text-align: center;
  color: #334155;

  div:first-child { text-align: left; font-weight: 700; }
`;

const ScoreTableTotalRow = styled.div<{ $passed: boolean }>`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr 1fr;
  padding: 0.75rem 1rem;
  background: ${({ $passed }) => ($passed ? "#ecfdf5" : "#fef2f2")};
  align-items: center;
  text-align: center;
  font-weight: 900;
  color: ${({ $passed }) => ($passed ? "#065f46" : "#991b1b")};

  div:first-child { text-align: left; }
  big { font-size: 1.2rem; }
`;

const StatusTag = styled.span<{ $passed: boolean }>`
  font-size: 0.75rem;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 6px;
  background: ${({ $passed }) => ($passed ? "#d1fae5" : "#fee2e2")};
  color: ${({ $passed }) => ($passed ? "#047857" : "#b91c1c")};
`;

const FinalStatusBadge = styled.div<{ $passed: boolean }>`
  font-size: 0.95rem;
  font-weight: 900;
  padding: 4px 12px;
  border-radius: 8px;
  background: ${({ $passed }) => ($passed ? "#10b981" : "#ef4444")};
  color: white;
`;

const CertFooterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 1rem;
  text-align: left;
`;

const FooterMeta = styled.div`
  font-size: 0.78rem;
  color: #64748b;
  line-height: 1.6;

  strong { color: #334155; }
`;

const HankoStampBox = styled.div<{ $passed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  .hanko-circle {
    width: 64px;
    height: 64px;
    border: 3px double ${({ $passed }) => ($passed ? "#dc2626" : "#475569")};
    border-radius: 50%;
    color: ${({ $passed }) => ($passed ? "#dc2626" : "#475569")};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    transform: rotate(-12deg);

    span { font-size: 1.1rem; line-height: 1; }
    small { font-size: 0.55rem; letter-spacing: 0.5px; }
  }

  .hanko-label {
    font-size: 0.65rem;
    font-weight: 700;
    color: #94a3b8;
  }
`;
