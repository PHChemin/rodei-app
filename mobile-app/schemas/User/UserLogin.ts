import { z } from "zod";
import { UserBase } from "./UserBase";

export const UserLogin = UserBase.extend({
  id: z.number(),
  is_manager: z.boolean(),
  is_driver: z.boolean(),
  manager_id: z.optional(z.number()),
  driver_id: z.optional(z.number()),
});

export type UserLogin = z.infer<typeof UserLogin>;
