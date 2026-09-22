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
  { href: "/contact", key: "contact" },
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
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" aria-label={t("home")} onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label={t("primary")}>
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-semibold ${
                  active ? "bg-mist text-ink" : "text-ink/75 hover:bg-mist hover:text-ink"
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          {session && person ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href={appHref} className={btnPrimary + " !px-4 !py-2.5 !text-base"}>
                {t("openApp")}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-full px-3 py-2 text-sm font-semibold text-ink/70 hover:bg-mist"
              >
                {t("logout")}
              </button>
              <span className="max-w-28 truncate text-sm font-semibold">
                {loc(locale, person.name)}
              </span>
            </div>
          ) : (
            <Link href="/login" className={btnPrimary + " hidden !px-4 !py-2.5 !text-base sm:inline-flex"}>
              {t("login")}
            </Link>
          )}
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-label={open ? t("close") : t("menu")}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? t("close") : t("menu")}</span>
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
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
        <nav className="border-t border-line bg-paper px-4 py-3 lg:hidden" aria-label={t("primary")}>
          <ul className="grid gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-2xl px-3 py-3 text-base font-semibold hover:bg-mist"
                  onClick={() => setOpen(false)}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/dispatch"
                className="block rounded-2xl px-3 py-3 text-base font-semibold hover:bg-mist"
                onClick={() => setOpen(false)}
              >
                {t("dispatch")}
              </Link>
            </li>
            <li className="pt-2">
              {session ? (
                <div className="flex gap-2">
                  <Link href={appHref} className={btnPrimary + " flex-1"} onClick={() => setOpen(false)}>
                    {t("openApp")}
                  </Link>
                  <button type="button" className="rounded-full border border-line px-4 font-semibold" onClick={logout}>
                    {t("logout")}
                  </button>
                </div>
              ) : (
                <Link href="/login" className={btnPrimary + " w-full"} onClick={() => setOpen(false)}>
                  {t("login")}
                </Link>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
