import { getSiteUrl, getWhatsAppE164 } from "@/lib/env";
import { formatPrice } from "@/lib/format";
import { PublicMoto } from "@/lib/clickgarage/types";

export const buildWhatsAppHref = (moto: PublicMoto, pageUrl: string): string => {
  const text = `Olá! Tenho interesse na ${moto.titulo} — ${formatPrice(moto.valorAnunciado)}. ${pageUrl}`;
  return `https://wa.me/${getWhatsAppE164()}?text=${encodeURIComponent(text)}`;
};

export const buildWhatsAppHrefPlain = (text: string): string =>
  `https://wa.me/${getWhatsAppE164()}?text=${encodeURIComponent(text)}`;

export const motoPageUrl = (id: number): string => `${getSiteUrl()}/motos/${id}`;
