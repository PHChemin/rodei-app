import { z } from "zod";

export const UserBase = z.object({
  id: z.number(),
  name: z.string(),
  cpf: z.string(),
  email: z.optional(z.string()),
});

export type UserBase = z.infer<typeof UserBase>;
