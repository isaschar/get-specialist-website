"use client";

import { AppShell } from "@/components/app-shell";

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return <AppShell role="pro">{children}</AppShell>;
}
