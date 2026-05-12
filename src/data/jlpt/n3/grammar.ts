import { GrammarPoint } from '../n5/grammar';

export const n3Grammar: GrammarPoint[] = [
  {
    id: "nagara",
    level: "N3",
    title: "〜ながら (nagara)",
    meaning: "While / Simultaneously",
    structure: "Kata Kerja (Bentuk Masu dicoret) + ながら",
    explanation: "Used to indicate that the subject is doing two activities at the same time. The main action is the verb that comes after ながら.",
    examples: [
      {
        japanese: "音楽を聴きながら勉強します。",
        romaji: "Ongaku o kikinagara benkyou shimasu.",
        english: "I study while listening to music."
      }
    ]
  },
  {
    id: "ni-chigainai",
    level: "N3",
    title: "〜に違いない (ni chigainai)",
    meaning: "Certainly / Must be",
    structure: "Bentuk Biasa (Kamus/Ta/Nai) + に違いない",
    explanation: "Used to express strong conviction or a conclusion by the speaker based on evidence or intuition.",
    examples: [
      {
        japanese: "彼は犯人に違いない。",
        romaji: "Kare wa hannin ni chigainai.",
        english: "He must be the culprit."
      }
    ]
  },
  {
    id: "koto-ni-natte-iru",
    level: "N3",
    title: "〜ことになっている",
    meaning: "It has been decided / It is a rule",
    structure: "Kata Kerja (Kamus/Nai) + ことになっている",
    explanation: "States something that has been decided outside of our control, such as rules, customs, habits, or laws that apply objectively.",
    examples: [
      {
        japanese: "この教室では日本語しか話せないことになっています。",
        romaji: "Kono kyoushitsu de wa Nihongo shika hanasenai koto ni natte imasu.",
        english: "According to the rules, only Japanese can be spoken in this classroom."
      }
    ]
  },
  {
    id: "to-tori-ni",
    level: "N3",
    title: "〜とおりに (toori ni)",
    meaning: "In accordance with / Just as",
    structure: "Kata Kerja (Kamus/Ta) / Benda+の + とおりに",
    explanation: "Used to state that someone is performing an action exactly according to a pattern, instruction, or pre-existing expectation.",
    examples: [
      {
        japanese: "私が言ったとおりに書いてください。",
        romaji: "Watashi ga itta toori ni kaite kudasai.",
        english: "Please write exactly as I said."
      },
      {
        japanese: "説明書のとおりに組み立てました。",
        romaji: "Setsumeisho no toori ni kumitatemashita.",
        english: "I assembled it according to the manual."
      }
    ]
  },
  {
    id: "ba-yokatta",
    level: "N3",
    title: "〜ばよかった (ba yokatta)",
    meaning: "Should have... (Regret)",
    structure: "Kata Kerja (Bentuk Ba) + よかった",
    explanation: "Used to express regret about something in the past. 'Ah, I should have done that' (but in reality, I didn't).",
    examples: [
      {
        japanese: "もっと勉強すればよかった。",
        romaji: "Motto benkyou sureba yokatta.",
        english: "I should have studied harder (back then)."
      },
      {
        japanese: "あんなことを言わなければよかった。",
        romaji: "Anna koto o iwanakereba yokatta.",
        english: "I should not have said such a thing."
      }
    ]
  },
  {
    id: "hazu-desu",
    level: "N3",
    title: "〜はずです (hazu desu)",
    meaning: "Must be / Expected to (Logical expectation)",
    structure: "Bentuk Biasa + はずです",
    explanation: "States a logical conclusion of the speaker based on known facts or schedules. Shows strong conviction (similar to 'It must be / It should be').",
    examples: [
      {
        japanese: "山田さんはアメリカに住んでいたから、英語が話せるはずです。",
        romaji: "Yamada-san wa Amerika ni sunde ita kara, eigo ga hanaseru hazu desu.",
        english: "Since Mr. Yamada lived in America, he should be able to speak English."
      }
    ]
  },
  {
    id: "mama",
    level: "N3",
    title: "〜まま (mama)",
    meaning: "Remaining in a state / Left as is",
    structure: "Kata Kerja (Ta/Nai) / Kata Benda + の + まま",
    explanation: "Indicates that a condition or state is left unchanged after something is done. Often suggests that it should not have been left that way.",
    examples: [
      {
        japanese: "エアコンをつけたまま寝てしまった。",
        romaji: "Eakon o tsuketa mama nete shimatta.",
        english: "I fell asleep with the air conditioner left on."
      },
      {
        japanese: "靴のまま家に入らないでください。",
        romaji: "Kutsu no mama ie ni hairanaide kudasai.",
        english: "Please do not enter the house with your shoes (still) on."
      }
    ]
  },
  {
    id: "te-kara-denai-to",
    level: "N3",
    title: "〜てからでないと (te kara denai to)",
    meaning: "Unless... / Not until...",
    structure: "Kata Kerja (Bentuk Te) + からでないと + Bentuk Negatif",
    explanation: "States that the first action must be completely finished before the second thing can be done. If the first condition is not met, the consequence cannot happen.",
    examples: [
      {
        japanese: "親に相談してからでないと、決められません。",
        romaji: "Oya ni soudan shite kara denai to, kimeraremasen.",
        english: "Unless I consult with my parents first, I cannot decide."
      }
    ]
  },
  {
    id: "gimi",
    level: "N3",
    title: "〜気味 (gimi)",
    meaning: "Feeling a bit... / Tending towards... (Negative tendency)",
    structure: "Kata Benda / Kata Kerja (Masu dicoret) + 気味",
    explanation: "Expresses that someone has symptoms or feels prone to a certain physical/mental state, usually with a negative connotation or being out of the ordinary.",
    examples: [
      {
        japanese: "最近、少し疲れ気味です。",
        romaji: "Saikin, sukoshi tsukaregimi desu.",
        english: "Lately, I've been feeling a bit exhausted."
      },
      {
        japanese: "彼は風邪気味で学校を休んだ。",
        romaji: "Kare wa kazegimi de gakkou o yasunda.",
        english: "He was absent from school because he felt a bit like he had a cold."
      }
    ]
  },
  {
    id: "kawari-ni",
    level: "N3",
    title: "〜代わりに (kawari ni)",
    meaning: "Instead of / In place of",
    structure: "Bentuk Biasa / Benda+の + 代わりに",
    explanation: "Used when one thing is used to replace or represent something else, or as compensation/reciprocity for something.",
    examples: [
      {
        japanese: "社長の代わりに私が会議に出席します。",
        romaji: "Shachou no kawari ni watashi ga kaigi ni shusseki shimasu.",
        english: "I will attend the meeting in place of (representing) the director."
      },
      {
        japanese: "英語を教えてもらう代わりに、日本語を教えます。",
        romaji: "Eigo o oshiete morau kawari ni, Nihongo o oshiemasu.",
        english: "In exchange for you teaching me English, I will teach you Japanese."
      }
    ]
  },
  {
    id: "darake",
    level: "N3",
    title: "〜だらけ (darake)",
    meaning: "Full of / Covered with (Negative things)",
    structure: "Kata Benda + だらけ",
    explanation: "Describes that something is filled with unpleasant, dirty, or visually unwanted things (like dust, mud, mistakes).",
    examples: [
      {
        japanese: "彼の部屋はゴミだらけだ。",
        romaji: "Kare no heya wa gomi darake da.",
        english: "His room is full of trash."
      },
      {
        japanese: "この作文は間違いだらけです。",
        romaji: "Kono sakubun wa machigai darake desu.",
        english: "This essay is full of mistakes."
      }
    ]
  },
  {
    id: "tokoro-da",
    level: "N3",
    title: "〜ところだ (tokoro da)",
    meaning: "Just about to / In the middle of / Just finished",
    structure: "Kata Kerja (Kamus/Te-iru/Ta) + ところだ",
    explanation: "Indicates a very specific 'point in time' of an action. Dictionary form = about to be done. Te-iru = exactly being done now. Ta = just finished this second.",
    examples: [
      {
        japanese: "今からご飯を食べるところです。",
        romaji: "Ima kara gohan o taberu tokoro desu.",
        english: "I am just about to start eating now."
      },
      {
        japanese: "たった今、バスが出たところです。",
        romaji: "Tatta ima, basu ga deta tokoro desu.",
        english: "Just this second, the bus has departed."
      }
    ]
  },
  {
    id: "wake-ga-nai",
    level: "N3",
    title: "〜わけがない (wake ga nai)",
    meaning: "No way / Impossible",
    structure: "Bentuk Biasa + わけがない",
    explanation: "A very strong statement of conviction (100%) by the speaker that something is absolutely impossible based on logic or reality.",
    examples: [
      {
        japanese: "あんな下手なチームが勝てるわけがない。",
        romaji: "Anna hetana chiimu ga kateru wake ga nai.",
        english: "There is no way such a poor team could win."
      },
      {
        japanese: "彼がお金を盗むわけがありません。",
        romaji: "Kare ga okane o nusumu wake ga arimasen.",
        english: "There is no way he would steal money."
      }
    ]
  },
  {
    id: "sae",
    level: "N3",
    title: "〜さえ (sae)",
    meaning: "Even",
    structure: "Kata Benda + さえ",
    explanation: "Used to provide an extreme example, implying that 'if even this extreme case happens/doesn't happen, how much more so for ordinary things'.",
    examples: [
      {
        japanese: "ひらがなさえ書けない。",
        romaji: "Hiragana sae kakenai.",
        english: "I can't even write Hiragana."
      },
      {
        japanese: "専門家でさえわからない問題だ。",
        romaji: "Senmonka de sae wakaranai mondai da.",
        english: "That's a problem that even an expert wouldn't understand."
      }
    ]
  },
  {
    id: "sae-ba",
    level: "N3",
    title: "〜さえ〜ば (sae...ba)",
    meaning: "As long as... (The only condition)",
    structure: "Kata Benda + さえ + Kata Kerja (Ba)",
    explanation: "States that if that ONE minimum condition is met, then everything will be fine/taken care of.",
    examples: [
      {
        japanese: "あなたさえいれば、私は幸せです。",
        romaji: "Anata sae ireba, watashi wa shiawase desu.",
        english: "As long as you're here, I'm happy."
      },
      {
        japanese: "お金さえあれば、何でもできる。",
        romaji: "Okane sae areba, nandemo dekiru.",
        english: "As long as there's money, anything can be done."
      }
    ]
  },
  {
    id: "ppanashi",
    level: "N3",
    title: "〜っぱなし (ppanashi)",
    meaning: "Left as is (in a bad state)",
    structure: "Kata Kerja (Masu dicoret) + っぱなし",
    explanation: "Similar to 〜まま, but 〜っぱなし is usually used for a negative condition where someone leaves something that should be changed/tidied up.",
    examples: [
      {
        japanese: "水を出しっぱなしにしないでください。",
        romaji: "Mizu o dashippanashi ni shinaide kudasai.",
        english: "Please don't leave the water running (left on)."
      },
      {
        japanese: "テレビをつけっぱなしで寝てしまった。",
        romaji: "Terebi o tsukeppanashi de nete shimatta.",
        english: "I fell asleep with the TV left on."
      }
    ]
  },
  {
    id: "tabini",
    level: "N3",
    title: "〜たびに (tabi ni)",
    meaning: "Every time / Whenever",
    structure: "Kata Kerja (Kamus) / Benda+の + たびに",
    explanation: "Emphasizes that every time event A happens, then event B will ALWAYS happen without exception.",
    examples: [
      {
        japanese: "この写真を見るたびに、昔を思い出す。",
        romaji: "Kono shashin o miru tabi ni, mukashi o omoidasu.",
        english: "Every time I see this photo, I remember the past."
      },
      {
        japanese: "父は出張のたびに、お土産を買ってきてくれる。",
        romaji: "Chichi wa shucchou no tabi ni, omiyage o katte kite kureru.",
        english: "Father always buys souvenirs whenever he goes on a business trip."
      }
    ]
  },
  {
    id: "to-totanni",
    level: "N3",
    title: "〜とたんに (to totan ni)",
    meaning: "Just as (this) happened, immediately...",
    structure: "Kata Kerja (Ta) + とたんに",
    explanation: "States that exactly after the first event takes place, a second event happens suddenly, often unexpectedly.",
    examples: [
      {
        japanese: "ドアを開けたとたんに、猫が飛び出してきた。",
        romaji: "Doa o aketa totan ni, neko ga tobidashite kita.",
        english: "As soon as the door opened, the cat jumped out."
      },
      {
        japanese: "先生の顔を見たとたんに、涙が出た。",
        romaji: "Sensei no kao o mita totan ni, namida ga deta.",
        english: "As soon as I saw the teacher's face, tears came out."
      }
    ]
  },
  {
    id: "ni-taishite",
    level: "N3",
    title: "〜に対して (ni taishite)",
    meaning: "Towards / In contrast to",
    structure: "Kata Benda + に対して",
    explanation: "Has two meanings: 1) Attitude/action 'towards' a subject. 2) Shows a contrast 'as opposed to / compared to'.",
    examples: [
      {
        japanese: "お客様に対して、丁寧な言葉を使いなさい。",
        romaji: "Okyakusama ni taishite, teineina kotoba o tsukainasai.",
        english: "Use polite words towards customers."
      },
      {
        japanese: "兄は活発なのに対して、弟はおとなしい。",
        romaji: "Ani wa kappatsu na no ni taishite, otouto wa otonashii.",
        english: "In contrast to his active older brother, the younger brother is quiet."
      }
    ]
  },
  {
    id: "ni-kimatte-iru",
    level: "N3",
    title: "〜に決まっている (ni kimatte iru)",
    meaning: "Decidedly / Surely",
    structure: "Bentuk Biasa + に決まっている",
    explanation: "Very similar to に違いない, but more casual and subjective in tone ('Ah, surely it must be so!').",
    examples: [
      {
        japanese: "そんなの嘘に決まっている。",
        romaji: "Sonna no uso ni kimatte iru.",
        english: "That is surely a lie."
      },
      {
        japanese: "一人で外国へ行くなんて、寂しいに決まっている。",
        romaji: "Hitori de gaikoku e iku nante, samishii ni kimatte iru.",
        english: "Going to a foreign country alone, one is bound to feel lonely."
      }
    ]
  },
  {
    id: "uchi-ni",
    level: "N3",
    title: "〜うちに (uchi ni)",
    meaning: "While / Before (it's too late)",
    structure: "Kata Kerja (Te-iru/Nai) / Kata Sifat / Benda+の + うちに",
    explanation: "Suggests doing something while the conditions still allow (before the situation changes for the worse/becomes impossible).",
    examples: [
      {
        japanese: "温かいうちに、食べてください。",
        romaji: "Atatakai uchi ni, tabete kudasai.",
        english: "Please eat while it's still warm."
      },
      {
        japanese: "忘れないうちに、メモをしておこう。",
        romaji: "Wasurenai uchi ni, memo o shite okou.",
        english: "Let's make a note while we haven't forgotten."
      }
    ]
  },
  {
    id: "you-ni-suru",
    level: "N3",
    title: "〜ようにする (you ni suru)",
    meaning: "Endeavor to / Make an effort to",
    structure: "Kata Kerja (Kamus/Nai) + ようにする",
    explanation: "Indicates a continuous effort or intention to make a certain state happen or become a habit.",
    examples: [
      {
        japanese: "毎日、野菜を食べるようにしています。",
        romaji: "Mainichi, yasai o taberu you ni shite imasu.",
        english: "I try to always eat vegetables every day."
      },
      {
        japanese: "遅刻しないようにしてください。",
        romaji: "Chikoku shinai you ni shite kudasai.",
        english: "Please try to make sure you don't arrive late."
      }
    ]
  },
  {
    id: "you-ni-naru",
    level: "N3",
    title: "〜ようになる (you ni naru)",
    meaning: "To reach the point where / Come to be that",
    structure: "Kata Kerja (Kamus/Potensial) + ようになる",
    explanation: "Indicates a change in state, from not being able to being able, or from not being used to being used to something.",
    examples: [
      {
        japanese: "納豆が食べられるようになりました。",
        romaji: "Nattou ga taberareru you ni narimashita.",
        english: "I have (now) become able to eat natto."
      },
      {
        japanese: "最近、よくアニメを見るようになった。",
        romaji: "Saikin, yoku anime o miru you ni natta.",
        english: "Lately, I've started watching anime often."
      }
    ]
  },
  {
    id: "koto-ni-suru",
    level: "N3",
    title: "〜ことにする (koto ni suru)",
    meaning: "Decide to...",
    structure: "Kata Kerja (Kamus/Nai) + ことにする",
    explanation: "States a subjective decision made by oneself, usually for a habit or future action.",
    examples: [
      {
        japanese: "明日からタバコをやめることにしました。",
        romaji: "Ashita kara tabako o yameru koto ni shimashita.",
        english: "I have decided to quit smoking starting from tomorrow."
      },
      {
        japanese: "車を買わないことにした。",
        romaji: "Kuruma o kawanai koto ni shita.",
        english: "I decided not to buy a car."
      }
    ]
  },
  {
    id: "to-iutte-mo",
    level: "N3",
    title: "〜といっても (to itte mo)",
    meaning: "Even if you say / Although called...",
    structure: "Bentuk Biasa + といっても",
    explanation: "Used when reality is much smaller, less, or not as interesting as the expectation from the previous statement.",
    examples: [
      {
        japanese: "英語が話せるといっても、少しだけです。",
        romaji: "Eigo ga hanaseru to itte mo, sukoshi dake desu.",
        english: "Even if I say I can speak English, it's only a little bit."
      },
      {
        japanese: "家を建てたといっても、とても小さい家です。",
        romaji: "Ie o tateta to itte mo, totemo chiisai ie desu.",
        english: "Even if it's said that I built a house, it's a very small house."
      }
    ]
  }
];
