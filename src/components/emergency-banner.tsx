"use client";

import { useTranslations } from "next-intl";

export function EmergencyBanner({ strong = false }: { strong?: boolean }) {
  const t = useTranslations("emergency");
  return (
    <aside
      className={
        strong
          ? "rounded-2xl border border-accent bg-[#E6F7FD] p-4"
          : "rounded-2xl border border-line bg-mist p-4"
      }
    >
      <p className="font-bold text-ink">{t("title")}</p>
      <p className="mt-1 text-sm leading-relaxed text-ink/80">{t("body")}</p>
    </aside>
  );
}
