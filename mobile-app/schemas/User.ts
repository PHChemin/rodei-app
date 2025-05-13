import { z } from "zod";

export const User = z.object({
  id: z.string(),
  collectionId: z.string(),
  collectionName: z.string(),
  verified: z.boolean(),
  emailVisibility: z.boolean(),
  email: z.optional(z.string()),
  created: z.string(),
  updated: z.string(),
  name: z.string(),
  avatar: z.string(),
});

export type User = z.infer<typeof User>;
