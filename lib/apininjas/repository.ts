import { cache } from "react";
import { fetchMotoImageUrls } from "@/lib/carimages/client";
import { ClickGarageVeiculo } from "@/lib/clickgarage/types";
import { ninjaCatalog } from "./catalog";
import { fetchMotorcycles } from "./client";
import { toClickGarageVeiculo } from "./to-veiculo";
import { ApiNinjasMotorcycle, NinjaCatalogSlot } from "./types";

const normalizeName = (value: string): string =>
  value.toLowerCase().replace(/[\s-]+/g, "");

const pickMotorcycle = (
  items: ApiNinjasMotorcycle[],
  overlay: NinjaCatalogSlot,
): ApiNinjasMotorcycle | null => {
  if (items.length === 0) {
    return null;
  }
  const overlayModel = normalizeName(overlay.model);
  const ranked = [...items].sort((left, right) => {
    const scoreOf = (item: ApiNinjasMotorcycle): number => {
      const model = normalizeName(item.model);
      let score = 0;
      if (String(item.year) === overlay.year) score += 10;
      if (model === overlayModel) score += 8;
      if (model.startsWith(overlayModel)) score += 4;
      if (model.includes(overlayModel)) score += 2;
      return score;
    };
    const scoreDiff = scoreOf(right) - scoreOf(left);
    if (scoreDiff !== 0) {
      return scoreDiff;
    }
    return left.model.trim().length - right.model.trim().length;
  });
  return ranked[0] ?? null;
};

const loadCatalogSlot = async (
  overlay: NinjaCatalogSlot,
  imagemPrincipal: string | null,
): Promise<ClickGarageVeiculo | null> => {
  const withYear = await fetchMotorcycles({
    make: overlay.make,
    model: overlay.model,
    year: overlay.year,
  });
  const firstPick = pickMotorcycle(withYear, overlay);
  if (firstPick) {
    return toClickGarageVeiculo(firstPick, overlay, imagemPrincipal);
  }
  const withoutYear = await fetchMotorcycles({
    make: overlay.make,
    model: overlay.model,
  });
  const fallback = pickMotorcycle(withoutYear, overlay);
  return fallback ? toClickGarageVeiculo(fallback, overlay, imagemPrincipal) : null;
};

export const listNinjasVeiculos = cache(async (): Promise<ClickGarageVeiculo[]> => {
  const imageUrls = await fetchMotoImageUrls(
    ninjaCatalog.map((slot) => ({
      make: slot.make,
      model: slot.model,
      year: slot.year,
    })),
  );
  const loaded = await Promise.all(
    ninjaCatalog.map((slot, index) => loadCatalogSlot(slot, imageUrls[index] ?? null)),
  );
  const veiculos = loaded.filter((item): item is ClickGarageVeiculo => item !== null);
  if (veiculos.length === 0) {
    throw new Error("API Ninjas não retornou motos para a vitrine.");
  }
  return veiculos;
});

export const getNinjasVeiculoById = async (
  id: number,
): Promise<ClickGarageVeiculo | null> => {
  const veiculos = await listNinjasVeiculos();
  return veiculos.find((item) => item.id === id) ?? null;
};
