import { z } from "zod";

export const stockMovementFilterSchema = z.object({
  productId: z.string().optional(),
  type: z
    .enum(["purchase", "sale", "adjustment", "return", "damage", "transfer", ""])
    .optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type StockMovementFilterValues = z.infer<typeof stockMovementFilterSchema>;
