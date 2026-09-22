import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CategoryGrid } from "@/components/category-grid";
import { MarketingShell } from "@/components/marketing-shell";
import { RichText } from "@/components/rich-text";
import { CITIES } from "@/lib/taxonomy";
import { loc } from "@/lib/locale-text";
import { btnPrimary, btnSecondary } from "@/lib/ui";

const trustKeys = [
  "verified",
  "pricing",
  "support",
  "insurance",
  "intermediary",
  "emergency",
] as const;

export default async function HomePage() {
  const t = await getTranslations("home");
  const locale = await getLocale();
  const headline = t("headline");
  const splitAt = headline.indexOf(". ");
  const lead = splitAt > 0 ? headline.slice(0, splitAt + 1) : headline;
  const rest = splitAt > 0 ? headline.slice(splitAt + 2) : "";

  return (
    <MarketingShell>
      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[1.15fr_0.85fr] md:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-sm font-semibold text-sea">
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink md:text-6xl md:leading-[1.05]">
              <span className="block">{lead}</span>
              {rest && <span className="mt-1 block text-accent">{rest}</span>}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">{t("subhead")}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/client/jobs/new" className={btnPrimary}>
                {t("primaryCta")}
              </Link>
              <Link href="/for-pros" className={btnSecondary}>
                {t("secondaryCta")}
              </Link>
            </div>
          </div>
          <HeroCard />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{t("howTitle")}</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {["1", "2", "3", "4"].map((step, index) => (
            <li key={step} className="rounded-3xl border border-line bg-paper p-5">
              <span className="grid size-9 place-items-center rounded-full bg-[#E6F7FD] text-sm font-extrabold text-sea">
                {index + 1}
              </span>
              <h3 className="mt-3 text-lg font-extrabold">{t(`steps.${step}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{t(`steps.${step}.body`)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="categories" className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{t("categoriesTitle")}</h2>
          <p className="mt-2 max-w-2xl text-ink/75">{t("categoriesLead")}</p>
          <div className="mt-6">
            <CategoryGrid locale={locale} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{t("trustTitle")}</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {trustKeys.map((key) => (
            <li key={key} className="rounded-3xl border border-line p-5">
              <h3 className="font-extrabold">
                <RichText text={t(`trust.${key}.title`)} />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                <RichText text={t(`trust.${key}.body`)} />
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-extrabold tracking-tight">{t("citiesTitle")}</h2>
          <p className="mt-2 max-w-2xl text-ink/75">{t("citiesLead")}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {CITIES.map((city) => (
              <li key={city.id} className="rounded-3xl bg-mist px-5 py-6 text-xl font-extrabold">
                {loc(locale, city.name)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight">{t("finalTitle")}</h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-ink/75">{t("finalBody")}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/client/jobs/new" className={btnPrimary}>
            {t("primaryCta")}
          </Link>
          <Link href="/for-pros" className={btnSecondary}>
            {t("secondaryCta")}
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}

function HeroCard() {
  return (
    <div className="rounded-[28px] border border-line bg-paper p-5 shadow-[0_16px_50px_rgba(20,20,20,0.06)]">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#E6F7FD] px-3 py-1 text-xs font-bold text-sea">
          <HeroLabel />
        </span>
        <span className="text-xs font-semibold text-ink/50">09:40</span>
      </div>
      <p className="mt-5 text-2xl font-extrabold leading-snug">
        <HeroTitle />
      </p>
      <div className="mt-5 grid grid-cols-4 gap-2">
        <span className="h-1.5 rounded-full bg-accent" />
        <span className="h-1.5 rounded-full bg-accent" />
        <span className="h-1.5 rounded-full bg-accent" />
        <span className="h-1.5 rounded-full bg-line" />
      </div>
      <div className="mt-5 rounded-2xl bg-mist p-4">
        <p className="text-sm font-bold">
          <HeroPro />
        </p>
        <p className="mt-1 text-sm text-ink/70">
          <HeroCity />
        </p>
      </div>
    </div>
  );
}

async function HeroLabel() {
  const t = await getTranslations("home");
  return t("cardStatus");
}
async function HeroTitle() {
  const t = await getTranslations("home");
  return t("cardTitle");
}
async function HeroPro() {
  const t = await getTranslations("home");
  return t("cardPro");
}
async function HeroCity() {
  const t = await getTranslations("home");
  return t("cardCity");
}
