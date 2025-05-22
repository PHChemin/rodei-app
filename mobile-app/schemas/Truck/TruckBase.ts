import { z } from "zod";

export const TruckBase = z.object({
  id: z.number(),
  brand_name: z.string(),
  model: z.string(),
  license_plate: z.string(),
  color: z.string(),
  fleet_id: z.number(),
});

export type TruckBase = z.infer<typeof TruckBase>;
