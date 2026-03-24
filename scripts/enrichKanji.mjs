import fs from 'fs/promises';
import path from 'path';

const OUTPUT_FILE = './public/JLPT_Vocabulary/data/results/KanjiDictionary.json';

const delay = ms => new Promise(res => setTimeout(res, ms));

// Helper for Auto-Retry
async function fetchWithRetry(url, maxRetries = 3, delayMs = 2000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                if (res.status === 404) return null; // Not found means no data for this char
                throw new Error(`HTTP Error: ${res.status}`);
            }
            return await res.json();
        } catch (error) {
            if (attempt === maxRetries) {
                console.error(`   [!] Failed after ${maxRetries} attempts: ${error.message}`);
                return null;
            }
            console.log(`   [!] Retry ${attempt}/${maxRetries} after error: ${error.message}`);
            await delay(delayMs);
        }
    }
}

async function fetchTranslate(text) {
    if (!text) return '';
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=${encodeURIComponent(text)}`;
        const data = await fetchWithRetry(url);
        if (data && data[0]) {
            return data[0].map(s => s[0]).join('');
        }
    } catch (e) {}
    return '';
}

async function fetchKanjiList() {
    console.log('Fetching list of all valid Kanji from kanjiapi.dev...');
    const res = await fetchWithRetry('https://kanjiapi.dev/v1/kanji/all');
    if (!res) throw new Error("Could not fetch the initial kanji list.");
    return res;
}

async function main() {
    const allKanji = await fetchKanjiList();
    const total = allKanji.length;
    console.log(`Total generated Kanji characters to process: ${total}`);

    let dictionary = {};

    // Load existing progress
    try {
        // Ensure directory exists
        await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
        
        const existingData = await fs.readFile(OUTPUT_FILE, 'utf-8');
        dictionary = JSON.parse(existingData);
        const processedCount = Object.keys(dictionary).length;
        console.log(`Found existing output file! Resuming... (${processedCount} / ${total} already fetched)`);
    } catch (e) {
        console.log(`No existing output file found. Starting fresh from 0 / ${total}.`);
    }

    console.log(`=== Starting Kanji Enrichment Process ===`);
    console.log(`Press Ctrl+C at any time to stop. Progress is auto-saved every 100 characters.`);

    let count = 0;

    for (let i = 0; i < total; i++) {
        const char = allKanji[i];

        // Skip if already successfully fetched
        if (dictionary[char] && dictionary[char].kanji) {
            continue;
        }

        console.log(`\n[${i + 1}/${total}] Processing Kanji: ${char}`);

        // 1. Fetch from KanjiAPI.dev
        const kanjiData = await fetchWithRetry(`https://kanjiapi.dev/v1/kanji/${encodeURIComponent(char)}`);
        await delay(300); // 300ms base delay for kanjiapi

        if (!kanjiData) {
            // If completely 404/not found, save as empty so we don't refetch on next run forever
            dictionary[char] = {
                kanji: char,
                error: "Not Found in API"
            };
            console.log(`   -> [NOT FOUND] No data in KanjiAPI`);
            continue;
        }

        const englishMeanings = (kanjiData.meanings || []).join(', ');
        
        // 2. Fetch Indonesian Translation from Google Translate
        let indonesian = '';
        if (englishMeanings) {
            indonesian = await fetchTranslate(englishMeanings);
            await delay(500); // Wait 500ms to be polite to Google
        }

        // 3. Save to memory
        dictionary[char] = {
            kanji: char,
            stroke_count: kanjiData.stroke_count || 0,
            jlpt: kanjiData.jlpt || null,
            grade: kanjiData.grade || null,
            onyomi: kanjiData.on_readings || [],
            kunyomi: kanjiData.kun_readings || [],
            english: englishMeanings || 'No definition',
            indonesian: indonesian || 'Tidak ada arti',
        };

        console.log(`   -> Readings (On) : ${dictionary[char].onyomi.join(', ')}`);
        console.log(`   -> Readings (Kun): ${dictionary[char].kunyomi.join(', ')}`);
        console.log(`   -> English       : ${dictionary[char].english}`);
        console.log(`   -> Indonesian    : ${dictionary[char].indonesian}`);

        // 4. Save progress to file every 20 items (reduced from 100 to save earlier)
        count++;
        if (count % 20 === 0) {
            await fs.writeFile(OUTPUT_FILE, JSON.stringify(dictionary, null, 2), 'utf-8');
            console.log(`   [💾 Progress Saved: ${Object.keys(dictionary).length} total characters]`);
        }
    }

    // Final save when complete
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(dictionary, null, 2), 'utf-8');
    console.log(`\n🎉 Enrichment complete! 100% of Kanji data is fetched and saved to ${OUTPUT_FILE}.`);
}

main().catch(err => {
    console.error('Fatal error in script:', err);
});
