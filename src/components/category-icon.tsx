import type { CategoryId } from "@/lib/types";

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CategoryIcon({
  id,
  className = "size-6",
}: {
  id: CategoryId;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {paths(id)}
    </svg>
  );
}

function paths(id: CategoryId) {
  switch (id) {
    case "plumbing":
      return (
        <path
          {...common}
          d="M8 3v5a4 4 0 0 0 4 4h1v2.5M14 3v2.5M9 19.5h6M8 19.5a2.5 2.5 0 0 0 5 0V14"
        />
      );
    case "electricity":
      return <path {...common} d="M13 2 5 14h6l-1 8 8-12h-6l1-8Z" />;
    case "hvac":
      return (
        <>
          <circle {...common} cx="12" cy="12" r="3" />
          <path
            {...common}
            d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"
          />
        </>
      );
    case "locksmith":
      return (
        <path
          {...common}
          d="M8 10a4 4 0 1 1 7.2 2.4L21 18l-2 2-1.2-1.2L16.4 20l-1.5-1.5 1.2-1.2-1.6-1.6-5.2-1.2A4 4 0 0 1 8 10Z"
        />
      );
    case "painting":
      return (
        <path
          {...common}
          d="M4 5h12a2 2 0 0 1 2 2v2H4V5Zm0 4h14v2a3 3 0 0 1-3 3h-2l-1 6h-3l.5-6H7a3 3 0 0 1-3-3V9Z"
        />
      );
    case "cleaning":
      return (
        <>
          <path {...common} d="M12 3v4M8 5l1.5 2.5M16 5l-1.5 2.5" />
          <path {...common} d="m8 14 4-4 4 4-4 7-4-7Z" />
        </>
      );
    case "appliances":
      return (
        <>
          <rect {...common} x="5" y="3" width="14" height="18" rx="2" />
          <path {...common} d="M8 7h.01M5 10h14" />
          <circle {...common} cx="12" cy="15" r="2" />
        </>
      );
    case "moving":
      return (
        <path
          {...common}
          d="M3 8h11v10H3V8Zm11 3h4l3 3v4h-7v-7ZM7 18a1.5 1.5 0 1 0 0 .01M17 18a1.5 1.5 0 1 0 0 .01"
        />
      );
    case "handyman":
      return (
        <path
          {...common}
          d="M14.5 6.5a3.5 3.5 0 0 0-4.8 4.6L4 16.8 7.2 20l5.7-5.7a3.5 3.5 0 0 0 4.6-4.8L15 12l-3-3 2.5-2.5Z"
        />
      );
    case "pest":
      return (
        <>
          <ellipse {...common} cx="12" cy="14" rx="4" ry="5" />
          <path
            {...common}
            d="M12 9V5M8 6 6 4M16 6l2-2M7 12H4M20 12h-3M8 17l-2 3M16 17l2 3"
          />
        </>
      );
    case "gardening":
      return (
        <path
          {...common}
          d="M12 21V11M12 11c0-4 3-6 7-6-1 4-3 6-7 6Zm0 0c0-4-3-6-7-6 1 4 3 6 7 6Z"
        />
      );
  }
}
