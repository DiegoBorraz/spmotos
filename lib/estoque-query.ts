import { ListMotosParams, OrdenacaoVeiculo } from "@/lib/clickgarage/types";

export interface QueryValueMap {
  [key: string]: string | string[] | undefined;
}

const firstValue = (value: string | string[] | undefined): string | undefined => {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};

const toOptionalNumber = (value: string | undefined): number | undefined => {
  if (!value) {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const isOrdenacao = (value: string | undefined): value is OrdenacaoVeiculo =>
  value === "cadastro" ||
  value === "atualizacao" ||
  value === "valor" ||
  value === "km";

export const homeGridMatchesBaseEstoque = (
  params: ListMotosParams,
  baseOrder: OrdenacaoVeiculo,
): boolean => {
  const hasFilter =
    Boolean(params.busca?.trim()) ||
    Boolean(params.marca?.trim()) ||
    Boolean(params.modelo?.trim()) ||
    params.anoMin !== undefined ||
    params.anoMax !== undefined ||
    params.valorMin !== undefined ||
    params.valorMax !== undefined ||
    params.kmMax !== undefined;
  const order = params.ordenar ?? baseOrder;
  return !hasFilter && order === baseOrder;
};

export const parseMotoDetailId = (query: QueryValueMap): string | undefined => {
  const raw = firstValue(query.moto)?.trim();
  return raw ? raw : undefined;
};

const appendListParams = (params: URLSearchParams, listParams: ListMotosParams): void => {
  if (listParams.busca?.trim()) {
    params.set("busca", listParams.busca.trim());
  }
  if (listParams.marca?.trim()) {
    params.set("marca", listParams.marca.trim());
  }
  if (listParams.modelo?.trim()) {
    params.set("modelo", listParams.modelo.trim());
  }
  if (listParams.anoMin !== undefined) {
    params.set("anoMin", String(listParams.anoMin));
  }
  if (listParams.anoMax !== undefined) {
    params.set("anoMax", String(listParams.anoMax));
  }
  if (listParams.valorMin !== undefined) {
    params.set("valorMin", String(listParams.valorMin));
  }
  if (listParams.valorMax !== undefined) {
    params.set("valorMax", String(listParams.valorMax));
  }
  if (listParams.kmMax !== undefined) {
    params.set("kmMax", String(listParams.kmMax));
  }
  if (listParams.ordenar) {
    params.set("ordenar", listParams.ordenar);
  }
};

export const buildHomeMotoModalHref = (
  listParams: ListMotosParams,
  motoId: string,
): string => {
  const params = new URLSearchParams();
  appendListParams(params, listParams);
  params.set("moto", motoId);
  return `/?${params.toString()}`;
};

export const buildHomeHrefWithoutMoto = (searchParams: URLSearchParams): string => {
  const params = new URLSearchParams(searchParams.toString());
  params.delete("moto");
  const query = params.toString();
  return query ? `/?${query}` : "/";
};

export const parseEstoqueParams = (query: QueryValueMap): ListMotosParams => {
  const ordenarRaw = firstValue(query.ordenar);
  return {
    busca: firstValue(query.busca),
    marca: firstValue(query.marca),
    modelo: firstValue(query.modelo),
    anoMin: toOptionalNumber(firstValue(query.anoMin)),
    anoMax: toOptionalNumber(firstValue(query.anoMax)),
    valorMin: toOptionalNumber(firstValue(query.valorMin)),
    valorMax: toOptionalNumber(firstValue(query.valorMax)),
    kmMax: toOptionalNumber(firstValue(query.kmMax)),
    ordenar: isOrdenacao(ordenarRaw) ? ordenarRaw : undefined,
  };
};
