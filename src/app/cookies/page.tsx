'use client';

import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  color: var(--foreground);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LastUpdated = styled.p`
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 3rem;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 4px;
    height: 24px;
    background: var(--primary);
    border-radius: 2px;
    display: inline-block;
  }
`;

const Paragraph = styled.p`
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 1rem;
  text-align: justify;
  
  a {
    color: var(--primary);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
  line-height: 1.8;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

export default function CookiePolicy() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <Container>
            <Title>Cookie Policy</Title>
            <LastUpdated>Last updated: {currentDate}</LastUpdated>

            <Section>
                <SectionTitle>What Are Cookies?</SectionTitle>
                <Paragraph>
                    Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and improve the user experience.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>How We Use Cookies</SectionTitle>
                <Paragraph>
                    Japan App uses cookies for several reasons, including:
                </Paragraph>
                <List>
                    <ListItem>
                        <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas.
                    </ListItem>
                    <ListItem>
                        <strong>Performance & Analytics Cookies:</strong> We use these cookies to understand how visitors interact with our website, which helps us improve our content and user experience.
                    </ListItem>
                    <ListItem>
                        <strong>Functional Cookies:</strong> These cookies allow the website to remember choices you make (such as your preferred language) to provide enhanced features.
                    </ListItem>
                </List>
            </Section>

            <Section>
                <SectionTitle>Managing Cookies</SectionTitle>
                <Paragraph>
                    You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. However, this may prevent you from taking full advantage of the website.
                </Paragraph>
                <Paragraph>
                    To manage your cookie preferences, please refer to your browser's help documentation.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Changes to This Policy</SectionTitle>
                <Paragraph>
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Contact Us</SectionTitle>
                <Paragraph>
                    If you have any questions about our use of cookies, please contact us at <a href="mailto:japanapp@gmail.com">japanapp@gmail.com</a>.
                </Paragraph>
            </Section>
        </Container>
    );
}
