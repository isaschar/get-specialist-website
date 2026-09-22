import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CategoryGrid } from "@/components/category-grid";
import { EmergencyBanner } from "@/components/emergency-banner";
import { MarketingShell } from "@/components/marketing-shell";
import { RichText } from "@/components/rich-text";
import { btnPrimary, btnSecondary } from "@/lib/ui";
import { getLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "clients" });
  return { title: t("metaTitle") };
}

export default async function ForClientsPage() {
  const t = await getTranslations("clients");
  const home = await getTranslations("home");
  const locale = await getLocale();
  const why = t.raw("why") as string[];

  return (
    <MarketingShell>
      <section className="bg-paper">
        <div className="mx-auto max-w-[1120px] px-4 py-16 md:px-6 md:py-24">
          <h1 className="max-w-3xl text-[2.6rem] font-bold leading-[0.98] tracking-[-0.035em] md:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">{t("heroBody")}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/client/jobs/new" className={btnPrimary}>
              {home("primaryCta")}
            </Link>
            <Link href="/#categories" className={btnSecondary}>
              {t("browse")}
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-extrabold">{t("whyTitle")}</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {why.map((item) => (
            <li key={item} className="rounded-3xl border border-line p-5 text-sm leading-relaxed">
              <RichText text={item} />
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-extrabold">{t("howTitle")}</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-2">
            {["1", "2", "3", "4"].map((step) => (
              <li key={step} className="rounded-3xl border border-line bg-paper p-5">
                <h3 className="font-extrabold">{home(`steps.${step}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{home(`steps.${step}.body`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-14">
        <EmergencyBanner strong />
      </section>
      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold">{t("pricingTitle")}</h2>
            <p className="mt-3 leading-relaxed text-ink/80">{t("pricing1")}</p>
            <p className="mt-3 leading-relaxed text-ink/80">{t("pricing2")}</p>
          </div>
          <div className="rounded-3xl border border-line bg-paper p-6">
            <h2 className="text-2xl font-extrabold">{t("supportTitle")}</h2>
            <p className="mt-3 text-ink/75">
              <RichText text={t("supportBody")} />
            </p>
            <Link href="/contact" className={btnPrimary + " mt-5"}>
              {t("supportCta")}
            </Link>
          </div>
        </div>
      </section>
      <section id="categories" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-extrabold">{home("categoriesTitle")}</h2>
        <div className="mt-6">
          <CategoryGrid locale={locale} />
        </div>
      </section>
    </MarketingShell>
  );
}
