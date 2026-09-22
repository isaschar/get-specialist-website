"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { lifecycleOf } from "@/lib/taxonomy";
import { btnPrimary, cardClass } from "@/lib/ui";
import { JobCard } from "./job-card";
import { useDemo } from "./demo-provider";

export function ClientJobs() {
  const t = useTranslations("app");
  const { state } = useDemo();
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const mine = state.jobs.filter((job) => job.clientId === state.session?.userId);
  const jobs = mine.filter((job) => {
    const stage = lifecycleOf(job.status);
    if (filter === "active") return stage === "pending" || stage === "assigned" || stage === "in_progress";
    if (filter === "done") return stage === "completed" || stage === "cancelled";
    return true;
  });

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">{t("myJobs")}</h1>
          <p className="mt-1 text-ink/70">{t("myJobsLead")}</p>
        </div>
        <Link href="/client/jobs/new" className={btnPrimary}>
          {t("newRequest")}
        </Link>
      </div>
      <div className="flex gap-2">
        {(["all", "active", "done"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              filter === item ? "bg-ink text-white" : "bg-mist"
            }`}
          >
            {t(`filter.${item}`)}
          </button>
        ))}
      </div>
      {jobs.length === 0 ? (
        <div className={cardClass}>
          <p className="font-semibold">{t("emptyJobs")}</p>
          <Link href="/client/jobs/new" className={btnPrimary + " mt-4"}>
            {t("newRequest")}
          </Link>
        </div>
      ) : (
        <ul className="grid gap-3">
          {jobs.map((job) => (
            <li key={job.id}>
              <JobCard job={job} href={`/client/jobs/${job.id}`} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
