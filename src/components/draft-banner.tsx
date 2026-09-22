"use client";

import { useLocale, useTranslations } from "next-intl";

export function DraftBanner() {
  const t = useTranslations("legal");
  const locale = useLocale();
  return (
    <div className="rounded-2xl border border-[#E2C27A] bg-[#FFF8E8] p-4 text-sm leading-relaxed text-[#5C3B00]">
      <p className="font-extrabold">{t("bannerEn")}</p>
      {locale === "he" && <p className="mt-1 font-extrabold">{t("bannerHe")}</p>}
      <p className="mt-2">{t("note")}</p>
    </div>
  );
}
