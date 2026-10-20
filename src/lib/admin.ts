import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySession } from "./auth";

// Segunda verificación dentro de cada página y Server Function del panel
// (proxy.ts ya filtra, pero las Server Functions se pueden invocar directo).
export async function requireAdmin(): Promise<string> {
  const email = await verifySession((await cookies()).get(SESSION_COOKIE)?.value).catch(() => null);
  if (!email) redirect("/admin/login");
  return email;
}
