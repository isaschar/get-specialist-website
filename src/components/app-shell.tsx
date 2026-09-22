"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { Role } from "@/lib/types";
import { setFlash } from "@/lib/flash";
import { useDemo } from "./demo-provider";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function AppShell({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const t = useTranslations("app");
  const home = useTranslations("proHome");
  const pathname = usePathname();
  const router = useRouter();
  const { ready, state } = useDemo();
  const session = state.session;

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    if (session.role !== role) {
      setFlash("wrongRole");
      router.replace(session.role === "pro" ? "/pro" : "/client/jobs");
    }
  }, [ready, session, pathname, router, role]);

  const clientLinks = [
    { href: "/client/jobs/new", label: t("newRequest") },
    { href: "/client/jobs", label: t("myJobs") },
  ];
  const proTabs = [
    { href: "/pro", label: home("tabsHome") },
    { href: "/pro/jobs", label: home("tabsJobs") },
    { href: "/pro/assignments", label: home("tabsAssignments") },
    { href: "/pro/earnings", label: home("tabsEarnings") },
    { href: "/pro/profile", label: home("tabsProfile") },
  ];

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      {role === "client" && (
        <div className="border-b border-line bg-paper">
          <div className="mx-auto flex max-w-[1120px] items-center gap-6 overflow-x-auto px-4 md:px-6">
            <span className="shrink-0 py-3 text-xs font-semibold uppercase tracking-wide text-ink/45">
              {t("demo")}
            </span>
            {clientLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`shrink-0 border-b-2 py-3 text-sm font-semibold ${
                    active ? "border-ink text-ink" : "border-transparent text-ink/60 hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        {!ready && <div className="h-40 animate-pulse rounded-3xl bg-mist" />}
        {ready && !session && <p className="text-sm text-ink/70">{t("redirecting")}</p>}
        {ready && session && session.role === role && children}
      </main>
      {role === "pro" && ready && session?.role === "pro" && (
        <nav
          className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper"
          aria-label={home("tabsHome")}
        >
          <ul className="mx-auto grid max-w-3xl grid-cols-5">
            {proTabs.map((tab) => {
              const active = pathname === tab.href;
              return (
                <li key={tab.href}>
                  <Link
                    href={tab.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-11 items-center justify-center px-1 text-center text-[11px] font-semibold leading-tight sm:text-xs ${
                      active ? "text-ink" : "text-ink/50"
                    }`}
                  >
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      <SiteFooter />
    </div>
  );
}
