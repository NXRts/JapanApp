// A secure default key in case the environment variable is not defined
const DEFAULT_KEY = "japan-app-local-encryption-key-secure-fallback";
const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || DEFAULT_KEY;

// Cache the imported CryptoKey to avoid repeating the import process
let cachedKey: CryptoKey | null = null;

const getCrypto = () => {
  if (typeof window !== "undefined" && window.crypto) {
    return window.crypto;
  }
  if (typeof globalThis !== "undefined" && globalThis.crypto) {
    return globalThis.crypto;
  }
  throw new Error("Cryptography API is not available in this environment.");
};

async function getEncryptionKey(): Promise<CryptoKey> {
  if (cachedKey) return cachedKey;

  const cryptoInstance = getCrypto();
  const encoder = new TextEncoder();
  const keyData = encoder.encode(SECRET_KEY);

  // Hash the SECRET_KEY to get exactly 256 bits (32 bytes)
  const hash = await cryptoInstance.subtle.digest("SHA-256", keyData);

  cachedKey = await cryptoInstance.subtle.importKey(
    "raw",
    hash,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"],
  );

  return cachedKey;
}

// Convert Uint8Array to base64 string safely
function bufferToBase64(buffer: Uint8Array): string {
  const binString = Array.from(buffer, (byte) =>
    String.fromCharCode(byte),
  ).join("");
  return btoa(binString);
}

// Convert base64 string to Uint8Array safely
function base64ToBuffer(base64: string): Uint8Array {
  const binString = atob(base64);
  return Uint8Array.from(binString, (m) => m.charCodeAt(0));
}

// Legacy RC4 cipher for backward compatibility
function legacyRc4(key: string, str: string): string {
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

function base64ToUtf8(str: string): string {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), (c: string) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function decryptLegacyData(encrypted: string): any {
  try {
    const decoded = base64ToUtf8(encrypted);
    const decrypted = legacyRc4(SECRET_KEY, decoded);
    return JSON.parse(decrypted);
  } catch {
    return null;
  }
}

/**
 * Encrypts progress data using AES-GCM (256-bit) and encodes to base64.
 * @param data The data to encrypt.
 * @returns Base64 encoded encrypted string.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function encryptData(data: any): Promise<string> {
  try {
    const stringified = JSON.stringify(data);
    const cryptoInstance = getCrypto();
    const key = await getEncryptionKey();

    // Generate a random 12-byte initialization vector (IV)
    const iv = cryptoInstance.getRandomValues(new Uint8Array(12));
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(stringified);

    const ciphertext = await cryptoInstance.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encodedData,
    );

    // Combine IV and ciphertext: [IV (12 bytes)][Ciphertext (rest)]
    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(ciphertext), iv.length);

    return bufferToBase64(combined);
  } catch (error) {
    console.error("Encryption failed:", error);
    return "";
  }
}

/**
 * Decrypts base64 encoded AES-GCM data.
 * Falls back to legacy RC4 decryption if AES-GCM fails (ensures zero data loss for existing users).
 * @param encrypted Base64 encoded encrypted string.
 * @returns Decrypted object, or null if decryption fails.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function decryptData(encrypted: string): Promise<any> {
  try {
    if (!encrypted) return null;

    const cryptoInstance = getCrypto();
    const key = await getEncryptionKey();
    const combined = base64ToBuffer(encrypted);

    if (combined.length < 12) {
      throw new Error(
        "Invalid encrypted data length for AES-GCM, trying legacy fallback",
      );
    }

    // Extract IV (first 12 bytes) and ciphertext
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);

    const decryptedBuffer = await cryptoInstance.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ciphertext,
    );

    const decoder = new TextDecoder();
    const decryptedString = decoder.decode(decryptedBuffer);

    return JSON.parse(decryptedString);
  } catch (error) {
    // If decryption fails, attempt legacy RC4 decryption
    const legacyData = decryptLegacyData(encrypted);
    if (legacyData) {
      return legacyData;
    }
    console.error(
      "Decryption failed (both AES-GCM and legacy fallback failed):",
      error,
    );
    return null;
  }
}
