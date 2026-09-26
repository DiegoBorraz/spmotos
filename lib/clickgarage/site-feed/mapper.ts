import { PublicMoto } from "@/lib/clickgarage/types";
import { SiteFeedItem } from "./schema";

/** RN-01: `placa` exists on feed items but must never enter PublicMoto. */
export const toPublicMoto = (item: SiteFeedItem): PublicMoto => ({
  id: item.id,
  situacao: "estoque",
  status: item.destaque ? "Destaque" : "Disponível",
  titulo: item.titulo,
  marca: item.marca,
  modelo: item.modelo,
  versao: item.modelo,
  anoModelo: item.ano_modelo,
  anoFabricacao: item.ano_fabricacao,
  combustivel: item.combustivel,
  cambio: item.cambio,
  motor: item.motor ?? "",
  cor: item.cor,
  km: item.km,
  observacoes: item.obs?.trim() ? item.obs : null,
  acessorios: item.acessorios,
  imagemPrincipal: item.imagem_principal,
  galeria: item.galeria,
  valorAnunciado: item.valor,
  proveniencia: "",
  cadastroEm: item.criado_em,
  atualizadoEm: item.atualizado_em,
  destaque: item.destaque,
});
