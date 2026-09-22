"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { Role } from "@/lib/types";
import { useDemo } from "./demo-provider";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { btnPrimary } from "@/lib/ui";

export function AppShell({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const t = useTranslations("app");
  const pathname = usePathname();
  const router = useRouter();
  const { ready, state } = useDemo();
  const session = state.session;

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [ready, session, pathname, router]);

  const links =
    role === "client"
      ? [
          { href: "/client/jobs/new", label: t("newRequest") },
          { href: "/client/jobs", label: t("myJobs") },
        ]
      : [
          { href: "/pro/jobs", label: t("available") },
          { href: "/pro/assignments", label: t("assignments") },
          { href: "/pro/profile", label: t("profile") },
        ];

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <div className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-[1120px] items-center gap-6 overflow-x-auto px-4 md:px-6">
          <span className="shrink-0 py-3 text-xs font-semibold uppercase tracking-wide text-ink/45">
            {t("demo")}
          </span>
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 border-b-2 py-3 text-sm font-semibold ${
                  active ? "border-accent text-ink" : "border-transparent text-ink/60 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        {!ready && <div className="h-40 animate-pulse rounded-3xl bg-mist" />}
        {ready && !session && (
          <p className="text-sm text-ink/70">{t("redirecting")}</p>
        )}
        {ready && session && session.role !== role && (
          <section className="rounded-3xl border border-line bg-mist p-6">
            <h1 className="text-2xl font-extrabold">{t("wrongRoleTitle")}</h1>
            <p className="mt-2 max-w-xl text-ink/75">{t("wrongRoleBody")}</p>
            <Link href="/login" className={btnPrimary + " mt-5"}>
              {t("switchProfile")}
            </Link>
          </section>
        )}
        {ready && session && session.role === role && children}
      </main>
      <SiteFooter />
    </div>
  );
}
