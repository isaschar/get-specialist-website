import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MarketingShell } from "@/components/marketing-shell";
import { btnPrimary } from "@/lib/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "howPage" });
  return { title: t("meta") };
}

export default async function HowItWorksPage() {
  const t = await getTranslations("howPage");
  const home = await getTranslations("home");
  const steps = ["1", "2", "3", "4"] as const;

  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-5 py-16 md:px-6 md:py-24">
        <h1 className="text-4xl font-bold tracking-[-0.035em] md:text-6xl">{t("title")}</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/75">{t("lead")}</p>
        <ol className="mt-10 grid gap-6">
          {steps.map((step) => (
            <li key={step} className="rounded-3xl bg-mist p-5">
              <p className="text-sm font-bold text-ink/50">{step}</p>
              <h2 className="mt-2 text-xl font-bold">{home(`steps.${step}.title`)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{home(`steps.${step}.body`)}</p>
            </li>
          ))}
        </ol>
        <Link href="/client/jobs/new" className={btnPrimary + " mt-8"}>
          {home("primaryCta")}
        </Link>
      </article>
    </MarketingShell>
  );
}
