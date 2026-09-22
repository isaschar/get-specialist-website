import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";
import { MarketingShell } from "@/components/marketing-shell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("metaTitle") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  return (
    <MarketingShell>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">{t("heroTitle")}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink/80">{t("heroBody")}</p>
        </div>
        <ContactForm />
      </section>
    </MarketingShell>
  );
}
