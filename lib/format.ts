const formatPtBrInteger = (valor: number): string =>
  Math.round(valor)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const formatPrice = (valor: number): string => `R$ ${formatPtBrInteger(valor)}`;

export const formatPriceCompact = (valor: number): string => formatPrice(valor);

export const formatKm = (km: number): string => `${formatPtBrInteger(km)} Km`;

export const formatYearRange = (anoFabricacao: number, anoModelo: number): string =>
  anoFabricacao === anoModelo ? String(anoModelo) : `${anoFabricacao}/${anoModelo}`;

export const formatCilindrada = (motor: string): string | null => {
  const digits = motor.replace(/\D/g, "");
  if (!digits) {
    return null;
  }
  return `${digits}cc`;
};

export const formatInstallment = (valor: number, parcelas: number): string =>
  formatPriceCompact(Math.round(valor / parcelas));
