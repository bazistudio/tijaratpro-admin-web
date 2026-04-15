import { z } from "zod";

// ─── Product Zod schemas ──────────────────────────────────────────────────────

const positiveNumber = (field: string) =>
  z.coerce
    .number({ invalid_type_error: `${field} must be a number` })
    .min(0, `${field} must be 0 or greater`);

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(150, "Name is too long"),
  description: z.string().max(500).optional().or(z.literal("")),
  category: z.string().max(80).optional().or(z.literal("")),
  sku: z.string().max(50).optional().or(z.literal("")),
  barcode: z.string().max(50).optional().or(z.literal("")),
  price: positiveNumber("Selling price").min(0.01, "Price must be greater than 0"),
  costPrice: positiveNumber("Cost price").optional(),
  stock: positiveNumber("Stock").int("Stock must be a whole number"),
  lowStockThreshold: positiveNumber("Low stock threshold")
    .int("Must be whole number")
    .optional(),
  unit: z.string().max(20).optional().or(z.literal("")),
  imageUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
});

export const stockAdjustSchema = z.object({
  adjustment: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .refine((v) => v !== 0, "Adjustment cannot be zero"),
  reason: z.string().max(200).optional().or(z.literal("")),
});

export const productFilterSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional(),
  lowStock: z.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type ProductFormValues      = z.infer<typeof productSchema>;
export type StockAdjustFormValues  = z.infer<typeof stockAdjustSchema>;
export type ProductFilterValues    = z.infer<typeof productFilterSchema>;
