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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper p-4 shadow-[0_-8px_30px_rgba(20,20,20,0.08)]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-ink">{t("body")}</p>
        <button type="button" className={btnPrimary + " shrink-0"} onClick={acceptEssential}>
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
