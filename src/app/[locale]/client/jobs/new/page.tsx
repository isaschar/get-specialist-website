import { Suspense } from "react";
import { NewJobWizard } from "@/components/new-job-wizard";

export default function NewJobPage() {
  return (
    <Suspense fallback={<div className="h-40 animate-pulse rounded-3xl bg-mist" />}>
      <NewJobWizard />
    </Suspense>
  );
}
