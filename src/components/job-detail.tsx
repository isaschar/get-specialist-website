"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { loc, otherLocale } from "@/lib/locale-text";
import { canClientCancel, proAction } from "@/lib/jobs";
import { personById } from "@/lib/people";
import { categoryById, cityById, emphasizesEmergency, lifecycleOf } from "@/lib/taxonomy";
import type { Role } from "@/lib/types";
import { btnPrimary, btnSecondary, cardClass, fieldClass } from "@/lib/ui";
import { CategoryIcon } from "./category-icon";
import { EmergencyBanner } from "./emergency-banner";
import { Pipeline } from "./pipeline";
import { StatusBadge } from "./status-badge";
import { useDemo } from "./demo-provider";

export function JobDetail({ id, audience }: { id: string; audience: Role }) {
  const locale = useLocale();
  const t = useTranslations("app");
  const statusT = useTranslations("status");
  const payoutT = useTranslations("payout");
  const timeT = useTranslations("time");
  const params = useSearchParams();
  const { state, claimJob, advanceJob, releaseJob, cancelJob, rateJob } = useDemo();
  const job = state.jobs.find((item) => item.id === id);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");

  if (!job) {
    return (
      <section className={cardClass}>
        <h1 className="text-2xl font-extrabold">{t("missingTitle")}</h1>
        <p className="mt-2 text-ink/75">{t("missingBody")}</p>
        <Link href={audience === "pro" ? "/pro/jobs" : "/client/jobs"} className={btnSecondary + " mt-5"}>
          {t("backToList")}
        </Link>
      </section>
    );
  }

  const category = categoryById(job.category);
  const city = cityById(job.city);
  const client = personById(job.clientId);
  const pro = personById(job.proId);
  const session = state.session;
  const mine =
    audience === "client"
      ? session?.userId === job.clientId
      : session?.userId === job.proId;
  const action = proAction(job.status);
  const other = otherLocale(locale);
  const showOther = job.title[locale === "he" ? "he" : "en"] !== job.title[other] ||
    job.description[locale === "he" ? "he" : "en"] !== job.description[other];
  const created = params.get("new") === "1";

  function run(result: string | null) {
    setError(result ? t(`errors.${result}`) : null);
  }

  return (
    <div className="grid gap-4">
      <Link
        href={audience === "pro" ? (job.proId === session?.userId ? "/pro/assignments" : "/pro/jobs") : "/client/jobs"}
        className="text-sm font-bold text-sea"
      >
        {t("backToList")}
      </Link>
      {created && (
        <p className="rounded-2xl bg-[#E6F7FD] px-4 py-3 text-sm font-semibold text-sea">
          {t("posted")}
        </p>
      )}
      <section className={cardClass}>
        <div className="flex items-start gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mist text-accent">
            <CategoryIcon id={job.category} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={job.status} />
              <span className="text-xs font-semibold text-ink/60">{statusT(job.status)}</span>
            </div>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight">{loc(locale, job.title)}</h1>
            <p className="mt-1 text-sm text-ink/70">
              {loc(locale, category.name)} · {loc(locale, city.name)}
            </p>
          </div>
        </div>
        <div className="mt-5">
          <Pipeline status={job.status} />
          <p className="mt-3 text-xs text-ink/60">{t("pipelineHint")}</p>
        </div>
      </section>

      {(emphasizesEmergency(job.category) || lifecycleOf(job.status) === "pending") && (
        <EmergencyBanner strong={emphasizesEmergency(job.category)} />
      )}

      <section className={cardClass}>
        <h2 className="text-sm font-bold uppercase tracking-wide text-ink/50">{t("description")}</h2>
        <p className="mt-2 whitespace-pre-wrap leading-relaxed">{loc(locale, job.description)}</p>
        {showOther && (
          <p className="mt-3 rounded-2xl bg-mist p-3 text-sm text-ink/75">
            <span className="font-bold">{t("otherLanguage")}: </span>
            {job.description[other]}
          </p>
        )}
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          <Info label={t("address")} value={loc(locale, job.address)} />
          <Info label={t("time")} value={timeT(job.timeWindow)} />
          <Info
            label={t("priceIntent")}
            value={job.priceIntent ? `₪${job.priceIntent}` : t("priceOpen")}
          />
          <Info label={t("client")} value={client ? loc(locale, client.name) : job.clientId} />
          <Info
            label={t("pro")}
            value={
              pro
                ? `${loc(locale, pro.name)}${pro.company ? ` · ${loc(locale, pro.company)}` : ""}`
                : t("unassigned")
            }
          />
          <Info label={t("payout")} value={payoutT(job.payoutStatus)} />
        </dl>
      </section>

      <section className={cardClass}>
        <h2 className="text-lg font-extrabold">{t("actions")}</h2>
        {error && <p className="mt-3 text-sm font-semibold text-[#8A4B08]">{error}</p>}
        <div className="mt-4 flex flex-col gap-3">
          {audience === "pro" && !job.proId && (
            <button
              type="button"
              className={btnPrimary}
              onClick={() => run(claimJob(job.id))}
            >
              {t("claim")}
            </button>
          )}
          {audience === "pro" && mine && action && (
            <button type="button" className={btnPrimary} onClick={() => run(advanceJob(job.id))}>
              {t(`action.${action}`)}
            </button>
          )}
          {audience === "pro" && mine && (job.status === "ACCEPTED" || job.status === "CONFIRMED" || job.status === "EN_ROUTE") && (
            <button type="button" className={btnSecondary} onClick={() => run(releaseJob(job.id))}>
              {t("release")}
            </button>
          )}
          {audience === "client" && mine && canClientCancel(job) && (
            <button type="button" className={btnSecondary} onClick={() => run(cancelJob(job.id))}>
              {t("cancel")}
            </button>
          )}
          {audience === "client" && mine && job.status === "COMPLETED_PRO" && (
            <form
              className="grid gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                const text = comment.trim();
                run(rateJob(job.id, score, { en: text, he: text }));
              }}
            >
              <p className="text-sm text-ink/75">{t("rateHelp")}</p>
              <div className="flex gap-2" role="radiogroup" aria-label={t("rating")}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={score === value}
                    onClick={() => setScore(value)}
                    className={`grid size-11 place-items-center rounded-full border text-sm font-extrabold ${
                      score === value ? "border-accent bg-[#E6F7FD] text-sea" : "border-line"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <label className="grid gap-1 text-sm font-semibold">
                {t("comment")}
                <textarea
                  className={fieldClass}
                  rows={3}
                  maxLength={400}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
              </label>
              <button type="submit" className={btnPrimary}>
                {t("submitRating")}
              </button>
            </form>
          )}
          {job.rating && (
            <p className="rounded-2xl bg-mist p-3 text-sm">
              <span className="font-bold">{t("rated", { score: job.rating.score })}</span>
              {loc(locale, job.rating.comment) && (
                <span className="mt-1 block">{loc(locale, job.rating.comment)}</span>
              )}
            </p>
          )}
          {audience === "client" && !mine && (
            <p className="text-sm text-ink/70">{t("notYourJob")}</p>
          )}
          {job.status === "COMPLETED_PRO" && audience === "pro" && (
            <p className="text-sm text-ink/70">{t("waitingClient")}</p>
          )}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className={cardClass}>
          <h2 className="font-extrabold">{t("dispatchTitle")}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/75">{t("dispatchBody")}</p>
        </div>
        <div className={cardClass}>
          <h2 className="font-extrabold">{t("payoutTitle")}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/75">{t("payoutBody")}</p>
          <p className="mt-2 text-sm font-bold">{payoutT(job.payoutStatus)}</p>
        </div>
      </section>

      <section className={cardClass}>
        <h2 className="font-extrabold">{t("history")}</h2>
        <ol className="mt-3 space-y-2">
          {job.history.map((entry, index) => (
            <li key={`${entry.status}-${entry.at}-${index}`} className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-semibold">{statusT(entry.status)}</span>
              <time className="text-ink/60" dateTime={entry.at}>
                {new Intl.DateTimeFormat(locale === "he" ? "he-IL" : "en-IL", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(entry.at))}
              </time>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wide text-ink/45">{label}</dt>
      <dd className="mt-1 text-sm font-semibold">{value}</dd>
    </div>
  );
}
