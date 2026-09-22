"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { loc } from "@/lib/locale-text";
import { isClaimable } from "@/lib/jobs";
import { personById } from "@/lib/people";
import { categoryById, cityById } from "@/lib/taxonomy";
import { btnPrimary, btnSecondary, cardClass } from "@/lib/ui";
import { JobCard } from "./job-card";
import { ResetDemoDialog } from "./reset-demo-dialog";
import { useDemo } from "./demo-provider";

const DONE = new Set(["COMPLETED_PRO", "COMPLETED", "RATED"]);

function greetingKey(hour: number) {
  if (hour < 12) return "greetingMorning" as const;
  if (hour < 17) return "greetingAfternoon" as const;
  return "greetingEvening" as const;
}

export function ProHome() {
  const t = useTranslations("proHome");
  const earn = useTranslations("earn");
  const locale = useLocale();
  const { state, setAvailability } = useDemo();
  const pro = personById(state.session?.userId);
  const proId = state.session?.userId ?? "";
  const online = state.availability[proId] !== false;
  const mine = state.jobs.filter((job) => job.proId === proId);
  const nearby = state.jobs.filter(
    (job) => isClaimable(job) && (!pro || pro.cities.includes(job.city)),
  );
  const needs = mine.filter((job) => !DONE.has(job.status) && !job.status.startsWith("CANCELLED"));
  const done = mine.filter((job) => DONE.has(job.status));
  const hour = new Date().getHours();

  return (
    <div className="grid gap-5 pb-24">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t(greetingKey(hour))}
            {pro ? `, ${loc(locale, pro.name)}` : ""}
          </h1>
          <p className="mt-1 text-sm text-ink/70">{earn("demoOnly")}</p>
        </div>
        <button
          type="button"
          className={(online ? btnSecondary : btnPrimary) + " min-h-11"}
          onClick={() => setAvailability(!online)}
          aria-pressed={online}
        >
          {online ? t("available") : t("unavailable")}
        </button>
      </header>

      <ul className="grid grid-cols-3 gap-2">
        <Metric label={t("openNear")} value={nearby.length} />
        <Metric label={t("needsAction")} value={needs.length} />
        <Metric label={t("doneDemo")} value={done.length} />
      </ul>

      <section className="grid gap-2">
        <h2 className="text-lg font-bold">{t("inbox")}</h2>
        {needs.length === 0 ? (
          <p className={cardClass + " text-sm text-ink/70"}>{t("inboxEmpty")}</p>
        ) : (
          <ul className="grid gap-2">
            {needs.map((job) => (
              <li key={job.id}>
                <JobCard job={job} href={`/pro/jobs/${job.id}`} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="grid gap-2">
        <h2 className="text-lg font-bold">{t("nearby")}</h2>
        {!online && <p className="rounded-2xl bg-mist px-4 py-3 text-sm font-semibold text-ink">{t("unavailable")}</p>}
        {nearby.length === 0 ? (
          <p className={cardClass + " text-sm text-ink/70"}>{t("nearbyEmpty")}</p>
        ) : (
          <ul className="grid gap-2">
            {nearby.map((job) => (
              <li key={job.id} className="grid gap-2">
                <JobCard job={job} href={`/pro/jobs/${job.id}?offer=1`} />
                <Link href={`/pro/jobs/${job.id}?offer=1`} className={btnPrimary + " min-h-11"}>
                  {t("review")}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export function AvailableJobs() {
  const t = useTranslations("app");
  const home = useTranslations("proHome");
  const locale = useLocale();
  const { state, setAvailability } = useDemo();
  const pro = personById(state.session?.userId);
  const online = state.availability[state.session?.userId ?? ""] !== false;
  const [tab, setTab] = useState<"open" | "nearby">("open");
  const openJobs = state.jobs.filter(isClaimable);
  const jobs =
    tab === "nearby"
      ? openJobs.filter((job) => !pro || pro.cities.includes(job.city))
      : openJobs;

  return (
    <div className="grid gap-4 pb-24">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("available")}</h1>
          <p className="mt-1 text-sm text-ink/70">{t("availableLead")}</p>
        </div>
        <button
          type="button"
          className={(online ? btnSecondary : btnPrimary) + " min-h-11"}
          onClick={() => setAvailability(!online)}
          aria-pressed={online}
        >
          {online ? t("goOffline") : t("goOnline")}
        </button>
      </header>
      <div className="flex gap-2" role="tablist">
        <TabButton active={tab === "open"} onClick={() => setTab("open")}>
          {home("open")}
        </TabButton>
        <TabButton active={tab === "nearby"} onClick={() => setTab("nearby")}>
          {home("nearbyTab")}
        </TabButton>
      </div>
      {!online && <p className="rounded-2xl bg-mist px-4 py-3 text-sm font-semibold text-ink">{t("offline")}</p>}
      {jobs.length === 0 ? (
        <p className={cardClass + " text-sm text-ink/70"}>
          {tab === "nearby" ? home("nearbyEmpty") : t("noAvailable")}
        </p>
      ) : (
        <ul className="grid gap-3">
          {jobs.map((job) => {
            const matches = pro?.categories.includes(job.category);
            return (
              <li key={job.id} className="grid gap-2">
                <JobCard job={job} href={`/pro/jobs/${job.id}?offer=1`} />
                <p className="px-1 text-xs font-semibold text-ink/55">
                  {matches ? t("categoryMatch") : t("categoryOutside")}
                  {" · "}
                  {loc(locale, cityById(job.city).name)}
                  {" · "}
                  {loc(locale, categoryById(job.category).name)}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function Assignments() {
  const t = useTranslations("app");
  const home = useTranslations("proHome");
  const { state } = useDemo();
  const [tab, setTab] = useState<"active" | "done">("active");
  const mine = state.jobs.filter((job) => job.proId === state.session?.userId);
  const jobs = mine.filter((job) => (tab === "done" ? DONE.has(job.status) : !DONE.has(job.status) && !job.status.startsWith("CANCELLED")));

  return (
    <div className="grid gap-4 pb-24">
      <h1 className="text-2xl font-bold tracking-tight">{t("assignments")}</h1>
      <div className="flex gap-2" role="tablist">
        <TabButton active={tab === "active"} onClick={() => setTab("active")}>
          {home("active")}
        </TabButton>
        <TabButton active={tab === "done"} onClick={() => setTab("done")}>
          {home("done")}
        </TabButton>
      </div>
      {jobs.length === 0 ? (
        <p className={cardClass + " text-sm text-ink/70"}>{t("noAssignments")}</p>
      ) : (
        <ul className="grid gap-3">
          {jobs.map((job) => (
            <li key={job.id}>
              <JobCard job={job} href={`/pro/jobs/${job.id}`} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ProEarnings() {
  const t = useTranslations("proHome");
  const earn = useTranslations("earn");
  const { state } = useDemo();
  const count = state.jobs.filter(
    (job) => job.proId === state.session?.userId && DONE.has(job.status),
  ).length;

  return (
    <div className="grid max-w-xl gap-4 pb-24">
      <h1 className="text-2xl font-bold tracking-tight">{t("earningsTitle")}</h1>
      <p className="text-sm font-semibold text-ink">{earn("demoOnly")}</p>
      <section className={cardClass}>
        <p className="text-sm leading-relaxed text-ink/75">{t("earningsBody")}</p>
        <p className="mt-3 text-sm font-semibold">{t("earningsCount", { count })}</p>
      </section>
    </div>
  );
}

export function ProProfile() {
  const t = useTranslations("app");
  const home = useTranslations("proHome");
  const pricing = useTranslations("pricingPage");
  const locale = useLocale();
  const { state, setAvailability } = useDemo();
  const [resetOpen, setResetOpen] = useState(false);
  const person = personById(state.session?.userId);
  if (!person) return null;
  const online = state.availability[person.id] !== false;

  return (
    <div className="grid max-w-2xl gap-4 pb-24">
      <section className={cardClass}>
        <p className="text-sm font-bold text-ink/50">{t("profileStub")}</p>
        <h1 className="mt-2 text-2xl font-bold">{loc(locale, person.name)}</h1>
        {person.company && <p className="mt-1 text-sm text-ink/70">{loc(locale, person.company)}</p>}
        <p className="mt-3 text-sm leading-relaxed text-ink/75">{t("independent")}</p>
        <dl className="mt-5 grid gap-3 text-sm">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-ink/45">{t("categories")}</dt>
            <dd className="mt-1 font-semibold">
              {person.categories.map((id) => loc(locale, categoryById(id).name)).join(" · ")}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-ink/45">{t("serviceArea")}</dt>
            <dd className="mt-1 font-semibold">
              {person.cities.map((id) => loc(locale, cityById(id).name)).join(" · ")}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-ink/45">{t("rating")}</dt>
            <dd className="mt-1 font-semibold">
              {person.rating ?? "—"} · {t("completedCount", { count: person.jobsCompleted ?? 0 })}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-ink/45">{t("phone")}</dt>
            <dd className="mt-1 font-semibold" dir="ltr">
              {person.phone}
            </dd>
          </div>
        </dl>
        <p className="mt-4 inline-flex rounded-full bg-mist px-3 py-1 text-xs font-bold text-ink">{t("verifiedBadge")}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink/75">{pricing("escrow")}</p>
      </section>
      <section className={cardClass}>
        <h2 className="font-bold">{t("availability")}</h2>
        <p className="mt-2 text-sm text-ink/75">{online ? t("onlineHelp") : t("offline")}</p>
        <button
          type="button"
          className={(online ? btnSecondary : btnPrimary) + " mt-4 min-h-11"}
          onClick={() => setAvailability(!online)}
        >
          {online ? t("goOffline") : t("goOnline")}
        </button>
      </section>
      <section className={cardClass}>
        <h2 className="font-bold">{home("overflow")}</h2>
        <ul className="mt-3 grid gap-2 text-sm">
          {(["calendar", "notifications", "settings"] as const).map((key) => (
            <li key={key} className="flex min-h-11 items-center justify-between gap-3 rounded-2xl bg-mist px-3">
              <span className="font-semibold">{home(key)}</span>
              <span className="text-ink/60">{home("overflowBody")}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className={cardClass}>
        <h2 className="font-bold">{t("payoutTitle")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">{t("payoutBody")}</p>
        <button type="button" className="mt-4 min-h-11 text-sm font-bold text-ink underline" onClick={() => setResetOpen(true)}>
          {t("reset")}
        </button>
      </section>
      {resetOpen && <ResetDemoDialog onClose={() => setResetOpen(false)} />}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <li className="rounded-2xl bg-mist px-3 py-3">
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs font-semibold text-ink/60">{label}</p>
    </li>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`min-h-11 rounded-full px-4 text-sm font-semibold ${active ? "bg-ink text-white" : "bg-mist text-ink"}`}
    >
      {children}
    </button>
  );
}
