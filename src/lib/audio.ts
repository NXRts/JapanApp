"use client";

/**
 * Universal Audio Utility for Cross-Browser Japanese Speech Synthesis
 *
 * Priority chain:
 * 1. High-quality SpeechSynthesis voice (Google/Premium/Apple) — Chrome, macOS, Windows
 * 2. Google Translate TTS (gTTS) fallback — Linux Firefox/Zen with only espeak-ng
 * 3. espeak-ng SpeechSynthesis — last resort (poor quality but still works)
 *
 * Firefox Fix Notes:
 * - Firefox loads voices asynchronously; getVoices() returns [] on first call.
 * - We must wait for onvoiceschanged before voices are available.
 * - Firefox also has a known bug where speechSynthesis can "hang" after cancel().
 *   We work around this by using a small setTimeout after cancel().
 */

interface AudioOptions {
  rate?: number;
  pitch?: number;
  voice?: SpeechSynthesisVoice;
}

let voices: SpeechSynthesisVoice[] = [];
let voicesReady = false;

/**
 * Returns a Promise that resolves with the list of available voices.
 * Handles the Firefox async voice loading pattern.
 */
const getVoicesAsync = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve([]);
      return;
    }

    const synth = window.speechSynthesis;
    const currentVoices = synth.getVoices();

    // Chrome/Edge: voices available synchronously
    if (currentVoices.length > 0) {
      voices = currentVoices;
      voicesReady = true;
      resolve(voices);
      return;
    }

    // Firefox: voices loaded asynchronously, wait for onvoiceschanged
    if (voicesReady) {
      resolve(voices);
      return;
    }

    const handleVoicesChanged = () => {
      voices = synth.getVoices();
      voicesReady = true;
      synth.removeEventListener("voiceschanged", handleVoicesChanged);
      resolve(voices);
    };

    synth.addEventListener("voiceschanged", handleVoicesChanged);

    // Timeout fallback if voiceschanged never fires
    setTimeout(() => {
      if (!voicesReady) {
        voicesReady = true;
        voices = synth.getVoices();
        synth.removeEventListener("voiceschanged", handleVoicesChanged);
        resolve(voices);
      }
    }, 1500);
  });
};

// Pre-warm voice loading on module init (non-blocking)
if (typeof window !== "undefined" && window.speechSynthesis) {
  getVoicesAsync().then((v) => {
    voices = v;
  });
}

/**
 * Checks whether a voice is high-quality (Google, Apple, Microsoft, Premium).
 * espeak-ng voices are considered low-quality for Japanese.
 */
const isHighQualityVoice = (v: SpeechSynthesisVoice): boolean => {
  const name = v.name.toLowerCase();
  return (
    name.includes("google") ||
    name.includes("premium") ||
    name.includes("enhanced") ||
    name.includes("microsoft") ||
    name.includes("apple") ||
    name.includes("siri") ||
    // macOS built-in high-quality Japanese voices
    name.includes("kyoko") ||
    name.includes("otoya")
  );
};

/**
 * Detects low-quality/espeak voices that should be skipped in favor of Google TTS.
 * espeak-ng on Linux/Firefox/Zen exposes voices as:
 *   "Japanese", "Japanese+Max", "Japanese+male6", etc. with lang:"ja"
 * These are NOT natural-sounding and should always be bypassed.
 */
const isLowQualityVoice = (v: SpeechSynthesisVoice): boolean => {
  const name = v.name.toLowerCase();
  return (
    name.includes("espeak") ||
    // espeak-ng naming pattern: "Japanese", "Japanese+Max", "Japanese+female2", etc.
    // These are all espeak variants — none of them sound natural for Japanese learning
    (name.startsWith("japanese") && !v.name.includes("Google") && !v.name.includes("Microsoft"))
  );
};

/**
 * Plays Japanese text using Google Translate TTS (gTTS).
 * Uses referrerPolicy: "no-referrer" to prevent Google from blocking localhost.
 * Returns a Promise that resolves to true if successful, false otherwise.
 */
const playWithGoogleTTS = (text: string, rate: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const encoded = encodeURIComponent(text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=ja&client=tw-ob`;

    const audio = new Audio();
    (audio as any).referrerPolicy = "no-referrer";
    audio.src = url;
    audio.volume = 1.0;

    // Set playback speed
    audio.defaultPlaybackRate = rate;
    audio.playbackRate = rate;

    audio.onended = () => resolve(true);
    audio.onerror = (e) => {
      console.warn("Google TTS fallback failed:", e);
      resolve(false);
    };

    audio.play()
      .then(() => {
        // Playing successfully
      })
      .catch((err) => {
        console.warn("Google TTS play failed:", err);
        resolve(false);
      });
  });
};

/**
 * Plays Japanese text using Youdao TTS API as an alternative fallback.
 * Highly reliable for Japanese audio in browser environments.
 * Returns a Promise that resolves to true if successful, false otherwise.
 */
const playWithYoudaoTTS = (text: string, rate: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const encoded = encodeURIComponent(text);
    const url = `https://dict.youdao.com/dictvoice?le=jap&audio=${encoded}`;

    const audio = new Audio();
    (audio as any).referrerPolicy = "no-referrer";
    audio.src = url;
    audio.volume = 1.0;

    // Set playback speed
    audio.defaultPlaybackRate = rate;
    audio.playbackRate = rate;

    audio.onended = () => resolve(true);
    audio.onerror = (e) => {
      console.warn("Youdao TTS fallback failed:", e);
      resolve(false);
    };

    audio.play()
      .then(() => {
        // Playing successfully
      })
      .catch((err) => {
        console.warn("Youdao TTS play failed:", err);
        resolve(false);
      });
  });
};

export const playJapaneseAudio = (
  text: string,
  options: AudioOptions = {},
): Promise<void> => {
  return new Promise(async (resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      console.warn("Speech synthesis not supported");
      return resolve();
    }

    const synth = window.speechSynthesis;
    const rate = options.rate ?? 0.85;

    // Ensure voices are loaded (critical for Firefox)
    const availableVoices = voices.length > 0 ? voices : await getVoicesAsync();

    // Find the best available Japanese voice
    const highQualityVoice =
      options.voice ||
      availableVoices.find((v) => v.lang === "ja-JP" && isHighQualityVoice(v)) ||
      availableVoices.find((v) => v.lang.startsWith("ja") && isHighQualityVoice(v));

    const anyJapaneseVoice =
      highQualityVoice ||
      availableVoices.find((v) => v.lang === "ja-JP") ||
      availableVoices.find((v) => v.lang.startsWith("ja"));

    // If only espeak/low-quality voice is available (Linux/Firefox/Zen), use external TTS
    const allJapaneseVoices = availableVoices.filter(
      (v) => v.lang === "ja-JP" || v.lang.startsWith("ja"),
    );
    const hasOnlyLowQuality =
      allJapaneseVoices.length > 0 &&
      !highQualityVoice &&
      allJapaneseVoices.every((v) => isLowQualityVoice(v));

    const noJapaneseVoice = allJapaneseVoices.length === 0;

    if (hasOnlyLowQuality || noJapaneseVoice) {
      console.log("Only low-quality voice or no voice found. Trying Google TTS fallback...");
      const successGoogle = await playWithGoogleTTS(text, rate);
      if (successGoogle) {
        return resolve();
      }

      console.log("Google TTS failed. Trying Youdao TTS fallback...");
      const successYoudao = await playWithYoudaoTTS(text, rate);
      if (successYoudao) {
        return resolve();
      }

      // If both external options fail, fallback to local SpeechSynthesis (even if it's espeak)
      if (!anyJapaneseVoice) {
        console.warn("No Japanese voice and all external TTS backends failed.");
        return resolve();
      }
      console.warn("External TTS backends failed. Falling back to local SpeechSynthesis.");
    }

    // Use SpeechSynthesis
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = anyJapaneseVoice ? anyJapaneseVoice.lang : "ja-JP";
    utterance.rate = rate;
    utterance.pitch = options.pitch ?? 1.0;
    if (anyJapaneseVoice) {
      utterance.voice = anyJapaneseVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = async (e) => {
      if (e.error !== "interrupted") {
        console.warn("SpeechSynthesis error:", e.error, "— trying external fallbacks...");
        const successGoogle = await playWithGoogleTTS(text, rate);
        if (!successGoogle) {
          await playWithYoudaoTTS(text, rate);
        }
      }
      resolve();
    };

    // Firefox workaround: delay speak() by one tick after cancel()
    setTimeout(() => {
      synth.speak(utterance);
    }, 50);
  });
};
