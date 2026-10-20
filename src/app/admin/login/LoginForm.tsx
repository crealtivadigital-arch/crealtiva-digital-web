"use client";
import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm({ next }: { next?: string }) {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next ?? ""} />
      <label className="block">
        <span className="text-sm font-semibold">Correo</span>
        <input name="email" type="email" required autoComplete="username" className="mt-1 w-full rounded-lg border border-navy/15 bg-white px-3 py-2.5 outline-none focus:border-teal" />
      </label>
      <label className="block">
        <span className="text-sm font-semibold">Contraseña</span>
        <input name="password" type="password" required autoComplete="current-password" className="mt-1 w-full rounded-lg border border-navy/15 bg-white px-3 py-2.5 outline-none focus:border-teal" />
      </label>
      {error && <p className="rounded-lg bg-magenta/10 px-3 py-2 text-sm text-magenta">{error}</p>}
      <button disabled={pending} className="w-full rounded-full bg-magenta px-6 py-3 font-semibold text-cream transition-colors hover:bg-magenta-light disabled:opacity-60">
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
