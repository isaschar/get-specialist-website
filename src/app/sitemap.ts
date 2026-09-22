import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

const paths = [
  "",
  "/for-clients",
  "/for-pros",
  "/how-it-works",
  "/pricing",
  "/faq",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/login",
  "/dispatch",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-22");
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified,
      alternates: {
        languages: {
          en: `${siteUrl}/en${path}`,
          he: `${siteUrl}/he${path}`,
        },
      },
    })),
  );
}
