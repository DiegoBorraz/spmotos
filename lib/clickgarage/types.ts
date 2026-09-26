export type SituacaoVeiculo = "estoque";

export type OrdenacaoVeiculo = "cadastro" | "atualizacao" | "valor" | "km";

export interface PublicMoto {
  id: string;
  situacao: SituacaoVeiculo;
  status: string;
  titulo: string;
  marca: string;
  modelo: string;
  versao: string;
  anoModelo: number;
  anoFabricacao: number;
  combustivel: string;
  cambio: string;
  motor: string;
  cor: string;
  km: number;
  observacoes: string | null;
  acessorios: string[];
  imagemPrincipal: string | null;
  galeria: string[];
  valorAnunciado: number;
  proveniencia: string;
  /** Server-side sort keys — not shown in UI. */
  cadastroEm: string;
  atualizadoEm: string;
  destaque: boolean;
}

/** Fields needed for listing cards — no gallery or long notes (home batches). */
export interface PublicMotoListItem {
  id: string;
  titulo: string;
  marca: string;
  modelo: string;
  anoModelo: number;
  km: number;
  motor: string;
  valorAnunciado: number;
  imagemPrincipal: string | null;
  destaque: boolean;
}

export interface ListMotosParams {
  busca?: string;
  marca?: string;
  modelo?: string;
  anoMin?: number;
  anoMax?: number;
  valorMin?: number;
  valorMax?: number;
  kmMax?: number;
  ordenar?: OrdenacaoVeiculo;
}
