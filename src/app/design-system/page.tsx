'use client';

import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  color: var(--foreground);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  border-bottom: 2px solid var(--border);
  padding-bottom: 0.5rem;
  color: var(--foreground);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ColorSwatch = styled.div<{ bg: string }>`
  background-color: ${props => props.bg};
  height: 100px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: flex-end;
  padding: 1rem;
`;

const ColorInfo = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem;
  border-radius: 8px;
  width: 100%;
  
  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const ColorName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
`;

const ColorVar = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-family: monospace;
`;

const FontShowcase = styled.div`
  background: var(--surface);
  padding: 2rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
`;

const TextSample = styled.div<{ size: string, weight: number }>`
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${props => props.variant === 'primary' && `
    background: var(--primary);
    color: white;
    box-shadow: var(--shadow-md);
    &:hover { background: var(--primary-dark); }
  `}

  ${props => props.variant === 'secondary' && `
    background: var(--secondary);
    color: white;
    box-shadow: var(--shadow-md);
    &:hover { opacity: 0.9; }
  `}

  ${props => props.variant === 'outline' && `
    background: transparent;
    border: 2px solid var(--primary);
    color: var(--primary);
    &:hover { background: var(--primary); color: white; }
  `}

  ${props => !props.variant && `
    background: var(--surface);
    color: var(--foreground);
    border: 1px solid var(--border);
    &:hover { background: var(--background); }
  `}
`;

const Card = styled.div`
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

export default function DesignSystem() {
  const colors = [
    { name: 'Primary', var: 'var(--primary)', hex: '#4F46E5' },
    { name: 'Primary Light', var: 'var(--primary-light)', hex: '#818CF8' },
    { name: 'Primary Dark', var: 'var(--primary-dark)', hex: '#3730A3' },
    { name: 'Secondary', var: 'var(--secondary)', hex: '#10B981' },
    { name: 'Accent', var: 'var(--accent)', hex: '#F43F5E' },
    { name: 'Background', var: 'var(--background)', hex: '#F1F5F9' },
    { name: 'Surface', var: 'var(--surface)', hex: '#FFFFFF' },
    { name: 'Foreground', var: 'var(--foreground)', hex: '#0F172A' },
  ];

  const levels = [
    { name: 'Level Purple', var: 'var(--rm-purple)', hex: '#6D28D9' },
    { name: 'Level Pink', var: 'var(--rm-pink)', hex: '#BE185D' },
    { name: 'Level Orange', var: 'var(--rm-orange)', hex: '#F97316' },
    { name: 'Level Blue', var: 'var(--rm-blue)', hex: '#2563EB' },
  ];

  return (
    <Container>
      <Header>
        <Title>Design System & Style Guide</Title>
        <Subtitle>Dokumentasi Warna, Tipografi, dan Komponen UI Japan-App</Subtitle>
      </Header>

      <Section>
        <SectionTitle>Palette Warna Utama</SectionTitle>
        <Grid>
          {colors.map((color) => (
            <ColorSwatch key={color.name} bg={color.var}>
              <ColorInfo>
                <ColorName>{color.name}</ColorName>
                <ColorVar>{color.var}</ColorVar>
                <ColorVar>{color.hex}</ColorVar>
              </ColorInfo>
            </ColorSwatch>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Warna Roadmap / Level</SectionTitle>
        <Grid>
          {levels.map((color) => (
            <ColorSwatch key={color.name} bg={color.var}>
              <ColorInfo>
                <ColorName>{color.name}</ColorName>
                <ColorVar>{color.var}</ColorVar>
                <ColorVar>{color.hex}</ColorVar>
              </ColorInfo>
            </ColorSwatch>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Tipografi (Inter & Noto Sans JP)</SectionTitle>
        <FontShowcase>
          <TextSample size="3rem" weight={800}>Heading 1 (800) - こんにちは</TextSample>
          <TextSample size="2.25rem" weight={700}>Heading 2 (700) - 日本語を学ぶ</TextSample>
          <TextSample size="1.875rem" weight={600}>Heading 3 (600) - The quick brown fox</TextSample>
          <TextSample size="1.25rem" weight={500}>Subtitle (500) - Jumps over the lazy dog</TextSample>
          <TextSample size="1rem" weight={400}>Body (400) - Ini adalah font reguler untuk konten teks. Lorem ipsum dolor sit amet.</TextSample>
        </FontShowcase>
      </Section>

      <Section>
        <SectionTitle>Komponen Tombol (Buttons)</SectionTitle>
        <ButtonGroup>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button>Default/Ghost Button</Button>
        </ButtonGroup>
      </Section>

      <Section>
        <SectionTitle>Kartu Interaktif (Cards)</SectionTitle>
        <Grid>
          <Card>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Materi Hiragana</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Pelajari dasar huruf Jepang dengan metode interaktif.
            </p>
            <Button variant="primary">Mulai Belajar</Button>
          </Card>
          <Card>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Latihan Kanji</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Uji kemampuan menulis dan membaca Kanji Anda.
            </p>
            <Button variant="outline">Latihan Sekarang</Button>
          </Card>
          <Card>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Statistik</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Lihat perkembangan belajar Anda hari ini.
            </p>
            <Button>Lihat Detail</Button>
          </Card>
        </Grid>
      </Section>
      
      <Section>
        <SectionTitle>Audit Insights & Recommendations</SectionTitle>
        <Grid style={{ gridTemplateColumns: '1fr' }}>
          <Card style={{ borderLeft: '4px solid var(--accent)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>⚠️ Peringatan Kontras (Accessibility)</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Tombol "Specialty Button" (JLPT Challenge) dengan teks Cyan (#00d4ff) pada background terang memiliki rasio kontras yang rendah menurut standar WCAG.
            </p>
            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <span style={{ color: '#00d4ff', fontWeight: 'bold' }}>JLPT Challenge (Current - Sulit dibaca)</span>
              <br/>
              <span style={{ color: '#0284c7', fontWeight: 'bold', marginTop: '0.5rem', display: 'inline-block' }}>JLPT Challenge (Rekomendasi - Lebih terbaca: #0284c7)</span>
            </div>
          </Card>

          <Card style={{ borderLeft: '4px solid var(--secondary)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>📱 Optimasi Mobile (Tap Target)</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Pada <strong>Navbar Mobile</strong>, padding tombol Hamburger di bawah 600px menyusut menjadi <code>0.2rem</code>. 
              Ini membuat area sentuh (tap target) kurang dari standar kelayakan UX (44x44px). 
            </p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
               <button style={{ padding: '0.2rem', border: '1px solid var(--accent)', background: 'var(--surface)', color: 'var(--foreground)', cursor: 'pointer' }}>Tap Kecil (Saat ini)</button>
               <span style={{ color: 'var(--text-secondary)' }}>vs</span>
               <button style={{ padding: '0.7rem', border: '1px solid var(--secondary)', background: 'var(--surface)', color: 'var(--foreground)', cursor: 'pointer' }}>Tap Ideal (Rekomendasi)</button>
            </div>
          </Card>

          <Card style={{ borderLeft: '4px solid #8b5cf6' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#8b5cf6' }}>📐 Audit Aset Ikon (Architecture)</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Ditemukan SVG yang di-<em>hardcode</em> secara manual pada <code>AppIcons.tsx</code>. Sebagian besar konsisten bergaya <em>Outline</em>, namun ada satu yang bocor bergaya <em>Solid</em> (<code>StarIcon</code>).
            </p>
            <div style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <strong>Rekomendasi:</strong> Migrasi ke pustaka <code>lucide-react</code> atau <code>heroicons</code> agar manajemen <em>icon</em> lebih <em>scalable</em>, <em>tree-shakable</em>, dan ukuran <em>stroke</em> selalu dijamin seragam (2px).
            </div>
          </Card>

          <Card style={{ borderLeft: '4px solid #3b82f6' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#3b82f6' }}>💾 Pemetaan Aliran Data (State Management)</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Data *Progress*, *Exp*, dan data Spaced Repetition (SRS) saat ini disimpan secara *synchronous* di dalam <code>localStorage</code> (pada <code>ProgressContext.tsx</code>).
            </p>
            <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <strong>Risiko:</strong> Menyimpan <em>string</em> JSON raksasa secara *synchronous* akan memicu <strong>UI Blocking (Lag)</strong> saat data kanji membesar. <br/><br/>
              <strong>Rekomendasi Integrasi:</strong> Pindahkan ke IndexedDB (menggunakan <code>localforage</code>) atau bangun sistem <em>Cloud-Sync API</em> (via <strong>Supabase</strong> atau <strong>Firebase</strong>).
            </div>
          </Card>
        </Grid>
      </Section>
    </Container>
  );
}
