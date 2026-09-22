"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageToggle } from "./language-toggle";
import { Logo } from "./logo";
import { useDemo } from "./demo-provider";
import { personById } from "@/lib/people";
import { loc } from "@/lib/locale-text";
import { btnPrimary } from "@/lib/ui";

const links = [
  { href: "/for-clients", key: "clients" },
  { href: "/for-pros", key: "pros" },
  { href: "/about", key: "about" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const { ready, state, logout } = useDemo();
  const [open, setOpen] = useState(false);
  const session = ready ? state.session : null;
  const person = personById(session?.userId);
  const appHref = session?.role === "pro" ? "/pro/jobs" : "/client/jobs";

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between gap-4 px-4 md:h-[70px] md:px-6">
        <div className="flex min-w-0 items-center gap-8">
          <Link href="/" aria-label={t("home")} onClick={() => setOpen(false)}>
            <Logo compact />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label={t("primary")}>
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-[15px] font-semibold ${active ? "text-ink" : "text-ink/80 hover:text-ink"}`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-1 sm:gap-3">
          <LanguageToggle className="hidden lg:inline-flex" />
          {session && person ? (
            <div className="hidden items-center gap-3 lg:flex">
              <span className="max-w-28 truncate text-sm font-semibold">{loc(locale, person.name)}</span>
              <button type="button" onClick={logout} className="text-[15px] font-semibold text-ink/80 hover:text-ink">
                {t("logout")}
              </button>
              <Link href={appHref} className={btnPrimary + " !px-4 !py-2.5"}>
                {t("openApp")}
              </Link>
            </div>
          ) : (
            <div className="hidden items-center gap-5 lg:flex">
              <Link href="/login" className="text-[15px] font-semibold text-ink hover:text-accent">
                {t("login")}
              </Link>
              <Link href="/client/jobs/new" className={btnPrimary + " !px-4 !py-2.5"}>
                {t("getSpecialist")}
              </Link>
            </div>
          )}
          <button
            type="button"
            className="grid size-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-label={open ? t("close") : t("menu")}
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.8" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line bg-paper px-5 py-4 lg:hidden" aria-label={t("primary")}>
          <ul className="grid gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 text-lg font-semibold"
                  onClick={() => setOpen(false)}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="block py-3 text-lg font-semibold" onClick={() => setOpen(false)}>
                {t("contact")}
              </Link>
            </li>
            <li className="py-2">
              <LanguageToggle />
            </li>
            <li className="pt-2">
              {session ? (
                <div className="grid gap-3">
                  <Link href={appHref} className={btnPrimary} onClick={() => setOpen(false)}>
                    {t("openApp")}
                  </Link>
                  <button type="button" className="py-2 text-start text-[15px] font-semibold" onClick={logout}>
                    {t("logout")}
                  </button>
                </div>
              ) : (
                <div className="grid gap-3">
                  <Link href="/client/jobs/new" className={btnPrimary} onClick={() => setOpen(false)}>
                    {t("getSpecialist")}
                  </Link>
                  <Link href="/login" className="py-2 text-[15px] font-semibold" onClick={() => setOpen(false)}>
                    {t("login")}
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
