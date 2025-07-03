import { z } from "zod";
import { TruckBase } from "../Truck/TruckBase";

export const FleetBase = z.object({
  id: z.number(),
  name: z.string(),
});

export type FleetBase = z.infer<typeof FleetBase>;
