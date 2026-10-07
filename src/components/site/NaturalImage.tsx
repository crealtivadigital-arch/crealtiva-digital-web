import Image from "next/image";
import imageMeta from "@/content/images.json";
import type { Img } from "@/lib/content/types";

const meta = imageMeta as Record<string, { width: number; height: number }>;

interface NaturalImageProps {
  img: Img;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  maxHeight?: number; // limita la altura reduciendo el ancho en proporción (nunca recorta)
  children?: React.ReactNode; // capas superpuestas (degradado, textos) sobre la foto
}

// Regla de marca: las fotos se muestran en su proporción original, sin recortes,
// y nunca más anchas que su tamaño real (no se amplían). El contenedor se adapta a la foto.
export default function NaturalImage({ img, sizes, className = "", imgClassName = "", priority, maxHeight, children }: NaturalImageProps) {
  const dims = meta[img.src];
  if (!dims) {
    throw new Error(`Sin medidas para ${img.src}. Corre: node scripts/image-meta.mjs`);
  }
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ maxWidth: maxHeight ? Math.min(dims.width, Math.round((maxHeight * dims.width) / dims.height)) : dims.width }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={dims.width}
        height={dims.height}
        sizes={sizes}
        priority={priority}
        className={`block h-auto w-full ${imgClassName}`}
      />
      {children}
    </div>
  );
}

export function imageRatio(src: string): number | undefined {
  const d = meta[src];
  return d ? d.width / d.height : undefined;
}
