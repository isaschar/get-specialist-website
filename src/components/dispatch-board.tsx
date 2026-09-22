"use client";

import { useLocale, useTranslations } from "next-intl";
import { loc } from "@/lib/locale-text";
import { personById } from "@/lib/people";
import { categoryById, cityById, lifecycleOf } from "@/lib/taxonomy";
import { LIFECYCLE_STAGES, type LifecycleStage } from "@/lib/types";
import { cardClass } from "@/lib/ui";
import { useDemo } from "./demo-provider";
import { StatusBadge } from "./status-badge";

const groups: LifecycleStage[] = [...LIFECYCLE_STAGES, "cancelled", "disputed"];

export function DispatchBoard() {
  const t = useTranslations("dispatch");
  const app = useTranslations("app");
  const statusT = useTranslations("status");
  const locale = useLocale();
  const { state } = useDemo();

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10">
      <div className="max-w-3xl">
        <p className="text-sm font-bold text-ink/50">{t("eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-[-0.035em] md:text-6xl">{t("title")}</h1>
        <p className="mt-3 text-lg leading-relaxed text-ink/75">{t("body")}</p>
      </div>
      <div className="grid gap-4">
        {groups.map((stage) => {
          const jobs = state.jobs.filter((job) => lifecycleOf(job.status) === stage);
          if (jobs.length === 0 && (stage === "cancelled" || stage === "disputed")) return null;
          return (
            <section key={stage} className={cardClass}>
              <h2 className="text-lg font-extrabold">{t(`stages.${stage}`)}</h2>
              {jobs.length === 0 ? (
                <p className="mt-2 text-sm text-ink/60">{t("empty")}</p>
              ) : (
                <ul className="mt-4 grid gap-3">
                  {jobs.map((job) => {
                    const pro = personById(job.proId);
                    const client = personById(job.clientId);
                    return (
                      <li key={job.id} className="rounded-2xl border border-line p-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <StatusBadge status={job.status} />
                          <span className="text-xs font-semibold text-ink/55">{statusT(job.status)}</span>
                        </div>
                        <p className="mt-2 font-extrabold">{loc(locale, job.title)}</p>
                        <p className="mt-1 text-sm text-ink/70">
                          {loc(locale, categoryById(job.category).name)} · {loc(locale, cityById(job.city).name)}
                        </p>
                        <p className="mt-1 text-sm">
                          {client ? loc(locale, client.name) : job.clientId}
                          {" · "}
                          {pro ? loc(locale, pro.name) : app("unassigned")}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
