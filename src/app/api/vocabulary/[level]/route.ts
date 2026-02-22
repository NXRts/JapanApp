import { NextResponse } from 'next/server';

const vocabularyData: Record<string, { word: string; reading: string; meaning: string }[]> = {
    n5: [
        { word: '食べる', reading: 'たべる', meaning: 'to eat' },
        { word: '飲む', reading: 'のむ', meaning: 'to drink' },
        { word: '見る', reading: 'みる', meaning: 'to see, to watch' },
        { word: '学校', reading: 'がっこう', meaning: 'school' },
        { word: '先生', reading: 'せんせい', meaning: 'teacher' },
        { word: '学生', reading: 'がくせい', meaning: 'student' },
        { word: '水', reading: 'みず', meaning: 'water' },
        { word: '美味しい', reading: 'おいしい', meaning: 'delicious' },
        { word: '大きい', reading: 'おおきい', meaning: 'big' },
        { word: '小さい', reading: 'ちいさい', meaning: 'small' },
    ],
    n4: [
        { word: '心配', reading: 'しんぱい', meaning: 'worry' },
        { word: '準備', reading: 'じゅんび', meaning: 'preparation' },
        { word: '会議', reading: 'かいぎ', meaning: 'meeting' },
        { word: '約束', reading: 'やくそく', meaning: 'promise' },
        { word: '経験', reading: 'けいけん', meaning: 'experience' },
        { word: '説明', reading: 'せつめい', meaning: 'explanation' },
        { word: '理由', reading: 'りゆう', meaning: 'reason' },
        { word: '複雑', reading: 'ふくざつ', meaning: 'complex' },
        { word: '安全', reading: 'あんぜん', meaning: 'safe' },
        { word: '危険', reading: 'きけん', meaning: 'dangerous' },
    ],
    n3: [
        { word: '影響', reading: 'えいきょう', meaning: 'influence, effect' },
        { word: '環境', reading: 'かんきょう', meaning: 'environment' },
        { word: '結果', reading: 'けっか', meaning: 'result' },
        { word: '直接', reading: 'ちょくせつ', meaning: 'direct' },
        { word: '能力', reading: 'のうりょく', meaning: 'ability' },
        { word: '表現', reading: 'ひょうげん', meaning: 'expression' },
        { word: '目的', reading: 'もくてき', meaning: 'purpose' },
        { word: '理解', reading: 'りかい', meaning: 'understanding' },
        { word: '努力', reading: 'どりょく', meaning: 'effort' },
        { word: '成功', reading: 'せいこう', meaning: 'success' },
    ],
    n2: [
        { word: '傾向', reading: 'けいこう', meaning: 'tendency, trend' },
        { word: '現状', reading: 'げんじょう', meaning: 'current status' },
        { word: '資源', reading: 'しげん', meaning: 'resources' },
        { word: '条件', reading: 'じょうけん', meaning: 'condition' },
        { word: '対策', reading: 'たいさく', meaning: 'measure, countermeasure' },
        { word: '評価', reading: 'ひょうか', meaning: 'evaluation' },
        { word: '無視', reading: 'むし', meaning: 'ignoring' },
        { word: '要求', reading: 'ようきゅう', meaning: 'demand, request' },
        { word: '利益', reading: 'りえき', meaning: 'profit, benefit' },
        { word: '冷静', reading: 'れいせい', meaning: 'calm, composed' },
    ],
    n1: [
        { word: '圧倒的', reading: 'あっとうてき', meaning: 'overwhelming' },
        { word: '一貫', reading: 'いっかん', meaning: 'consistency' },
        { word: '懸念', reading: 'けねん', meaning: 'worry, fear' },
        { word: '巧妙', reading: 'こうみょう', meaning: 'ingenious, skillful' },
        { word: '根拠', reading: 'こんきょ', meaning: 'basis, foundation' },
        { word: '執着', reading: 'しゅうちゃく', meaning: 'attachment, persistence' },
        { word: '迅速', reading: 'じんそく', meaning: 'quick, rapid' },
        { word: '妥協', reading: 'だきょう', meaning: 'compromise' },
        { word: '偏見', reading: 'へんけん', meaning: 'prejudice' },
        { word: '矛盾', reading: 'むじゅん', meaning: 'contradiction' },
    ],
};

export async function GET(
    request: Request,
    context: { params: Promise<{ level: string }> }
) {
    const params = await context.params;
    const level = params.level.toLowerCase();

    if (vocabularyData[level]) {
        return NextResponse.json(vocabularyData[level]);
    }

    return NextResponse.json({ error: 'Level not found' }, { status: 404 });
}
