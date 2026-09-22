import { Suspense } from "react";
import { JobDetail } from "@/components/job-detail";

export default async function ProJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="h-40 animate-pulse rounded-3xl bg-mist" />}>
      <JobDetail id={id} audience="pro" />
    </Suspense>
  );
}
