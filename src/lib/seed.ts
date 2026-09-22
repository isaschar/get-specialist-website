import type {
  CategoryId,
  CityId,
  DemoState,
  Job,
  JobStatus,
  PayoutStatus,
  TimeWindowId,
} from "./types";
import {
  CATEGORY_IDS,
  CITY_IDS,
  JOB_STATUSES,
  PAYOUT_STATUSES,
  TIME_WINDOW_IDS,
} from "./types";

function history(pairs: [JobStatus, string][]): Job["history"] {
  return pairs.map(([status, at]) => ({ status, at }));
}

export function seedJobs(): Job[] {
  return [
    {
      id: "seed-sink",
      title: {
        en: "Kitchen sink leak under cabinet",
        he: "נזילה מכיור המטבח מתחת לארון",
      },
      description: {
        en: "Slow drip from the trap since yesterday. Cupboard is damp. Prefer evening visit.",
        he: "טפטוף איטי מהסיפון מאתמול. הארון רטוב. עדיפות לביקור בשעות הערב.",
      },
      category: "plumbing",
      city: "tel_aviv",
      address: {
        en: "Demo address, central Tel Aviv-Yafo",
        he: "כתובת הדגמה, מרכז תל אביב-יפו",
      },
      timeWindow: "evening",
      priceIntent: 350,
      status: "IN_PROGRESS",
      clientId: "maya",
      proId: "avi",
      createdAt: "2026-09-21T14:00:00.000Z",
      updatedAt: "2026-09-22T08:30:00.000Z",
      payoutStatus: "NOT_APPLICABLE",
      history: history([
        ["POSTED", "2026-09-21T14:00:00.000Z"],
        ["MATCHING", "2026-09-21T14:00:00.000Z"],
        ["ACCEPTED", "2026-09-21T15:10:00.000Z"],
        ["CONFIRMED", "2026-09-21T15:10:00.000Z"],
        ["EN_ROUTE", "2026-09-22T08:00:00.000Z"],
        ["IN_PROGRESS", "2026-09-22T08:30:00.000Z"],
      ]),
    },
    {
      id: "seed-ac",
      title: {
        en: "AC not cooling — living room split",
        he: "המזגן לא מקרר — עינית בסלון",
      },
      description: {
        en: "Unit runs but blows warm air. Filter cleaned last month. Need diagnosis before Shabbat if possible.",
        he: "היחידה עובדת אבל נושבת אוויר חם. הפילטר נוקה בחודש שעבר. אבחון לפני שבת אם אפשר.",
      },
      category: "hvac",
      city: "haifa",
      address: {
        en: "Demo address, Carmel, Haifa",
        he: "כתובת הדגמה, הכרמל, חיפה",
      },
      timeWindow: "afternoon",
      priceIntent: 280,
      status: "MATCHING",
      clientId: "yonatan",
      proId: null,
      createdAt: "2026-09-22T06:15:00.000Z",
      updatedAt: "2026-09-22T06:15:00.000Z",
      payoutStatus: "NOT_APPLICABLE",
      history: history([
        ["POSTED", "2026-09-22T06:15:00.000Z"],
        ["MATCHING", "2026-09-22T06:15:00.000Z"],
      ]),
    },
    {
      id: "seed-lock",
      title: {
        en: "Locked out of apartment — spare with neighbour unavailable",
        he: "ננעלתי מחוץ לדירה — גיבוי אצל השכן לא זמין",
      },
      description: {
        en: "Front door deadlock. No damage preferred. Adult on site with ID. Not a police emergency — just lockout.",
        he: "בריח בדלת הכניסה. עדיפות בלי נזק. בגיר במקום עם תעודה. לא חירום משטרתי — רק נעילה בחוץ.",
      },
      category: "locksmith",
      city: "jerusalem",
      address: {
        en: "Demo address, city center, Jerusalem",
        he: "כתובת הדגמה, מרכז העיר, ירושלים",
      },
      timeWindow: "morning",
      priceIntent: 400,
      status: "RATED",
      clientId: "noa",
      proId: "david",
      createdAt: "2026-09-18T07:00:00.000Z",
      updatedAt: "2026-09-18T09:40:00.000Z",
      payoutStatus: "PAID",
      rating: {
        score: 5,
        comment: {
          en: "Arrived quickly and opened the door without damage.",
          he: "הגיע מהר ופתח את הדלת בלי נזק.",
        },
      },
      history: history([
        ["POSTED", "2026-09-18T07:00:00.000Z"],
        ["MATCHING", "2026-09-18T07:00:00.000Z"],
        ["ACCEPTED", "2026-09-18T07:12:00.000Z"],
        ["CONFIRMED", "2026-09-18T07:12:00.000Z"],
        ["EN_ROUTE", "2026-09-18T07:40:00.000Z"],
        ["IN_PROGRESS", "2026-09-18T08:05:00.000Z"],
        ["COMPLETED_PRO", "2026-09-18T08:40:00.000Z"],
        ["COMPLETED", "2026-09-18T09:40:00.000Z"],
        ["RATED", "2026-09-18T09:40:00.000Z"],
      ]),
    },
  ];
}

export function initialDemoState(): DemoState {
  return {
    jobs: seedJobs(),
    session: null,
    availability: { avi: true, david: true },
  };
}

function isLocalized(value: unknown): value is { en: string; he: string } {
  if (!value || typeof value !== "object") return false;
  const record = value as { en?: unknown; he?: unknown };
  return typeof record.en === "string" && typeof record.he === "string";
}

function isStatus(value: unknown): value is JobStatus {
  return typeof value === "string" && (JOB_STATUSES as readonly string[]).includes(value);
}

function isPayout(value: unknown): value is PayoutStatus {
  return typeof value === "string" && (PAYOUT_STATUSES as readonly string[]).includes(value);
}

function coerceJob(value: unknown): Job | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<Job>;
  if (typeof raw.id !== "string" || !isStatus(raw.status)) return null;
  if (!isLocalized(raw.title) || !isLocalized(raw.description) || !isLocalized(raw.address)) {
    return null;
  }
  if (
    typeof raw.category !== "string" ||
    !(CATEGORY_IDS as readonly string[]).includes(raw.category)
  ) {
    return null;
  }
  if (typeof raw.city !== "string" || !(CITY_IDS as readonly string[]).includes(raw.city)) {
    return null;
  }
  if (
    typeof raw.timeWindow !== "string" ||
    !(TIME_WINDOW_IDS as readonly string[]).includes(raw.timeWindow)
  ) {
    return null;
  }
  if (typeof raw.clientId !== "string") return null;
  if (!Array.isArray(raw.history)) return null;
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    category: raw.category as CategoryId,
    city: raw.city as CityId,
    address: raw.address,
    timeWindow: raw.timeWindow as TimeWindowId,
    priceIntent: typeof raw.priceIntent === "number" ? raw.priceIntent : null,
    status: raw.status,
    clientId: raw.clientId,
    proId: typeof raw.proId === "string" ? raw.proId : null,
    createdAt: typeof raw.createdAt === "string" ? raw.createdAt : new Date(0).toISOString(),
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : new Date(0).toISOString(),
    payoutStatus: isPayout(raw.payoutStatus) ? raw.payoutStatus : "NOT_APPLICABLE",
    history: raw.history.filter(
      (entry): entry is Job["history"][number] =>
        !!entry &&
        typeof entry === "object" &&
        isStatus((entry as { status?: unknown }).status) &&
        typeof (entry as { at?: unknown }).at === "string",
    ),
    rating:
      raw.rating &&
      typeof raw.rating === "object" &&
      typeof raw.rating.score === "number" &&
      isLocalized(raw.rating.comment)
        ? { score: raw.rating.score, comment: raw.rating.comment }
        : undefined,
  };
}

export function normalizeDemoState(value: unknown): DemoState {
  const base = initialDemoState();
  if (!value || typeof value !== "object") return base;
  const raw = value as Partial<DemoState>;
  const jobs = Array.isArray(raw.jobs)
    ? raw.jobs.map(coerceJob).filter((job): job is Job => job !== null)
    : base.jobs;
  const session = raw.session;
  const safeSession =
    session &&
    typeof session === "object" &&
    (session.role === "client" || session.role === "pro") &&
    typeof session.userId === "string"
      ? { role: session.role, userId: session.userId }
      : null;
  const availability = raw.availability ?? {};
  return {
    jobs: jobs.length > 0 ? jobs : base.jobs,
    session: safeSession,
    availability: {
      avi: availability.avi !== false,
      david: availability.david !== false,
    },
  };
}
