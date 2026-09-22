"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { loc } from "@/lib/locale-text";
import { personById } from "@/lib/people";
import { categoryById, cityById } from "@/lib/taxonomy";
import type { Job } from "@/lib/types";
import { CategoryIcon } from "./category-icon";
import { StatusBadge } from "./status-badge";

export function JobCard({ job, href }: { job: Job; href: string }) {
  const locale = useLocale();
  const t = useTranslations("app");
  const category = categoryById(job.category);
  const city = cityById(job.city);
  const pro = personById(job.proId);

  return (
    <article className="rounded-3xl border border-line bg-paper p-4 transition hover:border-accent">
      <Link href={href} className="flex items-start gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mist text-accent">
          <CategoryIcon id={job.category} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-3">
            <span className="text-base font-extrabold leading-snug">{loc(locale, job.title)}</span>
            <StatusBadge status={job.status} />
          </span>
          <span className="mt-1 block text-sm text-ink/70">
            {loc(locale, category.name)} · {loc(locale, city.name)}
          </span>
          <span className="mt-2 block text-sm text-ink/80">
            {pro ? loc(locale, pro.name) : t("unassigned")}
          </span>
        </span>
      </Link>
    </article>
  );
}
