import type { Localized } from "./types";

export function loc(locale: string, text: Localized): string {
  return locale === "he" ? text.he : text.en;
}

export function otherLocale(locale: string): "en" | "he" {
  return locale === "he" ? "en" : "he";
}
