import { z } from "zod";
import { FreightDetailsSchema } from "./FreightDetails";
import { ExpenseBaseSchema } from "../Expense/ExpenseBase";

export const FreightDetailsWithExpensesSchema = FreightDetailsSchema.extend({
    expenses: z.array(ExpenseBaseSchema),
});

export type FreightDetailsWithExpensesSchema = z.infer<
    typeof FreightDetailsWithExpensesSchema
>;