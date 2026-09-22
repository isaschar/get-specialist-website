import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MarketingShell } from "@/components/marketing-shell";
import { applyPlaceholders } from "@/lib/placeholders";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqPage" });
  return { title: t("meta") };
}

export default async function FaqPage() {
  const t = await getTranslations("faqPage");
  const pricing = await getTranslations("pricingPage");
  const footer = await getTranslations("footer");
  const items = t.raw("items") as { q: string }[];
  const answers = items.map((item, index) => {
    if (index === 2) return footer("emergency");
    if (index === 4) return pricing("oneLiner");
    if (index === 8) return applyPlaceholders(t("support"));
    if (index === 9) return t("legal");
    return t("tbd");
  });

  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-5 py-16 md:px-6 md:py-24">
        <h1 className="text-4xl font-bold tracking-[-0.035em] md:text-6xl">{t("title")}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75">{t("lead")}</p>
        <ol className="mt-10 grid gap-4">
          {items.map((item, index) => (
            <li key={item.q} className="rounded-3xl border border-line p-5">
              <h2 className="text-lg font-bold">
                {index + 1}. {item.q}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{answers[index]}</p>
            </li>
          ))}
        </ol>
      </article>
    </MarketingShell>
  );
}
