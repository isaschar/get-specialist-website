import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CategoryGrid } from "@/components/category-grid";
import { CategoryIcon } from "@/components/category-icon";
import { HeroArt } from "@/components/hero-art";
import { HeroSearch } from "@/components/hero-search";
import { MarketingShell } from "@/components/marketing-shell";
import { RichText } from "@/components/rich-text";
import { CITIES } from "@/lib/taxonomy";
import { loc } from "@/lib/locale-text";
import { display, textLink } from "@/lib/ui";

export default async function HomePage() {
  const t = await getTranslations("home");
  const clients = await getTranslations("clients");
  const pros = await getTranslations("pros");
  const locale = await getLocale();
  const lines = t.raw("headlineLines") as string[];

  const features = [
    { step: "1", href: "/client/jobs/new" },
    { step: "2", href: "/dispatch" },
    { step: "4", href: "/contact" },
  ] as const;

  return (
    <MarketingShell>
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 px-5 py-12 md:grid-cols-[1.08fr_0.92fr] md:gap-8 md:px-8 md:py-16 lg:py-20">
          <div>
            <h1 className={`${display} text-[2.75rem] text-ink sm:text-6xl lg:text-[5.5rem]`}>
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <HeroSearch cta={t("primaryCta")} label={t("cityLabel")} />
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">{t("subhead")}</p>
            <Link href="/for-pros" className={`${textLink} mt-4`}>
              {t("secondaryCta")}
            </Link>
          </div>
          <HeroArt />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1120px] gap-12 px-5 py-16 md:grid-cols-3 md:gap-10 md:px-8 md:py-24">
          {features.map((feature) => (
            <article key={feature.step}>
              <span className="grid size-16 place-items-center rounded-full bg-[#E7F6FC] text-accent">
                <FeatureMark index={feature.step} />
              </span>
              <h2 className="mt-6 text-[22px] font-bold tracking-[-0.02em]">{t(`steps.${feature.step}.title`)}</h2>
              <p className="mt-2 max-w-[16rem] text-[15px] leading-relaxed text-ink/65">
                {t(`steps.${feature.step}.body`)}
              </p>
              <Link href={feature.href} className={`${textLink} mt-4`}>
                {t("learnMore")}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 px-5 py-8 md:grid-cols-2 md:gap-16 md:px-8 md:py-20">
          <div>
            <h2 className={`${display} text-4xl md:text-[3.25rem]`}>{clients("heroTitle")}</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">{clients("heroBody")}</p>
            <Link href="/for-clients" className={`${textLink} mt-6`}>
              {t("learnMore")}
            </Link>
          </div>
          <div className="flex min-h-[340px] items-center justify-center rounded-[32px] bg-mist p-8 md:min-h-[420px]">
            <CategoryStrip />
          </div>
        </div>
      </section>

      <section id="categories" className="bg-paper">
        <div className="mx-auto max-w-[1120px] px-5 py-14 md:px-8 md:py-20">
          <h2 className={`${display} max-w-xl text-4xl md:text-[3.25rem]`}>{t("categoriesTitle")}</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/70">{t("categoriesLead")}</p>
          <div className="mt-10">
            <CategoryGrid locale={locale} compact />
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 px-5 py-8 md:grid-cols-2 md:gap-16 md:px-8 md:py-20">
          <div className="order-2 md:order-1">
            <div className="flex min-h-[340px] flex-col justify-end rounded-[32px] bg-[#E7F6FC] p-8 md:min-h-[420px] md:p-10">
              <p className="text-sm font-semibold text-ink/60">{t("citiesTitle")}</p>
              <ul className="mt-4 grid gap-2">
                {CITIES.map((city) => (
                  <li key={city.id}>
                    <Link
                      href={`/client/jobs/new?city=${city.id}`}
                      className={`${display} text-3xl hover:text-accent md:text-[2.6rem]`}
                    >
                      {loc(locale, city.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className={`${display} text-4xl md:text-[3.25rem]`}>{pros("heroTitle")}</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">{pros("heroBody")}</p>
            <Link href="/for-pros" className={`${textLink} mt-6`}>
              {t("learnMore")}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <ul className="mx-auto grid max-w-[1120px] gap-10 px-5 py-16 md:grid-cols-3 md:px-8 md:py-20">
          {(["verified", "pricing", "insurance"] as const).map((key) => (
            <li key={key}>
              <h2 className="text-lg font-bold">
                <RichText text={t(`trust.${key}.title`)} />
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                <RichText text={t(`trust.${key}.body`)} />
              </p>
            </li>
          ))}
        </ul>
      </section>
    </MarketingShell>
  );
}

function FeatureMark({ index }: { index: string }) {
  if (index === "1") {
    return (
      <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 6h14M5 12h10M5 18h7" strokeLinecap="round" />
      </svg>
    );
  }
  if (index === "2") {
    return (
      <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="7" />
        <path d="M12 8v4l3 2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 10a4 4 0 1 1 8 0c0 3-4 4-4 7" strokeLinecap="round" />
      <path d="M12 20h.01" strokeLinecap="round" />
    </svg>
  );
}

function CategoryStrip() {
  const ids = ["plumbing", "electricity", "hvac", "locksmith", "cleaning", "handyman"] as const;
  return (
    <div className="grid w-full max-w-md grid-cols-3 gap-4">
      {ids.map((id) => (
        <div key={id} className="grid aspect-square place-items-center rounded-3xl bg-white text-accent shadow-[0_8px_24px_rgba(20,20,20,0.04)]">
          <CategoryIcon id={id} className="size-10" />
        </div>
      ))}
    </div>
  );
}
