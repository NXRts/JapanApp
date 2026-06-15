export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: "grammar" | "culture" | "kanji" | "learning-tips";
  readTime: string;
  content: string[]; // Array of strings, each representing a paragraph. Can contain HTML.
  imageUrl?: string;
}

export const mockPosts: BlogPost[] = [
  {
    id: "18",
    title: "The JLPT July Exam Preparation Strategy",
    excerpt:
      "With the July JLPT exam approaching, it's time to solidify your study plan. Here is a month-by-month guide.",
    date: "April 5, 2026",
    author: "Mike Chen",
    category: "learning-tips",
    readTime: "8 min read",
    content: [
      "As the month of April sets in, the window for the annual July Japanese Language Proficiency Test (JLPT) starts to shrink, signaling the absolute necessity for a rigorous and structured study timeline. Language learners often fall into the trap of procrastination, believing that standard vocabulary and kanji study can be crammed into the final few weeks. However, true proficiency and test-taking speed require months of consistent neural conditioning and active retrieval practice, which must begin immediately.",
      "During the first phase, spanning April and May, your primary objective must be content absorption and theoretical mastery of new concepts. This involves utilizing spaced repetition systems (SRS) to commit hundreds of level-appropriate vocabulary and kanji to memory, alongside dissecting complex grammar rules from textbooks. Once the core database is established, you should transition in June into weaknesses targeting, diagnosing failure points on simulated timed exams, and spending targeted hours practicing listening compression.",
      "Finally, the final week leading up to the exam must be reserved for structural mock exams and mental conditioning. Simulating the exact constraints of the test center—ranging from the strict time allocations for each section to the physical exhaustion of sitting in a quiet room for hours—is critical for building endurance. Avoid attempting to learn any new materials at this stage; instead, prioritize good rest, review your personal cheat sheets, and enter the testing center with confidence in your consistent preparation.",
    ],
  },
  {
    id: "17",
    title: "Exploring Regional Dialects: Kansai-ben Basics",
    excerpt:
      "Move beyond standard Tokyo Japanese and learn how to sound like a local in Osaka or Kyoto.",
    date: "March 20, 2026",
    author: "Sakura Johnson",
    category: "culture",
    readTime: "6 min read",
    content: [
      "While standard Japanese (Hyoudougo) based on the Tokyo dialect is the default standard taught in academic institutions worldwide, the linguistic landscape of Japan is highly regionalized and diverse. Among these variations, Kansai-ben—the distinct dialect spoken in the Kansai region including Osaka, Kyoto, and Kobe—is undoubtedly the most popular and culturally influential. For learners wishing to move past textbook boundaries and sound like a natural local, understanding the rhythmic, expressive, and energetic character of Kansai-ben is an essential step.",
      'The lexical variations in Kansai-ben are not merely minor pronunciation differences, but entirely unique vocabulary structures. For instance, the standard expression of gratitude, "Arigatou gozaimasu," is frequently replaced in local Kansai shops by the warm, friendly "Ookini." Similarly, standard qualifiers like "sugoku" or "totemo" (very) are replaced by "meccha," which carries a much more emphatic and casual tone. Verb endings also change: "dame" (no good) becomes "akan," and the default assertion particle "da" is swapped for "ya" or "yanen," immediately signaling familiarity and warmth.',
      'Beyond vocabulary, Kansai-ben is deeply intertwined with the region\'s rich cultural history of comedy and street performance, particularly "Manzai" (traditional stand-up comedy). Spoken Japanese in Osaka has a distinct cadence, often described as faster, more melodic, and highly expressive compared to the polite reserve of Tokyo. Incorporating Kansai-ben phrases into your speech when interacting with locals not only shows cultural appreciation but also acts as an instant icebreaker, bringing friendly smiles and welcoming conversation.',
    ],
  },
  {
    id: "2",
    title: 'Understanding the Particle "Wa" vs "Ga"',
    excerpt:
      "One of the most confusing aspects for learners. We break down the differences and when to use each.",
    date: "January 22, 2026",
    author: "Yuki Tanaka",
    category: "grammar",
    readTime: "8 min read",
    content: [
      "The distinction between the particles は (wa) and が (ga) represents one of the most persistent hurdles for non-native Japanese language learners. At first glance, both particles seem to mark the subject of a sentence, leading to confusion and incorrect sentence structure. However, the difference lies in their underlying linguistic functions: は is a topic marker that establishes what the sentence is about, whereas が is a subject marker that identifies the specific agent performing the action or carrying the attribute.",
      'When utilizing the topic marker は (wa), the speaker is introducing information that is already known or established, setting it up as the thematic frame for the rest of the sentence. The focus of the sentence is placed on what is being said about the topic, rather than the topic itself. In contrast, the subject marker が (ga) is used to introduce new information, answer "who" or "what" questions directly, or emphasize the subject exclusively over other possibilities. For example, "Watashi wa Tanaka desu" simply translates to "As for me, I am Tanaka," whereas "Watashi ga Tanaka desu" carries the strong connotation that "I am the one (among others) who is Tanaka."',
      "Developing a natural feel for this nuance requires a transition from isolated sentence translation to analyzing continuous dialogues and reading materials. Notice how when a character is first introduced in a story, they are marked with が to signal their entry as new information, and subsequently referred to with は because they have become established topics. By actively observing these patterns in real-world contexts, learners can gradually master this core grammar mechanism and formulate much more natural Japanese sentences.",
    ],
  },
  {
    id: "3",
    title: "Hanami: The Art of Flower Viewing",
    excerpt:
      "Discover the history and traditions behind Japan's famous cherry blossom festivals.",
    date: "January 18, 2026",
    author: "Sakura Johnson",
    category: "culture",
    readTime: "6 min read",
    content: [
      'Hanami (花見), which translates literally to "flower viewing," is one of Japan\'s most historic and widely celebrated cultural traditions, centered on appreciating the fleeting beauty of cherry blossoms (sakura). The practice is deeply rooted in the aesthetic philosophy of Mono no Aware, which reflects a gentle sadness at the transience of life and things. Because the delicate pink blossoms remain in full bloom for only a week or two before being carried away by the wind, they serve as a yearly reminder to cherish the present moment.',
      "Historically, the practice originated during the Nara period (710–794) under the influence of Chinese custom, though it initially focused on plum blossoms rather than cherry blossoms. By the Heian period, the imperial court shifted its affection to sakura, and the aristocracy began holding elaborate poetry-writing parties under the blooming branches. Over the centuries, this custom transitioned from the elite classes down to the general public, evolving into the vibrant, modern-day outdoor festival format we recognize today.",
      "In contemporary Japan, Hanami is a highly social and interactive event where colleagues, families, and friends gather in local parks to secure picnic spots early in the morning. People bring blue plastic sheets, bento boxes filled with spring-themed food, and seasonal drinks, enjoying food and conversation late into the night. It is a time when standard corporate protocols relax, allowing people from all walks of life to connect, laugh, and celebrate the arrival of spring under the beautifully lit cherry trees.",
    ],
  },
  {
    id: "4",
    title: "How to Ace the JLPT N5",
    excerpt:
      "Strategic tips and study schedules to help you pass the N5 level with confidence.",
    date: "January 15, 2026",
    author: "Mike Chen",
    category: "learning-tips",
    readTime: "10 min read",
    content: [
      "The Japanese Language Proficiency Test (JLPT) N5 level serves as the crucial foundation for every serious Japanese learner, testing basic comprehension of vocabulary, grammar, and kanji. Preparing for this exam requires more than just passive reading; it demands a structured study routine designed to cover approximately 800 words and 100 kanji characters. Without a solid foundation at this stage, navigating the subsequent intermediate levels becomes exponentially more difficult, making systematic N5 prep essential.",
      'Your primary focus must be absolute mastery of Hiragana and Katakana, which must be read and written without any hesitation before you begin grammar study. Next, construct a robust vocabulary database using flashcards or spaced repetition apps, focusing on common daily verbs, adjectives, and nouns. For grammar, pay close attention to basic particles (wa, ga, o, ni, de) and the standard conjugations of verbs in their polite "masu" and casual "dictionary" forms, as these structures form the scaffolding of the entire language.',
      "Additionally, the listening section is often the most intimidating portion of the N5 test for beginners because of the speed and acoustic format of the audio playing in the test hall. To counter this, start listening to short, native-speaker audio clips daily without reading subtitles, train your ears to pick out keywords, and practice timed sample exams. Building stamina to focus during the reading and grammar sections under strict time constraints will ensure you pass the N5 exam with confidence.",
    ],
  },
  {
    id: "5",
    title: "Japanese Business Etiquette 101",
    excerpt:
      "Don't make a mistake in your next meeting. Learn the basics of bowing, business cards, and keigo.",
    date: "January 10, 2026",
    author: "Kenji Sato",
    category: "culture",
    readTime: "7 min read",
    content: [
      "Navigating the professional corporate landscape in Japan requires a deep appreciation for the country's unique business protocols, which prioritize harmony, hierarchy, and respect. For foreigners starting a career or attending meetings with Japanese clients, understanding these unwritten rules is vital to establishing trust and avoiding cultural misunderstandings. The underlying principle is that your actions should always reflect humility, active listening, and consideration for the collective group.",
      "The formal exchange of business cards, known as Meishi Koukan, is a highly ritualized ceremony that takes place at the very start of any business meeting. When presenting your card, you must hold it with both hands at the top corners, bow slightly, and present it with the text facing the receiver so they can read it immediately. You must receive their card with both hands, thank them, study the details respectfully, and place it neatly on the table in front of you during the meeting, rather than shoving it directly into your pocket or wallet.",
      "Beyond cards, bowing (Ojigi) and corporate hierarchy shape how individuals interact during meetings, including who speaks first and where people sit in the room. Standard seating arrangements, known as Kamiza (seat of honor) and Shimoza (lower seat), dictate that the client or senior executive sits furthest from the entrance, while junior employees sit closest to the door. By mastering these details and showing sincere effort, you will demonstrate your professionalism and build strong, respectful business relationships.",
    ],
  },
  {
    id: "11",
    title: "Omotenashi: The Heart of Japanese Hospitality",
    excerpt:
      "More than just 'customer service,' Omotenashi is a deep-rooted philosophy of selfless care.",
    date: "February 20, 2026",
    author: "Sakura Johnson",
    category: "culture",
    readTime: "6 min read",
    content: [
      "The concept of Omotenashi (おもてなし) is central to the high standard of service and warmth experienced by visitors throughout Japan, extending far beyond the concept of standard customer service. Rooted in the traditional Japanese tea ceremony (Chado), it represents the philosophy of host and guest sharing a single, irreplaceable moment in time where every gesture is performed with care. The goal of the host is to provide hospitality that is completely selfless, sincere, and focused on creating a peaceful and harmonious environment.",
      "In practice, Omotenashi is characterized by the anticipation of a guest's needs before they have even formulated them or requested assistance. This is visible in the smallest details of daily life, such as taxi drivers wearing white gloves and opening the passenger door automatically, or store staff bowing as you leave the establishment. The host provides these services invisibly and gracefully, ensuring the guest feels entirely comfortable and valued without making them feel obligated or causing them any social embarrassment.",
      "Crucially, this high level of care is delivered without any expectation of a tip or financial reward, as tipping is not a part of Japanese culture and can even be seen as offensive. Instead, the reward for the host is the simple satisfaction of having served the guest well and maintained social harmony. By showing politeness, saying a warm thank you, and respecting local rules in return, travelers can participate in this beautiful cultural exchange and show their appreciation for the hospitality they receive.",
    ],
  },
  {
    id: "12",
    title: 'Mastering the Particle "Ni" vs "De"',
    excerpt:
      "Stop mixing up your location particles. We explain when to use Ni and when to use De.",
    date: "February 22, 2026",
    author: "Yuki Tanaka",
    category: "grammar",
    readTime: "7 min read",
    content: [
      'Choosing between に (ni) and で (de) is a common headache for learners. Both can translate to "at" or "in" in English, but they focus on different things. Using them interchangeably is a telltale sign of a foreign accent and can sometimes lead to confusion about the nature of the statement. The key to mastering this distinction lies in understanding the core verbs and the fundamental relationship between the subject, the action, and the location.',
      'The particle に (ni) is primarily used to mark the location of existence or static presence, indicating where something is located or where it settles. It is almost always paired with verbs of state or static existence, such as "iru" (to exist for animate objects), "aru" (to exist for inanimate objects), or "sumu" (to live/reside). For example, "Tokyo ni sunde imasu" indicates that you reside in Tokyo. It is also used as a target of direction or motion, marking where an action finishes, such as entering a room or boarding a train.',
      'On the other hand, the particle で (de) acts as the location of action, marking the arena or stage where an active event takes place. It is paired with action verbs like "hashiru" (to run), "taberu" (to eat), or "benkyou suru" (to study), indicating where the subject performs the activity. For example, "Kouen de hashirimasu" means you are actively running within the park. By thinking of に as a static pinpoint on a map and で as the active stage of an event, you can choose the correct particle with ease.',
    ],
  },
  {
    id: "13",
    title: "5 Tips for Remembering Kanji Long-term",
    excerpt:
      "Tired of forgetting Kanji the day after you study? Try these brain-friendly techniques.",
    date: "February 24, 2026",
    author: "Mike Chen",
    category: "learning-tips",
    readTime: "8 min read",
    content: [
      "Memorizing the thousands of Kanji characters required for Japanese literacy is a monumental task that often leads to frustration when characters seem to slip out of memory. Rote memorization through copying characters dozens of times is highly inefficient and rarely leads to long-term storage in the brain's neural pathways. To overcome the natural forgetting curve, learners must adopt active recall strategies and brain-friendly techniques that build meaningful connections.",
      'One of the most effective methods is utilizing Spaced Repetition Systems (SRS), which schedule reviews of characters at increasing intervals right before your brain is about to forget them. Additionally, instead of studying kanji as isolated symbols, always learn them in the context of real vocabulary words, linking the character to concrete meanings and readings. For example, rather than just memorizing the symbol for "power" (力), learn it within words like "ryoku" (power) or "chikara" (strength) to lock in its usage.',
      'Another key technique is breaking complex characters down into their constituent parts, known as radicals, and creating vivid mnemonics or stories around those parts. The brain remembers stories and visual relationships far better than abstract lines, making it easy to recall that the kanji for "rest" (休) is a person (亻) leaning against a tree (木). Finally, consolidate this knowledge by reading simple Japanese texts, as seeing the characters in actual sentences will cement their usage and make them second nature.',
    ],
  },
  {
    id: "15",
    title: "Onsen Etiquette: A Guide to Japanese Hot Springs",
    excerpt:
      "Your first visit to a Japanese public bath can be intimidating. Here is everything you need to know.",
    date: "February 27, 2026",
    author: "Sakura Johnson",
    category: "culture",
    readTime: "6 min read",
    content: [
      "Visiting a traditional Japanese hot spring (Onsen) is the ultimate relaxation ritual, offering mineral-rich thermal waters and beautiful natural landscapes. However, public bathing is a communal experience governed by strict, unwritten rules of hygiene and social decorum that can feel intimidating to first-time visitors. Understanding the protocol before you go is essential to ensure that you feel confident and respect the peaceful atmosphere shared by local bathers.",
      "The absolute golden rule of onsen bathing is that you must wash and rinse your entire body thoroughly at the shower stations before entering the bathwater. The communal pools are strictly for soaking and relaxation, meaning the water must remain entirely clean and soap-free at all times. Sit on the provided plastic stools at the washing station, utilize the soap and shampoo, and rinse off completely, ensuring no residue remains on your skin before you step into the hot springs.",
      "Additionally, traditional onsens require guests to enter the baths completely naked, as swimsuits and clothing are not permitted in the water. You will be given a small modesty towel, which you can use to cover yourself while walking between the changing room and the showers, but this towel must never touch the hot spring water itself; most bathers place it on the side of the tub or fold it on top of their head. Respecting these rules and keeping conversations quiet will allow you to fully enjoy this restorative cultural experience.",
    ],
  },
];
