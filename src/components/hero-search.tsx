"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { loc } from "@/lib/locale-text";
import { CITIES } from "@/lib/taxonomy";
import type { CityId } from "@/lib/types";

export function HeroSearch({ cta, label }: { cta: string; label: string }) {
  const locale = useLocale();
  const router = useRouter();
  const [city, setCity] = useState<CityId>("tel_aviv");

  return (
    <form
      className="mt-8 flex w-full max-w-[560px] items-center rounded-full bg-white p-1.5 ps-4 text-ink shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
      onSubmit={(event) => {
        event.preventDefault();
        router.push(`/client/jobs/new?city=${city}`);
      }}
    >
      <label className="sr-only" htmlFor="hero-city">
        {label}
      </label>
      <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-ink/70" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2.5a6.5 6.5 0 0 0-6.5 6.5c0 4.7 6.5 12.5 6.5 12.5s6.5-7.8 6.5-12.5A6.5 6.5 0 0 0 12 2.5Zm0 8.8a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6Z"
        />
      </svg>
      <select
        id="hero-city"
        value={city}
        onChange={(event) => setCity(event.target.value as CityId)}
        className="min-w-0 flex-1 appearance-none bg-transparent py-3 ps-3 pe-2 text-base font-medium text-ink outline-none"
      >
        {CITIES.map((item) => (
          <option key={item.id} value={item.id}>
            {loc(locale, item.name)}
          </option>
        ))}
      </select>
      <button
        type="submit"
        aria-label={cta}
        className="grid size-11 shrink-0 place-items-center rounded-full bg-[#E7F6FC] text-accent hover:bg-white"
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}
