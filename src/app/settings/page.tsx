"use client";

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useTheme, themes } from "@/context/ThemeContext";
import { useProgress } from "@/context/ProgressContext";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem 0.75rem;
    gap: 1.25rem;
  }
`;

const PageHeader = styled.div`
  border-bottom: 1px solid var(--border);
  padding-bottom: 1.5rem;

  h1 {
    font-size: 2.25rem;
    font-weight: 900;
    margin: 0 0 0.25rem 0;
    letter-spacing: -0.02em;
    background: linear-gradient(
      135deg,
      var(--foreground) 30%,
      var(--primary) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding-bottom: 1rem;
    h1 {
      font-size: 1.75rem;
    }
    p {
      font-size: 0.85rem;
    }
  }
`;

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 2.5rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 1rem;
  border-radius: 24px;
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    flex-direction: row;
    overflow-x: auto;
    padding: 0.4rem;
    border-radius: 16px;
    gap: 0.35rem;
    -webkit-overflow-scrolling: touch;
    justify-content: space-between;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.85rem 1.25rem;
  border-radius: 14px;
  border: none;
  background: ${(props) => (props.$active ? "var(--primary)" : "transparent")};
  color: ${(props) => (props.$active ? "white" : "var(--text-secondary)")};
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    color: ${(props) => (props.$active ? "white" : "var(--foreground)")};
    background: ${(props) =>
      props.$active ? "var(--primary)" : "rgba(var(--primary-rgb), 0.06)"};
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  .text-desktop {
    display: inline;
  }

  .text-mobile {
    display: none;
  }

  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
    white-space: nowrap;
    padding: 0.6rem 0.4rem;
    font-size: 0.8rem;
    gap: 0.25rem;

    svg {
      width: 15px;
      height: 15px;
    }

    .text-desktop {
      display: none;
    }

    .text-mobile {
      display: inline;
    }
  }
`;

const SettingsCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 2.5rem;
  box-shadow: var(--shadow-md);
  min-height: 480px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 20px;
    gap: 1.5rem;
    min-height: auto;
  }
`;

const TabHeader = styled.div`
  border-bottom: 1px solid var(--border);
  padding-bottom: 1.25rem;
  margin-bottom: 0.5rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 850;
    margin: 0 0 0.25rem 0;
    color: var(--foreground);
  }

  p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    padding-bottom: 1rem;
    h2 {
      font-size: 1.25rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.88rem;
    font-weight: 750;
    color: var(--foreground);
    letter-spacing: 0.02em;
  }
`;

const FormInput = styled.input`
  width: 100%;
  max-width: 500px;
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

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    border-radius: 12px;
  }
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 18px;
  gap: 1.5rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--primary-light);
  }

  @media (max-width: 768px) {
    padding: 0.85rem 1rem;
    gap: 0.75rem;
    border-radius: 14px;
  }
`;

const ToggleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  span.title {
    font-weight: 750;
    color: var(--foreground);
    font-size: 0.95rem;
  }

  span.desc {
    font-size: 0.82rem;
    color: var(--text-secondary);
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    span.title {
      font-size: 0.88rem;
    }
    span.desc {
      font-size: 0.75rem;
    }
  }
`;

const SwitchButton = styled.button<{ $checked: boolean }>`
  width: 52px;
  height: 28px;
  border-radius: 14px;
  background: ${(props) =>
    props.$checked ? "var(--primary)" : "var(--border)"};
  border: none;
  cursor: pointer;
  position: relative;
  transition: background-color 0.25s ease;
  padding: 0;
  flex-shrink: 0;

  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    top: 4px;
    left: ${(props) => (props.$checked ? "28px" : "4px")};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: left 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  @media (max-width: 768px) {
    width: 46px;
    height: 24px;
    border-radius: 12px;

    &::after {
      width: 16px;
      height: 16px;
      top: 4px;
      left: ${(props) => (props.$checked ? "26px" : "4px")};
    }
  }
`;

const ColorGrid = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const ColorBtn = styled.button<{ $color: string; $isSelected: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: 4px solid
    ${({ $isSelected }) => ($isSelected ? "var(--foreground)" : "transparent")};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    border-width: 3px;
  }
`;

const ModeBox = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 1.5rem;
  border-radius: 20px;
  border: 2px solid
    ${(props) => (props.$active ? "var(--primary)" : "var(--border)")};
  background: ${(props) =>
    props.$active ? "rgba(var(--primary-rgb), 0.04)" : "var(--background)"};
  color: var(--foreground);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.25s ease;
  font-weight: 750;

  &:hover {
    border-color: var(--primary-light);
    background: rgba(var(--primary-rgb), 0.02);
    transform: translateY(-2px);
  }

  span.icon {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 0.35rem;
    font-size: 0.85rem;
    border-radius: 14px;

    span.icon {
      font-size: 1.25rem;
    }
  }
`;

const ModeRow = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const DangerCard = styled.div`
  background: rgba(244, 63, 94, 0.02);
  border: 1px dashed var(--accent);
  border-radius: 24px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 16px;
    gap: 1rem;
  }
`;

const DangerTitle = styled.h4`
  color: var(--accent);
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "⚠️";
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DangerButton = styled.button<{ $confirming?: boolean }>`
  padding: 0.85rem 1.75rem;
  border-radius: 14px;
  font-weight: 750;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid var(--accent);
  background: ${(props) =>
    props.$confirming ? "var(--accent)" : "transparent"};
  color: ${(props) => (props.$confirming ? "white" : "var(--accent)")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  align-self: flex-start;

  &:hover {
    background: var(--accent);
    color: white;
    box-shadow: 0 4px 14px rgba(244, 63, 94, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    align-self: stretch;
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
    border-radius: 12px;
  }
`;

const ActionButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  border-top: 1px solid var(--border);
  padding-top: 1.75rem;
  margin-top: auto;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 0.75rem;
    padding-top: 1.25rem;
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

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
    border-radius: 12px;
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
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark) 100%
  );
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

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
    border-radius: 12px;
  }
`;

const SectionTitle = styled.label`
  font-size: 0.88rem;
  font-weight: 750;
  color: var(--foreground);
  margin-bottom: 1rem;
  display: block;

  @media (max-width: 768px) {
    font-size: 0.82rem;
    margin-bottom: 0.75rem;
  }
`;

const ToggleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const SubDescription = styled.span`
  font-size: 0.82rem;
  color: var(--text-secondary);

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const DangerDesc = styled.p`
  margin: 0;
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.8rem;
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
`;

export default function SettingsPage() {
  const { color, setColor, mode, setMode } = useTheme();
  const { resetProgress } = useProgress();

  // Tab State
  const [activeTab, setActiveTab] = useState<
    "account" | "appearance" | "preferences" | "learning"
  >("account");

  // Form States (Simulasi)
  const [username, setUsername] = useState("japan_learner");
  const [email, setEmail] = useState("learner@japanapp.com");
  const [soundEffects, setSoundEffects] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [motivationalMsgs, setMotivationalMsgs] = useState(true);
  const [speakingExercises, setSpeakingExercises] = useState(true);
  const [listeningExercises, setListeningExercises] = useState(true);

  // Privacy States (Simulasi)
  const [publicProfile, setPublicProfile] = useState(true);
  const [friendRequests, setFriendRequests] = useState(true);
  const [shareProgress, setShareProgress] = useState(true);

  // Reset states
  const [confirmReset, setConfirmReset] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const handleSave = () => {
    triggerToast("Pengaturan berhasil disimpan! ⚙️");
  };

  return (
    <Container>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }]}
        current="Pengaturan"
      />

      <PageHeader>
        <h1>Pengaturan Dashboard</h1>
        <p>
          Kelola detail akun, preferensi suara, tema tampilan, dan data belajar
          bahasa Jepang Anda.
        </p>
      </PageHeader>

      <MainLayout>
        {/* SIDEBAR TABS */}
        <Sidebar>
          <TabButton
            $active={activeTab === "account"}
            onClick={() => setActiveTab("account")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-desktop">Akun & Fitur</span>
            <span className="text-mobile">Akun</span>
          </TabButton>
          <TabButton
            $active={activeTab === "appearance"}
            onClick={() => setActiveTab("appearance")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
            <span className="text-desktop">Tampilan / Tema</span>
            <span className="text-mobile">Tema</span>
          </TabButton>
          <TabButton
            $active={activeTab === "preferences"}
            onClick={() => setActiveTab("preferences")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="text-desktop">Privasi & Keamanan</span>
            <span className="text-mobile">Privasi</span>
          </TabButton>
          <TabButton
            $active={activeTab === "learning"}
            onClick={() => setActiveTab("learning")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span className="text-desktop">Data Belajar</span>
            <span className="text-mobile">Data</span>
          </TabButton>
        </Sidebar>

        {/* SETTINGS CARD DYNAMIC SHOWCASE */}
        <SettingsCard>
          {activeTab === "account" && (
            <>
              <TabHeader>
                <h2>Pengaturan Akun & Fitur</h2>
                <p>
                  Kelola kredensial akun dan pilihan metode interaksi kuis
                  belajar Anda.
                </p>
              </TabHeader>
              <FormGrid>
                <FormGroup>
                  <label htmlFor="username">Nama Pengguna (Username)</label>
                  <FormInput
                    id="username"
                    type="text"
                    placeholder="japan_learner"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="email">Alamat Email</label>
                  <FormInput
                    id="email"
                    type="email"
                    placeholder="learner@japanapp.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <div style={{ marginTop: "0.5rem" }}>
                  <SectionTitle>Metode & Pengalaman Belajar</SectionTitle>
                  <ToggleList>
                    <ToggleRow>
                      <ToggleInfo>
                        <span className="title">
                          Efek Suara (Sound Effects)
                        </span>
                        <span className="desc">
                          Mainkan efek audio yang memuaskan ketika menjawab
                          benar atau salah.
                        </span>
                      </ToggleInfo>
                      <SwitchButton
                        $checked={soundEffects}
                        onClick={() => setSoundEffects(!soundEffects)}
                      />
                    </ToggleRow>

                    <ToggleRow>
                      <ToggleInfo>
                        <span className="title">
                          Animasi Mikro (Animations)
                        </span>
                        <span className="desc">
                          Gunakan efek transisi halus pada kartu dan lencana
                          heksagonal.
                        </span>
                      </ToggleInfo>
                      <SwitchButton
                        $checked={animations}
                        onClick={() => setAnimations(!animations)}
                      />
                    </ToggleRow>

                    <ToggleRow>
                      <ToggleInfo>
                        <span className="title">Pesan Motivasi</span>
                        <span className="desc">
                          Tampilkan pesan penyemangat dari maskot setelah
                          menyelesaikan latihan kuis.
                        </span>
                      </ToggleInfo>
                      <SwitchButton
                        $checked={motivationalMsgs}
                        onClick={() => setMotivationalMsgs(!motivationalMsgs)}
                      />
                    </ToggleRow>

                    <ToggleRow>
                      <ToggleInfo>
                        <span className="title">
                          Latihan Berbicara (Speaking)
                        </span>
                        <span className="desc">
                          Aktifkan latihan pengucapan interaktif menggunakan
                          mikrofon peramban.
                        </span>
                      </ToggleInfo>
                      <SwitchButton
                        $checked={speakingExercises}
                        onClick={() => setSpeakingExercises(!speakingExercises)}
                      />
                    </ToggleRow>

                    <ToggleRow>
                      <ToggleInfo>
                        <span className="title">
                          Latihan Mendengarkan (Listening)
                        </span>
                        <span className="desc">
                          Sertakan soal latihan pendengaran audio penutur asli
                          Jepang (Native Speaker).
                        </span>
                      </ToggleInfo>
                      <SwitchButton
                        $checked={listeningExercises}
                        onClick={() =>
                          setListeningExercises(!listeningExercises)
                        }
                      />
                    </ToggleRow>
                  </ToggleList>
                </div>
              </FormGrid>
            </>
          )}

          {activeTab === "appearance" && (
            <>
              <TabHeader>
                <h2>Tema & Gaya Tampilan</h2>
                <p>
                  Kustomisasi skema warna aksen dan mode visual aplikasi
                  JapanApp sesuai selera Anda.
                </p>
              </TabHeader>
              <FormGrid>
                <FormGroup>
                  <label>Warna Aksen Aplikasi (Theme Accent Color)</label>
                  <SubDescription>
                    Klik lingkaran warna di bawah ini untuk mengubah seluruh
                    aksen visual web secara real-time.
                  </SubDescription>
                  <ColorGrid>
                    {Object.entries(themes).map(([key, value]) => (
                      <ColorBtn
                        key={key}
                        type="button"
                        $color={value.primary}
                        $isSelected={color === key}
                        onClick={() => {
                          setColor(key as any);
                          triggerToast(`Warna tema diubah ke ${key}! 🎨`);
                        }}
                        title={key}
                      />
                    ))}
                  </ColorGrid>
                </FormGroup>

                <FormGroup style={{ marginTop: "1rem" }}>
                  <label>Mode Tampilan (Appearance Mode)</label>
                  <ModeRow>
                    <ModeBox
                      $active={mode === "light"}
                      onClick={() => {
                        setMode("light");
                        triggerToast("Mode terang diaktifkan! ☀️");
                      }}
                    >
                      <span className="icon">☀️</span>
                      <span>Mode Terang</span>
                    </ModeBox>
                    <ModeBox
                      $active={mode === "dark"}
                      onClick={() => {
                        setMode("dark");
                        triggerToast("Mode gelap diaktifkan! 🌙");
                      }}
                    >
                      <span className="icon">🌙</span>
                      <span>Mode Gelap</span>
                    </ModeBox>
                  </ModeRow>
                </FormGroup>
              </FormGrid>
            </>
          )}

          {activeTab === "preferences" && (
            <>
              <TabHeader>
                <h2>Privasi & Keamanan Sosial</h2>
                <p>
                  Atur visibilitas progres belajar Anda dan batasi interaksi
                  pertemanan sosial.
                </p>
              </TabHeader>
              <FormGrid>
                <ToggleList>
                  <ToggleRow>
                    <ToggleInfo>
                      <span className="title">
                        Profil Publik (Public Profile)
                      </span>
                      <span className="desc">
                        Izinkan pengguna lain mencari profil Anda dan melihat
                        lencana heksagonal Anda.
                      </span>
                    </ToggleInfo>
                    <SwitchButton
                      $checked={publicProfile}
                      onClick={() => setPublicProfile(!publicProfile)}
                    />
                  </ToggleRow>

                  <ToggleRow>
                    <ToggleInfo>
                      <span className="title">
                        Terima Permintaan Pertemanan
                      </span>
                      <span className="desc">
                        Izinkan pengguna lain mengikuti progres belajar Anda
                        atau mengundang ke grup belajar.
                      </span>
                    </ToggleInfo>
                    <SwitchButton
                      $checked={friendRequests}
                      onClick={() => setFriendRequests(!friendRequests)}
                    />
                  </ToggleRow>

                  <ToggleRow>
                    <ToggleInfo>
                      <span className="title">Bagikan Progres Mingguan</span>
                      <span className="desc">
                        Tampilkan streak belajar harian dan pencapaian Kanji
                        Anda di papan peringkat global.
                      </span>
                    </ToggleInfo>
                    <SwitchButton
                      $checked={shareProgress}
                      onClick={() => setShareProgress(!shareProgress)}
                    />
                  </ToggleRow>
                </ToggleList>
              </FormGrid>
            </>
          )}

          {activeTab === "learning" && (
            <>
              <TabHeader>
                <h2>Manajemen Data Belajar</h2>
                <p>
                  Tinjau dan reset histori kuis, statistik streak harian, serta
                  level EXP Anda.
                </p>
              </TabHeader>
              <FormGrid>
                <DangerCard>
                  <DangerTitle>Zona Bahaya (Danger Zone)</DangerTitle>
                  <DangerDesc>
                    Menyetel ulang data belajar akan menghapus semua level EXP,
                    streak harian, lencana heksagonal, dan histori penguasaan
                    huruf Kanji & Kosakata Anda secara permanen. Tindakan ini
                    tidak dapat dibatalkan.
                  </DangerDesc>

                  <DangerButton
                    type="button"
                    $confirming={confirmReset}
                    onClick={() => {
                      if (confirmReset) {
                        resetProgress();
                        triggerToast(
                          "Seluruh progres belajar telah di-reset! 🗑️",
                        );
                        setConfirmReset(false);
                      } else {
                        setConfirmReset(true);
                        setTimeout(() => setConfirmReset(false), 5000); // Auto cancel after 5s
                      }
                    }}
                  >
                    {confirmReset
                      ? "⚠️ Klik Sekali Lagi untuk Reset!"
                      : "🗑️ Reset Seluruh Progres"}
                  </DangerButton>
                </DangerCard>
              </FormGrid>
            </>
          )}

          {/* SAVE ACTIONS */}
          <ActionButtonGroup>
            <CancelButton href="/profile">Batal</CancelButton>
            <SaveButton type="button" onClick={handleSave}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Simpan Perubahan
            </SaveButton>
          </ActionButtonGroup>
        </SettingsCard>
      </MainLayout>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <Toast
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            transition={{ duration: 0.2 }}
          >
            {toastMessage}
          </Toast>
        )}
      </AnimatePresence>
    </Container>
  );
}
