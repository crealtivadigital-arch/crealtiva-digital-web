import { after } from "next/server";

// IndexNow: avisa a Bing, Yandex, Seznam, Naver y demás buscadores asociados que una página cambió,
// para que la vuelvan a leer en horas. Google no lo usa (le basta el sitemap).
// La clave es pública por diseño: el buscador la comprueba en /<clave>.txt (carpeta public/).
const KEY = "d06c33a71354044b90f582e532635ef7";
const HOST = "crealtivadigital.com";

// Se envía después de responder, para no demorar el guardado del panel.
// Solo desde producción: las pruebas locales o de vista previa no avisan a nadie.
export function notifySearchEngines(paths: string[]) {
  if (process.env.VERCEL_ENV !== "production") return;
  const urlList = [...new Set(paths)].map((p) => `https://${HOST}${p === "/" ? "" : p}`);
  if (!urlList.length) return;
  after(async () => {
    try {
      const res = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
      });
      if (!res.ok && res.status !== 202) console.error("IndexNow respondió", res.status, await res.text());
    } catch (e) {
      console.error("No se pudo avisar a IndexNow:", e);
    }
  });
}
