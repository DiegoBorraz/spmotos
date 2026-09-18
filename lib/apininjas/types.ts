import { z } from "zod";
import { apiNinjasMotorcycleSchema } from "./schema";
import { SituacaoVeiculo } from "@/lib/clickgarage/types";

export type ApiNinjasMotorcycle = z.infer<typeof apiNinjasMotorcycleSchema>;

export interface NinjaCatalogSlot {
  id: number;
  make: string;
  model: string;
  year: string;
  situacao: SituacaoVeiculo;
  status: string;
  cor: string;
  km: number;
  valorAnunciado: number;
  valorVenda: number | null;
  valorPago: number | null;
  despesas: number | null;
  custoTotal: number | null;
  margem: number | null;
  proveniencia: string;
  dataCadastro: string;
  dataAtualizacao: string;
  dataVenda: string | null;
  codigoFipe: string | null;
  acessorios: string[];
  placa: string;
}

export interface NinjaSearchQuery {
  make: string;
  model: string;
  year?: string;
}
