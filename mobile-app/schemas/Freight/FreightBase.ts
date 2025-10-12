import { z } from "zod";

export const FreightBase = z.object({
  id: z.number(),
  start_address: z.string(),
  end_address: z.string(),
  contractor_name: z.string(),
  date: z.string(),
  cargo_weight: z.number(),
  ton_price: z.number(),
  advance_percentage: z.number(),
  advance: z.number(),
  total_amount: z.number(),
  description: z.optional(z.string()).nullable(),
  fleet_id: z.number(),
  truck_id: z.number(),
  driver_id: z.number(),
});

export type FreightBase = z.infer<typeof FreightBase>;
