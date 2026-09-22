import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DraftBanner } from "@/components/draft-banner";
import { MarkdownDraft } from "@/components/markdown-draft";
import { MarketingShell } from "@/components/marketing-shell";
import { privacyEn, privacyHe } from "@/content/legal-bodies";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t("metaPrivacy") };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-4 py-10">
        <DraftBanner />
        <div className="mt-6">
          <MarkdownDraft source={locale === "he" ? privacyHe : privacyEn} />
        </div>
      </article>
    </MarketingShell>
  );
}
