"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkCredentials, createSession, SESSION_COOKIE, SESSION_DAYS } from "@/lib/auth";

export async function login(_prev: string | null, form: FormData): Promise<string | null> {
  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return "El panel aún no está configurado en el servidor (faltan variables ADMIN_*).";
  }
  if (!(await checkCredentials(email, password))) {
    await new Promise((r) => setTimeout(r, 800)); // frena intentos repetidos
    return "Correo o contraseña incorrectos.";
  }
  (await cookies()).set(SESSION_COOKIE, await createSession(process.env.ADMIN_EMAIL), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
  const next = String(form.get("next") ?? "");
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}
