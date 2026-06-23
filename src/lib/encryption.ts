// A secure default key in case the environment variable is not defined
const DEFAULT_KEY = "japan-app-local-encryption-key-secure-fallback";
const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || DEFAULT_KEY;

/**
 * RC4 stream cipher implementation for local progress data obfuscation/encryption.
 * Synchronous, fast, and does not require external NPM dependencies.
 */
function rc4(key: string, str: string): string {
  const s = new Uint8Array(256);
  for (let i = 0; i < 256; i++) {
    s[i] = i;
  }
  let j = 0;
  for (let i = 0; i < 256; i++) {
    j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
    // Swap
    const temp = s[i];
    s[i] = s[j];
    s[j] = temp;
  }

  let i = 0;
  j = 0;
  let out = "";
  for (let y = 0; y < str.length; y++) {
    i = (i + 1) % 256;
    j = (j + s[i]) % 256;
    // Swap
    const temp = s[i];
    s[i] = s[j];
    s[j] = temp;

    const k = s[(s[i] + s[j]) % 256];
    out += String.fromCharCode(str.charCodeAt(y) ^ k);
  }
  return out;
}

// Convert string to base64 safely (handles Unicode/Japanese characters/emojis)
function utf8ToBase64(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }),
  );
}

// Convert base64 to string safely (handles Unicode/Japanese characters/emojis)
function base64ToUtf8(str: string): string {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), (c: string) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
}

/**
 * Encrypts progress data using RC4 and encodes to base64.
 * @param data The data to encrypt.
 * @returns Base64 encoded encrypted string.
 */
export function encryptData(data: any): string {
  try {
    const stringified = JSON.stringify(data);
    const encrypted = rc4(SECRET_KEY, stringified);
    return utf8ToBase64(encrypted);
  } catch (error) {
    console.error("Encryption failed:", error);
    return "";
  }
}

/**
 * Decrypts base64 encoded RC4 data.
 * @param encrypted Base64 encoded encrypted string.
 * @returns Decrypted object, or null if decryption fails.
 */
export function decryptData(encrypted: string): any {
  try {
    const decoded = base64ToUtf8(encrypted);
    const decrypted = rc4(SECRET_KEY, decoded);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}
