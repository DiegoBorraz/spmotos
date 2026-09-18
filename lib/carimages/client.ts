import { CarImagesRequestError, getCarImagesCredentials } from "@/lib/env";
import {
  carImagesErrorSchema,
  carImagesSignedUrlSchema,
  carImagesSignedUrlsSchema,
} from "./schema";
import { CarImagesQuery } from "./types";

const API_BASE = "https://carimagesapi.com/api/v1";
const IMAGE_WIDTH = "1200";
const IMAGE_FORMAT = "webp";

const parseErrorMessage = (text: string, status: number): string => {
  if (!text.startsWith("{")) {
    return `Car Images retornou HTTP ${status}`;
  }
  const parsed = carImagesErrorSchema.safeParse(JSON.parse(text));
  if (parsed.success) {
    return parsed.data.error ?? parsed.data.message ?? `Car Images retornou HTTP ${status}`;
  }
  return `Car Images retornou HTTP ${status}`;
};

const motoImageParams = (query: CarImagesQuery): Record<string, string> => ({
  make: query.make,
  model: query.model,
  year: query.year,
  type: "moto",
  width: IMAGE_WIDTH,
  format: IMAGE_FORMAT,
});

const fetchOneSignedUrl = async (query: CarImagesQuery): Promise<string | null> => {
  const { apiKey, apiSecret } = getCarImagesCredentials();
  const search = new URLSearchParams(motoImageParams(query));
  search.set("api_key", apiKey);
  search.set("api_secret", apiSecret);
  const response = await fetch(`${API_BASE}/signed-url?${search.toString()}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
      "X-Api-Secret": apiSecret,
    },
    next: { revalidate: 300 },
  });
  const text = await response.text();
  if (response.status === 429) {
    throw new CarImagesRequestError(429, "Limite de requisições da Car Images atingido.");
  }
  if (response.status === 401) {
    throw new CarImagesRequestError(401, parseErrorMessage(text, 401));
  }
  if (!response.ok) {
    return null;
  }
  const parsed = carImagesSignedUrlSchema.safeParse(JSON.parse(text));
  return parsed.success ? parsed.data.url : null;
};

const fetchSignedUrlBatch = async (queries: CarImagesQuery[]): Promise<string[] | null> => {
  const { apiKey, apiSecret } = getCarImagesCredentials();
  const search = new URLSearchParams();
  search.set("api_key", apiKey);
  const response = await fetch(`${API_BASE}/signed-urls?${search.toString()}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-Api-Secret": apiSecret,
    },
    body: JSON.stringify({
      images: queries.map(motoImageParams),
    }),
    next: { revalidate: 300 },
  });
  const text = await response.text();
  if (response.status === 429) {
    throw new CarImagesRequestError(429, "Limite de requisições da Car Images atingido.");
  }
  if (response.status === 401) {
    throw new CarImagesRequestError(401, parseErrorMessage(text, 401));
  }
  if (!response.ok) {
    return null;
  }
  const parsed = carImagesSignedUrlsSchema.safeParse(JSON.parse(text));
  if (!parsed.success || parsed.data.urls.length !== queries.length) {
    return null;
  }
  return parsed.data.urls;
};

export const fetchMotoImageUrls = async (
  queries: CarImagesQuery[],
): Promise<(string | null)[]> => {
  if (queries.length === 0) {
    return [];
  }
  const batch = await fetchSignedUrlBatch(queries);
  if (batch) {
    return batch;
  }
  return Promise.all(queries.map(fetchOneSignedUrl));
};
