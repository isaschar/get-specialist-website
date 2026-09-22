import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DispatchBoard } from "@/components/dispatch-board";
import { MarketingShell } from "@/components/marketing-shell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dispatch" });
  return { title: t("title") };
}

export default function DispatchPage() {
  return (
    <MarketingShell>
      <DispatchBoard />
    </MarketingShell>
  );
}
