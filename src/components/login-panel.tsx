"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { loc } from "@/lib/locale-text";
import { peopleByRole } from "@/lib/people";
import { categoryById, cityById } from "@/lib/taxonomy";
import { cardClass } from "@/lib/ui";
import { useDemo } from "./demo-provider";

export function LoginPanel() {
  const t = useTranslations("login");
  const locale = useLocale();
  const router = useRouter();
  const params = useSearchParams();
  const { login, reset } = useDemo();
  const [confirmReset, setConfirmReset] = useState(false);

  function enter(role: "client" | "pro", userId: string) {
    login(role, userId);
    const next = params.get("next");
    const safe = next && next.startsWith("/") && !next.startsWith("//") ? next : null;
    if (safe) {
      router.push(safe);
      return;
    }
    router.push(role === "pro" ? "/pro/jobs" : "/client/jobs");
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10">
      <div className="max-w-2xl">
        <p className="text-sm font-bold text-sea">{t("eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-[-0.035em] md:text-6xl">{t("title")}</h1>
        <p className="mt-3 text-lg leading-relaxed text-ink/75">{t("body")}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <RoleColumn
          title={t("clients")}
          people={peopleByRole("client")}
          onPick={(id) => enter("client", id)}
          locale={locale}
          cta={t("continueClient")}
        />
        <RoleColumn
          title={t("pros")}
          people={peopleByRole("pro")}
          onPick={(id) => enter("pro", id)}
          locale={locale}
          cta={t("continuePro")}
          showMeta
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {confirmReset ? (
          <>
            <p className="text-sm font-semibold">{t("resetConfirm")}</p>
            <button
              type="button"
              className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white"
              onClick={() => {
                reset();
                setConfirmReset(false);
              }}
            >
              {t("resetYes")}
            </button>
            <button type="button" className="text-sm font-bold text-sea" onClick={() => setConfirmReset(false)}>
              {t("resetNo")}
            </button>
          </>
        ) : (
          <button type="button" className="text-sm font-bold text-sea" onClick={() => setConfirmReset(true)}>
            {t("reset")}
          </button>
        )}
      </div>
    </div>
  );
}

function RoleColumn({
  title,
  people,
  onPick,
  locale,
  cta,
  showMeta = false,
}: {
  title: string;
  people: ReturnType<typeof peopleByRole>;
  onPick: (id: string) => void;
  locale: string;
  cta: string;
  showMeta?: boolean;
}) {
  return (
    <section className={cardClass}>
      <h2 className="text-xl font-extrabold">{title}</h2>
      <ul className="mt-4 grid gap-3">
        {people.map((person) => (
          <li key={person.id}>
            <button
              type="button"
              onClick={() => onPick(person.id)}
              className="w-full rounded-2xl border border-line p-4 text-start transition hover:border-accent"
            >
              <span className="block font-extrabold">{loc(locale, person.name)}</span>
              {person.company && (
                <span className="mt-1 block text-sm text-ink/70">{loc(locale, person.company)}</span>
              )}
              {showMeta && (
                <span className="mt-2 block text-sm text-ink/70">
                  {person.categories.map((id) => loc(locale, categoryById(id).name)).join(" · ")}
                  {" · "}
                  {person.cities.map((id) => loc(locale, cityById(id).name)).join(" · ")}
                  {person.rating ? ` · ${person.rating}` : ""}
                </span>
              )}
              <span className="mt-3 inline-flex text-sm font-bold text-sea">{cta}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
