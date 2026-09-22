# Get Specialist (מגיע מומחה)

Bilingual Hebrew and English marketplace for non-emergency home services in Israel. This repository is the marketing site plus a browser demo of the client app, the pro app, and a dispatch board.

Jobs, login, and availability stay in `localStorage` in this browser. Nothing is sent to a server, and no payment is processed.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site redirects to Hebrew (`/he`) or to the language your browser prefers. English lives at `/en`.

```bash
npm run build
npm start
```

## What you can click through

- **Language** — the footer shows EN / עברית and switches the whole interface, including right-to-left layout. Routes stay `/en` and `/he`.
- **DEMO chip** — the header keeps a DEMO label. On the client app, pro app, and dispatch board it also names the role.
- **Client demo** — Log in → Maya R., Yonatan S., or Noa L. Post a request from **New request**. A session flash (not a toast) confirms it. Cancel asks in a dialog before the job leaves the board.
- **Pro demo** — Log in → Avi K. or David M. lands on `/pro` (availability, needs-action, nearby jobs). Claiming asks for confirmation. Earnings stay a stub: “Demo only · not a real payout”.
- **Pricing and FAQ** — `/pricing` and `/faq` in both languages. The fee line is the TBD one-liner only. No amounts are invented.
- **Dispatch** — `/dispatch` groups every demo job as pending → assigned → in progress → completed.
- **Reset** — Log in page → “Reset demo data” opens a confirm dialog and restores the three sample jobs (Tel Aviv-Yafo, Haifa, Jerusalem).

A new deploy is the same Next.js app: `npm run build` then `npm start`, or the existing host’s production build. No new environment variables are required. `robots.txt` and `sitemap.xml` use `https://get-specialist-website.vercel.app` unless `NEXT_PUBLIC_SITE_URL` is set. Jobs stay in `localStorage` and sync across tabs. Each tab’s role stays in `sessionStorage`, so one window can remain a client while another remains a pro. Session notes use `gs.flash`.

Sample people use reserved demo phone numbers (`050-000-…`). They are not real customers.

## Legal placeholders

Privacy and Terms are **DRAFT — NOT LEGAL ADVICE**. They are product scaffolding, not a filed policy and not a substitute for counsel.

Company details are left as tokens on purpose. Do **not** invent a company number or a registered address.

Edit only `src/lib/placeholders.ts`:

| Token | Replace with |
| --- | --- |
| `[COMPANY_LEGAL_NAME]` | Legal name from counsel / corporate docs |
| `[COMPANY_NUMBER]` | Real company number from the registrar — never a guessed one |
| `[REGISTERED_ADDRESS]` | Registered address |
| `[PRIVACY_EMAIL]` | Privacy contact |
| `[SUPPORT_EMAIL]` | Support contact |
| `[EFFECTIVE_DATE]` | Date the live policy takes effect |
| `[COURTS_TBD]` | Court venue counsel actually chooses |

The drafts in `src/content/legal-bodies.ts` keep those tokens inline. The site substitutes whatever you put in `legalPlaceholders`. Until you change them, the pages show the brackets.

Have counsel review the Hebrew and English drafts before any public launch. The banner on `/privacy` and `/terms` should stay until that review is done.

## Brand

White surfaces `#FFFFFF` and `#F7F9FA`, text `#141414`, accent `#009DE0`, highlight `#00C2E8`, borders `#E8ECF0`. The home hero uses the `#00C2E8` field with white type; the footer is `#141414`. The mark is an original house icon. Do not add third-party delivery logos or names.

## Stack

Next.js App Router, TypeScript, Tailwind CSS, next-intl (`he` / `en`).
