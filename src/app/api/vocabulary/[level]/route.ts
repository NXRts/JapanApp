import { NextResponse } from 'next/server';

type KotonogiVocab = {
    romaji: string;
    kana: string;
    arti: string;
};

type KotonogiData = {
    hiragana_huruf?: { kosakata?: KotonogiVocab[] }[];
    katakana_huruf?: { kosakata?: KotonogiVocab[] }[];
};

export async function GET(
    request: Request,
    context: { params: Promise<{ level: string }> }
) {
    try {
        const params = await context.params;
        // Map 'n5', 'n4', etc. from the old URL to something sensible if needed, 
        // or expect 'hiragana'/'katakana' from the frontend directly.
        // For safety, fallback to hiragana if the level isn't exactly 'katakana'.
        const type = params.level.toLowerCase() === 'katakana' ? 'katakana' : 'hiragana';

        // Fetch from Kotonogi API
        const res = await fetch(`https://kotonogi-api.vercel.app/${type}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch from Kotonogi API: ${res.status}`);
        }

        const data: KotonogiData = await res.json();

        // Extract the kosakata (vocabulary) arrays
        const extractedVocab = [];
        const charArray = type === 'hiragana' ? data.hiragana_huruf : data.katakana_huruf;

        if (charArray) {
            for (const charObj of charArray) {
                if (charObj.kosakata && Array.isArray(charObj.kosakata)) {
                    for (const vocab of charObj.kosakata) {
                        extractedVocab.push({
                            word: vocab.kana,
                            reading: vocab.kana, // Kotonogi provides kana in Both places usually for simple words
                            romaji: vocab.romaji,
                            meaning: vocab.arti,
                        });
                    }
                }
            }
        }

        return NextResponse.json(extractedVocab);
    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json({ error: 'Failed to fetch vocabulary' }, { status: 500 });
    }
}
