"use client";

import { useState } from "react";
import { questions, recommend, type Answers } from "@/content/marketing";
import { wa } from "@/lib/constants";

export type QuizPackage = { name: string; tagline?: string; price: string; family: string };

// Quiz de 7 preguntas, una a la vez: orienta hacia el plan de marketing ideal.
export default function PackageQuiz({ pkgs }: { pkgs: Record<string, QuizPackage> }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const done = step >= questions.length;
  const q = questions[Math.min(step, questions.length - 1)];

  const choose = (value: string) => {
    if (q.multi) {
      const list = (answers[q.id] as string[] | undefined) ?? [];
      setAnswers({ ...answers, [q.id]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] });
      return;
    }
    setAnswers({ ...answers, [q.id]: value });
    setTimeout(() => setStep((s) => s + 1), 220);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <section id="quiz" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-teal-dark via-navy to-navy py-20 md:py-24">
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-magenta/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">Quiz · 1 minuto</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-cream md:text-5xl">Orientemos el servicio ideal para ti</h2>
          <p className="mt-5 text-lg font-light leading-relaxed text-cream/65">
            Responde 7 preguntas rápidas y te decimos qué plan de marketing encaja con tu negocio hoy, y por qué.
          </p>
        </div>

        <div className="rounded-block bg-white p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] md:p-8">
          {/* Progreso */}
          <div className="flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-navy/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal to-magenta transition-all duration-500"
                style={{ width: `${(Math.min(step, questions.length) / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-navy/50">
              {done ? "Listo" : `${step + 1} / ${questions.length}`}
            </span>
          </div>

          {!done ? (
            <div key={step} className="animate-[quiz-in_0.35s_ease-out]">
              <h3 className="mt-6 font-display text-2xl leading-tight text-navy">{q.title}</h3>
              {q.hint && <p className="mt-1 text-sm text-navy/50">{q.hint}</p>}
              <div className={`mt-6 grid gap-3 ${q.options.length > 3 ? "sm:grid-cols-2" : ""}`}>
                {q.options.map((o) => {
                  const current = answers[q.id];
                  const selected = Array.isArray(current) ? current.includes(o.value as never) : current === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => choose(o.value)}
                      aria-pressed={selected}
                      className={`flex items-center gap-3 rounded-card px-4 py-3.5 text-left font-semibold transition ${
                        selected
                          ? "bg-teal text-cream shadow-lg"
                          : "bg-cream text-navy ring-1 ring-navy/5 hover:-translate-y-0.5 hover:ring-teal/50"
                      }`}
                    >
                      <span aria-hidden className="text-xl">
                        {o.emoji}
                      </span>
                      {o.label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="text-sm font-semibold text-navy/50 hover:text-navy disabled:invisible"
                >
                  ← Atrás
                </button>
                {q.multi && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!((answers[q.id] as string[] | undefined)?.length)}
                    className="rounded-full bg-magenta px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-magenta-light disabled:bg-navy/20"
                  >
                    Continuar →
                  </button>
                )}
              </div>
            </div>
          ) : (
            <Result answers={answers} pkgs={pkgs} onRestart={restart} />
          )}
        </div>
      </div>
    </section>
  );
}

function Result({ answers, pkgs, onRestart }: { answers: Answers; pkgs: Record<string, QuizPackage>; onRestart: () => void }) {
  const rec = recommend(answers);
  const pkg = pkgs[rec.slug];
  const alt = rec.alternative ? pkgs[rec.alternative] : undefined;

  const summary = questions
    .map((q) => {
      const v = answers[q.id];
      const labels = (Array.isArray(v) ? v : [v]).map((x) => q.options.find((o) => o.value === x)?.label).filter(Boolean);
      return labels.length ? `${q.title.replace(/[¿?]/g, "")}: ${labels.join(", ")}` : null;
    })
    .filter(Boolean)
    .join("\n");
  const message = `Hola, hice el quiz de Marketing Digital y me recomendó el plan ${pkg?.name}.\n\n${summary}\n\n¿Podemos conversar?`;

  const compare = () => {
    if (!rec.alternative) return;
    window.dispatchEvent(new CustomEvent("compare:set", { detail: { a: rec.slug, b: rec.alternative } }));
    document.getElementById("comparar")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="animate-[quiz-in_0.35s_ease-out]">
      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-magenta">Tu plan ideal es</p>
      <h3 className="mt-2 font-display text-3xl leading-tight text-navy">{pkg?.name}</h3>
      <p className="mt-1 font-semibold text-teal">
        {pkg?.family} · {pkg?.price}
      </p>

      <ul className="mt-5 space-y-2">
        {rec.reasons.map((r) => (
          <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-navy/75">
            <span aria-hidden className="font-bold text-teal">✓</span>
            {r}
          </li>
        ))}
      </ul>

      {rec.tips.length > 0 && (
        <ul className="mt-5 space-y-2">
          {rec.tips.map((t) => (
            <li key={t.href} className="flex flex-wrap items-center gap-x-2 rounded-card bg-magenta/[0.06] px-4 py-3 text-sm text-navy/75">
              <span>💡 {t.text}</span>
              <a href={t.href} className="font-semibold text-magenta hover:underline">
                {t.label} →
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-7 flex flex-wrap gap-3">
        <a
          href={`#${rec.slug}`}
          className="rounded-full bg-magenta px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-magenta-light"
        >
          Ver el plan {pkg?.name.replace("Crealtiva ", "")}
        </a>
        {alt && (
          <button
            type="button"
            onClick={compare}
            className="rounded-full border border-navy/15 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
          >
            Comparar con {alt.name.replace("Crealtiva ", "")}
          </button>
        )}
        <a
          href={wa(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-navy/15 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
        >
          Hablar por WhatsApp
        </a>
      </div>
      <button type="button" onClick={onRestart} className="mt-5 text-sm font-semibold text-navy/50 hover:text-navy">
        ↺ Repetir el quiz
      </button>
    </div>
  );
}
