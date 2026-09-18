import { z } from "zod";

export const situacaoVeiculoSchema = z.enum(["estoque", "vendido"]);

export const clickGarageVeiculoSchema = z.object({
  id: z.number(),
  situacao: situacaoVeiculoSchema,
  status: z.string(),
  tipo: z.string(),
  marca: z.string(),
  modelo: z.string(),
  versao: z.string(),
  titulo: z.string(),
  codigo_fipe: z.string().nullable(),
  ano_modelo: z.number(),
  ano_fabricacao: z.number(),
  combustivel: z.string(),
  cambio: z.string(),
  motor: z.string(),
  cor: z.string(),
  portas: z.string().nullable(),
  placa: z.string(),
  km: z.number(),
  loja: z.string(),
  loja_id: z.number(),
  observacoes: z.string().nullable(),
  acessorios: z.array(z.string()),
  imagem_principal: z.string().nullable(),
  galeria: z.array(z.string()),
  data_cadastro: z.string(),
  data_atualizacao: z.string(),
  valor_anunciado: z.number(),
  valor_venda: z.number().nullable(),
  valor_pago: z.number().nullable(),
  proveniencia: z.string(),
  data_venda: z.string().nullable(),
  despesas: z.number().nullable(),
  custo_total: z.number().nullable(),
  margem: z.number().nullable(),
});

export const clickGarageListResponseSchema = z.object({
  current_page: z.number(),
  data: z.array(clickGarageVeiculoSchema),
  per_page: z.number(),
  total: z.number(),
  last_page: z.number(),
  next_page_url: z.string().nullable(),
});

export const clickGarageErrorSchema = z.object({
  erro: z.string(),
  mensagem: z.string(),
});
