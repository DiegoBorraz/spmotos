"use server";

import { ESTOQUE_BATCH_MAX, ESTOQUE_BATCH_SIZE } from "@/lib/clickgarage/constants";
import { listMotosBatch } from "@/lib/clickgarage/repository";
import { ListMotosParams, PublicMotoListItem } from "@/lib/clickgarage/types";

export interface LoadEstoqueBatchInput {
  params: ListMotosParams;
  offset: number;
  limit?: number;
}

export interface LoadEstoqueBatchResult {
  items: PublicMotoListItem[];
  total: number;
  nextOffset: number | null;
}

const clampLimit = (limit: number | undefined): number => {
  const raw = limit ?? ESTOQUE_BATCH_SIZE;
  if (!Number.isFinite(raw) || raw < 1) {
    return ESTOQUE_BATCH_SIZE;
  }
  return Math.min(Math.floor(raw), ESTOQUE_BATCH_MAX);
};

const clampOffset = (offset: number): number => {
  if (!Number.isFinite(offset) || offset < 0) {
    return 0;
  }
  return Math.floor(offset);
};

export const loadEstoqueBatch = async (
  input: LoadEstoqueBatchInput,
): Promise<LoadEstoqueBatchResult> => {
  const offset = clampOffset(input.offset);
  const limit = clampLimit(input.limit);

  try {
    const { items, total } = await listMotosBatch(input.params, offset, limit);
    const nextOffset = offset + items.length < total ? offset + items.length : null;
    return { items, total, nextOffset };
  } catch {
    throw new Error("Não foi possível carregar mais motos. Tente de novo.");
  }
};
