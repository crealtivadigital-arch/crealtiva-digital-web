"use client";

import { useEffect, useState } from "react";
import { compareRows } from "@/content/marketing";

export type ComparePackage = { slug: string; name: string; price: string; family: string; stage: string };

// Comparador "A vs B" de los planes de marketing. El quiz puede fijar la pareja con el evento "compare:set".
export default function PackageCompare({ pkgs }: { pkgs: ComparePackage[] }) {
  const [a, setA] = useState("crealtiva-bite-meta");
  const [b, setB] = useState("crealtiva-tasty-popular");

  useEffect(() => {
    const onSet = (e: Event) => {
      const { a, b } = (e as CustomEvent<{ a: string; b: string }>).detail;
      setA(a);
      setB(b);
    };
    window.addEventListener("compare:set", onSet);
    return () => window.removeEventListener("compare:set", onSet);
  }, []);

  const pa = pkgs.find((p) => p.slug === a)!;
  const pb = pkgs.find((p) => p.slug === b)!;
  const rows = [
    { label: "Precio", va: pa.price, vb: pb.price },
    { label: "Fase", va: pa.stage, vb: pb.stage },
    ...compareRows.map((r) => ({ label: r.label, va: r.values[a], vb: r.values[b] })),
  ];

  return (
    <section id="comparar" className="scroll-mt-20 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">Comparador</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-navy md:text-4xl">Compara dos planes, lado a lado</h2>
          <p className="mx-auto mt-3 max-w-xl text-navy/60">Elige dos planes y mira en qué se diferencian.</p>
        </div>

        {/* Selectores A vs B */}
        <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6">
          <Picker value={a} onChange={setA} pkgs={pkgs} tone="teal" />
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-magenta font-display text-lg text-cream shadow-[0_10px_25px_-8px_rgba(234,27,126,0.7)] md:h-14 md:w-14">
            VS
          </span>
          <Picker value={b} onChange={setB} pkgs={pkgs} tone="magenta" />
        </div>

        <div className="mt-8 overflow-hidden rounded-block ring-1 ring-navy/10">
          <table className="w-full table-fixed text-left text-sm">
            <caption className="sr-only">
              Comparación entre {pa.name} y {pb.name}
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[28%] bg-navy/[0.04] px-3 py-4 font-semibold text-navy/50 md:px-6">
                  &nbsp;
                </th>
                <th scope="col" className="bg-teal px-3 py-4 font-semibold text-cream md:px-6">
                  {pa.name.replace("Crealtiva ", "")}
                </th>
                <th scope="col" className="bg-magenta px-3 py-4 font-semibold text-cream md:px-6">
                  {pb.name.replace("Crealtiva ", "")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const differs = String(r.va) !== String(r.vb);
                return (
                  <tr key={r.label} className="border-t border-navy/10">
                    <th scope="row" className="px-3 py-3.5 align-top text-xs font-semibold text-navy/60 md:px-6 md:text-sm">
                      {r.label}
                    </th>
                    <td className={`px-3 py-3.5 align-top md:px-6 ${differs ? "bg-teal/[0.06]" : ""}`}>
                      <Value v={r.va} />
                    </td>
                    <td className={`px-3 py-3.5 align-top md:px-6 ${differs ? "bg-magenta/[0.05]" : ""}`}>
                      <Value v={r.vb} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={`#${a}`} className="rounded-full bg-teal px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-teal-dark">
            Ver {pa.name.replace("Crealtiva ", "")}
          </a>
          <a href={`#${b}`} className="rounded-full bg-magenta px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-magenta-light">
            Ver {pb.name.replace("Crealtiva ", "")}
          </a>
        </div>
      </div>
    </section>
  );
}

function Value({ v }: { v: string | boolean | undefined }) {
  if (v === true) return <span className="font-bold text-teal">✓ Incluido</span>;
  if (v === false || v === undefined) return <span className="text-navy/30">—</span>;
  return <span className="text-navy/80">{v}</span>;
}

function Picker({
  value,
  onChange,
  pkgs,
  tone,
}: {
  value: string;
  onChange: (v: string) => void;
  pkgs: ComparePackage[];
  tone: "teal" | "magenta";
}) {
  return (
    <label className="block">
      <span className="sr-only">Plan a comparar</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full cursor-pointer appearance-none rounded-full bg-cream px-3 py-3 text-center text-sm font-semibold text-navy ring-2 md:text-base ${
          tone === "teal" ? "ring-teal/50 focus:ring-teal" : "ring-magenta/50 focus:ring-magenta"
        } focus:outline-none`}
      >
        {pkgs.map((p) => (
          <option key={p.slug} value={p.slug}>
            {p.name.replace("Crealtiva ", "")}
          </option>
        ))}
      </select>
    </label>
  );
}
