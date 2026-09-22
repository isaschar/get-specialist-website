export const CATEGORY_IDS = [
  "plumbing",
  "electricity",
  "hvac",
  "locksmith",
  "painting",
  "cleaning",
  "appliances",
  "moving",
  "handyman",
  "pest",
  "gardening",
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export const CITY_IDS = ["tel_aviv", "jerusalem", "haifa"] as const;
export type CityId = (typeof CITY_IDS)[number];

export const TIME_WINDOW_IDS = [
  "morning",
  "afternoon",
  "evening",
  "flexible",
] as const;
export type TimeWindowId = (typeof TIME_WINDOW_IDS)[number];

/** Full dispatch enum from the product pack. */
export const JOB_STATUSES = [
  "DRAFT",
  "POSTED",
  "MATCHING",
  "OFFERED",
  "MATCHED",
  "ACCEPTED",
  "CONFIRMED",
  "EN_ROUTE",
  "ON_SITE",
  "IN_PROGRESS",
  "COMPLETED_PRO",
  "COMPLETED",
  "RATED",
  "CANCELLED_CLIENT",
  "CANCELLED_PRO",
  "CANCELLED_DISPATCH",
  "UNFILLED",
  "DISPUTED",
] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];

/** Simplified lifecycle shown in the product: pending → assigned → in progress → completed. */
export const LIFECYCLE_STAGES = [
  "pending",
  "assigned",
  "in_progress",
  "completed",
] as const;

export type LifecycleStage = (typeof LIFECYCLE_STAGES)[number] | "cancelled" | "disputed";

export const PAYOUT_STATUSES = [
  "NOT_APPLICABLE",
  "PENDING",
  "PROCESSING",
  "PAID",
  "FAILED",
] as const;

export type PayoutStatus = (typeof PAYOUT_STATUSES)[number];

export type Localized = { en: string; he: string };

export type JobHistoryEntry = {
  status: JobStatus;
  at: string;
};

export type Job = {
  id: string;
  title: Localized;
  description: Localized;
  category: CategoryId;
  city: CityId;
  address: Localized;
  timeWindow: TimeWindowId;
  priceIntent: number | null;
  status: JobStatus;
  clientId: string;
  proId: string | null;
  createdAt: string;
  updatedAt: string;
  rating?: { score: number; comment: Localized };
  payoutStatus: PayoutStatus;
  history: JobHistoryEntry[];
};

export type Role = "client" | "pro";

export type Session = { role: Role; userId: string } | null;

export type DemoState = {
  jobs: Job[];
  session: Session;
  availability: Record<string, boolean>;
};
