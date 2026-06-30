"use client";

import { useState, useEffect, memo } from "react";
import { toRomaji } from "wanakana";
import {
  Card,
  Inner,
  Face,
  Back,
  ReadingGroup,
  Label,
  Readings,
  ReadingItem,
  AudioButton,
  LanguageContainer,
  LanguageButton,
  Meanings,
  MeaningText,
  ErrorNote,
} from "./KanjiCard.styled";
import { playJapaneseAudio } from "@/lib/audio";
import { KANJI_DATA } from "@/data/kanji";

interface ReadingDetail {
  onyomi: { kana: string; romaji: string }[];
  kunyomi: { kana: string; romaji: string }[];
  meanings: string[];
}

export const KanjiCard = memo(function KanjiCard({ char }: { char: string }) {
  const [flipped, setFlipped] = useState(false);
  const [detail, setDetail] = useState<ReadingDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [lang, setLang] = useState<"en" | "id">("en");

  useEffect(() => {
    if (!flipped || detail || loading) return;

    setLoading(true);
    setFetchError(false);

    // 1. Try to load from the local offline KANJI_DATA database
    let localKanji: any = null;
    for (const level of ["N5", "N4", "N3", "N2", "N1"]) {
      const match = KANJI_DATA[level]?.find((item) => item.char === char);
      if (match) {
        localKanji = match;
        break;
      }
    }

    if (localKanji) {
      const onyomiArray = localKanji.on && localKanji.on !== "-"
        ? localKanji.on.split(/[・、,]/).map((s: string) => s.trim()).filter(Boolean)
        : [];
      const kunyomiArray = localKanji.kun && localKanji.kun !== "-"
        ? localKanji.kun.split(/[・、,]/).map((s: string) => s.trim()).filter(Boolean)
        : [];
      const meanings = localKanji.meaning
        ? localKanji.meaning.split(/\s*[/;,]\s*/).filter(Boolean)
        : [];

      const onyomi = onyomiArray.map((k: string) => ({
        kana: k,
        romaji: toRomaji(k),
      }));
      const kunyomi = kunyomiArray.map((k: string) => ({
        kana: k,
        romaji: toRomaji(k),
      }));

      setDetail({ onyomi, kunyomi, meanings });
      setLoading(false);
      return;
    }

    // 2. Fallback to API if not found locally
    fetch(`https://kanjiapi.dev/v1/kanji/${encodeURIComponent(char)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch kanji details: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        const onyomi = (data.on_readings ?? []).map((k: string) => ({
          kana: k,
          romaji: toRomaji(k),
        }));
        const kunyomi = (data.kun_readings ?? []).map((k: string) => ({
          kana: k,
          romaji: toRomaji(k),
        }));
        const meanings = data.meanings ?? [];

        setDetail({ onyomi, kunyomi, meanings });
        setFetchError(false);
      })
      .catch((error) => {
        console.warn("Error fetching kanji details:", error.message || error);
        setFetchError(true);
      })
      .finally(() => setLoading(false));
  }, [flipped, char, detail]);

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip
    playJapaneseAudio(char);
  };

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <Card
      onClick={() => setFlipped(!flipped)}
      onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
    >
      <Inner $flipped={flipped}>
        <Face>{char}</Face>

        <Back>
          {/* Kanji character title + audio button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <h3>{char}</h3>
            <AudioButton onClick={playAudio} title="Play Pronunciation">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            </AudioButton>
          </div>

          {/* Loading */}
          {loading && (
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.85rem",
                marginTop: "1rem",
              }}
            >
              Loading...
            </p>
          )}

          {/* Network/API error */}
          {!loading && fetchError && (
            <ErrorNote>
              ⚠️ Could not load details.
              <br />
              Check your connection.
            </ErrorNote>
          )}

          {/* Loaded detail */}
          {!loading && detail && (
            <>
              <ReadingGroup>
                <Label>Onyomi</Label>
                <Readings>
                  {detail.onyomi.length > 0 ? (
                    detail.onyomi.map((r, i) => (
                      <ReadingItem key={i}>
                        {r.kana}
                        <span className="romaji">{r.romaji}</span>
                      </ReadingItem>
                    ))
                  ) : (
                    <span>-</span>
                  )}
                </Readings>
              </ReadingGroup>

              <ReadingGroup>
                <Label>Kunyomi</Label>
                <Readings>
                  {detail.kunyomi.length > 0 ? (
                    detail.kunyomi.map((r, i) => (
                      <ReadingItem key={i}>
                        {r.kana}
                        <span className="romaji">{r.romaji}</span>
                      </ReadingItem>
                    ))
                  ) : (
                    <span>-</span>
                  )}
                </Readings>
              </ReadingGroup>

              <Label style={{ marginTop: "10px" }}>Translate</Label>
              <LanguageContainer>
                <LanguageButton
                  $active={lang === "en"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLang("en");
                  }}
                >
                  EN
                </LanguageButton>
                <LanguageButton
                  $active={lang === "id"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLang("id");
                  }}
                >
                  ID
                </LanguageButton>
              </LanguageContainer>

              <Meanings>
                {lang === "en" ? (
                  detail.meanings
                    .slice(0, 3)
                    .map((m, i) => <MeaningText key={i}>{m}</MeaningText>)
                ) : (
                  <>
                    <MeaningText className="id-note">
                      Terjemahan Indonesia (Auto):
                    </MeaningText>
                    {detail.meanings.slice(0, 3).map((m, i) => (
                      <MeaningText key={i}>{m} (Inggris)</MeaningText>
                    ))}
                    <MeaningText
                      className="id-note"
                      style={{ fontSize: "0.7em", marginTop: "8px" }}
                    >
                      *Maaf, API saat ini hanya mendukung Bahasa Inggris.
                    </MeaningText>
                  </>
                )}
              </Meanings>
            </>
          )}
        </Back>
      </Inner>
    </Card>
  );
});
