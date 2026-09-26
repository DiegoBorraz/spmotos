import { z } from "zod";

export const siteFeedItemSchema = z.object({
  id: z.string(),
  tipo: z.string(),
  marca: z.string(),
  modelo_base: z.string(),
  modelo: z.string(),
  fipe: z.number().nullable().optional(),
  titulo: z.string(),
  combustivel: z.string(),
  ano_modelo: z.number(),
  ano_fabricacao: z.number(),
  ano_fipe: z.string().nullable().optional(),
  codigo_fipe: z.string().nullable().optional(),
  motor: z.string().nullable(),
  placa: z.string(),
  portas: z.null().optional(),
  cor: z.string(),
  km: z.number(),
  cambio: z.string(),
  valor: z.number(),
  destaque: z.boolean(),
  loja: z.string(),
  criado_em: z.string(),
  atualizado_em: z.string(),
  obs: z.string().nullable(),
  acessorios: z.array(z.string()),
  sites: z.array(z.string()).optional(),
  imagem_principal: z.string().nullable(),
  galeria: z.array(z.string()),
});

export const siteFeedResponseSchema = z.array(siteFeedItemSchema);

export type SiteFeedItem = z.infer<typeof siteFeedItemSchema>;
