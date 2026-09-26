import { ListMotosParams, OrdenacaoVeiculo, PublicMoto } from "./types";

const includesInsensitive = (value: string, query: string): boolean =>
  value.toLowerCase().includes(query.toLowerCase().trim());

const sortMotos = (
  motos: PublicMoto[],
  ordenar: OrdenacaoVeiculo | undefined,
): PublicMoto[] => {
  const sorted = [...motos];
  const key = ordenar ?? "cadastro";
  sorted.sort((left, right) => {
    if (left.destaque !== right.destaque) {
      return left.destaque ? -1 : 1;
    }
    if (key === "valor") {
      return right.valorAnunciado - left.valorAnunciado;
    }
    if (key === "km") {
      return left.km - right.km;
    }
    if (key === "atualizacao") {
      return right.atualizadoEm.localeCompare(left.atualizadoEm);
    }
    return right.cadastroEm.localeCompare(left.cadastroEm);
  });
  return sorted;
};

export const filterPublicMotos = (
  motos: PublicMoto[],
  params: ListMotosParams,
): PublicMoto[] => {
  const filtrados = motos.filter((moto) => {
    if (params.marca && !includesInsensitive(moto.marca, params.marca)) {
      return false;
    }
    if (params.modelo && !includesInsensitive(moto.modelo, params.modelo)) {
      return false;
    }
    if (params.busca) {
      const haystack = `${moto.titulo} ${moto.marca} ${moto.modelo}`;
      if (!includesInsensitive(haystack, params.busca)) {
        return false;
      }
    }
    if (params.anoMin !== undefined && moto.anoModelo < params.anoMin) {
      return false;
    }
    if (params.anoMax !== undefined && moto.anoModelo > params.anoMax) {
      return false;
    }
    if (params.valorMin !== undefined && moto.valorAnunciado < params.valorMin) {
      return false;
    }
    if (params.valorMax !== undefined && moto.valorAnunciado > params.valorMax) {
      return false;
    }
    if (params.kmMax !== undefined && moto.km > params.kmMax) {
      return false;
    }
    return true;
  });

  return sortMotos(filtrados, params.ordenar);
};
