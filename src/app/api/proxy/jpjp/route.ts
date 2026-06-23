import { NextResponse } from "next/server";
import { validateKeyword } from "@/lib/validation";
import { addCorsHeaders, handleCorsRequest } from "@/lib/cors";

const WIKTIONARY_TIMEOUT_MS = 8000;
const MAX_RETRIES = 2;

async function fetchWithTimeout(
  url: string,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithRetry(
  url: string,
  maxRetries: number,
): Promise<Response | null> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await fetchWithTimeout(url, WIKTIONARY_TIMEOUT_MS);
      if (res.ok) return res;
    } catch {
      // retry
    }
    if (attempt < maxRetries - 1) {
      await new Promise((resolve) =>
        setTimeout(resolve, 500 * Math.pow(2, attempt)),
      );
    }
  }
  return null;
}

// Parse basic HTML definition sections from Wiktionary HTML content
function parseDefinitions(html: string, keyword: string) {
  const definitions: Array<{
    word: string;
    reading: string;
    partOfSpeech: string;
    meanings: string[];
    examples: Array<{ japanese: string; reading?: string }>;
  }> = [];

  // Extract text content from HTML tags — robust for Wiktionary's complex markup
  const stripHtml = (str: string) => {
    if (!str) return "";

    let cleaned = str;

    // 1. First, remove any legitimate HTML tags and their contents if they are metadata
    // (Wiktionary often has <span class="metadata">...</span> or similar)
    cleaned = cleaned.replace(
      /<span[^>]*class="[^"]*metadata[^"]*"[^>]*>[\s\S]*?<\/span>/gi,
      "",
    );

    // 2. Remove all standard HTML tags
    cleaned = cleaned.replace(/<[^>]*>/g, "");

    // 3. Decode common HTML entities (now twice to handle double encoding)
    const decode = (s: string) =>
      s
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

    cleaned = decode(cleaned);
    // If it was double encoded (e.g. &amp;lt;span&gt;), decode again and strip tags again
    if (cleaned.includes("<") || cleaned.includes("&")) {
      cleaned = decode(cleaned);
      cleaned = cleaned.replace(/<[^>]*>/g, "");
    }

    // 4. Remove leftover wikitext reference markers like [1], [2]
    cleaned = cleaned.replace(/\[\d+\]/g, "");

    // 5. Remove any leftover JSON-like data-mw attributes content or template markers
    // These often look like {"parts":[{"template":...}]} or similar
    cleaned = cleaned.replace(/\{"parts":[\s\S]*?\}/g, "");
    cleaned = cleaned.replace(/\{"template":[\s\S]*?\}/g, "");

    // 6. Remove specific Wiktionary artifacts like "(東京式) ... [ichinichi]"
    // if they are cluttering the definition.
    // Actually, keep them if they are useful, but remove the span garbage.

    // 7. Final cleanup of whitespace
    return cleaned.replace(/\s+/g, " ").trim();
  };

  // Try to find Japanese section — look for 日本語 heading
  const jaSection = html.match(/id="日本語"[\s\S]*?(?=<h2|$)/)?.[0] || html;

  // Extract headings and definition lists
  // Look for h3/h4 (part of speech headers) and following ol/li (definitions)
  const posBlocks = jaSection.matchAll(
    /<h[34][^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>[\s\S]*?<\/h[34]>([\s\S]*?)(?=<h[234]|$)/g,
  );

  for (const block of posBlocks) {
    const posRaw = stripHtml(block[1]);
    const content = block[2];

    // Skip non-definition sections
    if (
      [
        "語源",
        "発音",
        "翻訳",
        "関連語",
        "参照",
        "成句",
        "派生語",
        "対義語",
        "類義語",
      ].some((s) => posRaw.includes(s))
    ) {
      continue;
    }

    // Map POS to readable labels
    let partOfSpeech = posRaw;
    const posMap: Record<string, string> = {
      名詞: "名詞 (Kata Benda)",
      動詞: "動詞 (Kata Kerja)",
      形容詞: "形容詞 (Kata Sifat)",
      形容動詞: "形容動詞 (Kata Sifat Na)",
      副詞: "副詞 (Kata Keterangan)",
      助詞: "助詞 (Partikel)",
      接続詞: "接続詞 (Kata Sambung)",
      感動詞: "感動詞 (Kata Seru)",
      連体詞: "連体詞 (Prenomina)",
      助動詞: "助動詞 (Kata Kerja Bantu)",
    };
    for (const [key, val] of Object.entries(posMap)) {
      if (posRaw.includes(key)) {
        partOfSpeech = val;
        break;
      }
    }

    // Extract reading from content — look for hiragana in parentheses or furigana
    let reading = "";
    const readingMatch =
      content.match(/【([^】]+)】/) ||
      content.match(/（([ぁ-ん\s・]+)）/) ||
      content.match(/\(([ぁ-ん\s・]+)\)/);
    if (readingMatch) {
      reading = stripHtml(readingMatch[1]);
    }

    // Extract definitions from ordered list items
    const meanings: string[] = [];
    const liMatches = content.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g);
    for (const li of liMatches) {
      const text = stripHtml(li[1]);
      if (text && text.length > 1 && text.length < 500) {
        // Filter out sub-lists and references, keep actual definitions
        const cleaned = text.replace(/\s+/g, " ").trim();
        if (cleaned && !cleaned.startsWith("#")) {
          meanings.push(cleaned);
        }
      }
    }

    // Extract example sentences (usually in <dl><dd> or quoted blocks)
    const examples: Array<{ japanese: string; reading?: string }> = [];
    const exampleMatches = content.matchAll(/<dd[^>]*>([\s\S]*?)<\/dd>/g);
    for (const ex of exampleMatches) {
      const text = stripHtml(ex[1]);
      if (text && text.length > 3 && text.length < 300) {
        // Check if it contains Japanese characters
        if (/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/.test(text)) {
          examples.push({ japanese: text });
        }
      }
    }

    if (meanings.length > 0) {
      definitions.push({
        word: keyword,
        reading,
        partOfSpeech,
        meanings: meanings.slice(0, 10), // Cap at 10 definitions
        examples: examples.slice(0, 5),
      });
    }
  }

  return definitions;
}

export async function GET(request: Request) {
  const corsResponse = handleCorsRequest(request);
  if (corsResponse) return corsResponse;

  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword");
    const origin = request.headers.get("origin");

    const validatedKeyword = validateKeyword(keyword);

    // Primary: MediaWiki Action API (produces cleaner HTML without data-mw attributes)
    const actionUrl = `https://ja.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(validatedKeyword)}&prop=text&format=json&formatversion=2`;
    const actionRes = await fetchWithRetry(actionUrl, MAX_RETRIES);

    if (actionRes) {
      const actionData = await actionRes.json();
      const html = actionData?.parse?.text || "";
      if (html) {
        const definitions = parseDefinitions(html, validatedKeyword);
        if (definitions.length > 0) {
          const response = NextResponse.json({ data: definitions });
          return addCorsHeaders(response, origin);
        }
      }
    }

    // Fallback: REST API
    const restUrl = `https://ja.wiktionary.org/api/rest_v1/page/html/${encodeURIComponent(validatedKeyword)}`;
    const restRes = await fetchWithRetry(restUrl, MAX_RETRIES);

    if (!restRes) {
      const response = NextResponse.json({ data: [] });
      return addCorsHeaders(response, origin);
    }

    const html = await restRes.text();
    const definitions = parseDefinitions(html, validatedKeyword);
    const response = NextResponse.json({ data: definitions });
    return addCorsHeaders(response, origin);
  } catch (error) {
    console.warn("JP-JP Proxy: failed for keyword:", error);
    const response = NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch dictionary data",
        data: [],
      },
      {
        status:
          error instanceof Error && error.message.includes("required")
            ? 400
            : 500,
      },
    );
    return addCorsHeaders(response, request.headers.get("origin"));
  }
}
