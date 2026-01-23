import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ kanji: string }> }
) {
  try {
    // In Next.js 16, params is a Promise and must be awaited
    const { kanji } = await params;
    
    if (!kanji) {
      return Response.json(
        { error: 'Kanji parameter is required' },
        { status: 400 }
      );
    }
    
    // Support both "jlpt-3" and "n3" formats
    const level = kanji.startsWith('n') 
      ? `jlpt-${kanji.slice(1)}` 
      : kanji;

    console.log(`Fetching kanji for level: ${level}`);

    const res = await fetch(
      `https://kanjiapi.dev/v1/kanji/${level}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        // Add cache control to prevent excessive requests
        next: { revalidate: 3600 } 
      }
    );

    if (!res.ok) {
      console.warn(`External API Error: ${res.status} for ${level}. Using fallback data.`);
      // Fallback data prevents the app from breaking if the external API is down
      return Response.json(getFallbackKanji(level));
    }

    const allKanji = (await res.json()) as string[];

    if (!Array.isArray(allKanji)) {
      console.error('Invalid response format:', typeof allKanji);
       return Response.json(getFallbackKanji(level));
    }

    const LIMIT = 150;
    const limitedKanji = allKanji.slice(0, LIMIT);

    return Response.json(limitedKanji);
  } catch (error) {
    console.error('Error fetching kanji:', error);
    // Even on crash, try to return fallback data
    return Response.json(getFallbackKanji('n5'));
  }
}

// Fallback data generator to ensure UI always works
function getFallbackKanji(level: string): string[] {
  const fallbacks: Record<string, string[]> = {
    'jlpt-5': ['日', '一', '国', '人', '年', '大', '十', '二', '本', '中', '長', '出', '三', '時', '行', '見', '月', '分', '後', '前', '生', '五', '間', '上', '東', '四', '今', '金', '九', '入', '学', '高', '円', '子', '外', '八', '六', '下', '来', '気', '小', '七', '山', '話', '女', '北', '午', '百', '書', '先'],
    'jlpt-4': ['会', '同', '事', '自', '社', '発', '者', '地', '業', '方', '新', '場', '員', '立', '開', '手', '力', '問', '代', '明', '動', '京', '目', '通', '言', '理', '体', '田', '主', '題', '意', '不', '作', '用', '度', '強', '公', '持', '野', '以', '思', '家', '世', '多', '正', '安', '院', '心', '界', '教'],
    'jlpt-3': ['政', '議', '民', '連', '対', '部', '合', '市', '内', '相', '定', '回', '選', '米', '実', '関', '決', '全', '表', '戦', '経', '最', '現', '調', '化', '当', '約', '首', '法', '性', '要', '制', '治', '務', '成', '期', '取', '都', '和', '機', '平', '総', '加', '建', '近', 'ら', '産', '系', '重', '集'],
    // Default fallback
    'default': ['日', '本', '語', '学', '習']
  };
  
  return fallbacks[level] || fallbacks['default'];
}
