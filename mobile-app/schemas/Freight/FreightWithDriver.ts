import { z } from "zod";
import { DriverBase } from "../Driver/DriverBase";
import { FreightBase } from "./FreightBase";

export const FreightWithDriver = FreightBase.extend({
  driver: DriverBase,
});

export type FreightWithDriver = z.infer<typeof FreightWithDriver>;
