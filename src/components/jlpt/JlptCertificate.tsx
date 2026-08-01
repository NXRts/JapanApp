"use client";

import React, { useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

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

const PrintStyleFix = createGlobalStyle`
  @media print {
    @page {
      size: A4 portrait;
      margin: 0;
    }

    html, body {
      margin: 0 !important;
      padding: 0 !important;
      background: #ffffff !important;
      color: #000000 !important;
      width: 210mm !important;
      height: 297mm !important;
      overflow: hidden !important;
    }

    /* Hide everything by default using visibility */
    body * {
      visibility: hidden !important;
    }

    /* Hide interactive control buttons and original elements */
    .no-print,
    .no-print * {
      display: none !important;
      visibility: hidden !important;
    }

    /* Show ONLY the high-res print image container and its image */
    .print-image-container,
    .print-image-container * {
      visibility: visible !important;
      display: block !important;
    }

    .print-image-container {
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
      width: 210mm !important;
      height: 297mm !important;
      margin: 0 !important;
      padding: 8mm 10mm !important;
      box-sizing: border-box !important;
      background: #ffffff !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    .print-image-container img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      display: block !important;
    }
  }
`;

const PrintImageContainer = styled.div`
  display: none;

  @media print {
    display: flex;
  }
`;

export function JlptCertificate({
  totalPassed,
  totalScore,
  sectionScores,
  passThresholds,
}: JlptCertificateProps) {
  const [participantName, setParticipantName] = useState("Budi Santoso");
  const [registrationNo, setRegistrationNo] = useState("26A1010101-50001");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [printImgUrl, setPrintImgUrl] = useState<string | null>(null);
  const certRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const todayDate = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const languageKnowledgeScore =
    sectionScores.moji_goi + sectionScores.bunpou_dokkai;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getSerializedElementWithStyles = (node: HTMLElement) => {
    const clone = node.cloneNode(true) as HTMLElement;

    const origElements = [node, ...Array.from(node.querySelectorAll<HTMLElement>("*"))];
    const cloneElements = [clone, ...Array.from(clone.querySelectorAll<HTMLElement>("*"))];

    origElements.forEach((orig, i) => {
      const cloned = cloneElements[i];
      if (cloned) {
        const computed = window.getComputedStyle(orig);
        cloned.style.cssText = `
          box-sizing: border-box;
          display: ${computed.display};
          flex-direction: ${computed.flexDirection};
          justify-content: ${computed.justifyContent};
          align-items: ${computed.alignItems};
          grid-template-columns: ${computed.gridTemplateColumns};
          grid-gap: ${computed.gridGap};
          gap: ${computed.gap};
          position: ${computed.position};
          top: ${computed.top};
          left: ${computed.left};
          right: ${computed.right};
          bottom: ${computed.bottom};
          width: ${computed.width};
          height: ${computed.height};
          min-width: ${computed.minWidth};
          min-height: ${computed.minHeight};
          max-width: ${computed.maxWidth};
          max-height: ${computed.maxHeight};
          margin: ${computed.margin};
          padding: ${computed.padding};
          border: ${computed.border};
          border-top: ${computed.borderTop};
          border-right: ${computed.borderRight};
          border-bottom: ${computed.borderBottom};
          border-left: ${computed.borderLeft};
          border-radius: ${computed.borderRadius};
          background: ${computed.background};
          background-color: ${computed.backgroundColor};
          color: ${computed.color};
          font-family: ${computed.fontFamily};
          font-size: ${computed.fontSize};
          font-weight: ${computed.fontWeight};
          font-style: ${computed.fontStyle};
          line-height: ${computed.lineHeight};
          letter-spacing: ${computed.letterSpacing};
          text-align: ${computed.textAlign};
          text-transform: ${computed.textTransform};
          box-shadow: ${computed.boxShadow};
          opacity: ${computed.opacity};
          transform: ${computed.transform};
          overflow: ${computed.overflow};
          table-layout: ${computed.tableLayout};
          border-collapse: ${computed.borderCollapse};
          border-spacing: ${computed.borderSpacing};
          vertical-align: ${computed.verticalAlign};
          white-space: ${computed.whiteSpace};
          word-break: ${computed.wordBreak};
        `;
      }
    });

    return new XMLSerializer().serializeToString(clone);
  };

  const generateCertificateCanvasImage = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!certRef.current) return reject("Certificate ref not found");
      const element = certRef.current;
      const width = element.offsetWidth || 794;
      const height = element.offsetHeight || 1123;

      const serializedContent = getSerializedElementWithStyles(element);

      const svgData = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px; height:${height}px; background:#ffffff; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              ${serializedContent}
            </div>
          </foreignObject>
        </svg>
      `;

      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      const scale = 2; // 2x DPI for crisp high-resolution image
      const canvas = document.createElement("canvas");
      canvas.width = width * scale;
      canvas.height = height * scale;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        return reject("Could not get 2D context");
      }

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.scale(scale, scale);

      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);

        try {
          const pngUrl = canvas.toDataURL("image/png", 1.0);
          resolve(pngUrl);
        } catch (exportErr) {
          reject(exportErr);
        }
      };

      img.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(err);
      };

      img.src = url;
    });
  };

  const handlePrint = async () => {
    setIsDownloading(true);
    try {
      const dataUrl = await generateCertificateCanvasImage();
      setPrintImgUrl(dataUrl);
      setIsDownloading(false);
      setTimeout(() => {
        window.print();
      }, 100);
    } catch (err) {
      console.warn("Could not generate high-res print image, falling back to print window", err);
      setIsDownloading(false);
      window.print();
    }
  };

  const handleDownloadPNG = async () => {
    setIsDownloading(true);
    try {
      const pngUrl = await generateCertificateCanvasImage();
      const downloadLink = document.createElement("a");
      downloadLink.download = `sertifikat-jlpt-n5-${participantName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")}.png`;
      downloadLink.href = pngUrl;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error("Canvas export failed, falling back to print window:", err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <PrintStyleFix />
      {printImgUrl && (
        <PrintImageContainer className="print-image-container">
          <img src={printImgUrl} alt="Sertifikat Resmi JLPT N5" />
        </PrintImageContainer>
      )}
      <CertificateContainer>
      {/* Control Toolbar */}
      <ControlBar className="no-print">
        <InputFormGrid>
          <NameInputGroup>
            <label htmlFor="participant-name-input">👤 Nama Peserta:</label>
            <input
              id="participant-name-input"
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="Nama Lengkap"
              maxLength={40}
            />
          </NameInputGroup>

          <NameInputGroup>
            <label htmlFor="registration-no-input">🏷️ No. Ujian:</label>
            <input
              id="registration-no-input"
              type="text"
              value={registrationNo}
              onChange={(e) => setRegistrationNo(e.target.value)}
              placeholder="No. Ujian / Examinee No."
              maxLength={30}
            />
          </NameInputGroup>
        </InputFormGrid>

        <ButtonGroup>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
            style={{ display: "none" }}
          />
          <ActionButton onClick={() => fileInputRef.current?.click()}>
            📷 {photoUrl ? "Ganti Pas Foto" : "Upload Pas Foto 3x4"}
          </ActionButton>

          <ActionButton onClick={handleDownloadPNG} disabled={isDownloading}>
            {isDownloading ? "⏳ Memproses..." : "📥 Unduh PNG"}
          </ActionButton>
          <ActionButton $variant="primary" onClick={handlePrint}>
            🖨️ Cetak / Simpan PDF
          </ActionButton>
        </ButtonGroup>
      </ControlBar>

      {/* Official A4 Portrait Certificate */}
      <CertFrameWrapper ref={certRef} className="print-target">
        <CertOuterBorder>
          <CertInnerBorder>
            {/* Corner Decorative Motifs */}
            <CornerMotif className="top-left">🌸</CornerMotif>
            <CornerMotif className="top-right">🌸</CornerMotif>
            <CornerMotif className="bottom-left">🌸</CornerMotif>
            <CornerMotif className="bottom-right">🌸</CornerMotif>

            {/* Official Issuers Banner */}
            <OfficialIssuerBanner>
              <IssuerItem>
                <div className="jp">独立行政法人 国際交流基金</div>
                <div className="en">The Japan Foundation</div>
              </IssuerItem>
              <IssuerItem className="right">
                <div className="jp">公益財団法人 日本国際教育支援協会</div>
                <div className="en">JEES</div>
              </IssuerItem>
            </OfficialIssuerBanner>

            {/* Document Kanji Title */}
            <CertTitleBlock>
              <CertKanjiTitle>
                日本語能力試験 認定結果及び成績に関する証明書
              </CertKanjiTitle>
              <CertEngTitle>
                CERTIFICATE OF RESULT AND SCORES
                <br />
                JAPANESE-LANGUAGE PROFICIENCY TEST
              </CertEngTitle>
            </CertTitleBlock>

            {/* Examinee Details & 3x4 Photo Grid */}
            <ExamineeProfileGrid>
              <InfoTable>
                <InfoRow>
                  <label>氏名 / Name:</label>
                  <span>{participantName || "Participant"}</span>
                </InfoRow>
                <InfoRow>
                  <label>国籍 / Nationality:</label>
                  <span>INDONESIA</span>
                </InfoRow>
                <InfoRow>
                  <label>受験番号 / Registration No.:</label>
                  <span className="mono">{registrationNo}</span>
                </InfoRow>
                <InfoRow>
                  <label>試験日 / Test Date:</label>
                  <span>{todayDate}</span>
                </InfoRow>
                <InfoRow>
                  <label>レベル / Level:</label>
                  <span className="level">JLPT N5</span>
                </InfoRow>
                <InfoRow>
                  <label>合否 / Result:</label>
                  <span className="result-pass">N5 合格 / PASSED</span>
                </InfoRow>
              </InfoTable>

              {/* 3x4 Physical Examinee Photo */}
              <ExamineePhotoSlot>
                {photoUrl ? (
                  <img src={photoUrl} alt="Examinee 3x4 Photo" />
                ) : (
                  <PhotoPlaceholder>
                    <div className="photo-icon">👤</div>
                    <div className="photo-label">PAS FOTO</div>
                    <div className="photo-size">3 cm x 4 cm</div>
                  </PhotoPlaceholder>
                )}
              </ExamineePhotoSlot>
            </ExamineeProfileGrid>

            {/* Official Section Scores Breakdown Table */}
            <ScoresSectionTitle>【 得点 / SCORES 】</ScoresSectionTitle>
            <OfficialScoreTable>
              <thead>
                <tr>
                  <th>得点区分 (Scoring Section)</th>
                  <th>得点 (Score)</th>
                  <th>満点 (Max Score)</th>
                  <th>合否 (Status)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="section-name">
                    言語知識 (文字・語彙・文法)・読解
                    <br />
                    <small>
                      Language Knowledge (Vocabulary/Grammar) & Reading
                    </small>
                  </td>
                  <td className="score-cell">
                    <strong>{languageKnowledgeScore}</strong>
                  </td>
                  <td>120</td>
                  <td className="status-cell">
                    <span className="badge-pass">合格</span>
                  </td>
                </tr>
                <tr>
                  <td className="section-name">
                    聴解
                    <br />
                    <small>Listening (Choukai)</small>
                  </td>
                  <td className="score-cell">
                    <strong>{sectionScores.choukai}</strong>
                  </td>
                  <td>60</td>
                  <td className="status-cell">
                    <span className="badge-pass">合格</span>
                  </td>
                </tr>
                <tr className="total-row">
                  <td className="section-name">総合得点 (Total Score)</td>
                  <td className="score-cell">
                    <big>{totalScore}</big>
                  </td>
                  <td>180</td>
                  <td className="status-cell">
                    <span className="badge-pass-final">合格 (PASSED)</span>
                  </td>
                </tr>
              </tbody>
            </OfficialScoreTable>

            {/* Official Certification Statement */}
            <CertificationStatement>
              上記のとおり日本語能力試験の結果を証明します。
              <br />
              <small>
                This is to certify the result and scores of the
                Japanese-Language Proficiency Test as stated above.
              </small>
            </CertificationStatement>

            {/* Dual Official Seals & Issuing Authority */}
            <IssuingFooter>
              <OfficialSealBox>
                <div className="seal-circle">
                  <span>国際交流</span>
                  <span>基金印</span>
                </div>
                <div className="seal-text">
                  独立行政法人国際交流基金理事長
                  <br />
                  President, The Japan Foundation
                </div>
              </OfficialSealBox>

              <OfficialSealBox>
                <div className="seal-circle">
                  <span>教育支援</span>
                  <span>協会印</span>
                </div>
                <div className="seal-text">
                  公益財団法人日本国際教育支援協会理事長
                  <br />
                  President, JEES
                </div>
              </OfficialSealBox>
            </IssuingFooter>
          </CertInnerBorder>
        </CertOuterBorder>
      </CertFrameWrapper>
    </CertificateContainer>
  </>
);
}

// --- Styled Components (Strict A4 Portrait Specification) ---

const CertificateContainer = styled.div`
  margin: 2rem auto;
  width: 100%;
  max-width: 820px;

  @media print {
    @page {
      size: A4 portrait;
      margin: 0.5cm;
    }

    margin: 0;
    padding: 0;
    max-width: 100%;

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
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputFormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const NameInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;

  label {
    font-size: 0.88rem;
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
    padding: 0.6rem 0.9rem;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 700;

    &:focus {
      outline: none;
      border-color: var(--primary);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ActionButton = styled.button<{ $variant?: "primary" | "secondary" }>`
  background: ${({ $variant }) =>
    $variant === "primary"
      ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
      : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"};
  color: white;
  border: none;
  padding: 0.65rem 1.1rem;
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

  @media (max-width: 600px) {
    width: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  }
`;

/* --- A4 Portrait Frame Layout --- */
const CertFrameWrapper = styled.div`
  background: #fffdfa;
  color: #0f172a;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
  font-family: "Georgia", "Yu Mincho", "Hiragino Mincho ProN", serif;
  width: 100%;
  box-sizing: border-box;
`;

const CertOuterBorder = styled.div`
  border: 4px double #b45309;
  border-radius: 12px;
  padding: 6px;
  background: #fffdf8;
`;

const CertInnerBorder = styled.div`
  border: 2px solid #b45309;
  border-radius: 8px;
  padding: 2rem 1.75rem;
  position: relative;
  background: #ffffff;
`;

const CornerMotif = styled.div`
  position: absolute;
  font-size: 1.2rem;

  &.top-left {
    top: 6px;
    left: 10px;
  }
  &.top-right {
    top: 6px;
    right: 10px;
  }
  &.bottom-left {
    bottom: 6px;
    left: 10px;
  }
  &.bottom-right {
    bottom: 6px;
    right: 10px;
  }
`;

const OfficialIssuerBanner = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.75rem;
  margin-bottom: 1.25rem;
`;

const IssuerItem = styled.div`
  font-size: 0.72rem;
  color: #334155;
  line-height: 1.4;

  .jp {
    font-weight: 700;
  }
  .en {
    font-size: 0.65rem;
    color: #64748b;
  }

  &.right {
    text-align: right;
  }
`;

const CertTitleBlock = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const CertKanjiTitle = styled.h1`
  font-size: 1.45rem;
  font-weight: 900;
  color: #1e3a8a;
  letter-spacing: 0.06em;
  margin-bottom: 0.25rem;
`;

const CertEngTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 800;
  color: #92400e;
  letter-spacing: 0.08em;
  line-height: 1.35;
`;

/* --- Examinee Info & 3x4 Photo Grid --- */
const ExamineeProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 1.25rem;
  align-items: start;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`;

const InfoTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  font-size: 0.85rem;
  align-items: center;

  label {
    font-weight: 700;
    color: #475569;
  }

  span {
    font-weight: 800;
    color: #0f172a;

    &.mono {
      font-family: monospace;
      letter-spacing: 0.05em;
      color: #1e3a8a;
    }
    &.level {
      color: #0284c7;
    }
    &.result-pass {
      color: #059669;
      font-size: 0.95rem;
    }
  }
`;

const ExamineePhotoSlot = styled.div`
  width: 100px;
  height: 133px; /* Standard 3x4 ratio */
  border: 2px dashed #94a3b8;
  border-radius: 6px;
  overflow: hidden;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PhotoPlaceholder = styled.div`
  text-align: center;
  color: #64748b;
  padding: 0.5rem;

  .photo-icon {
    font-size: 1.8rem;
    line-height: 1;
    margin-bottom: 0.2rem;
  }
  .photo-label {
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.5px;
  }
  .photo-size {
    font-size: 0.58rem;
    color: #94a3b8;
  }
`;

/* --- Official Score Table --- */
const ScoresSectionTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 900;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
`;

const OfficialScoreTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
  font-size: 0.82rem;

  th,
  td {
    border: 1px solid #cbd5e1;
    padding: 0.6rem 0.8rem;
    text-align: center;
  }

  th {
    background: #f1f5f9;
    font-weight: 800;
    color: #1e293b;
  }

  td.section-name {
    text-align: left;
    font-weight: 700;
    color: #334155;
    small {
      font-size: 0.7rem;
      color: #64748b;
      font-weight: 600;
    }
  }

  .score-cell {
    font-weight: 800;
    font-size: 0.95rem;
  }
  .status-cell {
    font-weight: 800;
  }

  .badge-pass {
    background: #d1fae5;
    color: #047857;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
  }

  .total-row {
    background: #ecfdf5;
    font-weight: 900;
    color: #065f46;

    td {
      border-top: 2px solid #10b981;
    }
    big {
      font-size: 1.1rem;
    }
  }

  .badge-pass-final {
    background: #10b981;
    color: white;
    padding: 3px 10px;
    border-radius: 6px;
    font-size: 0.82rem;
  }
`;

const CertificationStatement = styled.div`
  text-align: center;
  font-size: 0.82rem;
  font-weight: 700;
  color: #334155;
  margin-bottom: 1.75rem;
  line-height: 1.5;

  small {
    font-size: 0.72rem;
    color: #64748b;
    font-weight: 600;
  }
`;

const IssuingFooter = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #e2e8f0;
  padding-top: 1.25rem;
`;

const OfficialSealBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .seal-circle {
    width: 54px;
    height: 54px;
    border: 3px double #dc2626;
    border-radius: 50%;
    color: #dc2626;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    font-weight: 900;
    line-height: 1.15;
    transform: rotate(-8deg);
  }

  .seal-text {
    font-size: 0.7rem;
    font-weight: 700;
    color: #475569;
    line-height: 1.3;
  }
`;
