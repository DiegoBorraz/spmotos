import { cache } from "react";
import { getClickGarageFeedUrl } from "@/lib/env";
import { SiteFeedRequestError } from "./errors";
import { SiteFeedItem, siteFeedResponseSchema } from "./schema";

const FEED_TIMEOUT_MS = 30_000;

export const fetchSiteFeedItems = cache(async (): Promise<SiteFeedItem[]> => {
  const url = getClickGarageFeedUrl();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FEED_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      next: { revalidate: 300 },
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new SiteFeedRequestError(408, "Tempo esgotado ao carregar o estoque.");
    }
    throw new SiteFeedRequestError(503, "Não foi possível conectar ao feed de estoque.");
  } finally {
    clearTimeout(timeout);
  }

  if (response.status === 404) {
    throw new SiteFeedRequestError(404, "Feed de estoque não encontrado.");
  }
  if (!response.ok) {
    throw new SiteFeedRequestError(response.status, `Feed de estoque retornou HTTP ${response.status}.`);
  }

  const json: unknown = await response.json();
  return siteFeedResponseSchema.parse(json);
});
