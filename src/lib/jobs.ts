import type { Job, JobStatus, Localized, TimeWindowId } from "./types";

export type CreateJobInput = {
  category: Job["category"];
  title: Localized;
  description: Localized;
  city: Job["city"];
  address: Localized;
  timeWindow: TimeWindowId;
  priceIntent: number | null;
};

const CLAIMABLE = new Set<JobStatus>(["POSTED", "MATCHING", "OFFERED"]);
const CLIENT_CANCELLABLE = new Set<JobStatus>([
  "DRAFT",
  "POSTED",
  "MATCHING",
  "OFFERED",
  "ACCEPTED",
  "CONFIRMED",
]);
const PRO_RELEASABLE = new Set<JobStatus>(["ACCEPTED", "CONFIRMED", "EN_ROUTE"]);

export type JobError =
  | "not_found"
  | "offline"
  | "not_claimable"
  | "not_owner"
  | "bad_transition"
  | "not_client"
  | "not_pro";

function withStatus(job: Job, status: JobStatus, at: string, patch: Partial<Job> = {}): Job {
  return {
    ...job,
    ...patch,
    status,
    updatedAt: at,
    history: [...job.history, { status, at }],
  };
}

export function createJobRecord(input: CreateJobInput, clientId: string, at: string): Job {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? `job-${crypto.randomUUID()}`
      : `job-${Date.now()}`;
  return {
    id,
    title: input.title,
    description: input.description,
    category: input.category,
    city: input.city,
    address: input.address,
    timeWindow: input.timeWindow,
    priceIntent: input.priceIntent,
    status: "MATCHING",
    clientId,
    proId: null,
    createdAt: at,
    updatedAt: at,
    payoutStatus: "NOT_APPLICABLE",
    history: [
      { status: "POSTED", at },
      { status: "MATCHING", at },
    ],
  };
}

export function claimJobRecord(
  job: Job,
  proId: string,
  at: string,
  online: boolean,
): Job | JobError {
  if (!online) return "offline";
  if (job.proId || !CLAIMABLE.has(job.status)) return "not_claimable";
  const accepted = withStatus(job, "ACCEPTED", at, { proId });
  return withStatus(accepted, "CONFIRMED", at, { proId });
}

export function advanceJobRecord(job: Job, proId: string, at: string): Job | JobError {
  if (job.proId !== proId) return "not_owner";
  if (job.status === "ACCEPTED" || job.status === "CONFIRMED") {
    return withStatus(job, "EN_ROUTE", at);
  }
  if (job.status === "EN_ROUTE") return withStatus(job, "IN_PROGRESS", at);
  if (job.status === "IN_PROGRESS") {
    return withStatus(job, "COMPLETED_PRO", at, { payoutStatus: "PENDING" });
  }
  return "bad_transition";
}

export function releaseJobRecord(job: Job, proId: string, at: string): Job | JobError {
  if (job.proId !== proId) return "not_owner";
  if (!PRO_RELEASABLE.has(job.status)) return "bad_transition";
  const cancelled = withStatus(job, "CANCELLED_PRO", at, { proId });
  return withStatus(cancelled, "MATCHING", at, {
    proId: null,
    payoutStatus: "NOT_APPLICABLE",
  });
}

export function cancelJobRecord(job: Job, clientId: string, at: string): Job | JobError {
  if (job.clientId !== clientId) return "not_owner";
  if (!CLIENT_CANCELLABLE.has(job.status)) return "bad_transition";
  return withStatus(job, "CANCELLED_CLIENT", at);
}

export function rateJobRecord(
  job: Job,
  clientId: string,
  score: number,
  comment: Localized,
  at: string,
): Job | JobError {
  if (job.clientId !== clientId) return "not_owner";
  if (job.status !== "COMPLETED_PRO") return "bad_transition";
  const completed = withStatus(job, "COMPLETED", at);
  return withStatus(completed, "RATED", at, {
    rating: { score, comment },
  });
}

export function isClaimable(job: Job): boolean {
  return !job.proId && CLAIMABLE.has(job.status);
}

export function proAction(status: JobStatus): "en_route" | "start" | "complete" | null {
  if (status === "ACCEPTED" || status === "CONFIRMED") return "en_route";
  if (status === "EN_ROUTE") return "start";
  if (status === "IN_PROGRESS") return "complete";
  return null;
}

export function canClientCancel(job: Job): boolean {
  return CLIENT_CANCELLABLE.has(job.status);
}
