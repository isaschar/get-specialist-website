/** Public origin for robots.txt and the sitemap. Override with NEXT_PUBLIC_SITE_URL. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://get-specialist-website.vercel.app").replace(
  /\/$/,
  "",
);
