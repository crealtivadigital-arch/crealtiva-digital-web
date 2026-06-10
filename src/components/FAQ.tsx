"use client";
import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  bg?: "navy" | "cream";
}

export default function FAQ({ items, title = "Preguntas Frecuentes", bg = "navy" }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null);
  const isDark = bg === "navy";

  return (
    <section className={`${isDark ? "bg-navy" : "bg-cream"} py-20`}>
      <div className="max-w-3xl mx-auto px-6">
        <h2
          className={`font-grotesk font-bold text-2xl md:text-3xl mb-10 ${isDark ? "text-white" : "text-navy"}`}
        >
          {title}
        </h2>
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className={`rounded-card border ${
                isDark
                  ? "border-white/10 bg-white/3"
                  : "border-navy/10 bg-white"
              } overflow-hidden`}
            >
              <button
                className={`w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-grotesk font-semibold text-sm md:text-base ${
                  isDark ? "text-white" : "text-navy"
                }`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{item.q}</span>
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs transition-transform ${
                    isDark ? "border-white/20 text-white/50" : "border-navy/20 text-navy/50"
                  } ${open === i ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div
                  className={`px-6 pb-5 font-sans text-sm leading-relaxed ${
                    isDark ? "text-white/55" : "text-navy/60"
                  }`}
                >
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
