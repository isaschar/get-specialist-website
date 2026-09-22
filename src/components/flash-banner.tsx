"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { clearFlash, readFlash, subscribeFlash } from "@/lib/flash";

let booted = false;

function readBootedFlash() {
  if (!booted) return null;
  return readFlash();
}

export function FlashBanner() {
  const code = useSyncExternalStore(subscribeFlash, readBootedFlash, () => null);
  useEffect(() => {
    booted = true;
    window.dispatchEvent(new Event("gs-flash-boot"));
  }, []);
  const t = useTranslations("flash");
  if (!code) return null;
  const known = [
    "posted",
    "cancelled",
    "rated",
    "wrongRole",
    "err_not_found",
    "err_offline",
    "err_not_claimable",
    "err_not_owner",
    "err_bad_transition",
    "err_not_client",
    "err_not_pro",
    "err_session",
  ] as const;
  const message = (known as readonly string[]).includes(code)
    ? t(code as (typeof known)[number])
    : code;

  return (
    <div className="border-b border-line bg-mist" role="status">
      <div className="mx-auto flex max-w-[1200px] items-start justify-between gap-4 px-4 py-3 md:px-6">
        <p className="text-sm font-semibold text-ink">{message}</p>
        <button type="button" className="shrink-0 text-sm font-semibold text-ink underline" onClick={clearFlash}>
          {t("dismiss")}
        </button>
      </div>
    </div>
  );
}
