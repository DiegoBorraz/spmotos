import { ClickGarageVeiculo } from "@/lib/clickgarage/types";
import { ApiNinjasMotorcycle, NinjaCatalogSlot } from "./types";

const trimText = (value: string | null | undefined): string => value?.trim() ?? "";

const parseAno = (year: string | number | null | undefined, fallback: string): number => {
  const parsed = Number.parseInt(String(year), 10);
  if (Number.isFinite(parsed)) {
    return parsed;
  }
  return Number.parseInt(fallback, 10);
};

const parseCilindrada = (displacement: string | null | undefined): string => {
  const text = trimText(displacement);
  const match = text.match(/([\d.]+)\s*ccm/i);
  if (!match) {
    return text;
  }
  return String(Math.round(Number(match[1])));
};

const buildObservacoes = (moto: ApiNinjasMotorcycle): string | null => {
  const parts = [
    trimText(moto.type) ? `Categoria: ${trimText(moto.type)}` : "",
    trimText(moto.engine) ? `Motor: ${trimText(moto.engine)}` : "",
    trimText(moto.power) ? `Potência: ${trimText(moto.power)}` : "",
    trimText(moto.torque) ? `Torque: ${trimText(moto.torque)}` : "",
    trimText(moto.total_weight) ? `Peso: ${trimText(moto.total_weight)}` : "",
    trimText(moto.fuel_capacity) ? `Tanque: ${trimText(moto.fuel_capacity)}` : "",
    trimText(moto.seat_height) ? `Altura do assento: ${trimText(moto.seat_height)}` : "",
  ].filter((part) => part.length > 0);
  return parts.length > 0 ? parts.join(". ") : null;
};

const translateSpec = (value: string, map: Record<string, string>): string =>
  map[value.toLowerCase()] ?? value;

const buildAcessorios = (
  moto: ApiNinjasMotorcycle,
  overlay: NinjaCatalogSlot,
): string[] => {
  const extras: string[] = [];
  const brakes = `${trimText(moto.front_brakes)} ${trimText(moto.rear_brakes)}`.toLowerCase();
  if (brakes.includes("abs") && !overlay.acessorios.includes("ABS")) {
    extras.push("ABS");
  }
  if (trimText(moto.starter)) {
    extras.push(
      `Partida ${translateSpec(trimText(moto.starter), { electric: "elétrica", kick: "pedal" })}`,
    );
  }
  if (trimText(moto.cooling)) {
    extras.push(
      `Arrefecimento ${translateSpec(trimText(moto.cooling), { liquid: "líquido", air: "a ar" })}`,
    );
  }
  return [...overlay.acessorios, ...extras];
};

export const toClickGarageVeiculo = (
  moto: ApiNinjasMotorcycle,
  overlay: NinjaCatalogSlot,
  imagemPrincipal: string | null,
): ClickGarageVeiculo => {
  const ano = parseAno(moto.year, overlay.year);
  const modelo = trimText(moto.model) || overlay.model;
  const marca = trimText(moto.make) || overlay.make;
  return {
    id: overlay.id,
    situacao: overlay.situacao,
    status: overlay.status,
    tipo: "Motos",
    marca,
    modelo,
    versao: `${modelo} ${ano}`,
    titulo: `${marca} ${modelo} ${ano}`,
    codigo_fipe: overlay.codigoFipe,
    ano_modelo: ano,
    ano_fabricacao: ano,
    combustivel: "Gasolina",
    cambio: trimText(moto.gearbox) || "MANUAL",
    motor: parseCilindrada(moto.displacement),
    cor: overlay.cor,
    portas: null,
    placa: overlay.placa,
    km: overlay.km,
    loja: "MATRIZ",
    loja_id: 1,
    observacoes: buildObservacoes(moto),
    acessorios: buildAcessorios(moto, overlay),
    imagem_principal: imagemPrincipal,
    galeria: imagemPrincipal ? [imagemPrincipal] : [],
    data_cadastro: overlay.dataCadastro,
    data_atualizacao: overlay.dataAtualizacao,
    valor_anunciado: overlay.valorAnunciado,
    valor_venda: overlay.valorVenda,
    valor_pago: overlay.valorPago,
    proveniencia: overlay.proveniencia,
    data_venda: overlay.dataVenda,
    despesas: overlay.despesas,
    custo_total: overlay.custoTotal,
    margem: overlay.margem,
  };
};
