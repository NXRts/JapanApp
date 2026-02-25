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
    },
    {
        id: '7',
        title: 'Common Mistakes in Japanese Pronunciation',
        excerpt: 'Think you have the sounds down? Watch out for these common pitfalls that reveal a foreign accent.',
        date: 'February 1, 2026',
        author: 'Mike Chen',
        category: 'learning-tips',
        readTime: '6 min read',
        content: [
            'Japanese pronunciation is often considered "easy" because it has fewer sounds than English, but mastering the rhythm and pitch is where the real challenge lies.',
            '<strong>1. The Double Consonant (Sokuon)</strong><br/>The small っ (tsu) indicates a slight pause. Missing this can change the meaning of a word entirely, like "kite" (come) vs "kitte" (stamp).',
            '<strong>2. Long Vowels (Chouon)</strong><br/>Length matters! "Obasan" means aunt, while "Obaasan" means grandmother. Holding the vowel for two beats instead of one is crucial for clarity.',
            '<strong>3. The "R" Sound</strong><br/>The Japanese "r" is a flap, similar to the Spanish "r" or the "tt" in the American English word "butter." It is not the rounded "r" found in English.',
            'Practice by recording yourself and comparing it to native speakers. You will start to hear the subtle differences in no time!'
        ]
    },
    {
        id: '8',
        title: 'Counting in Japanese: Beyond Ichi, Ni, San',
        excerpt: 'Counters are the secret boss of Japanese grammar. Here is how to use the most common ones.',
        date: 'February 5, 2026',
        author: 'Yuki Tanaka',
        category: 'grammar',
        readTime: '9 min read',
        content: [
            'In Japanese, you can\'t just use a number to count things. You need a "counter" suffix that depends on the shape or type of the object you are counting.',
            '<strong>-tsu (General Objects)</strong><br/>The most versatile counter for 1-10. Hitotsu, Futatsu, Mittsu... if you forget a specific counter, this is your safety net.',
            '<strong>-nin (People)</strong><br/>Used for counting people. Watch out for the irregulars: Hitori (1 person) and Futari (2 people). From three onwards, it becomes "number + nin" (San-nin, Yo-nin).',
            '<strong>-mai (Flat Objects)</strong><br/>Use this for paper, stamps, plates, and even T-shirts. Anything thin and flat falls into this category.',
            '<strong>-hon (Long, Cylindrical Objects)</strong><br/>This covers pens, bottles, umbrellas, and even movies! Interestingly, the pronunciation changes to -pon or -bon depending on the number (Ippon, Sanbon).',
            'Don\'t try to memorize all 500+ counters at once. Start with these four and you will be able to handle most basic situations.'
        ]
    },
    {
        id: '9',
        title: 'The Magic of Onomatopoeia in Japanese',
        excerpt: 'From "goro-goro" to "pika-pika," learn how sound effects add flavor to everyday conversation.',
        date: 'February 10, 2026',
        author: 'Sakura Johnson',
        category: 'culture',
        readTime: '5 min read',
        content: [
            'Japanese is incredibly rich in onomatopoeia (giseigo and gitaigo). Unlike English, these words don\'t just describe sounds, but also feelings, states, and movements.',
            '<strong>1. Pika-pika (Sparkling/Shining)</strong><br/>Think of Pikachu! This describes something clean, bright, or flashing.',
            '<strong>2. Goro-goro (Rolling/Idling)</strong><br/>The sound of thunder rolling, or a cat purring. It is also used to describe "doing nothing" or lounging around at home.',
            '<strong>3. Fuwa-fuwa (Fluffy/Airy)</strong><br/>The perfect word for pancakes, clouds, or a soft pillow.',
            '<strong>4. Ira-ira (Irritated)</strong><br/>When you are stuck in traffic or waiting for a slow website, you are feeling "ira-ira."',
            'Using these words makes your Japanese sound much more natural and expressive. They are especially common in manga and casual speech!'
        ]
    },
    {
        id: '10',
        title: 'Kanji Radicals: The Building Blocks',
        excerpt: 'Stop memorizing strokes and start recognizing patterns by understanding radicals.',
        date: 'February 15, 2026',
        author: 'Kenji Sato',
        category: 'kanji',
        readTime: '7 min read',
        content: [
            'Every complex kanji is actually made up of smaller pieces called "radicals" (bushu). Understanding these is like knowing the roots of words in English.',
            '<strong>The Meaning of Radicals</strong><br/>Radicals often give you a hint about the meaning of the kanji. For example, the "water" radical (氵) appears in words like 海 (sea), 泳 (swim), and 池 (pond).',
            '<strong>The "Person" Radical (亻)</strong><br/>When this appears on the left side, the kanji usually relates to human activity, such as 休 (rest - a person leaning against a tree) or 体 (body).',
            '<strong>The "Fire" Radical (火 or 灬)</strong><br/>Found in kanji like 焼 (bake/grill) or 熱 (hot). If you see these four dots at the bottom, there is likely some heat involved!',
            'By learning the 214 traditional radicals, you can break down even the most intimidating kanji into manageable parts.'
        ]
    },
    {
        id: '11',
        title: 'Omotenashi: The Heart of Japanese Hospitality',
        excerpt: 'More than just "customer service," Omotenashi is a deep-rooted philosophy of selfless care.',
        date: 'February 20, 2026',
        author: 'Sakura Johnson',
        category: 'culture',
        readTime: '6 min read',
        content: [
            'If you have ever visited Japan, you might have noticed the impeccable service in shops and hotels. This is <strong>Omotenashi</strong> (おもてなし).',
            '<strong>Anticipating Needs</strong><br/>Unlike Western service which often reacts to requests, Omotenashi is about anticipating a guest\'s needs before they even realize them. It is the taxi driver opening the door automatically or the wet towel (oshibori) offered immediately upon sitting at a restaurant.',
            '<strong>No Expectation of a Reward</strong><br/>A key part of Omotenashi is that it is performed without the expectation of a tip. In Japan, high-quality service is the standard, not an extra to be paid for.',
            'Understanding this concept will help you appreciate the subtle gestures of kindness you encounter throughout your travels in Japan.'
        ]
    },
    {
        id: '12',
        title: 'Mastering the Particle "Ni" vs "De"',
        excerpt: 'Stop mixing up your location particles. We explain when to use Ni and when to use De.',
        date: 'February 22, 2026',
        author: 'Yuki Tanaka',
        category: 'grammar',
        readTime: '7 min read',
        content: [
            'Choosing between に (ni) and で (de) is a common headache for learners. Both can translate to "at" or "in" in English, but they focus on different things.',
            '<strong>The Existence Particle に (ni)</strong><br/>Use に when you are talking about where something <em>exists</em> or stays. It is often paired with verbs like "iru" (to be), "aru" (to be), or "sumu" (to live).',
            'Example: 東京に住んでいます (Tokyo ni sunde imasu) - I live in Tokyo.',
            '<strong>The Action Particle で (de)</strong><br/>Use で when an <em>active event</em> or action is taking place. It describes the "stage" where the action happens.',
            'Example: 公園で走ります (Kouen de hashirimasu) - I run in the park.',
            'Think of に as a "point" on a map where something sits, and で as the "arena" where things happen!'
        ]
    },
    {
        id: '13',
        title: '5 Tips for Remembering Kanji Long-term',
        excerpt: 'Tired of forgetting Kanji the day after you study? Try these brain-friendly techniques.',
        date: 'February 24, 2026',
        author: 'Mike Chen',
        category: 'learning-tips',
        readTime: '8 min read',
        content: [
            'The "forgetting curve" is real, especially with Kanji. Here is how to make the characters stick in your long-term memory.',
            '<strong>1. Use Spaced Repetition (SRS)</strong><br/>Apps like Anki or Wanikani are game-changers. They show you kanji right before you are about to forget them, strengthening the neural pathways.',
            '<strong>2. Learn Vocabulary, Not Just Individual Kanji</strong><br/>Don\'t just learn the character for "Electric" (電). Learn it in context: 電車 (Densha - Train) and 電話 (Denwa - Phone).',
            '<strong>3. Write by Hand (Occasionally)</strong><br/>While we type most things today, the muscle memory of stroke order helps your brain distinguish between similar-looking characters.',
            '<strong>4. Create Mnemonics</strong><br/>Make up a story! For example, the kanji for "Rest" (休) looks like a person (亻) leaning against a tree (木). Your brain loves stories more than abstract lines.'
        ]
    },
    {
        id: '14',
        title: 'Chopstick Etiquette: The Do\'s and Don\'ts',
        excerpt: 'Avoid awkward stares at the dinner table by mastering these essential chopstick rules.',
        date: 'February 25, 2026',
        author: 'Kenji Sato',
        category: 'culture',
        readTime: '5 min read',
        content: [
            'Dining in Japan is a polite affair, and how you handle your chopsticks (hashi) says a lot about your manners.',
            '<strong>The "Big No-No": Vertical Chopsticks</strong><br/>Never stick your chopsticks vertically into a bowl of rice. This resembles incense at a funeral and is considered very unlucky.',
            '<strong>Passing Food</strong><br/>Do not pass food directly from your chopsticks to someone else\'s. This also mirrors a funeral ritual. Instead, place the food on their plate.',
            '<strong>Pointing and Wandering</strong><br/>Avoid pointing at people with your chopsticks, and don\'t "hover" them over different dishes while deciding what to eat (known as "Sashi-bashi").',
            'When you are finished, place them neatly on the chopstick rest (hashioki) or back in their paper sleeve.'
        ]
    },
    {
        id: '15',
        title: 'Onsen Etiquette: A Guide to Japanese Hot Springs',
        excerpt: 'Your first visit to a Japanese public bath can be intimidating. Here is everything you need to know.',
        date: 'February 27, 2026',
        author: 'Sakura Johnson',
        category: 'culture',
        readTime: '6 min read',
        content: [
            'Visiting an onsen (hot spring) is the ultimate Japanese relaxation experience. However, there are strict rules to follow to ensure everyone has a peaceful time.',
            '<strong>1. Wash Before You Soak</strong><br/>The most important rule: the bath water must stay clean. You must scrub your entire body at the shower stations before entering the communal pool.',
            '<strong>2. No Clothes or Swimsuits</strong><br/>Traditional onsens are enjoyed completely nude. While it might feel awkward at first, remember that everyone else is in the same boat—it is considered natural and "naked friendship" (hadaka no tsukiai).',
            '<strong>3. Keep Your Towel Out of the Water</strong><br/>You will be given a small "modesty towel." You can wrap it around your head or place it on the side of the bath, but never let it touch the water.',
            '<strong>4. Quiet and Calm</strong><br/>An onsen is a place for meditation and quiet conversation. Avoid splashing or swimming. When you leave, dry yourself off slightly before heading back to the locker room to keep the floor dry.',
            'Note: Many traditional onsens still have restrictions on tattoos, though "tattoo-friendly" spots are becoming more common in major cities.'
        ]
    }
];
