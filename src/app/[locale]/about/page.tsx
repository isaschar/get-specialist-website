import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MarketingShell } from "@/components/marketing-shell";
import { RichText } from "@/components/rich-text";
import { btnPrimary, btnSecondary } from "@/lib/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("metaTitle") };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const home = await getTranslations("home");

  return (
    <MarketingShell>
      <section className="bg-paper">
        <div className="mx-auto max-w-[1120px] px-4 py-16 md:px-6 md:py-24">
          <h1 className="max-w-3xl text-[2.6rem] font-bold leading-[0.98] tracking-[-0.035em] md:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">{t("heroBody")}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-14 md:grid-cols-3">
        {[
          ["roleTitle", "roleBody"],
          ["citiesTitle", "citiesBody"],
          ["trustTitle", "trustBody"],
        ].map(([title, body]) => (
          <article key={title} className="rounded-3xl border border-line p-5">
            <h2 className="text-xl font-extrabold">{t(title)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">
              <RichText text={t(body)} />
            </p>
          </article>
        ))}
      </section>
      <section className="mx-auto flex max-w-6xl flex-col gap-3 px-4 pb-16 sm:flex-row">
        <Link href="/client/jobs/new" className={btnPrimary}>
          {home("primaryCta")}
        </Link>
        <Link href="/for-pros" className={btnSecondary}>
          {home("secondaryCta")}
        </Link>
      </section>
    </MarketingShell>
  );
}
