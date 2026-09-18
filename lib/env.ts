export class ClickGarageRequestError extends Error {
  public readonly status: number;

  public constructor(status: number, mensagem: string) {
    super(mensagem);
    this.name = "ClickGarageRequestError";
    this.status = status;
  }
}

export class ApiNinjasRequestError extends Error {
  public readonly status: number;

  public constructor(status: number, mensagem: string) {
    super(mensagem);
    this.name = "ApiNinjasRequestError";
    this.status = status;
  }
}

export class CarImagesRequestError extends Error {
  public readonly status: number;

  public constructor(status: number, mensagem: string) {
    super(mensagem);
    this.name = "CarImagesRequestError";
    this.status = status;
  }
}

export interface CarImagesCredentials {
  apiKey: string;
  apiSecret: string;
}

export const getStockSource = (): "mock" | "api" =>
  process.env.STOCK_SOURCE === "api" ? "api" : "mock";

export const getClickGarageToken = (): string => {
  const token = process.env.CLICKGARAGE_TOKEN;
  if (!token) {
    throw new Error("CLICKGARAGE_TOKEN ausente. Use STOCK_SOURCE=mock ou defina o token.");
  }
  return token;
};

export const getApiNinjasKey = (): string => {
  const key = process.env.API_NINJAS_KEY;
  if (!key) {
    throw new Error("API_NINJAS_KEY ausente. Defina a chave no .env.local para o mock.");
  }
  return key;
};

export const getCarImagesCredentials = (): CarImagesCredentials => {
  const apiKey = process.env.CARIMAGES_API_KEY;
  const apiSecret = process.env.CARIMAGES_API_SECRET;
  if (!apiKey || !apiSecret) {
    throw new Error(
      "CARIMAGES_API_KEY ou CARIMAGES_API_SECRET ausente. Defina as chaves no .env.local para o mock.",
    );
  }
  return { apiKey, apiSecret };
};

export const getWhatsAppE164 = (): string =>
  process.env.WHATSAPP_E164 ?? "5551999999999";

export const getSiteUrl = (): string =>
  process.env.SITE_URL ?? "http://localhost:3000";
