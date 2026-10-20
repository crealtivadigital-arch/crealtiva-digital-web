// Pinta el texto simple de una diapositiva sin usar HTML crudo:
// "## " subtítulo · "- " viñeta · "1. " numerada · **negrita** · línea vacía separa bloques

function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-teal">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

export default function SlideBody({ body, large }: { body: string; large?: boolean }) {
  const blocks: React.ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  const flush = () => {
    if (!list) return;
    const Tag = list.ordered ? "ol" : "ul";
    blocks.push(
      <Tag key={blocks.length} className={`space-y-2 pl-6 ${list.ordered ? "list-decimal" : "list-disc marker:text-magenta"}`}>
        {list.items.map((it, i) => (
          <li key={i}>{inline(it)}</li>
        ))}
      </Tag>
    );
    list = null;
  };

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    const bullet = line.match(/^[-•]\s+(.*)/);
    const numbered = line.match(/^\d+[.)]\s+(.*)/);
    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      if (list && list.ordered !== ordered) flush();
      list ??= { ordered, items: [] };
      list.items.push((bullet ?? numbered)![1]);
      continue;
    }
    flush();
    if (!line) continue;
    if (line.startsWith("## ")) blocks.push(<h3 key={blocks.length} className="font-display text-[1.2em] text-teal">{line.slice(3)}</h3>);
    else blocks.push(<p key={blocks.length}>{inline(line)}</p>);
  }
  flush();

  return <div className={`space-y-3 leading-relaxed ${large ? "text-[max(12px,1.65cqw)]" : "text-sm"}`}>{blocks}</div>;
}
