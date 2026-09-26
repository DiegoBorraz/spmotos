const DEFAULT_FEED_URL =
  "https://clickgarage.com.br/integracoes/site-integracao/json/sp-motos-1";

export const getClickGarageFeedUrl = (): string =>
  process.env.CLICKGARAGE_FEED_URL?.trim() || DEFAULT_FEED_URL;

export const getSiteUrl = (): string =>
  process.env.SITE_URL ?? "http://localhost:3000";
