import { ClickGarageRequestError, getClickGarageToken } from "@/lib/env";
import {
  clickGarageErrorSchema,
  clickGarageListResponseSchema,
  clickGarageVeiculoSchema,
} from "./schema";
import { ClickGarageVeiculo, ListMotosParams } from "./types";

const API_BASE = "https://api.clickgarage.com.br/v1";

const buildListSearch = (params: ListMotosParams, page: number): string => {
  const search = new URLSearchParams();
  search.set("situacao", params.situacao);
  search.set("page", String(page));
  search.set("por_pagina", "100");
  if (params.busca) search.set("busca", params.busca);
  if (params.marca) search.set("marca", params.marca);
  if (params.modelo) search.set("modelo", params.modelo);
  if (params.anoMin !== undefined) search.set("ano_min", String(params.anoMin));
  if (params.anoMax !== undefined) search.set("ano_max", String(params.anoMax));
  if (params.valorMin !== undefined) search.set("valor_min", String(params.valorMin));
  if (params.valorMax !== undefined) search.set("valor_max", String(params.valorMax));
  if (params.kmMax !== undefined) search.set("km_max", String(params.kmMax));
  if (params.ordenar) search.set("ordenar", params.ordenar);
  return search.toString();
};

const parseErrorMessage = (text: string, status: number): string => {
  const parsed = clickGarageErrorSchema.safeParse(JSON.parse(text));
  if (parsed.success) {
    return parsed.data.mensagem;
  }
  return `Click Garage retornou HTTP ${status}`;
};

const clickGarageGet = async (path: string): Promise<string> => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${getClickGarageToken()}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  const text = await response.text();
  if (response.status === 429) {
    throw new ClickGarageRequestError(429, "Limite de requisições da API atingido.");
  }
  if (response.status === 401) {
    throw new ClickGarageRequestError(401, parseErrorMessage(text, 401));
  }
  if (response.status === 422) {
    throw new ClickGarageRequestError(422, parseErrorMessage(text, 422));
  }
  if (response.status === 404) {
    throw new ClickGarageRequestError(404, "Veículo não encontrado.");
  }
  if (!response.ok) {
    throw new ClickGarageRequestError(response.status, parseErrorMessage(text, response.status));
  }
  return text;
};

export const fetchVeiculos = async (
  params: ListMotosParams,
): Promise<ClickGarageVeiculo[]> => {
  const veiculos: ClickGarageVeiculo[] = [];
  let page = 1;
  let lastPage = 1;
  do {
    const text = await clickGarageGet(`/veiculos?${buildListSearch(params, page)}`);
    const payload = clickGarageListResponseSchema.parse(JSON.parse(text));
    veiculos.push(...payload.data);
    lastPage = payload.last_page;
    page += 1;
  } while (page <= lastPage);
  return veiculos;
};

export const fetchVeiculoById = async (
  id: number,
): Promise<ClickGarageVeiculo | null> => {
  try {
    const text = await clickGarageGet(`/veiculos/${id}`);
    return clickGarageVeiculoSchema.parse(JSON.parse(text));
  } catch (error) {
    if (error instanceof ClickGarageRequestError && error.status === 404) {
      return null;
    }
    throw error;
  }
};
