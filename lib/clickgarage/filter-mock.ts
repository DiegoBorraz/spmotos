import { ClickGarageVeiculo, ListMotosParams, OrdenacaoVeiculo } from "./types";

const includesInsensitive = (value: string, query: string): boolean =>
  value.toLowerCase().includes(query.toLowerCase().trim());

const sortVeiculos = (
  veiculos: ClickGarageVeiculo[],
  ordenar: OrdenacaoVeiculo | undefined,
): ClickGarageVeiculo[] => {
  const sorted = [...veiculos];
  const key = ordenar ?? "cadastro";
  sorted.sort((left, right) => {
    if (key === "valor") return right.valor_anunciado - left.valor_anunciado;
    if (key === "km") return left.km - right.km;
    if (key === "atualizacao") {
      return right.data_atualizacao.localeCompare(left.data_atualizacao);
    }
    return right.data_cadastro.localeCompare(left.data_cadastro);
  });
  return sorted;
};

export const filterMockVeiculos = (
  veiculos: ClickGarageVeiculo[],
  params: ListMotosParams,
): ClickGarageVeiculo[] => {
  const filtrados = veiculos.filter((veiculo) => {
    if (veiculo.situacao !== params.situacao) return false;
    if (params.marca && !includesInsensitive(veiculo.marca, params.marca)) return false;
    if (params.modelo && !includesInsensitive(veiculo.modelo, params.modelo)) return false;
    if (params.busca) {
      const haystack = `${veiculo.titulo} ${veiculo.marca} ${veiculo.modelo}`;
      if (!includesInsensitive(haystack, params.busca)) return false;
    }
    if (params.anoMin !== undefined && veiculo.ano_modelo < params.anoMin) return false;
    if (params.anoMax !== undefined && veiculo.ano_modelo > params.anoMax) return false;
    if (params.valorMin !== undefined && veiculo.valor_anunciado < params.valorMin) return false;
    if (params.valorMax !== undefined && veiculo.valor_anunciado > params.valorMax) return false;
    if (params.kmMax !== undefined && veiculo.km > params.kmMax) return false;
    return true;
  });
  return sortVeiculos(filtrados, params.ordenar);
};
