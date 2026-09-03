import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side Japanese TTS Proxy for Next.js App Router
 * Chunks long Japanese text (e.g. Choukai dialogues) into sentence-level MP3 buffers,
 * fetches them without CORS/Referrer blocks, concatenates the MP3 buffers,
 * caches results in RAM for instant latency (<1ms), and streams audio/mpeg to client.
 */

const ttsMemoryCache = new Map<string, Buffer>();
const MAX_CACHE_ENTRIES = 500;

function setCache(key: string, val: Buffer) {
  if (ttsMemoryCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = ttsMemoryCache.keys().next().value;
    if (oldestKey) ttsMemoryCache.delete(oldestKey);
  }
  ttsMemoryCache.set(key, val);
}

async function fetchGoogleTTSChunk(chunkText: string): Promise<Buffer | null> {
  const encoded = encodeURIComponent(chunkText);
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=ja&client=tw-ob`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      },
    });

    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }
  } catch (err) {
    console.warn("Google TTS chunk fetch error:", err);
  }
  return null;
}

async function fetchYoudaoTTSChunk(chunkText: string): Promise<Buffer | null> {
  const encoded = encodeURIComponent(chunkText);
  const url = `https://dict.youdao.com/dictvoice?le=jap&audio=${encoded}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }
  } catch (err) {
    console.warn("Youdao TTS chunk fetch error:", err);
  }
  return null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text");

  if (!text || text.trim() === "") {
    return new NextResponse("Missing text parameter", { status: 400 });
  }

  const cleanText = text.replace(/[\r\n]+/g, " ").trim();

  // Check in-memory RAM cache first for instant playback (<1ms)
  if (ttsMemoryCache.has(cleanText)) {
    const cachedBuffer = ttsMemoryCache.get(cleanText)!;
    return new NextResponse(new Uint8Array(cachedBuffer), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": cachedBuffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // Split text by Japanese sentence punctuation (。！？)
  const rawSentences = cleanText
    .split(/(?<=[。！？])/)
    .map((s) => s.trim())
    .filter(Boolean);
  const sentences = rawSentences.length > 0 ? rawSentences : [cleanText];

  // Group sentences into chunks under ~80 characters for optimal TTS generation
  const chunks: string[] = [];
  let currentChunk = "";

  for (const s of sentences) {
    if ((currentChunk + s).length > 80 && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = s;
    } else {
      currentChunk += s;
    }
  }
  if (currentChunk) {
    chunks.push(currentChunk);
  }

  const mp3Buffers: Buffer[] = [];

  for (const chunk of chunks) {
    let buf = await fetchGoogleTTSChunk(chunk);
    if (!buf) {
      buf = await fetchYoudaoTTSChunk(chunk);
    }
    if (buf && buf.length > 0) {
      mp3Buffers.push(buf);
    }
  }

  if (mp3Buffers.length === 0) {
    return new NextResponse("Failed to generate TTS audio", { status: 500 });
  }

  // Concatenate all MP3 buffers into a single audio/mpeg stream
  const combinedBuffer = Buffer.concat(mp3Buffers);

  // Save in RAM cache
  setCache(cleanText, combinedBuffer);

  return new NextResponse(new Uint8Array(combinedBuffer), {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Length": combinedBuffer.length.toString(),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
