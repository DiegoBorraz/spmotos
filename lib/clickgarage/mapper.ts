import { ClickGarageVeiculo, PublicMoto } from "./types";

export const toPublicMoto = (raw: ClickGarageVeiculo): PublicMoto => ({
  id: raw.id,
  situacao: raw.situacao,
  status: raw.status,
  titulo: raw.titulo,
  marca: raw.marca,
  modelo: raw.modelo,
  versao: raw.versao,
  anoModelo: raw.ano_modelo,
  anoFabricacao: raw.ano_fabricacao,
  combustivel: raw.combustivel,
  cambio: raw.cambio,
  motor: raw.motor,
  cor: raw.cor,
  km: raw.km,
  observacoes: raw.observacoes,
  acessorios: raw.acessorios,
  imagemPrincipal: raw.imagem_principal,
  galeria: raw.galeria,
  valorAnunciado: raw.valor_anunciado,
  proveniencia: raw.proveniencia,
});
