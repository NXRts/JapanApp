import React, { useState } from "react";
import styled from "styled-components";

const KeyboardContainer = styled.div<{ $script: string }>`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  margin-top: 0.5rem;
  width: 100%;
  z-index: 100;
`;

const TabRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem;
`;

const TabBtn = styled.button<{ $active: boolean }>`
  background: transparent;
  border: none;
  font-weight: 800;
  font-size: 1rem;
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--text-secondary)"};
  cursor: pointer;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
    color: var(--primary);
  }
`;

const SubTabRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  padding-bottom: 0.2rem;
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;
  }
`;

const SubTabBtn = styled.button<{ $active: boolean }>`
  background: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--background)"};
  color: ${({ $active }) => ($active ? "#fff" : "var(--foreground)")};
  border: 1px solid
    ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  padding: 0.35rem 0.7rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
`;

const KeyGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const KeyRowContainer = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const KeyBtn = styled.button`
  flex: 1;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.6rem 0;
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--foreground);
  cursor: pointer;
  transition: all 0.1s;
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
    border-color: var(--primary);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0;
    pointer-events: none;
  }
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  gap: 0.5rem;
`;

const ActionBtn = styled.button<{ $variant?: "primary" | "danger" }>`
  flex: 1;
  padding: 0.6rem 0;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  background: ${({ $variant }) =>
    $variant === "primary"
      ? "var(--primary)"
      : $variant === "danger"
        ? "rgba(239, 68, 68, 0.1)"
        : "var(--background)"};
  color: ${({ $variant }) =>
    $variant === "primary"
      ? "#fff"
      : $variant === "danger"
        ? "#ef4444"
        : "var(--foreground)"};
  border: 1px solid
    ${({ $variant }) =>
      $variant === "primary"
        ? "transparent"
        : $variant === "danger"
          ? "rgba(239, 68, 68, 0.2)"
          : "var(--border)"};
  transition: all 0.2s;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
`;

const RadicalGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  max-height: 250px;
  overflow-y: auto;
  align-content: flex-start;
  padding-right: 0.5rem;
  padding-top: 0.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 6px;
  }
`;

const RadBtn = styled.button`
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  width: 34px;
  height: 34px;
  font-size: 1.15rem;
  color: var(--foreground);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
  box-shadow: var(--shadow-sm);

  &:hover {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
    border-color: var(--primary);
    transform: translateY(-2px);
  }
`;

const StrokeHeader = styled.div`
  background: var(--primary);
  color: #fff;
  border-radius: 6px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.95rem;
  margin-right: 0.2rem;
  box-shadow: var(--shadow-sm);
`;

const radicalList = [
  { s: 1, r: ["一", "丨", "丶", "丿", "乙", "亅"] },
  {
    s: 2,
    r: [
      "二",
      "亠",
      "人",
      "儿",
      "入",
      "八",
      "冂",
      "冖",
      "冫",
      "几",
      "凵",
      "刀",
      "力",
      "勹",
      "匕",
      "匚",
      "匸",
      "十",
      "卜",
      "卩",
      "厂",
      "厶",
      "又",
    ],
  },
  {
    s: 3,
    r: [
      "口",
      "囗",
      "土",
      "士",
      "夂",
      "夊",
      "夕",
      "大",
      "女",
      "子",
      "宀",
      "寸",
      "小",
      "尢",
      "尸",
      "屮",
      "山",
      "巛",
      "工",
      "己",
      "巾",
      "干",
      "幺",
      "广",
      "廴",
      "廾",
      "弋",
      "弓",
      "彐",
      "彡",
      "彳",
    ],
  },
  {
    s: 4,
    r: [
      "心",
      "戈",
      "戶",
      "手",
      "支",
      "攴",
      "文",
      "斗",
      "斤",
      "方",
      "无",
      "日",
      "曰",
      "月",
      "木",
      "欠",
      "止",
      "歹",
      "殳",
      "毋",
      "比",
      "毛",
      "氏",
      "气",
      "水",
      "火",
      "爪",
      "父",
      "爻",
      "爿",
      "片",
      "牙",
      "牛",
      "犬",
    ],
  },
  {
    s: 5,
    r: [
      "玄",
      "玉",
      "瓜",
      "瓦",
      "甘",
      "生",
      "用",
      "田",
      "疋",
      "疒",
      "癶",
      "白",
      "皮",
      "皿",
      "目",
      "矛",
      "矢",
      "石",
      "示",
      "禸",
      "禾",
      "穴",
      "立",
    ],
  },
  {
    s: 6,
    r: [
      "竹",
      "米",
      "糸",
      "缶",
      "网",
      "羊",
      "羽",
      "老",
      "而",
      "耒",
      "耳",
      "聿",
      "肉",
      "臣",
      "自",
      "至",
      "臼",
      "舌",
      "舛",
      "舟",
      "艮",
      "色",
      "艸",
      "虍",
      "虫",
      "血",
      "行",
      "衣",
      "襾",
    ],
  },
  {
    s: 7,
    r: [
      "見",
      "角",
      "言",
      "谷",
      "豆",
      "豕",
      "豸",
      "貝",
      "赤",
      "走",
      "足",
      "身",
      "車",
      "辛",
      "辰",
      "辵",
      "邑",
      "酉",
      "釆",
      "里",
    ],
  },
  { s: 8, r: ["金", "長", "門", "阜", "隶", "隹", "雨", "青", "非"] },
  {
    s: 9,
    r: ["面", "革", "韋", "韭", "音", "頁", "風", "飛", "食", "首", "香"],
  },
  { s: 10, r: ["馬", "骨", "高", "髟", "鬥", "鬯", "鬲", "鬼"] },
  { s: 11, r: ["魚", "鳥", "鹵", "鹿", "麥", "麻"] },
  { s: 12, r: ["黃", "黍", "黑", "黹"] },
  { s: 13, r: ["黽", "鼎", "鼓", "鼠"] },
  { s: 14, r: ["鼻", "齊"] },
  { s: 15, r: ["齒"] },
  { s: 16, r: ["龍", "龜"] },
  { s: 17, r: ["龠"] },
];

const layouts = {
  hiragana: {
    seion: [
      ["あ", "い", "う", "え", "お"],
      ["か", "き", "く", "け", "こ"],
      ["さ", "し", "す", "せ", "そ"],
      ["た", "ち", "つ", "て", "と"],
      ["な", "に", "ぬ", "ね", "の"],
      ["は", "ひ", "ふ", "へ", "ほ"],
      ["ま", "み", "む", "め", "も"],
      ["や", "ゆ", "よ"],
      ["ら", "り", "る", "れ", "ろ"],
      ["わ", "を", "ん", "ー"],
    ],
    dakuon: [
      ["が", "ぎ", "ぐ", "げ", "ご"],
      ["ざ", "じ", "ず", "ぜ", "ぞ"],
      ["だ", "ぢ", "づ", "で", "ど"],
      ["ば", "び", "ぶ", "べ", "ぼ"],
      ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
    ],
    yoon: [
      ["きゃ", "きゅ", "きょ"],
      ["しゃ", "しゅ", "しょ"],
      ["ちゃ", "ちゅ", "ちょ"],
      ["にゃ", "にゅ", "にょ"],
      ["ひゃ", "ひゅ", "ひょ"],
      ["みゃ", "みゅ", "みょ"],
      ["りゃ", "りゅ", "りょ"],
      ["ぎゃ", "ぎゅ", "ぎょ"],
      ["じゃ", "じゅ", "じょ"],
      ["びゃ", "びゅ", "びょ"],
      ["ぴゃ", "ぴゅ", "ぴょ"],
    ],
  },
  katakana: {
    seion: [
      ["ア", "イ", "ウ", "エ", "オ"],
      ["カ", "キ", "ク", "ケ", "コ"],
      ["サ", "シ", "ス", "セ", "ソ"],
      ["タ", "チ", "ツ", "テ", "ト"],
      ["ナ", "ニ", "ヌ", "ネ", "ノ"],
      ["ハ", "ヒ", "フ", "ヘ", "ホ"],
      ["マ", "ミ", "ム", "メ", "モ"],
      ["ヤ", "ユ", "ヨ"],
      ["ラ", "リ", "ル", "レ", "ロ"],
      ["ワ", "ヲ", "ン", "ー"],
    ],
    dakuon: [
      ["ガ", "ギ", "グ", "ゲ", "ゴ"],
      ["ザ", "ジ", "ズ", "ゼ", "ゾ"],
      ["ダ", "ヂ", "ヅ", "デ", "ド"],
      ["バ", "ビ", "ブ", "ベ", "ボ"],
      ["パ", "ピ", "プ", "ペ", "ポ"],
    ],
    yoon: [
      ["キャ", "キュ", "キョ"],
      ["シャ", "シュ", "ショ"],
      ["チャ", "チュ", "チョ"],
      ["ニャ", "ニュ", "ニョ"],
      ["ヒャ", "ヒュ", "ヒョ"],
      ["ミャ", "ミュ", "ミョ"],
      ["リャ", "リュ", "リョ"],
      ["ギャ", "ギュ", "ギョ"],
      ["ジャ", "ジュ", "ジョ"],
      ["ビャ", "ビュ", "ビョ"],
      ["ピャ", "ピュ", "ピョ"],
    ],
  },
};

export default function KanaKeyboard({
  onType,
  onBackspace,
  onClose,
}: {
  onType: (char: string) => void;
  onBackspace: () => void;
  onClose: () => void;
}) {
  const [script, setScript] = useState<"hiragana" | "katakana" | "radikal">(
    "hiragana",
  );
  const [mode, setMode] = useState<"seion" | "dakuon" | "yoon">("seion");

  return (
    <KeyboardContainer $script={script}>
      <TabRow>
        <TabBtn
          $active={script === "hiragana"}
          onClick={() => setScript("hiragana")}
        >
          Hiragana
        </TabBtn>
        <TabBtn
          $active={script === "katakana"}
          onClick={() => setScript("katakana")}
        >
          Katakana
        </TabBtn>
        <TabBtn
          $active={script === "radikal"}
          onClick={() => setScript("radikal")}
        >
          Radikal
        </TabBtn>
      </TabRow>

      {script === "radikal" ? (
        <RadicalGrid>
          {radicalList.map((group) => (
            <React.Fragment key={group.s}>
              <StrokeHeader>{group.s}</StrokeHeader>
              {group.r.map((rad, i) => (
                <RadBtn
                  key={`${group.s}-${i}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onType(rad);
                  }}
                >
                  {rad}
                </RadBtn>
              ))}
            </React.Fragment>
          ))}
        </RadicalGrid>
      ) : (
        <>
          <SubTabRow>
            <SubTabBtn
              $active={mode === "seion"}
              onClick={() => setMode("seion")}
            >
              Dasar
            </SubTabBtn>
            <SubTabBtn
              $active={mode === "dakuon"}
              onClick={() => setMode("dakuon")}
            >
              Dakuon
            </SubTabBtn>
            <SubTabBtn
              $active={mode === "yoon"}
              onClick={() => setMode("yoon")}
            >
              Yōon
            </SubTabBtn>
          </SubTabRow>

          <KeyGrid>
            {(layouts[script] as any)[mode].map(
              (row: string[], rowIndex: number) => (
                <KeyRowContainer key={rowIndex}>
                  {row.map((key, i) => (
                    <KeyBtn
                      key={i}
                      disabled={!key}
                      onClick={(e) => {
                        e.preventDefault();
                        if (key) onType(key);
                      }}
                    >
                      {key}
                    </KeyBtn>
                  ))}
                </KeyRowContainer>
              ),
            )}
          </KeyGrid>
        </>
      )}

      <ActionRow>
        <ActionBtn
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          Tutup
        </ActionBtn>
        <ActionBtn
          onClick={(e) => {
            e.preventDefault();
            onType(" ");
          }}
        >
          Spasi
        </ActionBtn>
        <ActionBtn
          $variant="danger"
          onClick={(e) => {
            e.preventDefault();
            onBackspace();
          }}
        >
          ⌫
        </ActionBtn>
      </ActionRow>
    </KeyboardContainer>
  );
}
