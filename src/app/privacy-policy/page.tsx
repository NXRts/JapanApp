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

export default function PrivacyPolicy() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <Container>
            <Title>Privacy Policy</Title>
            <LastUpdated>Last updated: {currentDate}</LastUpdated>

            <Section>
                <SectionTitle>Introduction</SectionTitle>
                <Paragraph>
                    Welcome to Japan App. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our application or website.
                </Paragraph>
                <Paragraph>
                    By accessing or using our services, you agree to the practices described in this Privacy Policy.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Information We Collect</SectionTitle>
                <Paragraph>
                    We collect various types of information for different purposes to provide and improve our service to you.
                </Paragraph>
                <List>
                    <ListItem>
                        <strong>Usage Data:</strong> We may collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                    </ListItem>
                    <ListItem>
                        <strong>Cookies and Tracking Data:</strong> We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                    </ListItem>
                </List>
            </Section>

            <Section>
                <SectionTitle>Use of Data</SectionTitle>
                <Paragraph>
                    Japan App uses the collected data for various purposes:
                </Paragraph>
                <List>
                    <ListItem>To provide and maintain the Service</ListItem>
                    <ListItem>To notify you about changes to our Service</ListItem>
                    <ListItem>To allow you to participate in interactive features of our Service when you choose to do so</ListItem>
                    <ListItem>To provide customer care and support</ListItem>
                    <ListItem>To provide analysis or valuable information so that we can improve the Service</ListItem>
                    <ListItem>To monitor the usage of the Service</ListItem>
                    <ListItem>To detect, prevent and address technical issues</ListItem>
                </List>
            </Section>

            <Section>
                <SectionTitle>Data Security</SectionTitle>
                <Paragraph>
                    The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Links to Other Sites</SectionTitle>
                <Paragraph>
                    Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
                </Paragraph>
                <Paragraph>
                    We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Changes to This Privacy Policy</SectionTitle>
                <Paragraph>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </Paragraph>
                <Paragraph>
                    You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>Contact Us</SectionTitle>
                <Paragraph>
                    If you have any questions about this Privacy Policy, please contact us:
                </Paragraph>
                <List>
                    <ListItem>By email: support@japanapp.com</ListItem>
                </List>
            </Section>
        </Container>
    );
}
