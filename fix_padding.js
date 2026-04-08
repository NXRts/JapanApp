const fs = require('fs');
const { execSync } = require('child_process');

const files = execSync('grep -rl "<Breadcrumbs" src/app').toString().trim().split('\n');

for (const file of files) {
  if (!file.endsWith('.tsx')) continue;
  let content = fs.readFileSync(file, 'utf8');

  // We want to reliably find the Container or PageContainer styled block.
  // Then replace the top padding for both desktop and mobile.
  // A regex to find: padding: <number>rem <something>;
  
  let modifiedContent = content;
  
  // Replace desktop padding that starts with a large rem
  modifiedContent = modifiedContent.replace(
    /padding:\s*([4-9]|[1-9][0-9])rem\s+([^;]+);/g,
    'padding: 2.5rem $2;'
  );

  // For 3-value padding like padding: 8rem 2rem 4rem;
  modifiedContent = modifiedContent.replace(
    /padding:\s*([4-9]|[1-9][0-9])rem\s+([^ ]+)\s+([^ ;]+);/g,
    'padding: 2.5rem $2 $3;'
  );

  // Replace mobile padding inside media queries with something smaller, like 1.5rem top padding.
  // Note: the previous regex might already catch it if it's 6rem, and turn it to 2.5rem. 
  // Let's find padding inside @media blocks.
  modifiedContent = modifiedContent.replace(
    /@media\s*\([^)]+\)\s*\{[\s\S]*?padding:\s*([1-9]|[1-9][0-9]|\d+\.\d+)rem\s+([^;]+);/g,
    (match, remSize, rest) => {
        // If the padding top is large (e.g. 4rem or 6rem or 8rem), reduce it.
        // Even if it was 2.5rem (from previous replace), make it 1.5rem.
        let newPadding = rest.includes('1.5rem') || rest.includes('1rem') ? '1.5rem' : '1.5rem';
        return match.replace(/padding:\s*[0-9.]+rem/, 'padding: 1.5rem');
    }
  );

  if (content !== modifiedContent) {
    fs.writeFileSync(file, modifiedContent);
    console.log(`Updated padding in ${file}`);
  }
}
