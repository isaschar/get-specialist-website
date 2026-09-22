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

- **Language** — the header button switches the whole interface between עברית and English, including right-to-left layout.
- **Client demo** — Log in → Maya R., Yonatan S., or Noa L. Post a request from **New request**. It enters matching (`pending`).
- **Pro demo** — Log in → Avi K. or David M. **Available jobs** lists open requests (the Haifa AC job starts unassigned). **Claim this job** assigns it. Then mark on the way, start work, and complete. The client rates it to close the job.
- **Dispatch** — `/dispatch` groups every demo job as pending → assigned → in progress → completed.
- **Reset** — Log in page → “Reset demo data” restores the three sample jobs (Tel Aviv-Yafo, Haifa, Jerusalem).

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
