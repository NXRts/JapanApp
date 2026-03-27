import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
  }

  try {
    // We use Tatoeba API because it is the same sentence source used by Jisho.org
    // from=jpn&to=ind (Indonesian) or eng (English)
    // We fetch English primarily as it has the most comprehensive dataset
    const res = await fetch(`https://tatoeba.org/en/api_v0/search?from=jpn&to=eng&query=${encodeURIComponent(keyword)}`, {
      headers: {
         'User-Agent': 'JapanApp/1.0.0 (Next.js)'
      }
    });

    if (!res.ok) {
       throw new Error(`Tatoeba API returned status ${res.status}`);
    }

    const data = await res.json();
    
    // Process results into our standard sentence format
    const sentences = (data.results || []).map((r: any) => {
       const eng = r.translations?.[0]?.[0]?.text || '';
       
       // Try to extract Romaji or Kana reading from transcription
       let romaji = '';
       if (r.transcriptions && r.transcriptions.length > 0) {
          // Sometimes it has html with <ruby>
          // "text": "[私|わたし]は[大丈夫|だい|じょう|ぶ]"
          const scriptList = r.transcriptions.filter((t: any) => t.script === 'Hrkt' || t.script === 'Latn');
          if (scriptList.length > 0) {
              romaji = scriptList[0].text || '';
              // Simple extraction of readings from brackets [漢字|かんじ]
              romaji = romaji.replace(/\[[^|\]]+\|([^\]]+)\]/g, '$1');
              // Remove remaining brackets in case there were no pipes
              romaji = romaji.replace(/\[|\]/g, '');
          }
       }

       return {
          japanese: r.text,
          english: eng,
          romaji: romaji,
          indonesian: eng // fallback to english for indonesian translation since tatoeba english dataset is larger
       }
    });

    return NextResponse.json({ data: sentences });
  } catch (error) {
    console.error('Tatoeba Proxy Error:', error);
    return NextResponse.json({ error: 'Failed to fetch sentences' }, { status: 500 });
  }
}
