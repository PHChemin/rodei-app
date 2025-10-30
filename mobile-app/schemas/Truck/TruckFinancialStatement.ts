import { z } from "zod";

export const TruckFinancialStatement = z.object({
    freights_count: z.number(),
    expenses_count: z.number(),
    total_revenue: z.number(),
    total_costs: z.number(),
    total_profit: z.number(),
    last_month_profit: z.number(),
});

export type TruckFinancialStatement = z.infer<typeof TruckFinancialStatement>;