"use client";

import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

import { mockPosts } from "@/data/blog";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1.5rem 0.75rem 3rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(
    135deg,
    var(--foreground) 0%,
    var(--text-secondary) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 0.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 0 0.5rem;
    line-height: 1.5;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
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

  @media (max-width: 768px) {
    border-radius: 16px;
  }
`;

const CardImage = styled.div<{ $category: string }>`
  height: 200px;
  background: ${(props) => {
    switch (props.$category) {
      case "kanji":
        return "linear-gradient(135deg, #FF6B6B 0%, #EE5253 100%)";
      case "grammar":
        return "linear-gradient(135deg, #4834d4 0%, #686de0 100%)";
      case "culture":
        return "linear-gradient(135deg, #f0932b 0%, #ffbe76 100%)";
      case "learning-tips":
        return "linear-gradient(135deg, #6ab04c 0%, #badc58 100%)";
      default:
        return "var(--surface-light)";
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
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      transparent 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
  }

  @media (max-width: 768px) {
    height: 100px;
    font-size: 2.5rem;
  }
`;

const CardContent = styled.div`
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
`;

const Category = styled.span<{ $category: string }>`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: ${(props) => {
    switch (props.$category) {
      case "kanji":
        return "rgba(255, 107, 107, 0.1)";
      case "grammar":
        return "rgba(72, 52, 212, 0.1)";
      case "culture":
        return "rgba(240, 147, 43, 0.1)";
      case "learning-tips":
        return "rgba(106, 176, 76, 0.1)";
      default:
        return "var(--surface-light)";
    }
  }};
  color: ${(props) => {
    switch (props.$category) {
      case "kanji":
        return "#FF6B6B";
      case "grammar":
        return "#686de0";
      case "culture":
        return "#f0932b";
      case "learning-tips":
        return "#6ab04c";
      default:
        return "var(--text-secondary)";
    }
  }};

  @media (max-width: 768px) {
    font-size: 0.6rem;
    padding: 0.15rem 0.5rem;
  }
`;

const Date = styled.span`
  font-size: 0.85rem;
  color: var(--text-secondary);

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const PostTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--foreground);
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 2.5em;
  }
`;

const Excerpt = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    line-height: 1.4;
    margin-bottom: 0.75rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  margin-top: auto;

  @media (max-width: 768px) {
    padding-top: 0.5rem;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--foreground);
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    gap: 0.25rem;
  }
`;

const AuthorAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

const ReadTime = styled.span`
  font-size: 0.85rem;
  color: var(--text-secondary);

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 4rem auto;
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 1.5rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--foreground);
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &::placeholder {
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
  font-size: 1.2rem;
  background: var(--surface);
  border-radius: 20px;
  border: 1px dashed var(--border);
`;

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = mockPosts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().replace("-", " ").includes(query)
    );
  });

  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Blog" />
      <Header>
        <Title>Latest Insights</Title>
        <Subtitle>
          Tips, guides, and stories to help you on your journey to mastering
          Japanese.
        </Subtitle>
      </Header>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search articles by title, excerpt, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

      {filteredPosts.length > 0 ? (
        <Grid>
          {filteredPosts.map((post) => (
            <BlogCard href={`/blog/${post.id}`} key={post.id}>
              <CardImage $category={post.category}>
                {/* Simple placeholder icon based on category */}
                {post.category === "kanji" && "字"}
                {post.category === "grammar" && "文"}
                {post.category === "culture" && "和"}
                {post.category === "learning-tips" && "学"}
              </CardImage>
              <CardContent>
                <Meta>
                  <Category $category={post.category}>
                    {post.category.replace("-", " ")}
                  </Category>
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
      ) : (
        <EmptyState>
          No articles found matching "{searchQuery}". Try a different search
          term.
        </EmptyState>
      )}
    </Container>
  );
}
