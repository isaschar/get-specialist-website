"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { applyPlaceholders } from "@/lib/placeholders";
import { Logo } from "./logo";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const columns = [
    {
      title: t("product"),
      links: [
        { href: "/for-clients", label: nav("clients") },
        { href: "/for-pros", label: nav("pros") },
        { href: "/#categories", label: t("categories") },
        { href: "/dispatch", label: nav("dispatch") },
      ],
    },
    {
      title: t("company"),
      links: [
        { href: "/about", label: nav("about") },
        { href: "/contact", label: nav("contact") },
        { href: "/login", label: nav("login") },
      ],
    },
    {
      title: t("legal"),
      links: [
        { href: "/privacy", label: nav("privacy") },
        { href: "/terms", label: nav("terms") },
      ],
    },
    {
      title: t("cities"),
      links: [
        { href: "/client/jobs/new?city=tel_aviv", label: t("telAviv") },
        { href: "/client/jobs/new?city=jerusalem", label: t("jerusalem") },
        { href: "/client/jobs/new?city=haifa", label: t("haifa") },
      ],
    },
  ];

  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto grid max-w-[1120px] gap-12 px-4 py-16 md:grid-cols-[1.1fr_2.2fr] md:px-6 md:py-20">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/70">{t("blurb")}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[15px] font-bold text-ink">{column.title}</h2>
              <ul className="mt-5 grid gap-3.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink/60 hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-3 px-4 py-5 text-xs leading-relaxed text-ink/60 md:px-6">
          <p className="font-semibold text-ink/80">{t("emergency")}</p>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>{t("rights")}</p>
            <p className="max-w-xl">{applyPlaceholders(t("draft"))}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
