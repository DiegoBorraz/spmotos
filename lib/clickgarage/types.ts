export type SituacaoVeiculo = "estoque" | "vendido";

export type OrdenacaoVeiculo = "cadastro" | "atualizacao" | "valor" | "km";

export interface ClickGarageVeiculo {
  id: number;
  situacao: SituacaoVeiculo;
  status: string;
  tipo: string;
  marca: string;
  modelo: string;
  versao: string;
  titulo: string;
  codigo_fipe: string | null;
  ano_modelo: number;
  ano_fabricacao: number;
  combustivel: string;
  cambio: string;
  motor: string;
  cor: string;
  portas: string | null;
  placa: string;
  km: number;
  loja: string;
  loja_id: number;
  observacoes: string | null;
  acessorios: string[];
  imagem_principal: string | null;
  galeria: string[];
  data_cadastro: string;
  data_atualizacao: string;
  valor_anunciado: number;
  valor_venda: number | null;
  valor_pago: number | null;
  proveniencia: string;
  data_venda: string | null;
  despesas: number | null;
  custo_total: number | null;
  margem: number | null;
}

export interface PublicMoto {
  id: number;
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
}

export interface ListMotosParams {
  situacao: SituacaoVeiculo;
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
