import { PublicMoto, PublicMotoListItem } from "./types";

export const toPublicMotoListItem = (moto: PublicMoto): PublicMotoListItem => ({
  id: moto.id,
  titulo: moto.titulo,
  marca: moto.marca,
  modelo: moto.modelo,
  anoModelo: moto.anoModelo,
  km: moto.km,
  motor: moto.motor,
  valorAnunciado: moto.valorAnunciado,
  imagemPrincipal: moto.imagemPrincipal,
  destaque: moto.destaque,
});
