"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MarketingShell } from "@/components/marketing-shell";
import { btnPrimary } from "@/lib/ui";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <MarketingShell>
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-4xl font-extrabold">{t("title")}</h1>
        <p className="mt-3 text-ink/75">{t("body")}</p>
        <Link href="/" className={btnPrimary + " mt-6"}>
          {t("home")}
        </Link>
      </div>
    </MarketingShell>
  );
}
