import { cache } from "react";
import { filterPublicMotos } from "./filter-public";
import { fetchSiteFeedItems } from "./site-feed/client";
import { toPublicMoto } from "./site-feed/mapper";
import { ESTOQUE_BATCH_SIZE } from "./constants";
import { toPublicMotoListItem } from "./list-item";
import { ListMotosParams, PublicMoto, PublicMotoListItem } from "./types";

export { ESTOQUE_BATCH_SIZE };

const loadAllPublicMotos = cache(async (): Promise<PublicMoto[]> => {
  const items = await fetchSiteFeedItems();
  return items.map(toPublicMoto);
});

export const listMotos = async (params: ListMotosParams): Promise<PublicMoto[]> => {
  const all = await loadAllPublicMotos();
  return filterPublicMotos(all, params);
};

export const getMotoById = async (id: string): Promise<PublicMoto | null> => {
  const all = await loadAllPublicMotos();
  return all.find((moto) => moto.id === id) ?? null;
};

export const marcasFromMotos = (motos: PublicMoto[]): string[] =>
  [...new Set(motos.map((moto) => moto.marca))].sort((left, right) =>
    left.localeCompare(right, "pt-BR"),
  );

export const listMarcas = async (): Promise<string[]> => {
  const motos = await listMotos({});
  return marcasFromMotos(motos);
};

export interface ListMotosBatchResult {
  items: PublicMotoListItem[];
  total: number;
}

export const listMotosBatch = async (
  params: ListMotosParams,
  offset: number,
  limit: number,
): Promise<ListMotosBatchResult> => {
  const filtered = await listMotos(params);
  const items = filtered.slice(offset, offset + limit).map(toPublicMotoListItem);
  return { items, total: filtered.length };
};
