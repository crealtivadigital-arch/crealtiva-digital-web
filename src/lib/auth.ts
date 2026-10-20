// Sesión del panel: cookie firmada con HMAC (ADMIN_SESSION_SECRET). Usa Web Crypto
// para funcionar igual en proxy.ts y en las Server Functions.

export const SESSION_COOKIE = "cd_admin";
export const SESSION_DAYS = 7;

const enc = new TextEncoder();

async function hmac(value: string): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("ADMIN_SESSION_SECRET falta o es muy corto (mínimo 32 caracteres).");
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSession(email: string): Promise<string> {
  const payload = `${email}|${Date.now() + SESSION_DAYS * 86400_000}`;
  return `${btoa(payload)}.${await hmac(payload)}`;
}

export async function verifySession(token: string | undefined): Promise<string | null> {
  if (!token) return null;
  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return null;
  let payload: string;
  try {
    payload = atob(encoded);
  } catch {
    return null;
  }
  if (!safeEqual(sig, await hmac(payload))) return null;
  const [email, exp] = payload.split("|");
  if (Number(exp) < Date.now() || email !== process.env.ADMIN_EMAIL) return null;
  return email;
}

// Compara contra ADMIN_EMAIL / ADMIN_PASSWORD sin revelar cuál de los dos falló
export async function checkCredentials(email: string, password: string): Promise<boolean> {
  const okEmail = process.env.ADMIN_EMAIL ?? "";
  const okPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!okEmail || !okPassword) return false;
  const [a, b, c, d] = await Promise.all([hmac(email.trim().toLowerCase()), hmac(okEmail.toLowerCase()), hmac(password), hmac(okPassword)]);
  return safeEqual(a, b) && safeEqual(c, d);
}
