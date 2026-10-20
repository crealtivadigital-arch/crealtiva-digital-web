import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Ingresar" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-card bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal">Crealtiva Digital</p>
        <h1 className="mb-6 mt-1 font-display text-3xl">Panel</h1>
        <LoginForm next={next} />
      </div>
    </main>
  );
}
