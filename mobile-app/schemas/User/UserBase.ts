import { z } from "zod";

export const UserBase = z.object({
  id: z.number(),
  cpf: z.string(),
  email: z.optional(z.string()),
  name: z.string(),
  is_manager: z.boolean().nullish(),
  is_driver: z.boolean().nullish(),
  avatar: z.string().nullish(),
  manager_id: z.number().nullish(),
  driver_id: z.number().nullish(),
});

export type UserBase = z.infer<typeof UserBase>;
