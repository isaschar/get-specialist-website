"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { LanguageToggle } from "./language-toggle";
import { Logo } from "./logo";
import { useDemo } from "./demo-provider";
import { personById } from "@/lib/people";
import { loc } from "@/lib/locale-text";
import { CITIES } from "@/lib/taxonomy";
import { btnPrimary } from "@/lib/ui";
import type { CityId } from "@/lib/types";

const links = [
  { href: "/for-clients", key: "clients" },
  { href: "/for-pros", key: "pros" },
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
    <header className="sticky top-0 z-40 bg-paper">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 px-4 md:h-[70px] md:px-6">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          <Link href="/" aria-label={t("home")} onClick={() => setOpen(false)}>
            <Logo compact />
          </Link>
          <HeaderCity />
        </div>
        <div className="flex items-center gap-1 sm:gap-3">
          <nav className="hidden items-center gap-6 lg:flex" aria-label={t("primary")}>
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-[15px] font-medium ${active ? "text-ink" : "text-ink/80 hover:text-ink"}`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>
          {session && person ? (
            <div className="hidden items-center gap-4 lg:flex">
              <span className="max-w-28 truncate text-sm font-semibold">{loc(locale, person.name)}</span>
              <button type="button" onClick={logout} className="text-[15px] font-medium text-ink hover:text-accent">
                {t("logout")}
              </button>
              <Link href={appHref} className={btnPrimary + " !px-4 !py-2"}>
                {t("openApp")}
              </Link>
            </div>
          ) : (
            <div className="hidden items-center gap-5 lg:flex">
              <Link href="/login" className="text-[15px] font-medium text-ink hover:text-accent">
                {t("login")}
              </Link>
              <Link href="/client/jobs/new" className={btnPrimary + " !px-4 !py-2"}>
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
                <Link href={link.href} className="block py-3 text-lg font-semibold" onClick={() => setOpen(false)}>
                  {t(link.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/about" className="block py-3 text-lg font-semibold" onClick={() => setOpen(false)}>
                {t("about")}
              </Link>
            </li>
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

function HeaderCity() {
  const locale = useLocale();
  const router = useRouter();
  const label = useTranslations("home")("cityLabel");
  const [city, setCity] = useState<CityId>("tel_aviv");

  return (
    <label className="hidden items-center gap-1.5 rounded-full bg-mist py-1.5 ps-2.5 pe-3 text-sm font-semibold text-ink md:inline-flex">
      <svg viewBox="0 0 24 24" className="size-4 text-accent" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2.5a6.5 6.5 0 0 0-6.5 6.5c0 4.7 6.5 12.5 6.5 12.5s6.5-7.8 6.5-12.5A6.5 6.5 0 0 0 12 2.5Zm0 8.8a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6Z"
        />
      </svg>
      <span className="sr-only">{label}</span>
      <select
        value={city}
        onChange={(event) => {
          const next = event.target.value as CityId;
          setCity(next);
          router.push(`/client/jobs/new?city=${next}`);
        }}
        className="max-w-36 cursor-pointer appearance-none bg-transparent text-sm font-semibold outline-none"
      >
        {CITIES.map((item) => (
          <option key={item.id} value={item.id}>
            {loc(locale, item.name)}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 20 20" className="size-3.5 text-ink/50" aria-hidden="true">
        <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </label>
  );
}
