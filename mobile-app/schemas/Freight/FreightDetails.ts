import { z } from "zod";
import { DriverBase } from "../Driver/DriverBase";
import { FreightBase } from "./FreightBase";
import { TruckBase } from "../Truck/TruckBase";
import { FleetBase } from "../Fleet/FleetBase";

export const FreightDetailsSchema = FreightBase.extend({
  driver: DriverBase,
  truck: TruckBase,
  fleet: FleetBase,
  driver_commission: z.number(),
  expenses_amount: z.number().nullable(),
  profit: z.number().nullable(),
});

export type FreightDetailsSchema = z.infer<typeof FreightDetailsSchema>;
