'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { mockPosts } from '@/data/blog';
import { useEffect, useState } from 'react';

const Container = styled.div`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 3rem;
  transition: color 0.2s;
  
  &:hover {
    color: var(--primary);
  }
`;

const HeaderBanner = styled.div<{ $category: string }>`
  height: 300px;
  border-radius: 20px;
  margin-bottom: 3rem;
  background: ${props => {
        switch (props.$category) {
            case 'kanji': return 'linear-gradient(135deg, #FF6B6B 0%, #EE5253 100%)';
            case 'grammar': return 'linear-gradient(135deg, #4834d4 0%, #686de0 100%)';
            case 'culture': return 'linear-gradient(135deg, #f0932b 0%, #ffbe76 100%)';
            case 'learning-tips': return 'linear-gradient(135deg, #6ab04c 0%, #badc58 100%)';
            default: return 'var(--surface-light)';
        }
    }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 8rem;
  opacity: 0.9;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.2) 100%);
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const Category = styled.span<{ $category: string }>`
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.35rem 1rem;
  border-radius: 999px;
  background: ${props => {
        switch (props.$category) {
            case 'kanji': return 'rgba(255, 107, 107, 0.1)';
            case 'grammar': return 'rgba(72, 52, 212, 0.1)';
            case 'culture': return 'rgba(240, 147, 43, 0.1)';
            case 'learning-tips': return 'rgba(106, 176, 76, 0.1)';
            default: return 'var(--surface-light)';
        }
    }};
  color: ${props => {
        switch (props.$category) {
            case 'kanji': return '#FF6B6B';
            case 'grammar': return '#686de0';
            case 'culture': return '#f0932b';
            case 'learning-tips': return '#6ab04c';
            default: return 'var(--text-secondary)';
        }
    }};
`;

const DateText = styled.span`
  font-size: 1rem;
  color: var(--text-secondary);
`;

const ReadTime = styled.span`
  font-size: 1rem;
  color: var(--text-secondary);
  
  &::before {
    content: '•';
    margin-right: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: var(--foreground);
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 3rem;
`;

const AuthorAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: var(--foreground);
  font-size: 1.1rem;
`;

const AuthorRole = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const Content = styled.div`
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-secondary);
  
  p {
    margin-bottom: 1.5rem;
  }
  
  strong {
    color: var(--foreground);
    font-weight: 600;
  }
  
  em {
    font-style: italic;
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
                <Title>Post Not Found</Title>
                <BackButton onClick={() => router.push('/blog')}>
                    ← Back to Blog
                </BackButton>
            </NotFoundContainer>
        );
    }

    return (
        <Container>
            <BackButton onClick={() => router.push('/blog')}>
                ← Back to Blog
            </BackButton>

            <HeaderBanner $category={post.category}>
                {post.category === 'kanji' && '字'}
                {post.category === 'grammar' && '文'}
                {post.category === 'culture' && '和'}
                {post.category === 'learning-tips' && '学'}
            </HeaderBanner>

            <Meta>
                <Category $category={post.category}>{post.category.replace('-', ' ')}</Category>
                <DateText>{post.date}</DateText>
                <ReadTime>{post.readTime}</ReadTime>
            </Meta>

            <Title>{post.title}</Title>

            <AuthorSection>
                <AuthorAvatar />
                <AuthorInfo>
                    <AuthorName>{post.author}</AuthorName>
                    <AuthorRole>Contributor</AuthorRole>
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
