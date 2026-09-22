"use client";

import { useTranslations } from "next-intl";
import { lifecycleOf } from "@/lib/taxonomy";
import { LIFECYCLE_STAGES, type JobStatus } from "@/lib/types";

export function Pipeline({ status }: { status: JobStatus }) {
  const t = useTranslations("lifecycle");
  const stage = lifecycleOf(status);
  const activeIndex = LIFECYCLE_STAGES.indexOf(
    stage as (typeof LIFECYCLE_STAGES)[number],
  );

  if (stage === "cancelled" || stage === "disputed") {
    return (
      <p className="rounded-2xl bg-mist px-4 py-3 text-sm font-bold">
        {t(stage)}
      </p>
    );
  }

  return (
    <ol className="grid grid-cols-4 gap-2">
      {LIFECYCLE_STAGES.map((item, index) => {
        const reached = index <= activeIndex;
        return (
          <li key={item} className="min-w-0">
            <div className={`mb-2 h-1.5 rounded-full ${reached ? "bg-accent" : "bg-line"}`} />
            <p className={`text-[11px] font-bold leading-tight sm:text-xs ${reached ? "text-ink" : "text-ink/45"}`}>
              {t(item)}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
