import { z } from "zod";
import { DriverBase } from "./DriverBase";
import { TruckBase } from "../Truck/TruckBase";
import { FreightBase } from "../Freight/FreightBase";

export const DriverHomeSchema = z.object({
    driver: DriverBase,
    truck: TruckBase.nullable(),
    last_freight: FreightBase.nullable(),
});

export type DriverHomeSchema = z.infer<typeof DriverHomeSchema>;
