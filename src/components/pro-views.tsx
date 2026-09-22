"use client";

import { useLocale, useTranslations } from "next-intl";
import { loc } from "@/lib/locale-text";
import { isClaimable } from "@/lib/jobs";
import { personById } from "@/lib/people";
import { categoryById, cityById } from "@/lib/taxonomy";
import { btnPrimary, btnSecondary, cardClass } from "@/lib/ui";
import { JobCard } from "./job-card";
import { useDemo } from "./demo-provider";

export function AvailableJobs() {
  const t = useTranslations("app");
  const locale = useLocale();
  const { state, setAvailability } = useDemo();
  const pro = personById(state.session?.userId);
  const online = state.availability[state.session?.userId ?? ""] !== false;
  const jobs = state.jobs.filter(isClaimable);

  return (
    <div className="grid gap-4">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">{t("available")}</h1>
          <p className="mt-1 text-ink/70">{t("availableLead")}</p>
        </div>
        <button
          type="button"
          className={online ? btnSecondary : btnPrimary}
          onClick={() => setAvailability(!online)}
          aria-pressed={online}
        >
          {online ? t("goOffline") : t("goOnline")}
        </button>
      </header>
      {!online && (
        <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-semibold text-[#5C3B00]">
          {t("offline")}
        </p>
      )}
      {jobs.length === 0 ? (
        <p className={cardClass + " text-ink/70"}>{t("noAvailable")}</p>
      ) : (
        <ul className="grid gap-3">
          {jobs.map((job) => {
            const matches = pro?.categories.includes(job.category);
            return (
              <li key={job.id} className="grid gap-2">
                <JobCard job={job} href={`/pro/jobs/${job.id}`} />
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
  const { state } = useDemo();
  const jobs = state.jobs.filter((job) => job.proId === state.session?.userId);

  return (
    <div className="grid gap-4">
      <h1 className="text-3xl font-extrabold tracking-tight">{t("assignments")}</h1>
      {jobs.length === 0 ? (
        <p className={cardClass + " text-ink/70"}>{t("noAssignments")}</p>
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

export function ProProfile() {
  const t = useTranslations("app");
  const locale = useLocale();
  const { state, setAvailability, reset } = useDemo();
  const person = personById(state.session?.userId);
  if (!person) return null;
  const online = state.availability[person.id] !== false;

  return (
    <div className="grid max-w-2xl gap-4">
      <section className={cardClass}>
        <p className="text-sm font-bold text-sea">{t("profileStub")}</p>
        <h1 className="mt-2 text-3xl font-extrabold">{loc(locale, person.name)}</h1>
        {person.company && <p className="mt-1 text-ink/70">{loc(locale, person.company)}</p>}
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
            <dd className="mt-1 font-semibold" dir="ltr">{person.phone}</dd>
          </div>
        </dl>
        <p className="mt-4 inline-flex rounded-full bg-[#E6F7FD] px-3 py-1 text-xs font-bold text-sea">
          {t("verifiedBadge")}
        </p>
      </section>
      <section className={cardClass}>
        <h2 className="font-extrabold">{t("availability")}</h2>
        <p className="mt-2 text-sm text-ink/75">{online ? t("onlineHelp") : t("offline")}</p>
        <button
          type="button"
          className={(online ? btnSecondary : btnPrimary) + " mt-4"}
          onClick={() => setAvailability(!online)}
        >
          {online ? t("goOffline") : t("goOnline")}
        </button>
      </section>
      <section className={cardClass}>
        <h2 className="font-extrabold">{t("payoutTitle")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">{t("payoutBody")}</p>
        <button type="button" className="mt-4 text-sm font-bold text-sea" onClick={reset}>
          {t("reset")}
        </button>
      </section>
    </div>
  );
}
