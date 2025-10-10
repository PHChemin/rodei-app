import { z } from "zod";
import { DriverBase } from "../Driver/DriverBase";
import { TruckBase } from "./TruckBase";

export const TruckWithDriver = TruckBase.extend({
  driver: DriverBase.nullable().optional(),
});

export type TruckWithDriver = z.infer<typeof TruckWithDriver>;
