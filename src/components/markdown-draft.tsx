import { RichText } from "./rich-text";

type Block =
  | { type: "h1" | "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] };

function parse(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trimEnd();
    if (line.trim() === "") {
      index += 1;
      continue;
    }
    if (line.startsWith("#### ")) {
      blocks.push({ type: "h2", text: line.slice(5).trim() });
      index += 1;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h1", text: line.slice(4).trim() });
      index += 1;
      continue;
    }
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trimEnd().startsWith("- ")) {
        items.push(lines[index].trimEnd().slice(2).trim());
        index += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index].trimEnd())) {
        items.push(lines[index].trimEnd().replace(/^\d+\.\s/, "").trim());
        index += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }
    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() !== "" &&
      !lines[index].startsWith("#") &&
      !lines[index].trimEnd().startsWith("- ") &&
      !/^\d+\.\s/.test(lines[index].trimEnd())
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "p", text: paragraph.join(" ") });
  }
  return blocks;
}

export function MarkdownDraft({ source }: { source: string }) {
  const blocks = parse(source);
  return (
    <div className="max-w-none break-words text-base leading-relaxed text-ink">
      {blocks.map((block, index) => {
        if (block.type === "h1") {
          return (
            <h1 key={index} className="text-3xl font-extrabold tracking-tight md:text-4xl">
              <RichText text={block.text} />
            </h1>
          );
        }
        if (block.type === "h2") {
          return (
            <h2 key={index} className="mt-8 text-xl font-bold tracking-tight">
              <RichText text={block.text} />
            </h2>
          );
        }
        if (block.type === "ul" || block.type === "ol") {
          const List = block.type === "ul" ? "ul" : "ol";
          return (
            <List
              key={index}
              className={`mt-3 space-y-2 ps-5 ${block.type === "ul" ? "list-disc" : "list-decimal"}`}
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <RichText text={item} />
                </li>
              ))}
            </List>
          );
        }
        if (block.type === "p") {
          return (
            <p key={index} className="mt-3">
              <RichText text={block.text} />
            </p>
          );
        }
        return null;
      })}
    </div>
  );
}
