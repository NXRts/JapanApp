'use client';

import styled, { keyframes } from 'styled-components';
import { useParams, useRouter } from 'next/navigation';
import { mockPosts } from '@/data/blog';
import { useEffect, useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-10px) scale(1.02); }
  100% { transform: translateY(0px) scale(1); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); } /* var(--primary) approx */
  70% { box-shadow: 0 0 0 15px rgba(79, 70, 229, 0); }
  100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
`;

const Container = styled.div`
  min-height: 100vh;
  padding: 2.5rem 2rem 6rem;
  max-width: 850px;
  margin: 0 auto;
`;



const HeaderBanner = styled.div<{ $category: string }>`
  height: 400px;
  border-radius: 32px;
  margin-bottom: 4rem;
  background: ${props => {
    switch (props.$category) {
      case 'kanji': return 'linear-gradient(135deg, #ff4757, #ff6b81)';
      case 'grammar': return 'linear-gradient(135deg, #3742fa, #5352ed)';
      case 'culture': return 'linear-gradient(135deg, #ffa502, #eccc68)';
      case 'learning-tips': return 'linear-gradient(135deg, #2ed573, #7bed9f)';
      default: return 'var(--primary)';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12rem;
  font-weight: 800;
  position: relative;
  overflow: hidden;
  box-shadow: 0 30px 60px -15px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.2);
  animation: ${fadeInUp} 0.8s ease-out forwards;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+') repeat;
    opacity: 0.6;
    mix-blend-mode: overlay;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.4) 100%);
    pointer-events: none;
  }
`;

const FloatingIcon = styled.div`
  animation: ${float} 6s ease-in-out infinite;
  text-shadow: 0 20px 40px rgba(0,0,0,0.4);
  z-index: 1;
  font-family: 'Noto Sans JP', sans-serif;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  animation: ${fadeInUp} 0.8s ease-out 0.15s forwards;
  opacity: 0;
`;

const Category = styled.span<{ $category: string }>`
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 0.6rem 1.5rem;
  border-radius: 999px;
  position: relative;
  overflow: hidden;
  background: ${props => {
    switch (props.$category) {
      case 'kanji': return 'rgba(255, 71, 87, 0.1)';
      case 'grammar': return 'rgba(55, 66, 250, 0.1)';
      case 'culture': return 'rgba(255, 165, 2, 0.1)';
      case 'learning-tips': return 'rgba(46, 213, 115, 0.1)';
      default: return 'var(--surface)';
    }
  }};
  color: ${props => {
    switch (props.$category) {
      case 'kanji': return '#ff4757';
      case 'grammar': return '#5352ed';
      case 'culture': return '#ffa502';
      case 'learning-tips': return '#2ed573';
      default: return 'var(--text-secondary)';
    }
  }};
  border: 1px solid currentColor;
  
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: ${shimmer} 3s infinite;
  }
`;

const DateText = styled.span`
  font-size: 1.05rem;
  color: var(--text-secondary);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ReadTime = styled.span`
  font-size: 1.05rem;
  color: var(--text-secondary);
  font-weight: 500;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.4;
    margin-right: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
  color: var(--foreground);
  line-height: 1.15;
  letter-spacing: -0.03em;
  animation: ${fadeInUp} 0.8s ease-out 0.25s forwards;
  opacity: 0;
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 3.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 4rem;
  animation: ${fadeInUp} 0.8s ease-out 0.35s forwards;
  opacity: 0;
`;

const AuthorAvatarWrapper = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  animation: ${pulseGlow} 3s infinite;
`;

const AuthorAvatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--surface);
  border: 3px solid var(--background);
  background-image: url('https://api.dicebear.com/7.x/notionists/svg?seed=Kenji&backgroundColor=transparent');
  background-size: cover;
  background-position: center;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AuthorName = styled.span`
  font-weight: 700;
  color: var(--foreground);
  font-size: 1.25rem;
  margin-bottom: 0.2rem;
`;

const AuthorRole = styled.span`
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
`;

const Content = styled.div`
  font-size: 1.25rem;
  line-height: 2;
  color: var(--text-secondary);
  animation: ${fadeInUp} 0.8s ease-out 0.45s forwards;
  opacity: 0;
  
  p {
    margin-bottom: 2.5rem;
  }
  
  strong {
    color: var(--foreground);
    font-weight: 700;
  }
  
  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--foreground);
    margin: 4.5rem 0 2rem;
    letter-spacing: -0.02em;
  }
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--foreground);
    margin: 3.5rem 0 1.5rem;
  }
  
  blockquote {
    border-left: 4px solid var(--primary);
    padding: 2.5rem;
    margin: 4rem 0;
    font-style: italic;
    font-size: 1.5rem;
    color: var(--foreground);
    background: linear-gradient(90deg, rgba(79, 70, 229, 0.08) 0%, transparent 100%);
    border-radius: 0 24px 24px 0;
    position: relative;
    line-height: 1.8;
    
    &::before {
      content: '"';
      position: absolute;
      top: -1rem;
      left: -1rem;
      font-size: 6rem;
      color: var(--primary);
      opacity: 0.15;
      font-family: serif;
      line-height: 1;
    }
  }
  
  ul, ol {
    margin-bottom: 3rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 1rem;
      padding-left: 0.5rem;
      
      &::marker {
        color: var(--primary);
        font-weight: bold;
      }
    }
  }
`;

const NotFoundContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : null;
  const post = mockPosts.find(p => p.id === id);

  if (!post) {
    return (
      <NotFoundContainer>
        <div style={{ alignSelf: 'flex-start', width: '100%' }}>
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }]} current="Post Not Found" />
        </div>
        <Title>Post Not Found</Title>

      </NotFoundContainer>
    );
  }

  return (
    <Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }]} current={post.title} />
      <HeaderBanner $category={post.category}>
        <FloatingIcon>
          {post.category === 'kanji' && '字'}
          {post.category === 'grammar' && '文'}
          {post.category === 'culture' && '和'}
          {post.category === 'learning-tips' && '学'}
        </FloatingIcon>
      </HeaderBanner>

      <Meta>
        <Category $category={post.category}>{post.category.replace('-', ' ')}</Category>
        <DateText>{post.date}</DateText>
        <ReadTime>{post.readTime}</ReadTime>
      </Meta>

      <Title>{post.title}</Title>

      <AuthorSection>
        <AuthorAvatarWrapper>
          <AuthorAvatar />
        </AuthorAvatarWrapper>
        <AuthorInfo>
          <AuthorName>{post.author}</AuthorName>
          <AuthorRole>Contributor, JapanApp</AuthorRole>
        </AuthorInfo>
      </AuthorSection>

      <Content>
        {post.content.map((paragraph, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
      </Content>
    </Container>
  );
}
