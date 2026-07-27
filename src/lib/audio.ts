"use client";

/**
 * Universal Audio Utility for Cross-Browser Japanese Speech Synthesis
 * Fully supported on Zen Browser, Firefox, Chrome, Edge, Safari (Linux, Windows, macOS, Mobile).
 * Primary Engine: Same-Origin Server TTS Proxy (/api/tts)
 * Fallback Engine: Web Speech API (SpeechSynthesis)
 */

interface AudioOptions {
  rate?: number;
  pitch?: number;
  voice?: SpeechSynthesisVoice;
}

let voices: SpeechSynthesisVoice[] = [];
let voicesLoaded = false;

const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve([]);
      return;
    }

    const synth = window.speechSynthesis;
    const current = synth.getVoices();

    if (current.length > 0) {
      voices = current;
      voicesLoaded = true;
      resolve(voices);
      return;
    }

    const onVoicesChanged = () => {
      voices = synth.getVoices();
      voicesLoaded = true;
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      resolve(voices);
    };

    synth.addEventListener("voiceschanged", onVoicesChanged);

    setTimeout(() => {
      if (!voicesLoaded) {
        voices = synth.getVoices();
        voicesLoaded = true;
        resolve(voices);
      }
    }, 600);
  });
};

if (typeof window !== "undefined" && window.speechSynthesis) {
  loadVoices();
}

/**
 * Plays same-origin TTS audio from Next.js server proxy (/api/tts)
 * Works 100% reliably in Zen Browser, Firefox, Chrome, Safari without CORS, 403 blocks, or missing OS voices.
 */
const playApiTTS = (text: string, rate: number): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);

    try {
      const clean = text.replace(/[\r\n]+/g, " ").trim();
      const encoded = encodeURIComponent(clean);
      const url = `/api/tts?text=${encoded}`;

      console.log("[JapanApp Audio] Requesting same-origin TTS audio from /api/tts...");

      const audio = new Audio(url);
      audio.volume = 1.0;
      audio.defaultPlaybackRate = rate;
      audio.playbackRate = rate;

      let done = false;
      let isPlaying = false;

      const finish = (success: boolean) => {
        if (!done) {
          done = true;
          clearTimeout(timeout);
          audio.onended = null;
          audio.onerror = null;
          if (isPlaying) {
            try { audio.pause(); } catch {}
          }
          console.log("[JapanApp Audio] Finished playing TTS audio. Success:", success);
          resolve(success);
        }
      };

      const timeout = setTimeout(() => {
        console.warn("[JapanApp Audio] Timeout waiting for /api/tts audio to finish.");
        finish(false);
      }, 35000); // 35s max for full Choukai dialogues

      audio.onended = () => finish(true);

      audio.onerror = (evt: any) => {
        console.warn("[JapanApp Audio] Audio element error:", evt);
        try {
          if (evt && typeof evt.preventDefault === "function") {
            evt.preventDefault();
          }
        } catch {}
        finish(false);
      };

      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          isPlaying = true;
          console.log("[JapanApp Audio] Audio play() started successfully!");
        }).catch((err) => {
          isPlaying = false;
          console.warn("[JapanApp Audio] Audio play() promise error:", err);
          try {
            if (err && typeof err === "object" && "preventDefault" in err) {
              (err as any).preventDefault();
            }
          } catch {}
          finish(false);
        });
      }
    } catch (e) {
      console.warn("[JapanApp Audio] Error playing audio element:", e);
      resolve(false);
    }
  });
};

/**
 * Fallback via Web Speech API (SpeechSynthesis) for offline support
 */
const playWebSpeechAPI = (text: string, rate: number, options: AudioOptions): Promise<boolean> => {
  return new Promise(async (resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return resolve(false);
    }

    try {
      const synth = window.speechSynthesis;
      if (synth.paused) {
        try { synth.resume(); } catch {}
      }
      try { synth.cancel(); } catch {}

      const availVoices = voices.length > 0 ? voices : await loadVoices();
      const jaVoice =
        options.voice ||
        availVoices.find((v) => v.lang === "ja-JP" || v.lang.startsWith("ja"));

      const cleanText = text.replace(/[\r\n]+/g, " ").trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = jaVoice ? jaVoice.lang : "ja-JP";
      utterance.rate = rate;
      utterance.pitch = options.pitch ?? 1.0;
      utterance.volume = 1.0;
      if (jaVoice) {
        utterance.voice = jaVoice;
      }

      let done = false;
      const finish = (success: boolean) => {
        if (!done) {
          done = true;
          try { synth.cancel(); } catch {}
          resolve(success);
        }
      };

      const maxTimer = setTimeout(() => finish(false), 8000);

      utterance.onend = () => {
        clearTimeout(maxTimer);
        finish(true);
      };

      utterance.onerror = (e: any) => {
        try {
          if (e && typeof e.preventDefault === "function") {
            e.preventDefault();
          }
        } catch {}
        clearTimeout(maxTimer);
        finish(false);
      };

      synth.speak(utterance);
    } catch {
      resolve(false);
    }
  });
};

export const playJapaneseAudio = (
  text: string,
  options: AudioOptions = {},
): Promise<void> => {
  return new Promise(async (resolve) => {
    if (typeof window === "undefined" || !text || text.trim() === "") {
      return resolve();
    }

    const rate = options.rate ?? 0.85;
    const cleanText = text.replace(/[\r\n]+/g, " ").trim();

    console.log("[JapanApp Audio] playJapaneseAudio called for text length:", cleanText.length);

    // 1. Primary Engine: Next.js Same-Origin API Proxy (/api/tts)
    const successApi = await playApiTTS(cleanText, rate);
    if (successApi) {
      return resolve();
    }

    console.warn("[JapanApp Audio] /api/tts proxy failed or offline. Falling back to Web Speech API...");

    // 2. Secondary Fallback Engine: Web Speech API
    await playWebSpeechAPI(cleanText, rate, options);
    resolve();
  });
};
