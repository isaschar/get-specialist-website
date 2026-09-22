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
      className="mt-8 flex w-full max-w-[560px] items-center rounded-full border border-[#E6EAEE] bg-white p-1.5 ps-4 shadow-[0_8px_30px_rgba(20,20,20,0.08)]"
      onSubmit={(event) => {
        event.preventDefault();
        router.push(`/client/jobs/new?city=${city}`);
      }}
    >
      <label className="sr-only" htmlFor="hero-city">
        {label}
      </label>
      <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-ink" aria-hidden="true">
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
        className="shrink-0 rounded-full bg-accent px-5 py-3 text-[15px] font-semibold text-white hover:brightness-110"
      >
        {cta}
      </button>
    </form>
  );
}
