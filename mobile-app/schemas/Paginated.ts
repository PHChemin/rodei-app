import { z } from "zod";

export const Paginated = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    items: z.array(schema),
    page: z.number(),
    perPage: z.number(),
    totalPages: z.number(),
    totalItems: z.number(),
  });

type PaginatedItemsType<T extends z.ZodTypeAny> = ReturnType<
  typeof Paginated<T>
>;

export type Paginated<T> = z.infer<PaginatedItemsType<z.ZodType<T>>>;
