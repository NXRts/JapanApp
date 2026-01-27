'use client';

import styled from 'styled-components';
import Link from 'next/link';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: 'grammar' | 'culture' | 'kanji' | 'learning-tips';
    readTime: string;
}

const mockPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Top 10 Essential Kanji for Beginners',
        excerpt: 'Starting your Kanji journey? Focus on these 10 characters that appear most frequently in daily Japanese life.',
        date: 'January 25, 2026',
        author: 'Kenji Sato',
        category: 'kanji',
        readTime: '5 min read'
    },
    {
        id: '2',
        title: 'Understanding the Particle "Wa" vs "Ga"',
        excerpt: 'One of the most confusing aspects for learners. We break down the differences and when to use each.',
        date: 'January 22, 2026',
        author: 'Yuki Tanaka',
        category: 'grammar',
        readTime: '8 min read'
    },
    {
        id: '3',
        title: 'Hanami: The Art of Flower Viewing',
        excerpt: 'Discover the history and traditions behind Japan\'s famous cherry blossom festivals.',
        date: 'January 18, 2026',
        author: 'Sakura Johnson',
        category: 'culture',
        readTime: '6 min read'
    },
    {
        id: '4',
        title: 'How to Ace the JLPT N5',
        excerpt: 'Strategic tips and study schedules to help you pass the N5 level with confidence.',
        date: 'January 15, 2026',
        author: 'Mike Chen',
        category: 'learning-tips',
        readTime: '10 min read'
    },
    {
        id: '5',
        title: 'Japanese Business Etiquette 101',
        excerpt: 'Don\'t make a mistake in your next meeting. Learn the basics of bowing, business cards, and keigo.',
        date: 'January 10, 2026',
        author: 'Kenji Sato',
        category: 'culture',
        readTime: '7 min read'
    },
    {
        id: '6',
        title: 'Mastering Katakana in 3 Days',
        excerpt: 'A proven method to memorize all Katakana characters quickly and effectively.',
        date: 'January 5, 2026',
        author: 'Yuki Tanaka',
        category: 'learning-tips',
        readTime: '4 min read'
    }
];

const Container = styled.div`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--foreground) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BlogCard = styled(Link)`
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary-light);
    box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.div<{ $category: string }>`
  height: 200px;
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
  font-size: 5rem;
  opacity: 0.9;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 100%);
  }
`;

const CardContent = styled.div`
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Category = styled.span<{ $category: string }>`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.75rem;
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

const Date = styled.span`
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

const PostTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--foreground);
  line-height: 1.3;
`;

const Excerpt = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  margin-top: auto;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--foreground);
  font-weight: 500;
`;

const AuthorAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
`;

const ReadTime = styled.span`
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

export default function BlogPage() {
    return (
        <Container>
            <Header>
                <Title>Latest Insights</Title>
                <Subtitle>
                    Tips, guides, and stories to help you on your journey to mastering Japanese.
                </Subtitle>
            </Header>

            <Grid>
                {mockPosts.map((post) => (
                    <BlogCard href={`/blog/${post.id}`} key={post.id}>
                        <CardImage $category={post.category}>
                            {/* Simple placeholder icon based on category */}
                            {post.category === 'kanji' && '字'}
                            {post.category === 'grammar' && '文'}
                            {post.category === 'culture' && '和'}
                            {post.category === 'learning-tips' && '学'}
                        </CardImage>
                        <CardContent>
                            <Meta>
                                <Category $category={post.category}>{post.category.replace('-', ' ')}</Category>
                                <Date>{post.date}</Date>
                            </Meta>
                            <PostTitle>{post.title}</PostTitle>
                            <Excerpt>{post.excerpt}</Excerpt>
                            <Footer>
                                <Author>
                                    <AuthorAvatar />
                                    {post.author}
                                </Author>
                                <ReadTime>{post.readTime}</ReadTime>
                            </Footer>
                        </CardContent>
                    </BlogCard>
                ))}
            </Grid>
        </Container>
    );
}
