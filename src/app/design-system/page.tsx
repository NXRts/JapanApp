'use client';

import styled from 'styled-components';
import React from 'react';

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  color: var(--foreground);
  font-family: 'Inter', sans-serif;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 50px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  @media (prefers-color-scheme: dark) {
    background-color: var(--surface);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }
`;

const PageTitle = styled.h1`
  color: var(--foreground);
  border-bottom: 4px solid var(--primary);
  padding-bottom: 15px;
  margin-bottom: 30px;
  font-size: 2.25rem;
  font-weight: 800;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SectionTitle = styled.h2`
  border-bottom: 2px solid var(--border);
  padding-bottom: 8px;
  margin-top: 50px;
  margin-bottom: 20px;
  color: var(--foreground);
  font-size: 1.5rem;
  font-weight: 700;
`;

const ActionableBox = styled.div`
  background-color: #f0fdf4;
  border-left: 5px solid #10b981;
  padding: 20px;
  margin-top: 20px;
  border-radius: 0 8px 8px 0;
  
  @media (prefers-color-scheme: dark) {
    background-color: rgba(16, 185, 129, 0.1);
  }

  h4 {
    margin-top: 0;
    color: #065f46;
    margin-bottom: 10px;
    font-size: 1.1rem;
    
    @media (prefers-color-scheme: dark) {
      color: #34d399;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 0.95rem;

  th, td {
    text-align: left;
    padding: 14px;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
  }

  th {
    background-color: var(--background);
    color: var(--text-secondary);
    font-weight: 600;
  }
`;

const Code = styled.code`
  background: var(--background);
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  color: #db2777;
  font-family: monospace;
`;

const Pre = styled.pre`
  background: #1e293b;
  color: #f8fafc;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.9rem;
  margin: 15px 0;
`;

const ColorSwatchBox = styled.div<{ bg: string }>`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  margin-right: 12px;
  vertical-align: middle;
  border: 1px solid var(--border);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  background-color: ${props => props.bg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 20px;
`;

const InteractiveCard = styled.div`
  background: var(--surface);
  padding: 2rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' | 'specialty' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${props => props.variant === 'primary' && `
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: white;
    box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);
    &:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(79, 70, 229, 0.3); }
  `}

  ${props => props.variant === 'secondary' && `
    background: var(--secondary);
    color: white;
    &:hover { transform: translateY(-2px); opacity: 0.9; }
  `}

  ${props => props.variant === 'outline' && `
    background: transparent;
    border: 2px solid var(--primary);
    color: var(--primary);
    &:hover { background: var(--primary); color: white; }
  `}
  
  ${props => props.variant === 'specialty' && `
    background: rgba(0, 212, 255, 0.05);
    border: 1px solid rgba(0, 212, 255, 0.3);
    color: #00d4ff;
    &:hover { background: #00d4ff; color: white; transform: translateY(-3px); }
  `}

  ${props => !props.variant && `
    background: var(--surface);
    color: var(--foreground);
    border: 1px solid var(--border);
    &:hover { background: var(--background); }
  `}
`;

export default function DesignSystemPage() {
  return (
    <PageWrapper>
      <Container>
        <PageTitle>Comprehensive Technical & UI/UX Audit</PageTitle>
        <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
          <strong>Auditor Roles:</strong> Senior UI/UX Auditor, Frontend Engineer, & Software Architect<br/>
          <strong>Fokus Audit:</strong> Desain Sistem, Arsitektur Frontend, Aliran Data, dan Standar Kualitas.
        </p>

        {/* SECTION 1 */}
        <SectionTitle>1. Sistem Warna (Color Palette & Accessibility)</SectionTitle>
        <p>Aplikasi menggunakan skema warna berbasis tema (Light/Dark mode) dengan implementasi CSS Variables murni.</p>
        
        <Table>
          <thead>
            <tr>
              <th>Peran Warna</th>
              <th>Kode HEX</th>
              <th>Preview</th>
              <th>Analisis Kontras (WCAG)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Primary (Indigo)</td>
              <td><Code>#4F46E5</Code></td>
              <td><ColorSwatchBox bg="var(--primary)" /></td>
              <td><span style={{color: '#10B981', fontWeight: 700}}>Pass (AAA)</span> terhadap teks putih. Sangat aman.</td>
            </tr>
            <tr>
              <td>Primary Light</td>
              <td><Code>#818CF8</Code></td>
              <td><ColorSwatchBox bg="var(--primary-light)" /></td>
              <td><span style={{color: '#F59E0B', fontWeight: 700}}>Warning (AA)</span> - Kurang kontras jika dipakai untuk teks kecil di atas latar putih.</td>
            </tr>
            <tr>
              <td>Secondary (Emerald)</td>
              <td><Code>#10B981</Code></td>
              <td><ColorSwatchBox bg="var(--secondary)" /></td>
              <td><span style={{color: '#10B981', fontWeight: 700}}>Pass</span> terhadap latar putih.</td>
            </tr>
            <tr>
              <td>Background (Light)</td>
              <td><Code>#F1F5F9</Code></td>
              <td><ColorSwatchBox bg="var(--background)" /></td>
              <td><span style={{color: '#10B981', fontWeight: 700}}>Pass</span> kontras tinggi dengan teks gelap.</td>
            </tr>
          </tbody>
        </Table>

        {/* SECTION 2 */}
        <SectionTitle>2. Tipografi (Typography & Hierarchy)</SectionTitle>
        <ul>
            <li style={{marginBottom: '10px'}}><strong>Font Family:</strong> <Code>'Inter'</Code> (Alfabet Latin) & <Code>'Noto Sans JP'</Code> (Karakter Jepang). Pilihan terbaik untuk aplikasi bahasa.</li>
            <li style={{marginBottom: '10px'}}><strong>Hirarki Teks:</strong>
                <ul style={{marginTop: '10px', marginLeft: '20px'}}>
                    <li style={{marginBottom: '5px'}}><strong>Hero Title (H1):</strong> <Code>4.5rem</Code>, Font Weight <Code>900</Code>, Line Height <Code>1.1</Code>. Sangat tepat untuk Display Type.</li>
                    <li><strong>Body Text & Caption:</strong> Ukuran Body menggunakan <Code>1rem</Code>. Caption/Level menggunakan <Code>0.72rem</Code> monospace.</li>
                </ul>
            </li>
        </ul>
        <div style={{ background: 'var(--background)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)', marginTop: '20px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: 0 }}>Heading Besar (H1)</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginTop: '10px' }}>Subtitle dengan kontras sekunder (H2/P)</p>
          <p style={{ fontSize: '1rem', marginTop: '10px' }}>Body text regular dengan ukuran standar yang sangat nyaman dibaca oleh pengguna. 日本語のテキスト。</p>
        </div>

        {/* SECTION 3 */}
        <SectionTitle>3. Komponen UI Interaktif (Live Showcase)</SectionTitle>
        <p style={{marginBottom: '20px'}}>Berikut adalah komponen UI asli (Live) yang di-render langsung di halaman ini berdasarkan gaya CSS sistem:</p>
        
        <h3 style={{marginBottom: '15px'}}>A. Gaya Tombol (Buttons)</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '30px' }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button>Default Button</Button>
          <Button variant="specialty">JLPT Challenge</Button>
        </div>

        <h3 style={{marginBottom: '15px'}}>B. Interactive Cards</h3>
        <Grid>
          <InteractiveCard>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Materi Hiragana</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Pelajari dasar huruf Jepang dengan metode interaktif.
            </p>
            <Button variant="primary" style={{width: '100%'}}>Mulai Belajar</Button>
          </InteractiveCard>
          <InteractiveCard>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Latihan Kanji</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Uji kemampuan menulis dan membaca Kanji Anda.
            </p>
            <Button variant="outline" style={{width: '100%'}}>Latihan Sekarang</Button>
          </InteractiveCard>
        </Grid>

        {/* SECTION 4 */}
        <SectionTitle>4. Audit Aset Visual & Referensi Ikon</SectionTitle>
        <p>Pemeriksaan pada file <Code>src/components/icons/AppIcons.tsx</Code> menunjukkan pembuatan SVG manual (*hardcoded*).</p>
        <ActionableBox>
            <h4>💡 Actionable Insight (Software Architect):</h4>
            <p style={{marginBottom: '10px'}}>Membangun SVG manual di satu file besar tidak <em>scalable</em>. Sangat direkomendasikan untuk beralih menggunakan pustaka pihak ketiga yang dijamin konsisten dan dioptimalkan (Tree-shakable).</p>
            <strong>Referensi Ikon Modern:</strong>
            <ul style={{marginTop: '10px', marginLeft: '20px'}}>
                <li><strong>Lucide React:</strong> Gaya <em>outline</em> murni, ketebalan seragam (default 2px). (<Code>npm install lucide-react</Code>).</li>
                <li><strong>Heroicons:</strong> Dibuat oleh pembuat Tailwind, sangat padu dengan gaya UI aplikasi ini.</li>
            </ul>
        </ActionableBox>

        {/* SECTION 5 */}
        <SectionTitle>5. Pemetaan Aliran Data & Referensi API</SectionTitle>
        <p>Berdasarkan <Code>ProgressContext.tsx</Code>, aplikasi ini sangat bergantung pada <em>Client-Side Storage</em> (<Code>localStorage</Code>) untuk menyimpan data vital pengguna.</p>
        
        <Pre>
{`{
  "user_id": "usr_9a8b7c6d",
  "level": 5,
  "total_exp": 1240,
  "current_streak": 3,
  "srs_items": {
    "日": {
      "level": 3,
      "correct": 5,
      "next_review": "2026-05-18T10:00:00Z"
    }
  }
}`}
        </Pre>
        <ActionableBox>
            <h4>💡 Actionable Insight (Data Flow):</h4>
            <p>Logika penyimpanan <Code>localStorage</Code> di <Code>useEffect</Code> berjalan <em>synchronous</em>. Jika data bertambah besar (ribuan kanji), ini akan menyebabkan <strong>UI Blocking (Lag)</strong>. Pertimbangkan beralih menggunakan <strong>IndexedDB</strong> melalui <em>library</em> ringan seperti <Code>localforage</Code> atau integrasi langsung dengan Supabase PostgreSQL.</p>
        </ActionableBox>

        {/* SECTION 6 */}
        <SectionTitle>6. Desain Interaksi & Pengalaman Pengguna (UX)</SectionTitle>
        <ul style={{marginLeft: '20px'}}>
            <li style={{marginBottom: '10px'}}><strong>Pola Membaca (F-Shape):</strong> Tata letak mengikuti kebiasaan baca Barat. CTA utama tersorot secara terpusat (Central Focus).</li>
            <li style={{marginBottom: '10px'}}><strong>Tombol Hamburger (Mobile):</strong> Area sentuh (<em>padding: 0.2rem</em> pada layar &lt; 600px) jauh di bawah standar ergonomi (min 44px).</li>
            <li style={{marginBottom: '10px'}}><strong>Animasi Menu Mobile:</strong> Menu turun dari atas, namun tidak ada <em>overlay/backdrop</em> penutup pada konten sisa di bawahnya.</li>
        </ul>
        
        <hr style={{ marginTop: '50px', border: 0, borderTop: '1px solid var(--border)' }} />
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '20px' }}>
          Comprehensive Audit &copy; 2026 - Japan-App System Design & Technical Report.
        </p>

      </Container>
    </PageWrapper>
  );
}
