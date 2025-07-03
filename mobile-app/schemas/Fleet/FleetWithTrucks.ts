import { z } from "zod";
import { TruckBase } from "../Truck/TruckBase";

export const FleetWithTrucks = z.object({
  id: z.number(),
  name: z.string(),
  trucks: z.array(TruckBase),
});

export type FleetWithTrucks = z.infer<typeof FleetWithTrucks>;
