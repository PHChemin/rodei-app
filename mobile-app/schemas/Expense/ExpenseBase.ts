import { z } from "zod";

export const ExpenseBaseSchema = z.object({
  id: z.number(),
  type: z.string(),
  amount: z.number(),
  location: z.string(),
  date: z.string(),
  description: z.string().nullable(),
  freight_id: z.number(),
  document_path: z.string().nullable(),
});

export type ExpenseBaseSchema = z.infer<typeof ExpenseBaseSchema>;
