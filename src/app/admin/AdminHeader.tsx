import Link from "next/link";
import { logout } from "./login/actions";

export default function AdminHeader({ email, title }: { email: string; title?: string }) {
  return (
    <header className="border-b border-navy/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/admin" className="font-display text-lg">
          Panel <span className="text-teal">Crealtiva</span>
        </Link>
        {title && <span className="hidden text-sm text-navy/50 sm:inline">/ {title}</span>}
        <span className="ml-auto hidden text-sm text-navy/50 md:inline">{email}</span>
        <Link href="/" target="_blank" className="text-sm font-semibold text-teal hover:underline">
          Ver sitio ↗
        </Link>
        <form action={logout}>
          <button className="rounded-full border border-navy/15 px-3 py-1.5 text-sm font-semibold hover:border-magenta hover:text-magenta">Salir</button>
        </form>
      </div>
    </header>
  );
}
