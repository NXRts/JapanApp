'use client';

import styled from 'styled-components';

const Section = styled.section`
  padding: 6rem 2rem;
  max-width: 1240px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.75rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 5rem;
  color: var(--foreground);
  
  span {
    position: relative;
    z-index: 1;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 5px;
      background: var(--primary);
      border-radius: 2px;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Card = styled.div`
  background: var(--surface);
  padding: 2.25rem;
  border-radius: 28px;
  border: 1px solid var(--border);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3), 0 0 15px rgba(var(--primary-rgb), 0.1);
    border-color: var(--primary-light);
  }
  
  @media (max-width: 768px) {
    padding: 1.75rem;
    border-radius: 24px;
  }
`;

const CardIcon = styled.div`
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15), rgba(var(--primary-rgb), 0.05));
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.75rem;
  color: var(--primary);
  font-size: 1.75rem;
  box-shadow: 0 8px 16px -4px rgba(var(--primary-rgb), 0.1);
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--foreground);
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.65;
  font-size: 0.95rem;
`;

export function FeaturesSection() {
  return (
    <Section>
      <SectionTitle><span>Fitur Unggulan</span></SectionTitle>
      <Grid>
        <Card>
          <CardIcon>字</CardIcon>
          <CardTitle>2136+ Joyo Kanji</CardTitle>
          <CardDescription>
            Perpustakaan Kanji terlengkap untuk semua level JLPT. Dilengkapi info Cara Baca, 
            Arti, Urutan Goresan, dan contoh kata yang mendalam.
          </CardDescription>
        </Card>
        <Card>
          <CardIcon>あ</CardIcon>
          <CardTitle>Hiragana & Katakana</CardTitle>
          <CardDescription>
            Pondasi dasar untuk pemula. Visualisasi interaktif tiap karakter membantu Anda 
            menguasai kedua alfabet dasar dalam waktu singkat.
          </CardDescription>
        </Card>
        <Card>
          <CardIcon>📸</CardIcon>
          <CardTitle>Kamus AI & Kamera</CardTitle>
          <CardDescription>
            Bukan sekadar teks. Cari arti kata menggunakan fitur <strong>OCR Kamera</strong>, 
            <strong>Tulisan Tangan</strong>, atau <strong>Pencarian Suara</strong> yang sangat akurat.
          </CardDescription>
        </Card>
        <Card>
          <CardIcon>🎮</CardIcon>
          <CardTitle>Game Interaktif</CardTitle>
          <CardDescription>
            Belajar jadi tidak membosankan. Uji kemampuan memori Anda dengan game 
            <strong>Match Pairs</strong>, <strong>Sentence Builder</strong>, dan tantangan <strong>Speed Typing</strong>.
          </CardDescription>
        </Card>
        <Card>
          <CardIcon>🎓</CardIcon>
          <CardTitle>Materi JLPT Komprehensif</CardTitle>
          <CardDescription>
            Kurikulum terstruktur mulai dari <b>N5 hingga N1</b>. Mencakup Tata Bahasa, 
            Kumpulan Pola Kalimat, dan Kosakata standar ujian resmi.
          </CardDescription>
        </Card>
        <Card>
          <CardIcon>🔄</CardIcon>
          <CardTitle>Sistem Progres SRS</CardTitle>
          <CardDescription>
            Teknologi <strong>Spaced Repetition System</strong> kami memprediksi waktu terbaik untuk Anda 
            mengingat kembali, memastikan hafalan tersimpan di memori jangka panjang.
          </CardDescription>
        </Card>
      </Grid>
    </Section>
  );
}
