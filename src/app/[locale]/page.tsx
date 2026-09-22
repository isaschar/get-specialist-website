import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CategoryIcon } from "@/components/category-icon";
import { HeroSearch } from "@/components/hero-search";
import { MarketingShell } from "@/components/marketing-shell";
import { RichText } from "@/components/rich-text";
import { CATEGORIES } from "@/lib/taxonomy";
import { loc } from "@/lib/locale-text";

export default async function HomePage() {
  const t = await getTranslations("home");
  const clients = await getTranslations("clients");
  const pros = await getTranslations("pros");
  const locale = await getLocale();
  const lines = t.raw("headlineLines") as string[];

  return (
    <MarketingShell>
      <section className="bg-glow text-white">
        <div className="mx-auto flex min-h-[640px] max-w-[900px] flex-col items-center justify-center px-5 py-16 text-center md:min-h-[720px] md:py-24">
          <Link
            href="/for-clients"
            className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/30"
          >
            {t("eyebrow")}
            <span aria-hidden="true"> ›</span>
          </Link>
          <h1 className="mt-8 text-[2.55rem] font-bold uppercase leading-[0.86] tracking-[-0.035em] text-white sm:text-7xl lg:text-[6.15rem]">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <HeroSearch cta={t("primaryCta")} label={t("cityLabel")} />
          <Link
            href="/for-pros"
            className="mt-6 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/30"
          >
            {t("secondaryCta")}
            <span aria-hidden="true"> ›</span>
          </Link>
        </div>
      </section>

      <section id="categories" className="bg-paper pt-8">
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 md:px-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/client/jobs/new?category=${category.id}`}
              className="w-[108px] shrink-0"
            >
              <span className="grid aspect-square place-items-center rounded-[22px] bg-mist text-accent">
                <CategoryIcon id={category.id} className="size-8" />
              </span>
              <span className="mt-2 block text-center text-xs font-semibold leading-snug">
                {loc(locale, category.name)}
              </span>
            </Link>
          ))}
        </div>
        <p className="px-5 py-8 text-center text-sm font-semibold text-ink/80">
          <Link href="/for-clients" className="hover:text-accent">
            {t("categoriesTitle")}
            <span aria-hidden="true"> ›</span>
          </Link>
        </p>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1200px] gap-4 px-4 pb-16 md:grid-cols-2 md:px-6 md:pb-20">
          <Link
            href="/for-clients"
            className="relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[28px] bg-[#102830] p-8 text-white md:min-h-[380px]"
          >
            <span className="pointer-events-none absolute -end-8 -top-16 size-64 rounded-full bg-glow" />
            <span className="pointer-events-none absolute bottom-8 start-8 size-28 rounded-full bg-accent/70" />
            <h2 className="relative max-w-md text-3xl font-bold tracking-tight md:text-[2.6rem] md:leading-none">
              {clients("heroTitle")}
            </h2>
            <p className="relative mt-3 max-w-md text-base leading-relaxed text-white/85">{clients("heroBody")}</p>
          </Link>
          <Link
            href="/for-pros"
            className="relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[28px] bg-ink p-8 text-white md:min-h-[380px]"
          >
            <span className="pointer-events-none absolute -start-10 top-8 size-56 rounded-full bg-accent" />
            <span className="pointer-events-none absolute -end-6 bottom-6 size-36 rounded-full bg-glow/90" />
            <h2 className="relative max-w-md text-3xl font-bold tracking-tight md:text-[2.6rem] md:leading-none">
              {pros("heroTitle")}
            </h2>
            <p className="relative mt-3 max-w-md text-base leading-relaxed text-white/85">{pros("heroBody")}</p>
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <ul className="mx-auto grid max-w-[1200px] gap-8 px-5 py-14 md:grid-cols-3 md:px-8">
          {(["verified", "pricing", "insurance"] as const).map((key) => (
            <li key={key}>
              <h2 className="text-base font-bold">
                <RichText text={t(`trust.${key}.title`)} />
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                <RichText text={t(`trust.${key}.body`)} />
              </p>
            </li>
          ))}
        </ul>
      </section>
    </MarketingShell>
  );
}
