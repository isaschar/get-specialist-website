"use client";

import { useTranslations } from "next-intl";
import { lifecycleOf } from "@/lib/taxonomy";
import type { JobStatus, LifecycleStage } from "@/lib/types";

const chip: Record<LifecycleStage, string> = {
  pending: "bg-mist text-ink",
  assigned: "bg-[#E6F7FD] text-sea",
  in_progress: "bg-[#E6F7FD] text-sea",
  completed: "bg-[#E7F6EE] text-[#0E6B3C]",
  cancelled: "bg-mist text-ink/60",
  disputed: "bg-[#FFF4E5] text-[#8A4B08]",
};

export function StatusBadge({ status }: { status: JobStatus }) {
  const t = useTranslations("lifecycle");
  const stage = lifecycleOf(status);
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${chip[stage]}`}>
      <span
        className={`size-1.5 rounded-full ${stage === "in_progress" || stage === "assigned" ? "bg-accent" : "bg-current"}`}
        aria-hidden="true"
      />
      {t(stage)}
    </span>
  );
}
