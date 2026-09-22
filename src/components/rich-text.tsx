import { applyPlaceholders } from "@/lib/placeholders";

const TOKEN = "\\[[A-Z][A-Z0-9_]+\\]";

function highlight(text: string, key: string) {
  const parts = text.split(new RegExp(`(${TOKEN})`, "g"));
  return parts.map((part, index) =>
    new RegExp(`^${TOKEN}$`).test(part) ? (
      <span
        key={`${key}-${index}`}
        className="rounded bg-[#E6F7FD] px-1 font-mono text-[0.92em] text-sea"
      >
        {part}
      </span>
    ) : (
      <span key={`${key}-${index}`}>{part}</span>
    ),
  );
}

export function RichText({ text }: { text: string }) {
  const resolved = applyPlaceholders(text);
  const chunks = resolved.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {chunks.map((chunk, index) => {
        if (chunk.startsWith("`") && chunk.endsWith("`") && chunk.length >= 2) {
          return (
            <code key={index} className="rounded bg-mist px-1 font-mono text-[0.92em]">
              {highlight(chunk.slice(1, -1), `c${index}`)}
            </code>
          );
        }
        if (chunk.startsWith("**") && chunk.endsWith("**") && chunk.length >= 4) {
          return (
            <strong key={index} className="font-bold">
              {highlight(chunk.slice(2, -2).replace(/`/g, ""), `b${index}`)}
            </strong>
          );
        }
        return <span key={index}>{highlight(chunk, `t${index}`)}</span>;
      })}
    </>
  );
}
