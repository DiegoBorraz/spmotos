import { ListMotosParams, PublicMoto } from "@/lib/clickgarage/types";

export const HOME_RECENT_ORDER: ListMotosParams["ordenar"] = "atualizacao";

/** First moto with a photo for the banner; otherwise the newest in the list. */
export const pickHeroMoto = (motosRecentes: PublicMoto[]): PublicMoto | null => {
  if (motosRecentes.length === 0) {
    return null;
  }
  return motosRecentes.find((moto) => Boolean(moto.imagemPrincipal)) ?? motosRecentes[0];
};
