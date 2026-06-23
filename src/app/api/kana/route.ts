import { NextRequest, NextResponse } from "next/server";
import { validateKanaType } from "@/lib/validation";
import { addCorsHeaders, handleCorsRequest } from "@/lib/cors";

const HIRAGANA = [
  "あ",
  "い",
  "う",
  "え",
  "お",
  "か",
  "き",
  "く",
  "け",
  "こ",
  "さ",
  "し",
  "す",
  "せ",
  "そ",
  "た",
  "ち",
  "つ",
  "て",
  "と",
  "な",
  "に",
  "ぬ",
  "ね",
  "の",
  "は",
  "ひ",
  "ふ",
  "へ",
  "ほ",
  "ま",
  "み",
  "む",
  "め",
  "も",
  "や",
  "ゆ",
  "よ",
  "ら",
  "り",
  "る",
  "れ",
  "ろ",
  "わ",
  "を",
  "ん",
];

const KATAKANA = [
  "ア",
  "イ",
  "ウ",
  "エ",
  "オ",
  "カ",
  "キ",
  "ク",
  "ケ",
  "コ",
  "サ",
  "シ",
  "ス",
  "セ",
  "ソ",
  "タ",
  "チ",
  "ツ",
  "テ",
  "ト",
  "ナ",
  "ニ",
  "ヌ",
  "ネ",
  "ノ",
  "ハ",
  "ヒ",
  "フ",
  "ヘ",
  "ホ",
  "マ",
  "ミ",
  "ム",
  "メ",
  "モ",
  "ヤ",
  "ユ",
  "ヨ",
  "ラ",
  "リ",
  "ル",
  "レ",
  "ロ",
  "ワ",
  "ヲ",
  "ン",
];

export async function GET(request: NextRequest) {
  const corsResponse = handleCorsRequest(request);
  if (corsResponse) return corsResponse;

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const origin = request.headers.get("origin");

    const validatedType = validateKanaType(type);

    let data;
    if (validatedType === "hiragana") {
      data = HIRAGANA;
    } else if (validatedType === "katakana") {
      data = KATAKANA;
    } else if (validatedType === "all") {
      data = [...HIRAGANA, ...KATAKANA];
    } else {
      data = { hiragana: HIRAGANA, katakana: KATAKANA };
    }

    const response = NextResponse.json(data);
    return addCorsHeaders(response, origin);
  } catch (error) {
    console.error("Kana API Error:", error);
    const response = NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid request" },
      { status: 400 },
    );
    return addCorsHeaders(response, request.headers.get("origin"));
  }
}
