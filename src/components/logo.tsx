"use client";

import { useLocale } from "next-intl";

export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#009DE0" />
      <path
        fill="#ffffff"
        d="M16 6.2 6.8 14h2.4v10.2h5.2v-5.4h3.2v5.4h5.2V14h2.4L16 6.2Z"
      />
    </svg>
  );
}

export function Logo({ compact = false, tone = "dark" }: { compact?: boolean; tone?: "dark" | "light" }) {
  const locale = useLocale();
  const primary = locale === "he" ? "מגיע מומחה" : "Get Specialist";
  const secondary = locale === "he" ? "Get Specialist" : "מגיע מומחה";

  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className="leading-tight">
        <span className={`block text-[15px] font-bold tracking-tight ${tone === "light" ? "text-white" : "text-ink"}`}>
          {primary}
        </span>
        {!compact && (
          <span className={`block text-xs font-medium ${tone === "light" ? "text-white/60" : "text-ink/60"}`}>{secondary}</span>
        )}
      </span>
    </span>
  );
}
