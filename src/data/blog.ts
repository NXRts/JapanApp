export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: 'grammar' | 'culture' | 'kanji' | 'learning-tips';
    readTime: string;
    content: string[]; // Array of strings, each representing a paragraph. Can contain HTML.
    imageUrl?: string;
}

export const mockPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Top 10 Essential Kanji for Beginners',
        excerpt: 'Starting your Kanji journey? Focus on these 10 characters that appear most frequently in daily Japanese life.',
        date: 'January 25, 2026',
        author: 'Kenji Sato',
        category: 'kanji',
        readTime: '5 min read',
        content: [
            'Learning Kanji can feel overwhelming for beginners, but it doesn\'t have to be. By focusing on the most frequently used characters first, you can quickly build a foundation that helps you navigate daily life in Japan.',
            'Here are the top 10 essential kanji every beginner should know:',
            '<strong>1. 一 (Ichi - One)</strong><br/>The simplest kanji, representing the number one. It is used in countless compound words and dates.',
            '<strong>2. 人 (Hito - Person)</strong><br/>A fundamental character representing a person. You will see this on signs, forms, and everywhere else.',
            '<strong>3. 日 (Nichi/Hi - Day/Sun)</strong><br/>Crucial for reading dates and understanding the name for Japan itself, 日本 (Nihon).',
            '<strong>4. 大 (Dai/Oo - Big)</strong><br/>Used to indicate size or importance. Tokyo University, for instance, is called 東京大学 (Tokyo Daigaku).',
            '<strong>5. 学 (Gaku/Mana - Study/Learning)</strong><br/>As a language learner, this kanji is your best friend. It appears in words like 学校 (Gakkou - School) and 学生 (Gakusei - Student).',
            '<em>Note: This is an example post. You can continue adding to this list as you like!</em>'
        ]
    },
    {
        id: '2',
        title: 'Understanding the Particle "Wa" vs "Ga"',
        excerpt: 'One of the most confusing aspects for learners. We break down the differences and when to use each.',
        date: 'January 22, 2026',
        author: 'Yuki Tanaka',
        category: 'grammar',
        readTime: '8 min read',
        content: [
            'The distinction between the particles は (wa) and が (ga) is often cited as one of the biggest hurdles for beginners learning Japanese. While both mark a subject, they serve very different functions in a sentence.',
            '<strong>The Topic Marker は (wa)</strong><br/>The particle は marks the <em>topic</em> of the sentence. It tells the listener what the sentence is about. Think of it as meaning "as for...".',
            'Example: 私は学生です (Watashi wa gakusei desu) - As for me, I am a student.',
            '<strong>The Subject Marker が (ga)</strong><br/>The particle が marks the <em>subject</em> of an action or description, often emphasizing the subject or introducing new information.',
            'Example: 私が学生です (Watashi ga gakusei desu) - I am the one who is a student.',
            'Understanding this nuance takes time and practice, so don\'t worry if you get it wrong at first. Read lots of native sentences, and you\'ll gradually develop a natural feel for when to use which.'
        ]
    },
    {
        id: '3',
        title: 'Hanami: The Art of Flower Viewing',
        excerpt: 'Discover the history and traditions behind Japan\'s famous cherry blossom festivals.',
        date: 'January 18, 2026',
        author: 'Sakura Johnson',
        category: 'culture',
        readTime: '6 min read',
        content: [
            'Hanami (花見), which translates to "flower viewing," is the traditional Japanese custom of enjoying the transient beauty of flowers, almost exclusively referring to those of the cherry (sakura) trees.',
            'From late March to early May, cherry blossoms bloom across Japan, drawing crowds of locals and tourists alike who gather under the pink canopy to eat, drink, and celebrate the arrival of spring.',
            '<strong>A Brief History</strong><br/>The practice is said to have started during the Nara period (710–794), originally featuring ume (plum) blossoms. However, by the Heian period, sakura came to attract more attention, and "hanami" soon became synonymous with cherry blossoms.',
            'Today, hanami is a lively event, often involving picnic blankets spread out beneath the trees, bento boxes filled with seasonal delicacies, and occasionally even karaoke machines. The fleeting nature of the blossoms serves as a poignant reminder of the impermanence of life—a concept deeply rooted in Japanese philosophy.'
        ]
    },
    {
        id: '4',
        title: 'How to Ace the JLPT N5',
        excerpt: 'Strategic tips and study schedules to help you pass the N5 level with confidence.',
        date: 'January 15, 2026',
        author: 'Mike Chen',
        category: 'learning-tips',
        readTime: '10 min read',
        content: [
            'The Japanese Language Proficiency Test (JLPT) N5 is the entry level for learners. Passing it proves you have a basic understanding of Japanese grammar, vocabulary, and kanji.',
            '<strong>1. Master Hiragana and Katakana</strong><br/>These two syllabaries are the bare minimum. You must be able to read and write them quickly without thinking. Use flashcards every day until they are second nature.',
            '<strong>2. Build Your Vocabulary Core</strong><br/>The N5 tests roughly 800 words. Focus on everyday nouns (items around the house, family members, weather) and the most common verbs.',
            '<strong>3. Understand Sentence Structure</strong><br/>Japanese sentence structure is SOV (Subject-Object-Verb). Make sure you are comfortable with basic conjugations (masu, masen, mashita, masen deshita).',
            '<strong>4. Practice Listening</strong><br/>The listening section is notoriously fast for beginners. Start listening to beginner-friendly podcasts or watch simple anime without relying too heavily on subtitles.'
        ]
    },
    {
        id: '5',
        title: 'Japanese Business Etiquette 101',
        excerpt: 'Don\'t make a mistake in your next meeting. Learn the basics of bowing, business cards, and keigo.',
        date: 'January 10, 2026',
        author: 'Kenji Sato',
        category: 'culture',
        readTime: '7 min read',
        content: [
            'Navigating the Japanese corporate world requires an understanding of distinct cultural protocols. The underlying principle is respect and harmony (wa).',
            '<strong>1. The Art of the Business Card (Meishi)</strong><br/>Exchanging business cards is a formal ritual. Present your card with both hands, bow slightly, and receive the other person\'s card with both hands as well. Take a moment to read it carefully before putting it away in a cardholder—never stuff it in your pocket.',
            '<strong>2. Bowing (Ojigi)</strong><br/>The depth and duration of your bow depend on the status of the person you are greeting. An "Eshaku" (15-degree bow) is for casual greetings, while a "Keirei" (30-degree bow) is standard for business.',
            '<strong>3. Keigo (Honorific Language)</strong><br/>Using polite language is compulsory in business. Even if you are not fluent in Keigo, making an effort to use the standard polite "Desu/Masu" forms correctly shows your sincerity.'
        ]
    },
    {
        id: '6',
        title: 'Mastering Katakana in 3 Days',
        excerpt: 'A proven method to memorize all Katakana characters quickly and effectively.',
        date: 'January 5, 2026',
        author: 'Yuki Tanaka',
        category: 'learning-tips',
        readTime: '4 min read',
        content: [
            'While Hiragana curves and flows, Katakana is sharp and angular. Primarily used for foreign loanwords (gairaigo) and emphasis, it often trips up learners who don\'t see it as often as Hiragana.',
            '<strong>Day 1: The Core Vowels and K, S Rows</strong><br/>Focus on the basic five vowels (A, I, U, E, O) and the next two consonant rows (K, S). Write them out physically and look for similarities to their Hiragana counterparts.',
            '<strong>Day 2: The Middle Rows (T, N, H, M)</strong><br/>These rows can be tricky. Pay special attention to シ (shi) and ツ (tsu), as well as ン (n) and ソ (so), as they look incredibly similar but have different stroke directions.',
            '<strong>Day 3: The Rest and Practice</strong><br/>Finish the remaining rows (Y, R, W, N) and start reading real-world examples. Look at menus for coffee shops, fast food restaurants, and foreign movie titles.',
            'Don\'t aim for perfection right away. The key is to start recognizing the shapes when you review vocabulary.'
        ]
    }
];
