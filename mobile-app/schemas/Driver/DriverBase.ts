import { z } from "zod";
import { UserBase } from "../User/UserBase";

export const DriverBase = z.object({
  id: z.number(),
  user: UserBase,
});

export type DriverBase = z.infer<typeof DriverBase>;
