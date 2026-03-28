const fs = require('fs');
const https = require('https');

async function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrape() {
  let allGrammar = new Set();
  try {
      console.log('Fetching N5 to N1 JLPT Grammar links dari jlptsensei...');
      const pages = [
         'https://jlptsensei.com/jlpt-n5-grammar-list/',
         'https://jlptsensei.com/jlpt-n4-grammar-list/',
         'https://jlptsensei.com/jlpt-n3-grammar-list/',
         'https://jlptsensei.com/jlpt-n2-grammar-list/',
         'https://jlptsensei.com/jlpt-n1-grammar-list/'
      ];
      
      for(let p of pages) {
         console.log('Fetching ' + p);
         const html = await fetchHTML(p);
         
         // Cari pattern: <td class="jl-td-gj"><a class="jl-link" href="...">~てから</a></td>
         // Atau: <td class="jl-td-gj"><a href="...">~てから</a></td>
         const regex = /<td class="jl-td-gj">.*?<a[^>]*>(.*?)<\/a>.*?<\/td>/g;
         let match;
         while((match = regex.exec(html)) !== null) {
             const gm = match[1];
             if(gm) {
                 let cl = gm.trim()
                     // Remove HTML entities
                     .replace(/&#[0-9]+;/g, '')
                     .replace(/&[a-zA-Z]+;/g, '')
                     // Remove kanji readings in brackets e.g. 見る[みる] -> 見る
                     .replace(/\[.*?\]/g, '')
                     // Remove strong/span tags if any
                     .replace(/<[^>]+>/g, '');
                 
                 if(cl.length > 0 && cl.length <= 30) {
                     allGrammar.add(cl);
                 }
             }
         }
      }
      
      let grammarArr = Array.from(allGrammar);
      console.log('Total Grammar points found:', grammarArr.length);
      
      if (grammarArr.length > 0) {
          fs.writeFileSync('public/JLPT_Vocabulary/data/rawData/GrammarList.txt', grammarArr.join('\n'));
          console.log('Successfully saved to GrammarList.txt!');
      } else {
          console.log('Failed to parse any grammar. Regex might need updating.');
      }
  } catch(e) {
      console.error('Failed to scrape', e);
  }
}

scrape();
