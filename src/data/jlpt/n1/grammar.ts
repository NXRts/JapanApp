import { GrammarPoint } from '../n5/grammar';

export const n1Grammar: GrammarPoint[] = [
  {
    id: "kaneru",
    level: "N1",
    title: "〜かねる (kaneru)",
    meaning: "Difficult to / Cannot (due to psychological reasons)",
    structure: "Kata Kerja (Bentuk Masu dicoret) + かねる",
    explanation: "Expresses an inability to do something not because of a lack of physical skill, but because of psychological reasons, social norms, or ethics (objection, hesitation, hard to accept at heart). Often used in formal business.",
    examples: [
      {
        japanese: "そのご提案には賛同しかねます。",
        romaji: "Sono goteian ni wa sandou shikanemasu.",
        english: "I find it difficult (cannot) to agree with that proposal."
      },
      {
        japanese: "私個人の立場からは、お答えしかねます。",
        romaji: "Watashi kojin no tachiba kara wa, okotaeshikanemasu.",
        english: "From my personal position, it is difficult for me to answer that."
      }
    ]
  },
  {
    id: "zaru-o-enai",
    level: "N1",
    title: "〜ざるを得ない (zaru o enai)",
    meaning: "Forced to / Have no choice but to",
    structure: "Kata Kerja (Nai dicoret) + ざるを得ない (*Suru menjadi sezaru)",
    explanation: "An extreme situation where despite someone possibly not wanting to do something, circumstances force them so that there is no choice but to do it.",
    examples: [
      {
        japanese: "これだけ証拠があれば、彼が犯人だと認めざるを得ない。",
        romaji: "Koredake shouko ga areba, kare ga hannin da to mitomezaru o enai.",
        english: "With this much evidence, we have no choice but to admit that he is the culprit."
      },
      {
        japanese: "台風のため、旅行は中止せざるを得なかった。",
        romaji: "Taifuu no tame, ryokou wa chuushi sezaru o enakatta.",
        english: "Due to the typhoon, the trip had to be cancelled (no choice)."
      }
    ]
  },
  {
    id: "koto-naku",
    level: "N1",
    title: "〜ことなしに (koto nashi ni)",
    meaning: "Without doing...",
    structure: "Kata Kerja Kamus + ことなしに",
    explanation: "Very formal. Emphasizes that if the main action is performed without a certain prerequisite or secondary action (A), then the result (B) will be difficult to achieve or impossible.",
    examples: [
      {
        japanese: "過去を反省することなしに、明るい未来はない。",
        romaji: "Kako o hansei suru koto nashi ni, akarui mirai wa nai.",
        english: "Without reflecting on the past, there is no bright future."
      }
    ]
  },
  {
    id: "yogi-naku-sareru",
    level: "N1",
    title: "〜余儀なくされる (yogi naku sareru)",
    meaning: "Forced to / Compelled by circumstances",
    structure: "Kata Benda + を余儀なくされる",
    explanation: "Used in news or very formal writing. Means the subject who has no power to refuse is pushed into an unwanted situation due to unexpected conditions (natural disasters, crises, etc.).",
    examples: [
      {
        japanese: "資金不足のため、計画の変更を余儀なくされた。",
        romaji: "Shikin busoku no tame, keikaku no henkou o yoginaku sareta.",
        english: "Due to lack of funds, we were forced (with great regret) to change the plan."
      }
    ]
  },
  {
    id: "nari-ni",
    level: "N1",
    title: "〜なりに (nari ni)",
    meaning: "In one's own way / Suited to one's level",
    structure: "Noun / Adjective / Verb + なりに",
    explanation: "Even with limitations (status, experience, etc.), someone has done their best effort commensurate with those limits or position.",
    examples: [
      {
        japanese: "子供は子供なりに色々と悩んでいるのだ。",
        romaji: "Kodomo wa kodomo nari ni iro-iro to nayande iru no da.",
        english: "Children, in their own way (typical of children), face various kinds of worries."
      },
      {
        japanese: "私なりに頑張ってみます。",
        romaji: "Watashi nari ni ganbatte mimasu.",
        english: "I will try my best according to my (limited) ability."
      }
    ]
  },
  {
    id: "wo-yogi-naku-saseru",
    level: "N1",
    title: "〜を余儀なくさせる (o yoginaku saseru)",
    meaning: "To force (someone/something) to do...",
    structure: "Kata Benda + を余儀なくさせる",
    explanation: "Causative form of 'yogi naku sareru'. Means a thing (like a disaster, major problem) forces another entity into an unavoidable situation.",
    examples: [
      {
        japanese: "突然の嵐は、船の出港延期を余儀なくさせた。",
        romaji: "Totsuzen no arashi wa, fune no shukkou enki o yoginaku saseta.",
        english: "A sudden storm forced the postponement of the ship's departure."
      }
    ]
  },
  {
    id: "gatera",
    level: "N1",
    title: "〜がてら (gatera)",
    meaning: "While (doing the main action), at the same time...",
    structure: "Kata Kerja (Masu dicoret) / Kata Benda Verbal + がてら",
    explanation: "States that while performing the main task (usually a light movement like walking), the speaker takes the opportunity to perform a secondary task.",
    examples: [
      {
        japanese: "散歩がてら、タバコを買ってきます。",
        romaji: "Sanpo gatera, tabako o katte kimasu.",
        english: "While taking a walk, I'll buy some cigarettes at the same time."
      }
    ]
  },
  {
    id: "katawara",
    level: "N1",
    title: "〜かたわら (katawara)",
    meaning: "While (managing a long-term career/activity)",
    structure: "Kata Kerja (Kamus) / Benda+の + かたわら",
    explanation: "States that in addition to doing a primary profession or work (school, office work), someone also has a second serious activity (such as running a business, writing a novel).",
    examples: [
      {
        japanese: "彼は会社員として働くかたわら、小説を書いている。",
        romaji: "Kare wa kaishain to shite hataraku katawara, shousetsu o kaite iru.",
        english: "Besides working as an office employee, he also writes novels."
      }
    ]
  },
  {
    id: "katagata",
    level: "N1",
    title: "〜かたがた (katagata)",
    meaning: "As a way to... and at the same time...",
    structure: "Kata Benda Verbal + かたがた",
    explanation: "Very formal. Used in letters or official requests to express that one visit has two noble purposes at the same time (e.g., visiting and at the same time expressing gratitude).",
    examples: [
      {
        japanese: "お礼かたがた、ご挨拶にお伺いしました。",
        romaji: "Orei katagata, goaisatsu ni oukagai shimashita.",
        english: "I am visiting to give greetings and at the same time as a form of gratitude."
      }
    ]
  },
  {
    id: "de-are",
    level: "N1",
    title: "〜であれ (de are)",
    meaning: "Even if / Regardless of whether it is...",
    structure: "Kata Benda / Kata Tanya + であれ",
    explanation: "Indicates the fact that whatever conditions exist (A), they will not change the speaker's actions or principles (B). Same as 'de mo'.",
    examples: [
      {
        japanese: "どんな理由であれ、遅刻は許されない。",
        romaji: "Donna riyuu de are, chikoku wa yurusarenai.",
        english: "Whatever the reason, lateness cannot be tolerated."
      }
    ]
  },
  {
    id: "de-are-de-are",
    level: "N1",
    title: "〜であれ〜であれ (de are... de are)",
    meaning: "Whether it be A or B",
    structure: "Benda1 + であれ + Benda2 + であれ",
    explanation: "Mentions two extreme examples (such as old or young, male or female), and states that the principle of the sentence applies equally without differentiating between the two.",
    examples: [
      {
        japanese: "大人であれ子供であれ、法律は守らなければならない。",
        romaji: "Otona de are kodomo de are, houritsu wa mamoranakereba naranai.",
        english: "Whether it be adults or children, the law must still be obeyed."
      }
    ]
  },
  {
    id: "nari-nari",
    level: "N1",
    title: "〜なり〜なり (nari... nari)",
    meaning: "Whether it be A or B, please...",
    structure: "Kata Benda / Kerja Kamus + なり",
    explanation: "Suggests choices from a group of similar items. It gives the impression 'don't be confused, take whatever action from any of them'.",
    examples: [
      {
        japanese: "お茶なりコーヒーなり、好きなものを飲んでください。",
        romaji: "Ocha nari koohii nari, sukinamono o nonde kudasai.",
        english: "Please drink whatever you like, whether it be tea or coffee."
      }
    ]
  },
  {
    id: "bakari-ni",
    level: "N1",
    title: "〜ばかりに (bakari ni)",
    meaning: "Just because... (resulting in something bad)",
    structure: "Bentuk Biasa + ばかりに",
    explanation: "Indicates a deep sense of regret that because of ONE small thing or small mistake, a major tragedy or a permanent bad thing eventually happened.",
    examples: [
      {
        japanese: "本当のことを言ったばかりに、彼を怒らせてしまった。",
        romaji: "Hontou no koto o itta bakari ni, kare o okorasete shimatta.",
        english: "Just because I said the truth, I ended up making him very angry."
      }
    ]
  },
  {
    id: "bekarazu",
    level: "N1",
    title: "〜べからず (bekarazu)",
    meaning: "Strictly prohibited...",
    structure: "Kata Kerja Kamus + べからず",
    explanation: "A very ancient and strict way of writing 'Must not'. Often found on warning signs and written proclamations in the past.",
    examples: [
      {
        japanese: "芝生に入るべからず。",
        romaji: "Shibafu ni hairu bekarazu.",
        english: "It is strictly forbidden to step on the grass."
      }
    ]
  },
  {
    id: "ni-soku-shite",
    level: "N1",
    title: "〜に即して (ni soku shite)",
    meaning: "Precisely adjusted to (reality/experience)",
    structure: "Kata Benda + に即して",
    explanation: "Acting in accordance with certain strict standards, usually law, fact, rule, or reality of life, without deviating from it.",
    examples: [
      {
        japanese: "事実に即して議論を進めよう。",
        romaji: "Jijitsu ni soku shite giron o susumeyou.",
        english: "Let's proceed with this discussion in accordance with the facts."
      }
    ]
  },
  {
    id: "naki-ni-shimo",
    level: "N1",
    title: "〜なきにしもあらず (naki ni shimo arazu)",
    meaning: "Not completely impossible / Still a small possibility",
    structure: "Kata Benda + なきにしもあらず",
    explanation: "A roundabout expression that basically means 'Cannot be said to be zero, so maybe there's still a bit'. An old literary form of 'nai koto wa nai'.",
    examples: [
      {
        japanese: "努力すれば、合格の可能性はなきにしもあらずだ。",
        romaji: "Doryoku sureba, goukaku no kanousei wa nakinishimo arazu da.",
        english: "If we try, it doesn't mean the possibility of passing is completely non-existent."
      }
    ]
  },
  {
    id: "to-attewa",
    level: "N1",
    title: "〜とあっては (to attewa)",
    meaning: "Given that the condition is so special...",
    structure: "Bentuk Biasa + とあっては",
    explanation: "States that 'if the situation is extraordinary/special like this, then the natural reaction must also be special/there is no other choice'.",
    examples: [
      {
        japanese: "社長の命令とあっては、従うしかない。",
        romaji: "Shachou no meirei to attewa, shitagau shika nai.",
        english: "Since this is an order from the director, there is no choice but to obey."
      }
    ]
  },
  {
    id: "ni-ataru",
    level: "N1",
    title: "〜に当たる (ni ataru)",
    meaning: "Equivalent to / Falls into the category of",
    structure: "Kata Benda + に当たる",
    explanation: "States that one entity has the same weight, is equivalent in value, or falls into a specific category present in another group.",
    examples: [
      {
        japanese: "１ドルは１５０円に当たる。",
        romaji: "Ichidoru wa hyakugojuu en ni ataru.",
        english: "One dollar is equivalent to 150 yen."
      }
    ]
  },
  {
    id: "majiki",
    level: "N1",
    title: "〜まじき (majiki)",
    meaning: "Unworthy of... / Not fitting for...",
    structure: "Kata Kerja Kamus + まじき + Benda(Orang/Posisi)",
    explanation: "Strong moral criticism. Indicates that based on their position or profession, the action is absolutely unforgivable or unacceptable (like 'Something unworthy of a teacher').",
    examples: [
      {
        japanese: "それは、プロにあるまじき態度だ。",
        romaji: "Sore wa, puro ni arumajiki taido da.",
        english: "That is an attitude that is truly unworthy of a professional."
      }
    ]
  },
  {
    id: "gotoki",
    level: "N1",
    title: "〜ごとき (gotoki)",
    meaning: "Something at the level of... / Something like...",
    structure: "Kata Benda + のごとき",
    explanation: "Very belittling. Expresses contempt that the mentioned party is of a very low level, unimportant, or only of that class.",
    examples: [
      {
        japanese: "私ごときが意見を言うのはおこがましいが…",
        romaji: "Watashi gotoki ga iken o iu no wa okogamashii ga...",
        english: "It might be presumptuous for someone of my level to give an opinion, but..."
      }
    ]
  },
  {
    id: "iwanya",
    level: "N1",
    title: "いわんや (iwanya)",
    meaning: "Let alone / Even more so",
    structure: "いわんや + Kata Benda / Subjek",
    explanation: "Old writing style from literary language. States 'If even X is impossible, LET ALONE Y (which is much harder)'.",
    examples: [
      {
        japanese: "大人でも解けない問題だ。いわんや子供をや。",
        romaji: "Otona demo tokenai mondai da. Iwanya kodomo o ya.",
        english: "This is a problem that cannot be solved even by adults, let alone by children."
      }
    ]
  },
  {
    id: "ni-taranai",
    level: "N1",
    title: "〜に足らない (ni taranai)",
    meaning: "Not worth... / Unworthy of (being judged/discussed)",
    structure: "Kata Kerja Kamus / Benda + に（は）足らない",
    explanation: "Means 'The value is too low so it's a waste of time to discuss or worry about'.",
    examples: [
      {
        japanese: "あんな噂は、信じるに足らない。",
        romaji: "Anna uwasa wa, shinjiru ni taranai.",
        english: "Such a rumor is not worthy (not deserving) of being believed."
      }
    ]
  },
  {
    id: "gatai",
    level: "N1",
    title: "〜がたい (gatai)",
    meaning: "Hard to believe / Hard to accept",
    structure: "Kata Kerja (Masu dicoret) + がたい",
    explanation: "Different from 'Nikui' (physically difficult). 'Gatai' means mentally/emotionally impossible. Usually paired with cognitive verbs (believe, forgive, imagine, etc.).",
    examples: [
      {
        japanese: "彼が犯罪を犯したなんて、信じがたい。",
        romaji: "Kare ga hanzai o okashita nante, shinjigatai.",
        english: "It is very hard to believe that he has committed a crime."
      }
    ]
  },
  {
    id: "nagara-mo",
    level: "N1",
    title: "〜ながらも (nagara mo)",
    meaning: "Although (within limitations)...",
    structure: "Kata Benda / Kata Sifat / Kata Kerja(Masu dicoret) + ながらも",
    explanation: "Same meaning as 'keredomo' (although). Gives the impression that despite all negative conditions, something still happens.",
    examples: [
      {
        japanese: "狭いながらも、楽しい我が家です。",
        romaji: "Semai nagara mo, tanoshii wagaya desu.",
        english: "Although it's narrow, this is our pleasant home."
      }
    ]
  },
  {
    id: "shimatsu-da",
    level: "N1",
    title: "〜始末だ (shimatsu da)",
    meaning: "Ending in a bad state (shameful end)",
    structure: "Bentuk Biasa + 始末だ",
    explanation: "Used when problems pile up one after another, and in the end result in a very negative or sad/shameful consequence.",
    examples: [
      {
        japanese: "彼は何度も遅刻し、とうとうクビになる始末だ。",
        romaji: "Kare wa nando mo chikoku shi, toutou kubi ni naru shimatsu da.",
        english: "He was late many times, and in the end, it resulted in (shamefully) being fired."
      }
    ]
  }
];
