export interface KanjiExample {
  word: string;
  reading: string;
  meaning: string;
}

export interface KanjiItem {
  char: string;
  meaning: string;
  on: string;
  kun: string;
  strokes: number;
  category?: string[];
  examples?: KanjiExample[];
}

export const KANJI_DATA: Record<string, KanjiItem[]> = {
  N5: [
    {
      char: "日", meaning: "Sun / Day", on: "ニチ・ジツ", kun: "ひ・か", strokes: 4, category: ["nature"],
      examples: [
        { word: "その日", reading: "そのひ", meaning: "that day" },
        { word: "へい日", reading: "へいじつ", meaning: "weekday" },
        { word: "三日", reading: "みっか", meaning: "the 3rd day" },
        { word: "日よう日", reading: "にちようび", meaning: "Sunday" },
      ],
    },
    {
      char: "月", meaning: "Moon / Month", on: "ゲツ・ガツ", kun: "つき", strokes: 4, category: ["nature"],
      examples: [
        { word: "月よう日", reading: "げつようび", meaning: "Monday" },
        { word: "毎月", reading: "まいつき", meaning: "every month" },
        { word: "一ヶ月", reading: "いっかげつ", meaning: "one month" },
        { word: "一月", reading: "いちがつ", meaning: "January" },
      ],
    },
    {
      char: "火", meaning: "Fire", on: "カ", kun: "ひ", strokes: 4, category: ["nature"],
      examples: [
        { word: "火よう日", reading: "かようび", meaning: "Tuesday" },
        { word: "火事", reading: "かじ", meaning: "fire / conflagration" },
        { word: "花火", reading: "はなび", meaning: "fireworks" },
        { word: "火山", reading: "かざん", meaning: "volcano" },
      ],
    },
    {
      char: "水", meaning: "Water", on: "スイ", kun: "みず", strokes: 4, category: ["nature"],
      examples: [
        { word: "水よう日", reading: "すいようび", meaning: "Wednesday" },
        { word: "水道", reading: "すいどう", meaning: "water supply" },
        { word: "水泳", reading: "すいえい", meaning: "swimming" },
        { word: "水", reading: "みず", meaning: "water" },
      ],
    },
    {
      char: "木", meaning: "Tree / Wood", on: "モク・ボク", kun: "き", strokes: 4, category: ["nature"],
      examples: [
        { word: "木よう日", reading: "もくようび", meaning: "Thursday" },
        { word: "木材", reading: "もくざい", meaning: "lumber / timber" },
        { word: "木", reading: "き", meaning: "tree" },
      ],
    },
    {
      char: "金", meaning: "Gold / Money", on: "キン・コン", kun: "かね", strokes: 8, category: ["nature"],
      examples: [
        { word: "金よう日", reading: "きんようび", meaning: "Friday" },
        { word: "お金", reading: "おかね", meaning: "money" },
        { word: "金メダル", reading: "きんメダル", meaning: "gold medal" },
      ],
    },
    {
      char: "土", meaning: "Earth / Soil", on: "ド・ト", kun: "つち", strokes: 3, category: ["nature"],
      examples: [
        { word: "土よう日", reading: "どようび", meaning: "Saturday" },
        { word: "土", reading: "つち", meaning: "soil / earth" },
        { word: "土地", reading: "とち", meaning: "land" },
      ],
    },
    {
      char: "山", meaning: "Mountain", on: "サン", kun: "やま", strokes: 3, category: ["nature"],
      examples: [
        { word: "山", reading: "やま", meaning: "mountain" },
        { word: "登山", reading: "とざん", meaning: "mountain climbing" },
        { word: "富士山", reading: "ふじさん", meaning: "Mt. Fuji" },
      ],
    },
    {
      char: "川", meaning: "River", on: "セン", kun: "かわ", strokes: 3, category: ["nature"],
      examples: [
        { word: "川", reading: "かわ", meaning: "river" },
        { word: "川岸", reading: "かわぎし", meaning: "riverbank" },
        { word: "小川", reading: "おがわ", meaning: "stream" },
      ],
    },
    {
      char: "田", meaning: "Rice Field", on: "デン", kun: "た", strokes: 5, category: ["nature"],
      examples: [
        { word: "田んぼ", reading: "たんぼ", meaning: "rice field" },
        { word: "水田", reading: "すいでん", meaning: "flooded rice field" },
      ],
    },
    {
      char: "天", meaning: "Heaven / Sky", on: "テン", kun: "あまつ・あめ", strokes: 4, category: ["nature"],
      examples: [
        { word: "天気", reading: "てんき", meaning: "weather" },
        { word: "天国", reading: "てんこく", meaning: "heaven" },
        { word: "天才", reading: "てんさい", meaning: "genius" },
      ],
    },
    {
      char: "気", meaning: "Spirit / Energy", on: "キ・ケ", "kun": "き", strokes: 6, category: ["nature", "people"],
      examples: [
        { word: "元気", reading: "げんき", meaning: "healthy/energetic" },
        { word: "気持ち", reading: "きもち", meaning: "feeling" },
        { word: "人気", reading: "にんき", meaning: "popular" },
      ],
    },
    {
      char: "雨", meaning: "Rain", on: "ウ", kun: "あめ・あま", strokes: 8, category: ["nature"],
      examples: [
        { word: "大雨", reading: "おおあめ", meaning: "heavy rain" },
        { word: "雨天", reading: "うてん", meaning: "rainy weather" },
      ],
    },
    {
      char: "花", meaning: "Flower", on: "カ", kun: "はな", strokes: 7, category: ["nature"],
      examples: [
        { word: "花火", reading: "はなび", meaning: "fireworks" },
        { word: "花瓶", reading: "かびん", meaning: "flower vase" },
      ],
    },
    {
      char: "空", meaning: "Sky / Empty", on: "クウ", kun: "そら・あ・から", strokes: 8, category: ["nature"],
      examples: [
        { word: "空気", reading: "くうき", meaning: "air" },
        { word: "空港", reading: "くうこう", meaning: "airport" },
      ],
    },
    {
      char: "人", meaning: "Person", on: "ジン・ニン", kun: "ひと", strokes: 2, category: ["people"],
      examples: [
        { word: "人", reading: "ひと", meaning: "person" },
        { word: "日本人", reading: "にほんじん", meaning: "Japanese person" },
        { word: "大人", reading: "おとな", meaning: "adult" },
      ],
    },
    {
      char: "男", meaning: "Man / Male", on: "ダン・ナン", kun: "おとこ", strokes: 7, category: ["people"],
      examples: [
        { word: "男の子", reading: "おとこのこ", meaning: "boy" },
        { word: "男性", reading: "だんせい", meaning: "man/male" },
      ],
    },
    {
      char: "女", meaning: "Woman / Female", on: "ジョ・ニョ", kun: "おんな・め", strokes: 3, category: ["people"],
      examples: [
        { word: "女の子", reading: "おんなのこ", meaning: "girl" },
        { word: "女性", reading: "じょせい", meaning: "woman/female" },
      ],
    },
    {
      char: "子", meaning: "Child", on: "シ・ス", kun: "こ", strokes: 3, category: ["people"],
      examples: [
        { word: "子供", reading: "こども", meaning: "child" },
        { word: "電子", reading: "でんし", meaning: "electronic" },
      ],
    },
    {
      char: "父", meaning: "Father", on: "フ", kun: "ちち・とう", strokes: 4, category: ["people"],
      examples: [
        { word: "父親", reading: "ちちおや", meaning: "father" },
        { word: "お父さん", reading: "おとうさん", meaning: "father" },
      ],
    },
    {
      char: "母", meaning: "Mother", on: "ボ", kun: "はは・かあ", strokes: 5, category: ["people"],
      examples: [
        { word: "母親", reading: "ははおや", meaning: "mother" },
        { word: "お母さん", reading: "おかあさん", meaning: "mother" },
      ],
    },
    {
      char: "友", meaning: "Friend", on: "ユウ", kun: "とも", strokes: 4, category: ["people"],
      examples: [
        { word: "友達", reading: "ともだち", meaning: "friend" },
        { word: "友人", reading: "ゆうじん", meaning: "friend (formal)" },
      ],
    },
    {
      char: "先", meaning: "Ahead / Previous", on: "セン", kun: "さき", strokes: 6, category: ["people"],
      examples: [
        { word: "先生", reading: "せんせい", meaning: "teacher" },
        { word: "先月", reading: "せんげつ", meaning: "last month" },
      ],
    },
    {
      char: "生", meaning: "Life / Birth / Student", on: "セイ・ショウ", kun: "い・う・なま", strokes: 5, category: ["people"],
      examples: [
        { word: "学生", reading: "がくせい", meaning: "student" },
        { word: "生活", reading: "せいかつ", meaning: "daily life" },
      ],
    },
    {
      char: "学", meaning: "Study / Learn", on: "ガク", kun: "まな", strokes: 8, category: ["people"],
      examples: [
        { word: "学校", reading: "がっこう", meaning: "school" },
        { word: "大学", reading: "だいがく", meaning: "university" },
      ],
    },
    {
      char: "校", meaning: "School", on: "コウ", kun: "—", strokes: 10, category: ["people"],
      examples: [
        { word: "小学校", reading: "しょうがっこう", meaning: "elementary school" },
        { word: "高校", reading: "こうこう", meaning: "high school" },
      ],
    },
    {
      char: "会", meaning: "Meet / Society", on: "カイ・エ", kun: "あ", strokes: 6, category: ["people"],
      examples: [
        { word: "会社", reading: "かいしゃ", meaning: "company" },
        { word: "会話", reading: "かいわ", meaning: "conversation" },
      ],
    },
    {
      char: "社", meaning: "Company / Shrine", on: "シャ", kun: "やしろ", strokes: 7, category: ["people"],
      examples: [
        { word: "社会", reading: "しゃかい", meaning: "society" },
        { word: "神社", reading: "じんじゃ", meaning: "Shinto shrine" },
      ],
    },
    {
      char: "目", meaning: "Eye", on: "モク・ボク", kun: "め", strokes: 5, category: ["people"],
      examples: [
        { word: "目的", reading: "もくてき", meaning: "purpose" },
        { word: "目薬", reading: "めぐすり", meaning: "eye drops" },
      ],
    },
    {
      char: "口", meaning: "Mouth", on: "コウ・ク", kun: "くち", strokes: 3, category: ["people"],
      examples: [
        { word: "人口", reading: "じんこう", meaning: "population" },
        { word: "出口", reading: "でぐち", meaning: "exit" },
      ],
    },
    {
      char: "手", meaning: "Hand", on: "シュ", kun: "て", strokes: 4, category: ["people"],
      examples: [
        { word: "手紙", reading: "てがみ", meaning: "letter" },
        { word: "歌手", reading: "かしゅ", meaning: "singer" },
      ],
    },
    {
      char: "足", meaning: "Foot / Leg", on: "ソク", kun: "あし・た", strokes: 7, category: ["people"],
      examples: [
        { word: "足", reading: "あし", meaning: "foot/leg" },
        { word: "不足", reading: "ふそく", meaning: "shortage" },
      ],
    },
    {
      char: "耳", meaning: "Ear", on: "ジ", kun: "みみ", strokes: 6, category: ["people"],
      examples: [
        { word: "初耳", reading: "はつみみ", meaning: "hearing for first time" },
        { word: "耳鼻科", reading: "じびか", meaning: "ENT department" },
      ],
    },
    {
      char: "体", meaning: "Body", on: "タイ・テイ", kun: "からだ", strokes: 7, category: ["people"],
      examples: [
        { word: "体重", reading: "たいじゅう", meaning: "body weight" },
        { word: "体力", reading: "たいりょく", meaning: "physical strength" },
      ],
    },
    {
      char: "大", meaning: "Big / Large", on: "ダイ・タイ", kun: "おお", strokes: 3, category: ["directions"],
      examples: [
        { word: "大きい", reading: "おおきい", meaning: "big" },
        { word: "大学", reading: "だいがく", meaning: "university" },
      ],
    },
    {
      char: "小", meaning: "Small / Little", on: "ショウ", kun: "ちい・こ", strokes: 3, category: ["directions"],
      examples: [
        { word: "小さい", reading: "ちいさい", meaning: "small" },
        { word: "小学校", reading: "しょうがっこう", meaning: "elementary school" },
      ],
    },
    {
      char: "中", meaning: "Middle / Inside", on: "チュウ", kun: "なか", strokes: 4, category: ["directions"],
      examples: [
        { word: "中", reading: "なか", meaning: "inside" },
        { word: "中国", reading: "ちゅうごく", meaning: "China" },
      ],
    },
    {
      char: "上", meaning: "Above / Up", on: "ジョウ", kun: "うえ・あ", strokes: 3, category: ["directions"],
      examples: [
        { word: "上", reading: "うえ", meaning: "above" },
        { word: "上手", reading: "じょうず", meaning: "skillful" },
      ],
    },
    {
      char: "下", meaning: "Below / Down", on: "カ・ゲ", kun: "した・さ", strokes: 3, category: ["directions"],
      examples: [
        { word: "下", reading: "した", meaning: "below" },
        { word: "下手", reading: "へた", meaning: "unskillful" },
      ],
    },
    {
      char: "一", meaning: "One", on: "イチ・イツ", kun: "ひと", strokes: 1, category: ["numbers"],
      examples: [
        { word: "一日", reading: "ついたち", meaning: "1st day of month" },
        { word: "一人", reading: "ひとり", meaning: "one person" },
      ],
    },
    {
      char: "二", meaning: "Two", on: "ニ", kun: "ふた", strokes: 2, category: ["numbers"],
      examples: [
        { word: "二月", reading: "にがつ", meaning: "February" },
        { word: "二人", reading: "ふたり", meaning: "two people" },
      ],
    },
    {
      char: "三", meaning: "Three", on: "サン", kun: "み", strokes: 3, category: ["numbers"],
      examples: [
        { word: "三月", reading: "さんがつ", meaning: "March" },
        { word: "三人", reading: "さんにん", meaning: "three people" },
      ],
    },
    {
      char: "四", meaning: "Four", on: "シ", kun: "よ・よん", strokes: 5, category: ["numbers"],
      examples: [
        { word: "四月", reading: "しがつ", meaning: "April" },
        { word: "四季", reading: "しき", meaning: "four seasons" },
      ],
    },
    {
      char: "五", meaning: "Five", on: "ゴ", kun: "いつ", strokes: 4, category: ["numbers"],
      examples: [
        { word: "五月", reading: "ごがつ", meaning: "May" },
        { word: "五感", reading: "ごかん", meaning: "five senses" },
      ],
    },
    {
      char: "六", meaning: "Six", on: "ロク", kun: "む・むい", strokes: 4, category: ["numbers"],
      examples: [
        { word: "六月", reading: "ろくがつ", meaning: "June" },
        { word: "六日", reading: "むいか", meaning: "6th day of month" },
      ],
    },
    {
      char: "七", meaning: "Seven", on: "シチ", kun: "なな・なの", strokes: 2, category: ["numbers"],
      examples: [
        { word: "七月", reading: "しちがつ", meaning: "July" },
        { word: "七日", reading: "なのか", meaning: "7th day of month" },
      ],
    },
    {
      char: "八", meaning: "Eight", on: "ハチ", kun: "や・よう", strokes: 2, category: ["numbers"],
      examples: [
        { word: "八月", reading: "はちがつ", meaning: "August" },
        { word: "八日", reading: "ようか", meaning: "8th day of month" },
      ],
    },
    {
      char: "九", meaning: "Nine", on: "キュウ・ク", kun: "ここの", strokes: 2, category: ["numbers"],
      examples: [
        { word: "九月", reading: "くがつ", meaning: "September" },
        { word: "九日", reading: "ここのか", meaning: "9th day of month" },
      ],
    },
    {
      char: "十", meaning: "Ten", on: "ジュウ・ジッ", kun: "とお・と", strokes: 2, category: ["numbers"],
      examples: [
        { word: "十月", reading: "じゅうがつ", meaning: "October" },
        { word: "十日", reading: "とおか", meaning: "10th day of month" },
      ],
    },
    {
      char: "百", meaning: "Hundred", on: "ヒャク", kun: "モモ", strokes: 6, category: ["numbers"],
      examples: [
        { word: "百円", reading: "ひゃくえん", meaning: "100 yen" },
        { word: "八百屋", reading: "やおや", meaning: "greengrocer" },
      ],
    },
    {
      char: "千", meaning: "Thousand", on: "セン", kun: "ち", strokes: 3, category: ["numbers"],
      examples: [
        { word: "千円", reading: "せんえん", meaning: "1000 yen" },
        { word: "千葉", reading: "ちば", meaning: "Chiba prefecture" },
      ],
    },
    {
      char: "万", meaning: "Ten Thousand", on: "マン・バン", kun: "よろず", strokes: 3, category: ["numbers"],
      examples: [
        { word: "一万円", reading: "いちまんえん", meaning: "10,000 yen" },
        { word: "万一", reading: "まんいち", meaning: "just in case" },
      ],
    },
    {
      char: "円", meaning: "Yen / Circle", on: "エン", kun: "まる", strokes: 4, category: ["numbers"],
      examples: [
        { word: "円高", reading: "えんだか", meaning: "strong yen" },
        { word: "円形", reading: "えんけい", meaning: "circle shape" },
      ],
    },
    {
      char: "年", meaning: "Year", on: "ネン", kun: "とし", strokes: 6, category: ["nature"],
      examples: [
        { word: "今年", reading: "ことし", meaning: "this year" },
        { word: "来年", reading: "らいねん", meaning: "next year" },
      ],
    },
    {
      char: "見", meaning: "See / Look", on: "ケン", kun: "み", strokes: 7, category: ["people"],
      examples: [
        { word: "見学", reading: "けんがく", meaning: "study tour" },
        { word: "意見", reading: "いけん", meaning: "opinion" },
      ],
    },
    {
      char: "聞", meaning: "Hear / Listen", on: "ブン・モン", kun: "き", strokes: 14, category: ["people"],
      examples: [
        { word: "新聞", reading: "しんぶん", meaning: "newspaper" },
        { word: "聞こえる", reading: "きこえる", meaning: "audible" },
      ],
    },
    {
      char: "言", meaning: "Say / Speak", on: "ゲン・ゴン", kun: "い・こと", strokes: 7, category: ["people"],
      examples: [
        { word: "言話", reading: "げんわ", meaning: "speech" },
        { word: "一言", reading: "ひとこと", meaning: "single word" },
      ],
    },
    {
      char: "話", meaning: "Talk / Story", on: "ワ", kun: "はなし・はな", strokes: 13, category: ["people"],
      examples: [
        { word: "電話", reading: "でんわ", meaning: "telephone" },
        { word: "話題", reading: "わだい", meaning: "topic" },
      ],
    },
    {
      char: "読", meaning: "Read", on: "ドク・トク", kun: "よ", strokes: 14, category: ["people"],
      examples: [
        { word: "読書", reading: "どくしょ", meaning: "reading" },
        { word: "音読", reading: "おんどく", meaning: "reading aloud" },
      ],
    },
    {
      char: "書", meaning: "Write", on: "ショ", kun: "か", strokes: 10, category: ["people"],
      examples: [
        { word: "辞書", reading: "じしょ", meaning: "dictionary" },
        { word: "図書館", reading: "としょかん", meaning: "library" },
      ],
    },
    {
      char: "食", meaning: "Eat / Food", on: "ショク・ジキ", kun: "た・く", strokes: 9, category: ["people"],
      examples: [
        { word: "食事", reading: "しょくじ", meaning: "meal" },
        { word: "食べ物", reading: "たべもの", meaning: "food" },
      ],
    },
    {
      char: "飲", meaning: "Drink", on: "イン", kun: "の", strokes: 12, category: ["people"],
      examples: [
        { word: "飲み物", reading: "のみもの", meaning: "beverage" },
        { word: "飲食店", reading: "いんしょくてん", meaning: "restaurant" },
      ],
    },
    {
      char: "買", meaning: "Buy", on: "バイ", kun: "か", strokes: 12, category: ["people"],
      examples: [
        { word: "買い物", reading: "かいもの", meaning: "shopping" },
        { word: "売買", reading: "ばいばい", meaning: "buying & selling" },
      ],
    },
    {
      char: "行", meaning: "Go / Conduct", on: "コウ・ギョウ", kun: "い・ゆ・おこな", strokes: 6, category: ["people"],
      examples: [
        { word: "旅行", reading: "りょこう", meaning: "travel" },
        { word: "銀行", reading: "ぎんこう", meaning: "bank" },
      ],
    },
    {
      char: "来", meaning: "Come / Next", on: "ライ", kun: "く・きた", strokes: 7, category: ["nature"],
      examples: [
        { word: "来週", reading: "らいしゅう", meaning: "next week" },
        { word: "未来", reading: "みらい", meaning: "future" },
      ],
    },
    {
      char: "帰", meaning: "Return", on: "キ", kun: "かえ", strokes: 10, category: ["people"],
      examples: [
        { word: "帰国", reading: "きこく", meaning: "return home" },
        { word: "日帰り", reading: "ひがえり", meaning: "day trip" },
      ],
    },
    {
      char: "出", meaning: "Exit / Go out", on: "シュツ・シュイ", kun: "で・だ", strokes: 5, category: ["directions"],
      examples: [
        { word: "出口", reading: "でぐち", meaning: "exit" },
        { word: "出発", reading: "しゅっぱつ", meaning: "departure" },
      ],
    },
    {
      char: "入", meaning: "Enter / Put in", on: "ニュウ", kun: "はい・い", strokes: 2, category: ["directions"],
      examples: [
        { word: "入口", reading: "いりぐち", meaning: "entrance" },
        { word: "入学", reading: "にゅうがく", meaning: "school entry" },
      ],
    },
    {
      char: "立", meaning: "Stand", on: "リツ・リュウ", kun: "た", strokes: 5, category: ["people"],
      examples: [
        { word: "立場", reading: "たちば", meaning: "standpoint" },
        { word: "国立", reading: "こくりつ", meaning: "national" },
      ],
    },
    {
      char: "休", meaning: "Rest / Holiday", on: "キュウ", kun: "やす", strokes: 6, category: ["nature"],
      examples: [
        { word: "休日", reading: "きゅうじつ", meaning: "holiday" },
        { word: "夏休み", reading: "なつやすみ", meaning: "summer vacation" },
      ],
    },
    {
      char: "左", meaning: "Left", on: "サ", kun: "ひだり", strokes: 5, category: ["directions"],
      examples: [
        { word: "左手", reading: "ひだりて", meaning: "left hand" },
        { word: "左右", reading: "さゆう", meaning: "left and right" },
      ],
    },
    {
      char: "右", meaning: "Right", on: "ウ・ユウ", kun: "みぎ", strokes: 5, category: ["directions"],
      examples: [
        { word: "右手", reading: "みぎて", meaning: "right hand" },
        { word: "右折", reading: "うせつ", meaning: "right turn" },
      ],
    },
    {
      char: "東", meaning: "East", on: "トウ", kun: "ひがし", strokes: 8, category: ["directions"],
      examples: [
        { word: "東京", reading: "とうきょう", meaning: "Tokyo" },
        { word: "中東", reading: "ちゅうとう", meaning: "Middle East" },
      ],
    },
    {
      char: "西", meaning: "West", on: "セイ・サイ", kun: "にし", strokes: 6, category: ["directions"],
      examples: [
        { word: "東西", reading: "とうざい", meaning: "east and west" },
        { word: "関西", reading: "かんさい", meaning: "Kansai region" },
      ],
    },
    {
      char: "南", meaning: "South", on: "ナン", kun: "みなみ", strokes: 9, category: ["directions"],
      examples: [
        { word: "南米", reading: "なんべい", meaning: "South America" },
        { word: "南北", reading: "なんぼく", meaning: "north and south" },
      ],
    },
    {
      char: "北", meaning: "North", on: "ホク", kun: "きた", strokes: 5, category: ["directions"],
      examples: [
        { word: "北海道", reading: "ほっかいどう", meaning: "Hokkaido" },
        { word: "北東", reading: "ほくとう", meaning: "northeast" },
      ],
    },
    {
      char: "前", meaning: "Before / Front", on: "ゼン", kun: "まえ", strokes: 9, category: ["directions", "nature"],
      examples: [
        { word: "午前", reading: "ごぜん", meaning: "morning/AM" },
        { word: "前日", reading: "ぜんじつ", meaning: "previous day" },
      ],
    },
    {
      char: "後", meaning: "Behind / After", on: "ゴ・コウ", kun: "うし・あと", strokes: 9, category: ["directions", "nature"],
      examples: [
        { word: "午後", reading: "ごご", meaning: "afternoon/PM" },
        { word: "最後", reading: "さいご", meaning: "last/final" },
      ],
    },
    {
      char: "外", meaning: "Outside", on: "ガイ・ゲ", kun: "そと・ほか", strokes: 5, category: ["directions"],
      examples: [
        { word: "外国", reading: "がいこく", meaning: "foreign country" },
        { word: "例外", reading: "れいがい", meaning: "exception" },
      ],
    },
    {
      char: "店", meaning: "Shop / Store", on: "テン", kun: "みせ", strokes: 8, category: ["people"],
      examples: [
        { word: "店員", reading: "てんいん", meaning: "clerk/store staff" },
        { word: "売店", reading: "ばいてん", meaning: "stand/kiosk" },
      ],
    },
    {
      char: "駅", meaning: "Station", on: "エキ", kun: "—", strokes: 14, category: ["directions"],
      examples: [
        { word: "駅前", reading: "えきまえ", meaning: "station front" },
        { word: "東京駅", reading: "とうきょうえき", meaning: "Tokyo Station" },
      ],
    },
    {
      char: "道", meaning: "Road / Way", on: "ドウ", kun: "みち", strokes: 12, category: ["directions"],
      examples: [
        { word: "柔道", reading: "じゅうどう", meaning: "judo" },
        { word: "近道", reading: "ちかみち", meaning: "shortcut" },
      ],
    },
    {
      char: "車", meaning: "Car / Vehicle", on: "シャ", kun: "くるま", strokes: 7, category: ["directions"],
      examples: [
        { word: "電車", reading: "でんしゃ", meaning: "train" },
        { word: "自動車", reading: "じどうしゃ", meaning: "automobile" },
      ],
    },
    {
      char: "電", meaning: "Electricity", on: "デン", kun: "—", strokes: 13, category: ["nature"],
      examples: [
        { word: "電力", reading: "でんりょく", meaning: "electric power" },
        { word: "電池", reading: "でんち", meaning: "battery" },
      ],
    },
    {
      char: "何", meaning: "What", on: "カ", kun: "なに・なん", strokes: 7, category: ["people"],
      examples: [
        { word: "何時", reading: "なんじ", meaning: "what time" },
        { word: "何か", reading: "なにか", meaning: "something" },
      ],
    },
    {
      char: "本", meaning: "Book / Origin", on: "ホン", kun: "もと", strokes: 5, category: ["people"],
      examples: [
        { word: "日本", reading: "にほん", meaning: "Japan" },
        { word: "本当", reading: "ほんとう", meaning: "truth" },
      ],
    },
    {
      char: "名", meaning: "Name / Famous", on: "メイ・ミョウ", kun: "な", strokes: 6, category: ["people"],
      examples: [
        { word: "名前", reading: "なまえ", meaning: "name" },
        { word: "有名", reading: "ゆうめい", meaning: "famous" },
      ],
    },
    {
      char: "高", meaning: "High / Expensive", on: "コウ", kun: "たか", strokes: 10, category: ["directions"],
      examples: [
        { word: "最高", reading: "さいこう", meaning: "highest/best" },
        { word: "高校生", reading: "こうこうせい", meaning: "high schooler" },
      ],
    },
    {
      char: "長", meaning: "Long / Leader", on: "チョウ", kun: "なが", strokes: 8, category: ["directions"],
      examples: [
        { word: "会長", reading: "かいちょう", meaning: "president" },
        { word: "長所", reading: "ちょうしょ", meaning: "strong point" },
      ],
    },
    {
      char: "半", meaning: "Half", on: "ハン", kun: "なか", strokes: 5, category: ["numbers", "directions"],
      examples: [
        { word: "半分", reading: "はんぶん", meaning: "half" },
        { word: "半年", reading: "はんとし", meaning: "half a year" },
      ],
    },
    {
      char: "多", meaning: "Many / Much", on: "タ", kun: "おお", strokes: 6, category: ["numbers"],
      examples: [
        { word: "多数", reading: "たすう", meaning: "large number" },
        { word: "多額", reading: "たがく", meaning: "large amount" },
      ],
    },
    {
      char: "少", meaning: "Few / Little", on: "ショウ", kun: "すく・すこ", strokes: 4, category: ["numbers"],
      examples: [
        { word: "少数", reading: "しょうすう", meaning: "minority" },
        { word: "少し", reading: "すこし", meaning: "a little" },
      ],
    },
    {
      char: "新", meaning: "New", on: "シン", kun: "あたら・あら", strokes: 13, category: ["nature"],
      examples: [
        { word: "新幹線", reading: "しんかんせん", meaning: "bullet train" },
        { word: "新年", reading: "しんねん", meaning: "New Year" },
      ],
    },
    {
      char: "古", meaning: "Old", on: "コ", kun: "ふる", strokes: 5, category: ["nature"],
      examples: [
        { word: "中古", reading: "ちゅうこ", meaning: "second-hand" },
        { word: "古代", reading: "こだい", meaning: "ancient times" },
      ],
    },
    {
      char: "白", meaning: "White", on: "ハク", kun: "しろ", strokes: 5, category: ["nature"],
      examples: [
        { word: "面白", reading: "おもしろい", meaning: "interesting" },
        { word: "告白", reading: "こくはく", meaning: "confession" },
      ],
    },
    {
      char: "赤", meaning: "Red", on: "セキ・シャク", kun: "あか", strokes: 7, category: ["nature"],
      examples: [
        { word: "赤ん坊", reading: "あかんぼう", meaning: "baby" },
        { word: "赤道", reading: "せきどう", meaning: "equator" },
      ],
    },
    {
      char: "青", meaning: "Blue", on: "セイ・ショウ", kun: "あお", strokes: 8, category: ["nature"],
      examples: [
        { word: "青年", reading: "せいねん", meaning: "youth" },
        { word: "青空", reading: "あおぞら", meaning: "blue sky" },
      ],
    },
    {
      char: "今", meaning: "Now", on: "コン・キン", kun: "いま", strokes: 4, category: ["nature"],
      examples: [
        { word: "今日", reading: "きょう", meaning: "today" },
        { word: "今年", reading: "ことし", meaning: "this year" },
      ],
    },
    {
      char: "週", meaning: "Week", on: "シュウ", kun: "—", strokes: 11, category: ["nature"],
      examples: [
        { word: "今週", reading: "こんしゅう", meaning: "this week" },
        { word: "週末", reading: "しゅうまつ", meaning: "weekend" },
      ],
    },
    {
      char: "毎", meaning: "Every", on: "マイ", kun: "—", strokes: 6, category: ["nature"],
      examples: [
        { word: "毎日", reading: "まいにち", meaning: "everyday" },
        { word: "毎朝", reading: "まいあさ", meaning: "every morning" },
      ],
    },
    {
      char: "時", meaning: "Time / Hour", on: "ジ", kun: "とき", strokes: 10, category: ["nature"],
      examples: [
        { word: "時間", reading: "じかん", meaning: "time" },
        { word: "時計", reading: "とけい", meaning: "clock" },
      ],
    },
    {
      char: "分", meaning: "Minute / Part", on: "ブン・フン・ブ", kun: "わ", strokes: 4, category: ["numbers", "nature"],
      examples: [
        { word: "自分", reading: "じぶん", meaning: "oneself" },
        { word: "半分", reading: "はんぶん", meaning: "half" },
      ],
    },
    {
      char: "間", meaning: "Interval / Between", on: "カン・ケン", kun: "あいだ・ま", strokes: 12, category: ["nature", "directions"],
      examples: [
        { word: "人間", reading: "にんげん", meaning: "human being" },
        { word: "仲間", reading: "なかま", meaning: "companion" },
      ],
    },
    {
      char: "国", meaning: "Country", on: "コク", kun: "くに", strokes: 8, category: ["directions"],
      examples: [
        { word: "外国", reading: "がいこく", meaning: "foreign country" },
        { word: "国家", reading: "こっか", meaning: "nation" },
      ],
    },
    {
      char: "語", meaning: "Language / Word", on: "ゴ", kun: "かた", strokes: 14, category: ["people"],
      examples: [
        { word: "日本語", reading: "にほんご", meaning: "Japanese language" },
        { word: "単語", reading: "たんご", meaning: "vocabulary" },
      ],
    },
  ],

  N4: [
    {
      char: "働", meaning: "Work", on: "ドウ", kun: "はたら", strokes: 13, category: ["people"],
      examples: [
        { word: "労働", reading: "ろうどう", meaning: "labor" },
        { word: "共働き", reading: "ともばたらき", meaning: "dual income" },
      ],
    },
    {
      char: "勉", meaning: "Exert / Study", on: "ベン", kun: "つと", strokes: 10, category: ["people"],
      examples: [
        { word: "勉強", reading: "べんきょう", meaning: "study" },
        { word: "勤勉", reading: "きんべん", meaning: "diligence" },
      ],
    },
    {
      char: "強", meaning: "Strong", on: "キョウ・ゴウ", kun: "つよ・しい", strokes: 11, category: ["nature"],
      examples: [
        { word: "強力", reading: "きょうりょく", meaning: "powerful" },
        { word: "強調", reading: "きょうちょう", meaning: "emphasis" },
      ],
    },
    {
      char: "旅", meaning: "Travel", on: "リョ", kun: "たび", strokes: 10, category: ["directions"],
      examples: [
        { word: "旅行", reading: "りょこう", meaning: "travel" },
        { word: "旅館", reading: "りょかん", meaning: "Japanese inn" },
      ],
    },
    {
      char: "族", meaning: "Family / Tribe", on: "ゾク", kun: "—", strokes: 11, category: ["people"],
      examples: [
        { word: "家族", reading: "かぞく", meaning: "family" },
        { word: "親族", reading: "しんぞく", meaning: "relatives" },
      ],
    },
    {
      char: "試", meaning: "Test / Try", on: "シ", kun: "こころ・ため", strokes: 13, category: ["people"],
      examples: [
        { word: "試験", reading: "しけん", meaning: "examination" },
        { word: "試合", reading: "しあい", meaning: "match" },
      ],
    },
    {
      char: "験", meaning: "Verify / Test", on: "ケン・ゲン", kun: "ため", strokes: 18, category: ["people"],
      examples: [
        { word: "経験", reading: "けいけん", meaning: "experience" },
        { word: "実験", reading: "じっけん", meaning: "experiment" },
      ],
    },
    {
      char: "質", meaning: "Quality / Question", on: "シツ・シチ", kun: "たち", strokes: 15, category: ["people"],
      examples: [
        { word: "質問", reading: "しつもん", meaning: "question" },
        { word: "品質", reading: "ひんしつ", meaning: "quality" },
      ],
    },
    {
      char: "問", meaning: "Question / Problem", on: "モン", kun: "と", strokes: 11, category: ["people"],
      examples: [
        { word: "問題", reading: "もんだい", meaning: "problem" },
        { word: "学問", reading: "がくもん", meaning: "learning" },
      ],
    },
    {
      char: "題", meaning: "Topic / Title", on: "ダイ", kun: "—", strokes: 18, category: ["people"],
      examples: [
        { word: "宿題", reading: "しゅくだい", meaning: "homework" },
        { word: "話題", reading: "わだい", meaning: "topic" },
      ],
    },
    {
      char: "答", meaning: "Answer / Reply", on: "トウ", kun: "こた", strokes: 12, category: ["people"],
      examples: [
        { word: "回答", reading: "かいとう", meaning: "reply" },
        { word: "解答", reading: "かいとう", meaning: "solution" },
      ],
    },
    {
      char: "意", meaning: "Mind / Intent", on: "イ", kun: "—", strokes: 13, category: ["people"],
      examples: [
        { word: "意味", reading: "いみ", meaning: "meaning" },
        { word: "注意", reading: "ちゅうい", meaning: "caution" },
      ],
    },
    {
      char: "味", meaning: "Taste / Flavour", on: "ミ", kun: "あじ", strokes: 8, category: ["people"],
      examples: [
        { word: "興味", reading: "きょうみ", meaning: "interest" },
        { word: "趣味", reading: "しゅみ", meaning: "hobby" },
      ],
    },
    {
      char: "始", meaning: "Begin / Start", on: "シ", kun: "はじ", strokes: 8, category: ["nature"],
      examples: [
        { word: "開始", reading: "かいし", meaning: "start" },
        { word: "始発", reading: "しはつ", meaning: "first train" },
      ],
    },
    {
      char: "終", meaning: "End / Finish", on: "シュウ", kun: "お", strokes: 11, category: ["nature"],
      examples: [
        { word: "終了", reading: "しゅうりょう", meaning: "end" },
        { word: "終点", reading: "しゅうてん", meaning: "terminus" },
      ],
    },
    {
      char: "病", meaning: "Illness / Sick", on: "ビョウ・ヘイ", kun: "やまい", strokes: 10, category: ["people"],
      examples: [
        { word: "病院", reading: "びょういん", meaning: "hospital" },
        { word: "急病", reading: "きゅうびょう", meaning: "sudden illness" },
      ],
    },
    {
      char: "院", meaning: "Institution", on: "イン", kun: "—", strokes: 10, category: ["directions"],
      examples: [
        { word: "入院", reading: "にゅういん", meaning: "hospitalization" },
        { word: "大学院", reading: "だいがくいん", meaning: "graduate school" },
      ],
    },
    {
      char: "薬", meaning: "Medicine", on: "ヤク", kun: "くすり", strokes: 16, category: ["people"],
      examples: [
        { word: "薬局", reading: "やっきょく", meaning: "pharmacy" },
        { word: "目薬", reading: "めぐすり", meaning: "eye drops" },
      ],
    },
    {
      char: "海", meaning: "Sea / Ocean", on: "カイ", kun: "うみ", strokes: 9, category: ["nature"],
      examples: [
        { word: "海外", reading: "かいがい", meaning: "overseas" },
        { word: "海水", reading: "かいすい", meaning: "seawater" },
      ],
    },
    {
      char: "犬", meaning: "Dog", on: "ケン", kun: "いぬ", strokes: 4, category: ["nature"],
      examples: [
        { word: "子犬", reading: "こいぬ", meaning: "puppy" },
        { word: "愛犬", reading: "あいけん", meaning: "pet dog" },
      ],
    },
    {
      char: "猫", meaning: "Cat", on: "ビョウ", kun: "ねこ", strokes: 11, category: ["nature"],
      examples: [
        { word: "野良猫", reading: "のらねこ", meaning: "stray cat" },
        { word: "愛猫", reading: "あいびょう", meaning: "pet cat" },
      ],
    },
    {
      char: "鳥", meaning: "Bird", on: "チョウ", kun: "とり", strokes: 11, category: ["nature"],
      examples: [
        { word: "小鳥", reading: "ことり", meaning: "small bird" },
        { word: "野鳥", reading: "やちょう", meaning: "wild bird" },
      ],
    },
    {
      char: "魚", meaning: "Fish", on: "ギョ", kun: "さかな・うお", strokes: 11, category: ["nature"],
      examples: [
        { word: "金魚", reading: "きんぎょ", meaning: "goldfish" },
        { word: "人魚", reading: "にんぎょ", meaning: "mermaid" },
      ],
    },
    {
      char: "牛", meaning: "Cow / Cattle", on: "ギュウ", kun: "うし", strokes: 4, category: ["nature"],
      examples: [
        { word: "牛肉", reading: "ぎゅうにく", meaning: "beef" },
        { word: "牛乳", reading: "ぎゅうにゅう", meaning: "milk" },
      ],
    },
    {
      char: "広", meaning: "Spacious / Wide", on: "コウ", kun: "ひろ", strokes: 5, category: ["directions"],
      examples: [
        { word: "広場", reading: "ひろば", meaning: "plaza" },
        { word: "広告", reading: "こうこく", meaning: "advertisement" },
      ],
    },
    {
      char: "重", meaning: "Heavy / Overlap", on: "ジュウ・チョウ", kun: "おも・かさ", strokes: 9, category: ["directions"],
      examples: [
        { word: "体重", reading: "たいじゅう", meaning: "weight" },
        { word: "重要", reading: "じゅうよう", meaning: "important" },
      ],
    },
    {
      char: "軽", meaning: "Lightweight", on: "ケイ", kun: "かる", strokes: 12, category: ["directions"],
      examples: [
        { word: "軽食", reading: "けいしょく", meaning: "snack" },
        { word: "軽自動車", reading: "けいじどうしゃ", meaning: "light car" },
      ],
    },
    {
      char: "近", meaning: "Near / Close", on: "キン", kun: "ちか", strokes: 7, category: ["directions"],
      examples: [
        { word: "近所", reading: "きんじょ", meaning: "neighborhood" },
        { word: "最近", reading: "さいきん", meaning: "recently" },
      ],
    },
    {
      char: "遠", meaning: "Far / Distant", on: "エン・オン", kun: "とお", strokes: 13, category: ["directions"],
      examples: [
        { word: "遠足", reading: "えんそく", meaning: "excursion" },
        { word: "遠慮", reading: "えんりょ", meaning: "restraint/reserve" },
      ],
    },
  ],

  N3: [
    {
      char: "警", meaning: "Police / Guard", on: "ケイ", kun: "いまし", strokes: 19, category: ["people"],
      examples: [
        { word: "警察", reading: "けいさつ", meaning: "police" },
        { word: "警告", reading: "けいこく", meaning: "warning" },
      ],
    },
    {
      char: "察", meaning: "Inspect / Observe", on: "サツ", kun: "—", strokes: 14, category: ["people"],
      examples: [
        { word: "観察", reading: "かんさつ", meaning: "observation" },
        { word: "考察", reading: "こうさつ", meaning: "consideration" },
      ],
    },
    {
      char: "難", meaning: "Difficult / Hard", on: "ナン", kun: "むずか・がた", strokes: 18, category: ["directions"],
      examples: [
        { word: "困難", reading: "こんなん", meaning: "difficulty" },
        { word: "難問", reading: "なんもん", meaning: "hard question" },
      ],
    },
    {
      char: "易", meaning: "Easy / Simple", on: "エキ・イ", kun: "やさ", strokes: 8, category: ["directions"],
      examples: [
        { word: "平易", reading: "へいい", meaning: "easy/plain" },
        { word: "貿易", reading: "ぼうえき", meaning: "foreign trade" },
      ],
    },
    {
      char: "勝", meaning: "Win / Victory", on: "ショウ", kun: "か・まさ", strokes: 12, category: ["people"],
      examples: [
        { word: "勝利", reading: "しょうり", meaning: "victory" },
        { word: "決勝", reading: "けっしょう", meaning: "final match" },
      ],
    },
    {
      char: "負", meaning: "Lose / Defeat", on: "フ", kun: "ま・お", strokes: 9, category: ["people"],
      examples: [
        { word: "勝負", reading: "しょうぶ", meaning: "match/bout" },
        { word: "負傷", reading: "ふしょう", meaning: "injury" },
      ],
    },
    {
      char: "伝", meaning: "Transmit / Convey", on: "デン", kun: "つた", strokes: 6, category: ["people"],
      examples: [
        { word: "伝統", reading: "でんとう", meaning: "tradition" },
        { word: "手伝い", reading: "てつだい", meaning: "help/assistance" },
      ],
    },
    {
      char: "記", meaning: "Record / Write down", on: "キ", kun: "しる", strokes: 10, category: ["people"],
      examples: [
        { word: "記事", reading: "きじ", meaning: "article" },
        { word: "日記", reading: "にっき", meaning: "diary" },
      ],
    },
    {
      char: "選", meaning: "Select / Choose", on: "セン", kun: "えら", strokes: 15, category: ["people"],
      examples: [
        { word: "選手", reading: "せんしゅ", meaning: "athlete/player" },
        { word: "選挙", reading: "せんきょ", meaning: "election" },
      ],
    },
  ],

  N2: [
    {
      char: "治", meaning: "Cure / Govern", on: "ジ・チ", kun: "なお・おさ", strokes: 8, category: ["people"],
      examples: [
        { word: "治療", reading: "ちりょう", meaning: "medical treatment" },
        { word: "治る", reading: "なおる", meaning: "to get well" },
        { word: "自治", reading: "じち", meaning: "autonomy" },
      ],
    },
  ],

  N1: [
    {
      char: "魔", meaning: "Demon / Magic", on: "マ", kun: "—", strokes: 21, category: ["people"],
      examples: [
        { word: "魔法", reading: "まほう", meaning: "magic" },
        { word: "悪魔", reading: "あくま", meaning: "devil" },
      ],
    },
  ],
};
