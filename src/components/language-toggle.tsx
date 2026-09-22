"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("lang");
  const next: AppLocale = locale === "he" ? "en" : "he";

  return (
    <button
      type="button"
      className={`rounded-full border border-line bg-paper px-3 py-2 text-sm font-bold text-ink transition hover:border-accent ${className}`}
      aria-label={t("aria")}
      onClick={() => router.replace(pathname, { locale: next })}
    >
      {t("button")}
    </button>
  );
}
