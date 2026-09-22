"use client";

import { useTranslations } from "next-intl";
import { btnPrimary, btnSecondary } from "@/lib/ui";
import { useDemo } from "./demo-provider";
import { Overlay } from "./overlay";

export function ResetDemoDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations("overlay");
  const { reset } = useDemo();

  return (
    <Overlay title={t("resetTitle")} onClose={onClose} initial="last">
      <p className="mt-3 text-sm leading-relaxed text-ink/75">{t("resetBody")}</p>
      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button type="button" className={btnSecondary + " min-h-11"} onClick={onClose}>
          {t("resetKeep")}
        </button>
        <button
          type="button"
          className={btnPrimary + " min-h-11"}
          onClick={() => {
            reset();
            onClose();
          }}
        >
          {t("resetConfirm")}
        </button>
      </div>
    </Overlay>
  );
}
