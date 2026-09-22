"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import {
  advanceJobRecord,
  cancelJobRecord,
  claimJobRecord,
  createJobRecord,
  rateJobRecord,
  releaseJobRecord,
  type CreateJobInput,
  type JobError,
} from "@/lib/jobs";
import { initialDemoState, normalizeDemoState } from "@/lib/seed";
import type { DemoState, Job, Localized, Role } from "@/lib/types";

const STORAGE_KEY = "get-specialist-demo-v1";
const SESSION_KEY = "get-specialist-demo-session";

type DemoContextValue = {
  ready: boolean;
  state: DemoState;
  login: (role: Role, userId: string) => void;
  logout: () => void;
  reset: () => void;
  createJob: (input: CreateJobInput) => Job | null;
  claimJob: (jobId: string) => JobError | null;
  advanceJob: (jobId: string) => JobError | null;
  releaseJob: (jobId: string) => JobError | null;
  cancelJob: (jobId: string) => JobError | null;
  rateJob: (jobId: string, score: number, comment: Localized) => JobError | null;
  setAvailability: (on: boolean) => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);
const serverState = initialDemoState();
const listeners = new Set<() => void>();
let memory: DemoState | null = null;

function readTabSession(): DemoState["session"] | undefined {
  if (typeof window === "undefined") return undefined;
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (raw === null) return undefined;
  try {
    return raw === "null" ? null : (JSON.parse(raw) as DemoState["session"]);
  } catch {
    return undefined;
  }
}

function writeTabSession(session: DemoState["session"]) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function emit(next: DemoState) {
  memory = next;
  writeTabSession(next.session);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener());
}

function readClient(): DemoState {
  if (memory) return memory;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const base = raw ? normalizeDemoState(JSON.parse(raw)) : initialDemoState();
    const tabSession = readTabSession();
    const session = tabSession === undefined ? base.session : tabSession;
    memory = { ...base, session };
    if (tabSession === undefined) writeTabSession(session);
  } catch {
    memory = initialDemoState();
  }
  return memory;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function ensureStorageSync() {
  if (typeof window === "undefined") return;
  const flag = globalThis as { __gsStorage?: boolean };
  if (flag.__gsStorage) return;
  flag.__gsStorage = true;
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY || !event.newValue) return;
    try {
      const incoming = normalizeDemoState(JSON.parse(event.newValue));
      const tabSession = readTabSession();
      memory = { ...incoming, session: tabSession === undefined ? incoming.session : tabSession };
      listeners.forEach((listener) => listener());
    } catch {
      memory = initialDemoState();
      listeners.forEach((listener) => listener());
    }
  });
}

function updateJob(
  state: DemoState,
  jobId: string,
  updater: (job: Job) => Job | JobError,
): { state: DemoState; error: JobError | null } {
  const index = state.jobs.findIndex((job) => job.id === jobId);
  if (index < 0) return { state, error: "not_found" };
  const next = updater(state.jobs[index]);
  if (typeof next === "string") return { state, error: next };
  const jobs = state.jobs.slice();
  jobs[index] = next;
  return { state: { ...state, jobs }, error: null };
}

export function DemoProvider({ children }: { children: React.ReactNode }) {
  ensureStorageSync();
  const state = useSyncExternalStore(subscribe, readClient, () => serverState);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const value = useMemo<DemoContextValue>(() => {
    return {
      ready,
      state,
      login: (role, userId) => {
        emit({ ...readClient(), session: { role, userId } });
      },
      logout: () => emit({ ...readClient(), session: null }),
      reset: () => emit(initialDemoState()),
      createJob: (input) => {
        const current = readClient();
        if (!current.session || current.session.role !== "client") return null;
        const job = createJobRecord(input, current.session.userId, new Date().toISOString());
        emit({ ...current, jobs: [job, ...current.jobs] });
        return job;
      },
      claimJob: (jobId) => {
        const current = readClient();
        if (!current.session || current.session.role !== "pro") return "not_pro";
        const proId = current.session.userId;
        const online = current.availability[proId] !== false;
        const result = updateJob(current, jobId, (job) =>
          claimJobRecord(job, proId, new Date().toISOString(), online),
        );
        if (!result.error) emit(result.state);
        return result.error;
      },
      advanceJob: (jobId) => {
        const current = readClient();
        if (!current.session || current.session.role !== "pro") return "not_pro";
        const result = updateJob(current, jobId, (job) =>
          advanceJobRecord(job, current.session!.userId, new Date().toISOString()),
        );
        if (!result.error) emit(result.state);
        return result.error;
      },
      releaseJob: (jobId) => {
        const current = readClient();
        if (!current.session || current.session.role !== "pro") return "not_pro";
        const result = updateJob(current, jobId, (job) =>
          releaseJobRecord(job, current.session!.userId, new Date().toISOString()),
        );
        if (!result.error) emit(result.state);
        return result.error;
      },
      cancelJob: (jobId) => {
        const current = readClient();
        if (!current.session || current.session.role !== "client") return "not_client";
        const result = updateJob(current, jobId, (job) =>
          cancelJobRecord(job, current.session!.userId, new Date().toISOString()),
        );
        if (!result.error) emit(result.state);
        return result.error;
      },
      rateJob: (jobId, score, comment) => {
        const current = readClient();
        if (!current.session || current.session.role !== "client") return "not_client";
        const result = updateJob(current, jobId, (job) =>
          rateJobRecord(job, current.session!.userId, score, comment, new Date().toISOString()),
        );
        if (!result.error) emit(result.state);
        return result.error;
      },
      setAvailability: (on) => {
        const current = readClient();
        if (!current.session || current.session.role !== "pro") return;
        emit({
          ...current,
          availability: { ...current.availability, [current.session.userId]: on },
        });
      },
    };
  }, [ready, state]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used within DemoProvider");
  return context;
}
