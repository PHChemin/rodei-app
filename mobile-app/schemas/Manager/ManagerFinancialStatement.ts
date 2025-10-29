import { z } from "zod";

export const ManagerFinancialStatement = z.object({
    freights_count: z.number(),
    expenses_count: z.number(),
    total_revenue: z.number(),
    total_expenses: z.number(),
    total_profit: z.number(),
    last_month_profit: z.number(),
});

export type ManagerFinancialStatement = z.infer<typeof ManagerFinancialStatement>;