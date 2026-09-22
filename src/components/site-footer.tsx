"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { applyPlaceholders } from "@/lib/placeholders";
import { Logo } from "./logo";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="mt-auto border-t border-line bg-mist">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/75">{t("blurb")}</p>
          <p className="mt-3 text-sm font-semibold text-sea">{t("emergency")}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
          <Link href="/for-clients" className="hover:text-sea">{nav("clients")}</Link>
          <Link href="/for-pros" className="hover:text-sea">{nav("pros")}</Link>
          <Link href="/about" className="hover:text-sea">{nav("about")}</Link>
          <Link href="/contact" className="hover:text-sea">{nav("contact")}</Link>
          <Link href="/dispatch" className="hover:text-sea">{nav("dispatch")}</Link>
          <Link href="/login" className="hover:text-sea">{nav("login")}</Link>
          <Link href="/privacy" className="hover:text-sea">{nav("privacy")}</Link>
          <Link href="/terms" className="hover:text-sea">{nav("terms")}</Link>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs leading-relaxed text-ink/70 md:flex-row md:items-center md:justify-between">
          <p>{t("rights")}</p>
          <p>{applyPlaceholders(t("draft"))}</p>
        </div>
      </div>
    </footer>
  );
}
