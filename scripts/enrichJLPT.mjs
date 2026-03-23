import fs from 'fs/promises';
import path from 'path';

const INPUT_FILE = './public/JLPT_Vocabulary/data/results/JLPTWords.json';
const OUTPUT_FILE = './public/JLPT_Vocabulary/data/results/JLPTWordsEnriched.json';

const delay = ms => new Promise(res => setTimeout(res, ms));

// Helper for Auto-Retry
async function fetchWithRetry(url, maxRetries = 3, delayMs = 2000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
            return await res.json();
        } catch (error) {
            if (attempt === maxRetries) {
                console.error(`   [!] Failed after ${maxRetries} attempts: ${error.message}`);
                throw error;
            }
            console.log(`   [!] Retry ${attempt}/${maxRetries} after error: ${error.message}`);
            await delay(delayMs);
        }
    }
}

async function fetchJisho(keyword) {
    try {
        const data = await fetchWithRetry(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(keyword)}`);
        if (data && data.data && data.data.length > 0) {
            const first = data.data[0];
            const meaning = first.senses?.[0]?.english_definitions?.join(', ') || '';
            const reading = first.japanese?.[0]?.reading || '';
            return { meaning, reading };
        }
    } catch (e) {
        // Logging is handled by fetchWithRetry
    }
    return { meaning: '', reading: '' };
}

async function fetchTranslate(text) {
    if (!text) return '';
    try {
        const data = await fetchWithRetry(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=${encodeURIComponent(text)}`);
        if (data && data[0]) {
            return data[0].map(s => s[0]).join('');
        }
    } catch (e) {
        // Logging is handled by fetchWithRetry
    }
    return '';
}

async function main() {
    console.log('Loading input data...');
    const rawData = await fs.readFile(INPUT_FILE, 'utf-8');
    const wordsObj = JSON.parse(rawData);
    const wordsArray = Object.entries(wordsObj);
    const total = wordsArray.length;
    
    let enrichedData = {};
    
    try {
        const existingData = await fs.readFile(OUTPUT_FILE, 'utf-8');
        enrichedData = JSON.parse(existingData);
        // Clean up any previously failed fetches so we retry them automatically
        const processedCount = Object.values(enrichedData).filter(c => c.english && c.english !== 'No definition').length;
        console.log(`Found existing output file! Resuming... (${processedCount} / ${total} successful words already processed)`);
    } catch (e) {
        console.log(`No existing output file found. Starting fresh from 0 / ${total}.`);
    }

    console.log(`=== Starting Enrichment Process ===`);
    console.log(`Press Ctrl+C at any time to stop. Progress is auto-saved every 5 words.`);

    let count = 0;
    
    for (let i = 0; i < total; i++) {
        const [word, level] = wordsArray[i];
        
        // Skip if already successfully enriched (must have english meaning to count as success)
        if (enrichedData[word] && enrichedData[word].english && enrichedData[word].english !== 'No definition') {
            continue;
        }

        console.log(`\n[${i+1}/${total}] Processing: ${word} (${level})`);

        // 1. Fetch from Jisho (English + Reading/Romaji)
        const { meaning: english, reading } = await fetchJisho(word);
        await delay(1000); // 1 second base delay
        
        // 2. Fetch from Google Translate (Indonesian)
        let indonesian = '';
        if (english) {
            indonesian = await fetchTranslate(english);
            await delay(1000); // Wait another second purely to be polite to Google
        }

        // 3. Save to memory map
        enrichedData[word] = {
            id: word,
            level: level,
            word: word,
            reading: reading || word,
            english: english || 'No definition',
            indonesian: indonesian || 'Tidak ada arti',
        };
        
        console.log(`   -> Reading   : ${reading}`);
        console.log(`   -> English   : ${english}`);
        console.log(`   -> Indonesian: ${indonesian}`);

        // 4. Save progress to file every 5 items
        count++;
        if (count % 5 === 0) {
            await fs.writeFile(OUTPUT_FILE, JSON.stringify(enrichedData, null, 2), 'utf-8');
            console.log(`   [💾 Progress Saved: ${Object.keys(enrichedData).length} totals in file]`);
        }
    }

    // Final save when complete
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(enrichedData, null, 2), 'utf-8');
    console.log(`\n🎉 Enrichment complete! 100% of data is fetched and saved to ${OUTPUT_FILE}.`);
}

main().catch(err => {
    console.error('Fatal error in script:', err);
});
