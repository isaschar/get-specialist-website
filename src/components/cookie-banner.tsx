"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { btnPrimary } from "@/lib/ui";

const KEY = "gs.cookie";
const listeners = new Set<() => void>();
let booted = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readOpen() {
  if (!booted || typeof window === "undefined") return false;
  return localStorage.getItem(KEY) !== "essential" || sessionStorage.getItem("gs.cookie.open") === "1";
}

export function openCookieNote() {
  sessionStorage.setItem("gs.cookie.open", "1");
  emit();
}

function acceptEssential() {
  localStorage.setItem(KEY, "essential");
  sessionStorage.removeItem("gs.cookie.open");
  emit();
}

export function CookieBanner() {
  const open = useSyncExternalStore(subscribe, readOpen, () => false);
  const t = useTranslations("cookie");
  useEffect(() => {
    booted = true;
    emit();
  }, []);
  if (!open) return null;

  return (
    <div
      role="region"
      aria-label={t("title")}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper px-4 py-4 shadow-[0_-12px_40px_rgba(20,20,20,0.12)]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-bold text-ink">{t("title")}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink">{t("body")}</p>
        </div>
        <button type="button" className={btnPrimary + " min-h-11 shrink-0"} onClick={acceptEssential}>
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
