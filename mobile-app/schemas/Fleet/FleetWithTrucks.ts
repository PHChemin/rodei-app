import { z } from "zod";
import { TruckWithDriver } from "../Truck/TruckWithDriver";

export const FleetWithTrucks = z.object({
  id: z.number(),
  name: z.string(),
  trucks: z.array(TruckWithDriver),
});

export type FleetWithTrucks = z.infer<typeof FleetWithTrucks>;
