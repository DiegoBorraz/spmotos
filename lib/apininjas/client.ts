import { ApiNinjasRequestError, getApiNinjasKey } from "@/lib/env";
import { apiNinjasErrorSchema, apiNinjasListSchema } from "./schema";
import { ApiNinjasMotorcycle, NinjaSearchQuery } from "./types";

const API_BASE = "https://api.api-ninjas.com/v1/motorcycles";

const parseErrorMessage = (text: string, status: number): string => {
  if (!text.startsWith("{")) {
    return `API Ninjas retornou HTTP ${status}`;
  }
  const parsed = apiNinjasErrorSchema.safeParse(JSON.parse(text));
  if (parsed.success) {
    return parsed.data.error ?? parsed.data.message ?? `API Ninjas retornou HTTP ${status}`;
  }
  return `API Ninjas retornou HTTP ${status}`;
};

export const fetchMotorcycles = async (
  query: NinjaSearchQuery,
): Promise<ApiNinjasMotorcycle[]> => {
  const search = new URLSearchParams();
  search.set("make", query.make);
  search.set("model", query.model);
  if (query.year) {
    search.set("year", query.year);
  }
  const response = await fetch(`${API_BASE}?${search.toString()}`, {
    headers: {
      "X-Api-Key": getApiNinjasKey(),
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });
  const text = await response.text();
  if (response.status === 429) {
    throw new ApiNinjasRequestError(429, "Limite de requisições da API Ninjas atingido.");
  }
  if (response.status === 401) {
    throw new ApiNinjasRequestError(401, parseErrorMessage(text, 401));
  }
  if (!response.ok) {
    throw new ApiNinjasRequestError(response.status, parseErrorMessage(text, response.status));
  }
  return apiNinjasListSchema.parse(JSON.parse(text));
};
