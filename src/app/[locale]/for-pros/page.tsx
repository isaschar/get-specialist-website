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
  const t = await getTranslations({ locale, namespace: "pros" });
  return { title: t("metaTitle") };
}

export default async function ForProsPage() {
  const t = await getTranslations("pros");
  const benefits = t.raw("benefits") as string[];
  const steps = t.raw("steps") as string[];
  const requirements = t.raw("requirements") as string[];

  return (
    <MarketingShell>
      <section className="bg-paper">
        <div className="mx-auto max-w-[1120px] px-4 py-16 md:px-6 md:py-24">
          <h1 className="max-w-3xl text-[2.6rem] font-bold leading-[0.98] tracking-[-0.035em] md:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">{t("heroBody")}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className={btnPrimary}>
              {t("primaryCta")}
            </Link>
            <Link href="/contact" className={btnSecondary}>
              {t("secondaryCta")}
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-extrabold">{t("benefitsTitle")}</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {benefits.map((item) => (
            <li key={item} className="rounded-3xl border border-line p-5 leading-relaxed">
              <RichText text={item} />
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-extrabold">{t("howTitle")}</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-2">
            {steps.map((item, index) => (
              <li key={item} className="rounded-3xl border border-line bg-paper p-5">
                <span className="text-sm font-extrabold text-sea">{index + 1}</span>
                <p className="mt-2 font-semibold leading-relaxed">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-extrabold">{t("requirementsTitle")}</h2>
          <ul className="mt-4 space-y-3">
            {requirements.map((item) => (
              <li key={item} className="rounded-2xl bg-mist p-4 text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-line p-6">
          <h2 className="text-2xl font-extrabold">{t("trustTitle")}</h2>
          <p className="mt-3 leading-relaxed text-ink/80">{t("trust1")}</p>
          <p className="mt-3 leading-relaxed text-ink/80">{t("trust2")}</p>
          <Link href="/contact" className={btnSecondary + " mt-6"}>
            <RichText text={t("secondaryCta")} />
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
