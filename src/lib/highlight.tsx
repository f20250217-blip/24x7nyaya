import React from "react";

/**
 * Strategic keyword highlighter. Wraps matched keywords in a brick-red
 * accent span. Case-insensitive, whole-phrase match. Silently no-ops
 * when none of the keywords are present (e.g. non-English translations),
 * so the component stays safe across all languages.
 */
export function Highlight({
  text,
  keywords,
  className = "text-[#C8141E] font-semibold",
}: {
  text: string;
  keywords: string[];
  className?: string;
}) {
  if (!keywords.length) return <>{text}</>;

  const escaped = keywords
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(pattern);
  const keywordSet = new Set(keywords.map((k) => k.toLowerCase()));

  return (
    <>
      {parts.map((part, i) =>
        keywordSet.has(part.toLowerCase()) ? (
          <span key={i} className={className}>
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}
