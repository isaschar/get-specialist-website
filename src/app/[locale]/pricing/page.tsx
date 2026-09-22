import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MarketingShell } from "@/components/marketing-shell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricingPage" });
  return { title: t("meta") };
}

export default async function PricingPage() {
  const t = await getTranslations("pricingPage");
  const nav = await getTranslations("nav");

  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-5 py-16 md:px-6 md:py-24">
        <h1 className="text-4xl font-bold tracking-[-0.035em] md:text-6xl">{t("title")}</h1>
        <p className="mt-6 text-xl leading-relaxed text-ink">{t("oneLiner")}</p>
        <p className="mt-6 text-base leading-relaxed text-ink/75">{t("escrow")}</p>
        <Link href="/faq" className="mt-8 inline-flex text-[15px] font-semibold text-ink underline underline-offset-4">
          {nav("faq")}
        </Link>
      </article>
    </MarketingShell>
  );
}
