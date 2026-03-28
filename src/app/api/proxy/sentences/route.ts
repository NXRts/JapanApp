import { NextResponse } from 'next/server';

const TATOEBA_TIMEOUT_MS = 8000; // 8 second timeout per attempt
const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 500; // 500ms → 1000ms → 2000ms

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithRetry(url: string, options: RequestInit, maxRetries: number): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await fetchWithTimeout(url, options, TATOEBA_TIMEOUT_MS);
      if (res.ok) return res;

      // On non-OK status, only retry on server errors (5xx)
      if (res.status >= 500) {
        lastError = new Error(`Tatoeba API returned status ${res.status}`);
      } else {
        // Client errors (4xx) — don't retry
        throw new Error(`Tatoeba API returned status ${res.status}`);
      }
    } catch (err: any) {
      lastError = err;
      // Don't retry on abort/client errors that aren't timeouts
      if (err.name !== 'AbortError' && err.code !== 'ETIMEDOUT' && err.cause?.code !== 'ETIMEDOUT' && !(err instanceof TypeError)) {
        throw err;
      }
    }

    // Exponential backoff before next attempt
    if (attempt < maxRetries - 1) {
      const backoff = INITIAL_BACKOFF_MS * Math.pow(2, attempt);
      console.warn(`Tatoeba attempt ${attempt + 1}/${maxRetries} failed, retrying in ${backoff}ms...`);
      await new Promise(resolve => setTimeout(resolve, backoff));
    }
  }

  throw lastError || new Error('All retry attempts failed');
}

function processResults(data: any) {
  return (data.results || []).map((r: any) => {
    const eng = r.translations?.[0]?.[0]?.text || '';

    // Try to extract Romaji or Kana reading from transcription
    let romaji = '';
    if (r.transcriptions && r.transcriptions.length > 0) {
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
      indonesian: eng // fallback to english since tatoeba english dataset is larger
    };
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
  }

  const url = `https://tatoeba.org/en/api_v0/search?from=jpn&to=eng&query=${encodeURIComponent(keyword)}`;

  try {
    const res = await fetchWithRetry(url, {
      headers: { 'User-Agent': 'JapanApp/1.0.0 (Next.js)' },
    }, MAX_RETRIES);

    const data = await res.json();
    const sentences = processResults(data);

    return NextResponse.json({ data: sentences });
  } catch (error) {
    console.warn('Tatoeba Proxy: all attempts failed for keyword:', keyword, error);
    // Graceful degradation — return empty data instead of 500
    // so the UI can still render (just without example sentences)
    return NextResponse.json({ data: [] });
  }
}
