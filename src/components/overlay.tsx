"use client";

import { useEffect, useId, useRef } from "react";

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Overlay({
  title,
  onClose,
  children,
  initial = "first",
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  initial?: "first" | "last";
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const previous = document.activeElement as HTMLElement | null;
    const nodes = () =>
      [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (node) => !node.hasAttribute("disabled"),
      );
    const start = nodes();
    (initial === "last" ? start[start.length - 1] : start[0])?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const items = nodes();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [initial]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(20,20,20,0.45)] p-0 sm:items-center sm:p-4">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-t-3xl bg-paper p-5 shadow-xl sm:rounded-3xl"
      >
        <h2 id={titleId} className="text-xl font-bold tracking-tight text-ink">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
