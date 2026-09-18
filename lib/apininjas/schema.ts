import { z } from "zod";

const optionalText = z.string().nullable().optional();

export const apiNinjasMotorcycleSchema = z.object({
  make: z.string(),
  model: z.string(),
  year: z.union([z.string(), z.number()]).nullable().optional(),
  type: optionalText,
  displacement: optionalText,
  engine: optionalText,
  power: optionalText,
  torque: optionalText,
  gearbox: optionalText,
  fuel_system: optionalText,
  cooling: optionalText,
  clutch: optionalText,
  starter: optionalText,
  front_brakes: optionalText,
  rear_brakes: optionalText,
  total_weight: optionalText,
  seat_height: optionalText,
  fuel_capacity: optionalText,
});

export const apiNinjasListSchema = z.array(apiNinjasMotorcycleSchema);

export const apiNinjasErrorSchema = z.object({
  error: z.string().optional(),
  message: z.string().optional(),
});
