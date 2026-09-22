import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { LoginPanel } from "@/components/login-panel";
import { MarketingShell } from "@/components/marketing-shell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "login" });
  return { title: t("title") };
}

export default function LoginPage() {
  return (
    <MarketingShell>
      <Suspense fallback={<div className="h-40" />}>
        <LoginPanel />
      </Suspense>
    </MarketingShell>
  );
}
