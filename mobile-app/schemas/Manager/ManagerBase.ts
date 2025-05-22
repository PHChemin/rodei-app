import { z } from "zod";

export const ManagerBase = z.object({
  id: z.number(),
  user_id: z.number(),
});

export type ManagerBase = z.infer<typeof ManagerBase>;
