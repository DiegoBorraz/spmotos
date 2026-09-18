import { z } from "zod";

export const carImagesErrorSchema = z.object({
  error: z.string().optional(),
  message: z.string().optional(),
});

export const carImagesSignedUrlSchema = z.object({
  url: z.string().url(),
});

export const carImagesSignedUrlsSchema = z.object({
  urls: z.array(z.string().url()),
});
