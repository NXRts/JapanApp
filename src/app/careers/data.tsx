import React from 'react';

export interface Job {
    id: string;
    slug: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
}

export const values = [
    {
        title: "Continuous Kaizen",
        description: "We believe in constant improvement, both in our product and our personal growth.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
            </svg>
        ),
    },
    {
        title: "User Empathy",
        description: "We build for real learners. We understand the struggles of learning a new language.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        ),
    },
    {
        title: "Simplicity First",
        description: "We take complex concepts and make them simple and accessible to everyone.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        ),
    },
    {
        title: "Global Connection",
        description: "We're bridging cultures and bringing people together through language.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
        ),
    },
];

export const jobs: Job[] = [
    {
        id: "1",
        slug: "senior-frontend-engineer",
        title: "Senior Frontend Engineer",
        department: "Engineering",
        location: "Tokyo / Remote",
        type: "Full-time",
        description: "We are looking for a Senior Frontend Engineer to lead our web team. You will be responsible for building beautiful, responsive interfaces using Next.js and styled-components.",
        responsibilities: [
            "Architect and build scalable frontend components",
            "Mentor junior engineers and conduct code reviews",
            "Collaborate with design to implement pixel-perfect UIs",
            "Optimize application performance and accessibility",
        ],
        requirements: [
            "5+ years of experience with React and TypeScript",
            "Deep understanding of CSS and styled-components",
            "Experience with Next.js App Router",
            "Passion for Japanese language learning is a plus",
        ],
    },
    {
        id: "2",
        slug: "ux-designer",
        title: "UX/UI Designer",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        description: "Join us to shape the future of language learning. We need a designer who can create intuitive and delightful experiences for students worldwide.",
        responsibilities: [
            "Design user flows, wireframes, and high-fidelity mockups",
            "Conduct user research and usability testing",
            "Maintain and evolve our design system",
            "Work closely with engineers to ensure design quality",
        ],
        requirements: [
            "3+ years of product design experience",
            "Strong portfolio showcasing web and mobile apps",
            "Proficiency in Figma",
            "Experience with animation/motion design is a bonus",
        ],
    },
    {
        id: "3",
        slug: "content-writer",
        title: "Japanese Content Writer",
        department: "Content",
        location: "Kyoto / Remote",
        type: "Part-time",
        description: "Help us create engaging learning materials. From grammar guides to cultural blog posts, your words will help thousands learn Japanese.",
        responsibilities: [
            "Write clear and accurate explanations of Japanese grammar",
            "Create engaging cultural blog posts",
            "Review and improve existing learning content",
            "Collaborate with the curriculum team",
        ],
        requirements: [
            "Native or N1 level Japanese proficiency",
            "Excellent English writing skills",
            "Experience teaching Japanese is highly preferred",
            "Ability to explain complex concepts simply",
        ],
    },
];
