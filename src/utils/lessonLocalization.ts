import { Question, Lesson } from "@/data/lessons/types";
import { LessonLanguage } from "@/context/LessonLanguageContext";

/**
 * Returns the localized question text based on the active language mode.
 * - 'id': Indonesian casual (default)
 * - 'bilingual': Indonesian primary + English translation subtitle
 * - 'en': English pure
 */
export function getQuestionText(q: Question, mode: LessonLanguage = "id"): string {
  const textId = q.questionText || q.questionTextEn || "";
  const textEn = q.questionTextEn || q.questionText || "";

  if (mode === "en") {
    return textEn;
  }
  return textId;
}

/**
 * Returns the localized hint text based on the active language mode.
 */
export function getHintText(q: Question, mode: LessonLanguage = "id"): string | undefined {
  if (!q.hint && !q.hintEn) return undefined;
  const hintId = q.hint || q.hintEn || "";
  const hintEn = q.hintEn || q.hint || "";

  if (mode === "en") {
    return hintEn;
  }
  return hintId;
}

/**
 * Returns the localized lesson title.
 */
export function getLessonTitle(l: Lesson, mode: LessonLanguage = "id"): string {
  const titleId = l.title || l.titleEn || "";
  const titleEn = l.titleEn || l.title || "";

  if (mode === "en") {
    return titleEn;
  }
  return titleId;
}

/**
 * Returns the localized lesson description.
 */
export function getLessonDescription(l: Lesson, mode: LessonLanguage = "id"): string {
  const descId = l.description || l.descriptionEn || "";
  const descEn = l.descriptionEn || l.description || "";

  if (mode === "en") {
    return descEn;
  }
  return descId;
}
