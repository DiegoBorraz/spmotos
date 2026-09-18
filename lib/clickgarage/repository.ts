import { listNinjasVeiculos, getNinjasVeiculoById } from "@/lib/apininjas/repository";
import { getStockSource } from "@/lib/env";
import { fetchVeiculoById, fetchVeiculos } from "./client";
import { filterMockVeiculos } from "./filter-mock";
import { toPublicMoto } from "./mapper";
import { ListMotosParams, PublicMoto } from "./types";

export const listMotos = async (params: ListMotosParams): Promise<PublicMoto[]> => {
  if (getStockSource() === "api") {
    const veiculos = await fetchVeiculos(params);
    return veiculos.map(toPublicMoto);
  }
  const veiculos = await listNinjasVeiculos();
  return filterMockVeiculos(veiculos, params).map(toPublicMoto);
};

export const getMotoById = async (id: number): Promise<PublicMoto | null> => {
  if (getStockSource() === "api") {
    const veiculo = await fetchVeiculoById(id);
    return veiculo ? toPublicMoto(veiculo) : null;
  }
  const veiculo = await getNinjasVeiculoById(id);
  return veiculo ? toPublicMoto(veiculo) : null;
};

export const listMarcas = async (): Promise<string[]> => {
  const motos = await listMotos({ situacao: "estoque" });
  return [...new Set(motos.map((moto) => moto.marca))].sort((left, right) =>
    left.localeCompare(right, "pt-BR"),
  );
};
