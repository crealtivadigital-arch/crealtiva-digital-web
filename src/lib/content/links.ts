// La línea de producción multimedia vive en su propia sección, Crealtiva Movie Maker.
export const MOVIE_MAKER_LINE = "produccion-multimedia";

export function lineHref(slug: string): string {
  return slug === MOVIE_MAKER_LINE ? "/movie-maker" : `/servicios/${slug}`;
}
