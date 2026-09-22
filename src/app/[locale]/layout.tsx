import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { DemoProvider } from "@/components/demo-provider";
import { routing } from "@/i18n/routing";
import "../globals.css";

const arimo = Arimo({
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arimo",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: {
      default: t("title"),
      template: `%s · ${t("title")}`,
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "he" ? "rtl" : "ltr"} className={arimo.variable}>
      <body className="min-h-dvh bg-paper font-sans text-ink antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <DemoProvider>{children}</DemoProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
