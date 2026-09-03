"use client";

/**
 * Universal Audio Utility for Cross-Browser Japanese Speech Synthesis
 * Fully supported on Zen Browser, Firefox, Chrome, Edge, Safari (Linux, Windows, macOS, Mobile).
 * Primary Engine: Same-Origin Server TTS Proxy (/api/tts) with Client & Server Blob Caching
 * Fallback Engine: Web Speech API (SpeechSynthesis)
 */

export interface AudioOptions {
  rate?: number;
  pitch?: number;
  voice?: SpeechSynthesisVoice;
  onStart?: () => void;
  onEnd?: () => void;
}

let voices: SpeechSynthesisVoice[] = [];
let voicesLoaded = false;
let activeAudioElement: HTMLAudioElement | null = null;

// Client-side Blob URL Cache for 0ms instant replay
const clientAudioCache = new Map<string, string>();

/**
 * Hard-stop all currently active Japanese speech audio (HTML5 Audio and Web Speech API).
 * Prevents overlapping double-audio bugs across browsers.
 */
export function stopAllAudio(): void {
  if (typeof window !== "undefined") {
    // 1. Stop and tear down active HTML5 Audio Element
    if (activeAudioElement) {
      try {
        activeAudioElement.pause();
        activeAudioElement.currentTime = 0;
        activeAudioElement.removeAttribute("src");
        activeAudioElement.load();
      } catch {}
      activeAudioElement = null;
    }

    // 2. Stop Browser Web Speech API
    if (window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }
}

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
 * Safely pause and unload an HTML5 Audio element without throwing uncaught Chrome AbortErrors.
 */
const safePauseAudio = (
  audio: HTMLAudioElement,
  playPromise?: Promise<void> | null,
) => {
  const doPause = () => {
    try {
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute("src");
      audio.load();
    } catch {}
  };

  if (playPromise) {
    playPromise.then(doPause).catch(() => {
      doPause();
    });
  } else {
    doPause();
  }
};

/**
 * Plays same-origin TTS audio from Next.js server proxy (/api/tts)
 */
const playApiTTS = (text: string, rate: number): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);

    try {
      const clean = text.replace(/[\r\n]+/g, " ").trim();
      let audioUrl = clientAudioCache.get(clean);

      if (!audioUrl) {
        const encoded = encodeURIComponent(clean);
        audioUrl = `/api/tts?text=${encoded}`;

        // Cache short audio blobs in client memory for instant replay
        if (clean.length <= 60) {
          fetch(audioUrl)
            .then((r) => (r.ok ? r.blob() : null))
            .then((blob) => {
              if (blob) {
                const bUrl = URL.createObjectURL(blob);
                clientAudioCache.set(clean, bUrl);
              }
            })
            .catch(() => {});
        }
      }

      const audio = new Audio(audioUrl);
      activeAudioElement = audio;
      audio.volume = 1.0;
      audio.defaultPlaybackRate = rate;
      audio.playbackRate = rate;

      let done = false;
      let playPromise: Promise<void> | null = null;

      const finish = (success: boolean) => {
        if (!done) {
          done = true;
          clearTimeout(timeout);
          audio.onended = null;
          audio.onerror = null;

          if (activeAudioElement === audio) {
            activeAudioElement = null;
          }

          safePauseAudio(audio, playPromise);
          resolve(success);
        }
      };

      const timeout = setTimeout(() => {
        finish(false);
      }, 15000);

      audio.onended = () => finish(true);
      audio.onerror = (evt: any) => {
        finish(false);
      };

      playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err: any) => {
          if (
            err &&
            (err.name === "AbortError" ||
              (typeof err.message === "string" &&
                err.message.includes("interrupted")))
          ) {
            return;
          }
          finish(false);
        });
      }
    } catch (e) {
      resolve(false);
    }
  });
};

/**
 * Clean & sanitize Japanese audio script text before passing to SpeechSynthesis.
 */
export function sanitizeScriptForTTS(text: string): string {
  if (!text) return "";

  return text
    .replace(/[（\(]\s*[_…\.　]+\s*[）\)]。?/g, "")
    .replace(
      /(?:^|\n)\s*(?:男|女|店員|学生|A|B)(?:の人|の人たち)?\s*[:：]/g,
      "\n",
    )
    .replace(/[\r\n]+/g, " 。 ")
    .replace(/。\s*。/g, "。")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Fallback via Web Speech API (SpeechSynthesis) for offline support
 */
const playWebSpeechAPI = (
  text: string,
  rate: number,
  options: AudioOptions,
): Promise<boolean> => {
  return new Promise(async (resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return resolve(false);
    }

    try {
      const synth = window.speechSynthesis;
      if (synth.paused) {
        try {
          synth.resume();
        } catch {}
      }
      try {
        synth.cancel();
      } catch {}

      const availVoices = voices.length > 0 ? voices : await loadVoices();
      const jaVoice =
        options.voice ||
        availVoices.find((v) => v.lang === "ja-JP" || v.lang.startsWith("ja"));

      const cleanText = sanitizeScriptForTTS(text);
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
          try {
            synth.cancel();
          } catch {}
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
      options.onEnd?.();
      return resolve();
    }

    stopAllAudio();
    options.onStart?.();

    const rate = options.rate ?? 0.85;
    const cleanText = sanitizeScriptForTTS(text);

    // 1. Primary Engine: Next.js Same-Origin API Proxy (/api/tts)
    const successApi = await playApiTTS(cleanText, rate);
    if (successApi) {
      options.onEnd?.();
      return resolve();
    }

    // 2. Secondary Fallback Engine: Web Speech API
    await playWebSpeechAPI(cleanText, rate, options);
    options.onEnd?.();
    resolve();
  });
};

export const speakJapanese = playJapaneseAudio;
