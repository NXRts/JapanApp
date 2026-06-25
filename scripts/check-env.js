const fs = require('fs');
const path = require('path');

// Load .env file if it exists (local development / testing)
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    // Skip comments and empty lines
    if (!line || line.trim().startsWith('#')) return;
    
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      
      // Trim quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      
      // Don't overwrite if already set in environment
      if (process.env[key] === undefined) {
        process.env[key] = value.trim();
      }
    }
  });
}

const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
if (!key || key === 'your-secure-encryption-key-here' || key.trim() === '') {
  console.error('\x1b[31mERROR: NEXT_PUBLIC_ENCRYPTION_KEY is not set or is still the placeholder!\x1b[0m');
  process.exit(1);
}

console.log('\x1b[32mEncryption key is successfully set and verified.\x1b[0m');
process.exit(0);
