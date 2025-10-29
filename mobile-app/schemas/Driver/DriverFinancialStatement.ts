import { z } from "zod";

export const DriverFinancialStatement = z.object({
    freights_count: z.number(),
    commission_percentage: z.number(),
    total_profit: z.number(),
    last_month_profit: z.number(),
});

export type DriverFinancialStatement = z.infer<typeof DriverFinancialStatement>;