"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { applyPlaceholders } from "@/lib/placeholders";
import { openCookieNote } from "./cookie-banner";
import { Logo } from "./logo";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();

  const columns = [
    {
      title: t("partners"),
      links: [
        { href: "/for-clients", label: nav("clients") },
        { href: "/for-pros", label: nav("pros") },
        { href: "/login", label: nav("login") },
      ],
    },
    {
      title: t("company"),
      links: [
        { href: "/about", label: nav("about") },
        { href: "/contact", label: nav("contact") },
        { href: "/dispatch", label: nav("dispatch") },
      ],
    },
    {
      title: t("product"),
      links: [
        { href: "/#categories", label: t("categories") },
        { href: "/client/jobs/new", label: nav("getSpecialist") },
        { href: "/for-pros", label: nav("pros") },
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
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-14 md:grid-cols-[0.8fr_2.2fr] md:px-8 md:py-16">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{t("blurb")}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[15px] font-bold text-white">{column.title}</h2>
              <ul className="mt-4 grid gap-3">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
                {column.title === t("legal") && (
                  <li>
                    <button type="button" className="text-sm text-white/60 hover:text-white" onClick={openCookieNote}>
                      {t("cookies")}
                    </button>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-5 text-xs leading-relaxed text-white/55 md:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm">
              <Link
                href={pathname}
                locale="en"
                hrefLang="en"
                className={locale === "en" ? "font-semibold text-white" : "text-white/55 hover:text-white"}
              >
                EN
              </Link>
              <span aria-hidden="true" className="text-white/30">
                /
              </span>
              <Link
                href={pathname}
                locale="he"
                hrefLang="he"
                className={locale === "he" ? "font-semibold text-white" : "text-white/55 hover:text-white"}
              >
                עברית
              </Link>
            </p>
            <p>{t("rights")}</p>
          </div>
          <p className="font-semibold text-white/80">{t("emergency")}</p>
          <p className="max-w-3xl">{applyPlaceholders(t("draft"))}</p>
        </div>
      </div>
    </footer>
  );
}
