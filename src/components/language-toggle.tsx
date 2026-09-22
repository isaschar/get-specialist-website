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
      className={`px-2 py-2 text-[15px] font-semibold text-ink hover:text-accent ${className}`}
      aria-label={t("aria")}
      onClick={() => router.replace(pathname, { locale: next })}
    >
      {t("button")}
    </button>
  );
}
