"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const HeaderArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  padding-bottom: 1.5rem;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TitleGroup = styled.div`
  h1 {
    font-size: 2.25rem;
    font-weight: 900;
    margin: 0 0 0.25rem 0;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, var(--foreground) 30%, var(--primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.95rem;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  transition: all 0.2s ease;

  &:hover {
    color: var(--foreground);
    border-color: var(--primary-light);
    background: rgba(var(--primary-rgb), 0.04);
    transform: translateX(-2px);
  }
`;

const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 2.5rem;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (max-width: 600px) {
    padding: 1.5rem;
    gap: 2rem;
  }
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const AvatarTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 800;
  margin: 0;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "🎭";
  }
`;

const AvatarPreviewArea = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    gap: 1.25rem;
  }
`;

const AvatarPreview = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  color: white;
  box-shadow: 0 10px 25px rgba(var(--primary-rgb), 0.25);
  border: 4px solid var(--surface);
  outline: 2px solid var(--primary-light);
  flex-shrink: 0;
  transition: all 0.3s ease;
`;

const UploadZone = styled.div`
  flex: 1;
  border: 2px dashed var(--border);
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  background: rgba(var(--primary-rgb), 0.01);
  transition: all 0.25s ease;

  &:hover {
    border-color: var(--primary-light);
    background: rgba(var(--primary-rgb), 0.03);
  }

  svg {
    width: 32px;
    height: 32px;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    transition: color 0.2s;
  }

  &:hover svg {
    color: var(--primary);
  }

  p {
    margin: 0 0 0.25rem 0;
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--foreground);
  }

  span {
    font-size: 0.75rem;
    color: var(--text-secondary);
  }
`;

const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.75rem;
  margin-top: 0.5rem;

  @media (max-width: 650px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const PresetItem = styled.button<{ $active: boolean }>`
  aspect-ratio: 1;
  border-radius: 16px;
  background: ${props => props.$active ? "rgba(var(--primary-rgb), 0.1)" : "var(--background)"};
  border: 2px solid ${props => props.$active ? "var(--primary)" : "var(--border)"};
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  padding: 0;

  &:hover {
    transform: scale(1.1);
    border-color: var(--primary-light);
    background: rgba(var(--primary-rgb), 0.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  grid-column: ${props => props.$fullWidth ? "span 2" : "auto"};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 600px) {
    grid-column: auto;
  }

  label {
    font-size: 0.88rem;
    font-weight: 750;
    color: var(--foreground);
    letter-spacing: 0.02em;
    display: flex;
    justify-content: space-between;

    span.counter {
      font-weight: 500;
      color: var(--text-secondary);
      font-size: 0.75rem;
    }
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.85rem 1.25rem;
  border-radius: 14px;
  border: 2px solid var(--border);
  background: var(--background);
  color: var(--foreground);
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: var(--primary);
    background: var(--surface);
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.85rem 1.25rem;
  border-radius: 14px;
  border: 2px solid var(--border);
  background: var(--background);
  color: var(--foreground);
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.2s ease;
  outline: none;
  resize: vertical;
  min-height: 100px;

  &:focus {
    border-color: var(--primary);
    background: var(--surface);
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.85rem 1.25rem;
  border-radius: 14px;
  border: 2px solid var(--border);
  background: var(--background);
  color: var(--foreground);
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.2s ease;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1.25rem center;
  background-size: 1rem;
  padding-right: 2.5rem;

  &:focus {
    border-color: var(--primary);
    background: var(--surface);
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  }
`;

const SectionSeparator = styled.hr`
  border: 0;
  height: 1px;
  background: var(--border);
  margin: 0.5rem 0;
`;

const CustomUploadNotify = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--secondary);
  font-size: 0.82rem;
  font-weight: 700;
  margin-top: 0.5rem;
`;

const ActionButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 500px) {
    flex-direction: column-reverse;
  }
`;

const CancelButton = styled(Link)`
  padding: 0.85rem 1.75rem;
  border-radius: 14px;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--foreground);

  &:hover {
    background: rgba(var(--primary-rgb), 0.02);
    border-color: var(--text-secondary);
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const SaveButton = styled.button`
  padding: 0.85rem 2rem;
  border-radius: 14px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid var(--primary);
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.25);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.35);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Toast = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  border: 1px solid var(--border);
  color: white;
  padding: 1rem 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  font-size: 0.95rem;

  span.emoji {
    font-size: 1.25rem;
  }
`;

const presetAvatars = [
  { emoji: "🌸", label: "Sakura" },
  { emoji: "🦊", label: "Kitsune" },
  { emoji: "🏯", label: "Himeji" },
  { emoji: "🍣", label: "Sushi" },
  { emoji: "👹", label: "Oni" },
  { emoji: "🎏", label: "Koinobori" },
  { emoji: "🗻", label: "Fuji" },
  { emoji: "🐱", label: "Maneki Neko" },
];

export default function EditProfilePage() {
  const router = useRouter();
  
  // Form States (Simulasi)
  const [displayName, setDisplayName] = useState("JapanApp Learner");
  const [username, setUsername] = useState("japan_learner");
  const [email, setEmail] = useState("learner@japanapp.com");
  const [bio, setBio] = useState("Belajar bahasa Jepang untuk menguasai Kanji dan percakapan harian. Target lulus JLPT N5 tahun ini! 🎯");
  const [difficulty, setDifficulty] = useState("pemula");
  const [dailyGoal, setDailyGoal] = useState("50");
  const [selectedAvatar, setSelectedAvatar] = useState("🦊");
  
  const [customFile, setCustomFile] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handlePresetClick = (emoji: string) => {
    setSelectedAvatar(emoji);
    setCustomFile(null); // Clear custom upload if preset is chosen
  };

  const handleCustomUploadSimulate = () => {
    // Simulate uploading a file
    setCustomFile("Foto_Profil_Keren.png");
    setSelectedAvatar("👤");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate save processing
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      
      // Redirect back after 2 seconds
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    }, 1200);
  };

  return (
    <Container>
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Profile", href: "/profile" }
        ]} 
        current="Edit Profil" 
      />

      <HeaderArea>
        <TitleGroup>
          <h1>Edit Profil Anda</h1>
          <p>Ubah identitas visual, informasi pribadi, dan target belajar harian Anda.</p>
        </TitleGroup>
        <BackLink href="/profile">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Kembali
        </BackLink>
      </HeaderArea>

      <form onSubmit={handleSubmit}>
        <Card>
          {/* SECTION 1: AVATAR / FOTO PROFIL */}
          <AvatarSection>
            <AvatarTitle>Foto Profil / Avatar Kultural</AvatarTitle>
            <AvatarPreviewArea>
              <AvatarPreview>
                {selectedAvatar}
              </AvatarPreview>
              
              <UploadZone onClick={handleCustomUploadSimulate}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p>Unggah Foto Kustom</p>
                <span>Tarik gambar ke sini atau klik untuk memilih file</span>
              </UploadZone>
            </AvatarPreviewArea>

            {customFile && (
              <CustomUploadNotify>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                File "{customFile}" terdeteksi & siap diunggah!
              </CustomUploadNotify>
            )}

            <div style={{ marginTop: "1rem" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                Atau pilih avatar tema Jepang yang ikonik:
              </span>
              <PresetGrid>
                {presetAvatars.map((preset) => (
                  <PresetItem
                    key={preset.label}
                    type="button"
                    $active={selectedAvatar === preset.emoji && !customFile}
                    onClick={() => handlePresetClick(preset.emoji)}
                    title={preset.label}
                  >
                    {preset.emoji}
                  </PresetItem>
                ))}
              </PresetGrid>
            </div>
          </AvatarSection>

          <SectionSeparator />

          {/* SECTION 2: DETAIL PROFIL */}
          <div>
            <AvatarTitle style={{ marginBottom: "1.25rem" }}>Informasi Pribadi</AvatarTitle>
            <FormGrid>
              <FormGroup>
                <label htmlFor="display-name">Nama Tampilan</label>
                <FormInput
                  id="display-name"
                  type="text"
                  required
                  placeholder="Masukkan nama tampilan Anda"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="username">Username</label>
                <FormInput
                  id="username"
                  type="text"
                  required
                  placeholder="Masukkan username Anda"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>

              <FormGroup $fullWidth>
                <label htmlFor="email">Alamat Email</label>
                <FormInput
                  id="email"
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup $fullWidth>
                <label htmlFor="bio">
                  Biografi Singkat
                  <span className="counter">{bio.length}/150 karakter</span>
                </label>
                <FormTextarea
                  id="bio"
                  maxLength={150}
                  placeholder="Tulis bio singkat tentang perjalanan belajar Anda..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </FormGroup>
            </FormGrid>
          </div>

          <SectionSeparator />

          {/* SECTION 3: PREFERENSI BELAJAR */}
          <div>
            <AvatarTitle style={{ marginBottom: "1.25rem" }}>Target & Preferensi Belajar</AvatarTitle>
            <FormGrid>
              <FormGroup>
                <label htmlFor="difficulty">Tingkat Kemampuan Saat Ini</label>
                <FormSelect
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="pemula">Pemula (Belum tahu Kana/Hiragana)</option>
                  <option value="dasar">Dasar (Menguasai Kana, belajar JLPT N5)</option>
                  <option value="menengah">Menengah (Belajar JLPT N4/N3)</option>
                  <option value="mahir">Mahir (Persiapan N2/N1)</option>
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <label htmlFor="daily-goal">Target EXP Harian</label>
                <FormSelect
                  id="daily-goal"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(e.target.value)}
                >
                  <option value="20">Santai (20 EXP / Hari)</option>
                  <option value="50">Sedang (50 EXP / Hari)</option>
                  <option value="100">Serius (100 EXP / Hari)</option>
                  <option value="200">Gila Belajar (200 EXP / Hari)</option>
                </FormSelect>
              </FormGroup>
            </FormGrid>
          </div>

          {/* ACTIONS */}
          <ActionButtonGroup>
            <CancelButton href="/profile">Batal</CancelButton>
            <SaveButton type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M21 12a9 9 0 0 1-9 9m-9-9a9 9 0 0 1 9-9" />
                  </svg>
                  Menyimpan...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  Simpan Perubahan
                </>
              )}
            </SaveButton>
          </ActionButtonGroup>
        </Card>
      </form>

      {/* Global CSS spinner keyframe animation */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Success Notification */}
      <AnimatePresence>
        {showToast && (
          <Toast
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            transition={{ duration: 0.2 }}
          >
            <span className="emoji">🎉</span>
            Profil berhasil disimpan! Mengalihkan...
          </Toast>
        )}
      </AnimatePresence>
    </Container>
  );
}
