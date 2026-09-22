"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import {
  CATEGORY_IDS,
  CITY_IDS,
  TIME_WINDOW_IDS,
  type CategoryId,
  type CityId,
  type TimeWindowId,
} from "@/lib/types";
import { CATEGORIES, CITIES, emphasizesEmergency } from "@/lib/taxonomy";
import { loc } from "@/lib/locale-text";
import { btnPrimary, btnSecondary, cardClass, fieldClass } from "@/lib/ui";
import { CategoryIcon } from "./category-icon";
import { EmergencyBanner } from "./emergency-banner";
import { useDemo } from "./demo-provider";

const steps = ["category", "details", "place", "review"] as const;

export function NewJobWizard() {
  const t = useTranslations("wizard");
  const app = useTranslations("app");
  const timeT = useTranslations("time");
  const locale = useLocale();
  const router = useRouter();
  const params = useSearchParams();
  const { state, createJob } = useDemo();
  const preset = params.get("category");
  const initialCategory = (CATEGORY_IDS as readonly string[]).includes(preset ?? "")
    ? (preset as CategoryId)
    : null;

  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<CategoryId | null>(initialCategory);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleAlt, setTitleAlt] = useState("");
  const [descriptionAlt, setDescriptionAlt] = useState("");
  const [showAlt, setShowAlt] = useState(false);
  const presetCity = params.get("city");
  const [city, setCity] = useState<CityId | "">(
    (CITY_IDS as readonly string[]).includes(presetCity ?? "") ? (presetCity as CityId) : "",
  );
  const [address, setAddress] = useState("");
  const [timeWindow, setTimeWindow] = useState<TimeWindowId | "">("");
  const [price, setPrice] = useState("");
  const [ack, setAck] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categoryRecord = useMemo(
    () => CATEGORIES.find((item) => item.id === category),
    [category],
  );

  function next() {
    if (step === 0 && !category) {
      setError(t("errors.category"));
      return;
    }
    if (step === 1 && (title.trim().length < 4 || description.trim().length < 10)) {
      setError(t("errors.details"));
      return;
    }
    if (step === 2 && (!city || address.trim().length < 3 || !timeWindow)) {
      setError(t("errors.place"));
      return;
    }
    setError(null);
    setStep((value) => Math.min(value + 1, steps.length - 1));
  }

  function submit() {
    if (!ack) {
      setError(t("errors.ack"));
      return;
    }
    if (!category || !city || !timeWindow || !state.session) return;
    const primary = locale === "he" ? "he" : "en";
    const secondary = primary === "he" ? "en" : "he";
    const titleText = { en: "", he: "" };
    const descriptionText = { en: "", he: "" };
    titleText[primary] = title.trim();
    titleText[secondary] = titleAlt.trim() || title.trim();
    descriptionText[primary] = description.trim();
    descriptionText[secondary] = descriptionAlt.trim() || description.trim();
    const addressText = { en: address.trim(), he: address.trim() };
    const amount = price.trim() ? Number(price) : null;
    const job = createJob({
      category,
      title: titleText,
      description: descriptionText,
      city,
      address: addressText,
      timeWindow,
      priceIntent: amount && amount > 0 ? Math.round(amount) : null,
    });
    if (!job) {
      setError(t("errors.session"));
      return;
    }
    router.push(`/client/jobs/${job.id}?new=1`);
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-ink/75">{t("lead")}</p>
      </div>
      <ol className="grid grid-cols-4 gap-2">
        {steps.map((item, index) => (
          <li key={item}>
            <div className={`mb-1 h-1.5 rounded-full ${index <= step ? "bg-accent" : "bg-line"}`} />
            <p className="text-[11px] font-bold sm:text-xs">{t(`steps.${item}`)}</p>
          </li>
        ))}
      </ol>

      {category && emphasizesEmergency(category) && <EmergencyBanner strong />}

      <section className={cardClass}>
        {step === 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {CATEGORIES.map((item) => {
              const selected = item.id === category;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCategory(item.id);
                    setError(null);
                  }}
                  className={`rounded-2xl border p-3 text-start transition ${
                    selected ? "border-accent bg-[#E6F7FD]" : "border-line hover:border-accent"
                  }`}
                  aria-pressed={selected}
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-paper text-accent">
                    <CategoryIcon id={item.id} />
                  </span>
                  <span className="mt-2 block font-bold">{loc(locale, item.name)}</span>
                  <span className="mt-1 block text-sm text-ink/70">{loc(locale, item.blurb)}</span>
                </button>
              );
            })}
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4">
            <label className="grid gap-1 text-sm font-semibold">
              {t("jobTitle")}
              <input
                className={fieldClass}
                value={title}
                maxLength={120}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              {t("jobDescription")}
              <textarea
                className={fieldClass}
                rows={5}
                maxLength={1000}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>
            <button
              type="button"
              className="text-start text-sm font-bold text-sea"
              onClick={() => setShowAlt((value) => !value)}
            >
              {t("addLanguage")}
            </button>
            {showAlt && (
              <div className="grid gap-3 rounded-2xl bg-mist p-3">
                <label className="grid gap-1 text-sm font-semibold">
                  {t("altTitle")}
                  <input className={fieldClass} value={titleAlt} maxLength={120} onChange={(event) => setTitleAlt(event.target.value)} />
                </label>
                <label className="grid gap-1 text-sm font-semibold">
                  {t("altDescription")}
                  <textarea className={fieldClass} rows={4} maxLength={1000} value={descriptionAlt} onChange={(event) => setDescriptionAlt(event.target.value)} />
                </label>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4">
            <label className="grid gap-1 text-sm font-semibold">
              {t("city")}
              <select
                className={fieldClass}
                value={city}
                onChange={(event) => setCity(event.target.value as CityId)}
              >
                <option value="">{t("choose")}</option>
                {CITIES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {loc(locale, item.name)}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              {t("address")}
              <input className={fieldClass} value={address} maxLength={160} onChange={(event) => setAddress(event.target.value)} />
            </label>
            <fieldset className="grid gap-2">
              <legend className="text-sm font-semibold">{t("time")}</legend>
              <div className="grid grid-cols-2 gap-2">
                {TIME_WINDOW_IDS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={timeWindow === item}
                    onClick={() => setTimeWindow(item)}
                    className={`rounded-2xl border px-3 py-3 text-sm font-bold ${
                      timeWindow === item ? "border-accent bg-[#E6F7FD] text-sea" : "border-line"
                    }`}
                  >
                    {timeT(item)}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="grid gap-1 text-sm font-semibold">
              {t("price")}
              <input
                className={fieldClass}
                inputMode="numeric"
                value={price}
                maxLength={6}
                onChange={(event) => setPrice(event.target.value.replace(/[^\d]/g, ""))}
              />
              <span className="text-xs font-medium text-ink/60">{t("priceHelp")}</span>
            </label>
          </div>
        )}

        {step === 3 && categoryRecord && city && timeWindow && (
          <div className="grid gap-4">
            <EmergencyBanner strong />
            <dl className="grid gap-3 text-sm">
              <Row label={t("steps.category")} value={loc(locale, categoryRecord.name)} />
              <Row label={t("jobTitle")} value={title} />
              <Row label={t("jobDescription")} value={description} />
              <Row label={t("city")} value={loc(locale, CITIES.find((item) => item.id === city)!.name)} />
              <Row label={t("address")} value={address} />
              <Row label={t("time")} value={timeT(timeWindow)} />
              <Row label={t("price")} value={price ? `₪${price}` : app("priceOpen")} />
            </dl>
            <label className="flex items-start gap-3 rounded-2xl border border-line p-3 text-sm leading-relaxed">
              <input
                type="checkbox"
                className="mt-1 size-4 accent-[#009DE0]"
                checked={ack}
                onChange={(event) => setAck(event.target.checked)}
              />
              <span>{t("ack")}</span>
            </label>
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm font-semibold text-[#8A4B08]" role="alert">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            className={btnSecondary}
            onClick={() => {
              setError(null);
              setStep((value) => Math.max(0, value - 1));
            }}
            disabled={step === 0}
          >
            {t("back")}
          </button>
          {step < steps.length - 1 ? (
            <button type="button" className={btnPrimary} onClick={next}>
              {t("next")}
            </button>
          ) : (
            <button type="button" className={btnPrimary} onClick={submit}>
              {t("submit")}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-line pb-2">
      <dt className="text-xs font-bold uppercase tracking-wide text-ink/45">{label}</dt>
      <dd className="whitespace-pre-wrap font-semibold">{value}</dd>
    </div>
  );
}
