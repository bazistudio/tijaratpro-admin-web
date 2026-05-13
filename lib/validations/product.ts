import { z } from "zod"

/**
 * TijaratPro Production Product Contract
 * Supports: Retail, Wholesale, and Multi-Branch Operations.
 */

export const productSchema = z.object({
  // Core Identity
  id: z.string().optional(),
  name: z.string()
    .min(3, "Product name must be at least 3 characters")
    .max(120, "Product name is too long (max 120 chars)")
    .trim(),
  slug: z.string().optional(),
  sku: z.string()
    .min(4, "SKU must be at least 4 characters")
    .trim()
    .toUpperCase(),
  barcode: z.string()
    .regex(/^\d+$/, "Barcode must contain only numbers")
    .optional(),
  description: z.string().max(2000, "Description is too long").optional(),
  brand: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  subcategoryId: z.string().optional(),
  tags: z.array(z.string()).default([]),

  // Pricing (Support for Retail & Wholesale)
  costPrice: z.number()
    .min(0, "Cost price cannot be negative")
    .default(0),
  sellingPrice: z.number()
    .min(0, "Selling price cannot be negative")
    .default(0),
  wholesalePrice: z.number().min(0).optional(),
  discountPrice: z.number().min(0).optional(),
  taxRate: z.number().min(0).max(100, "Tax rate must be between 0-100%").default(0),
  profitMargin: z.number().optional(),

  // Inventory & Warehouse Logic
  stock: z.number().int().min(0, "Stock cannot be negative").default(0),
  minStockAlert: z.number().int().min(0).default(5),
  maxStockLimit: z.number().int().optional(),
  unit: z.string().default("pcs"),
  warehouseId: z.string().optional(),
  trackInventory: z.boolean().default(true),
  allowBackorder: z.boolean().default(false),

  // Variants
  variants: z.array(z.object({
    id: z.string().optional(),
    type: z.enum(["size", "color", "flavor", "weight", "material", "other"]),
    value: z.string().min(1, "Variant value is required").trim(),
    price: z.number().min(0).optional(),
    sku: z.string().trim().toUpperCase().optional(),
  })).default([]),

  // Media Assets
  thumbnail: z.string().url("Invalid image URL format").optional(),
  gallery: z.array(z.string().url()).default([]),

  // Business Logic & Compliance
  supplierId: z.string().optional(),
  expiryDate: z.date().optional(),
  manufacturingDate: z.date().optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  status: z.enum(["draft", "published", "archived"]).default("published"),

  // SEO
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),

  // Industry Specific Metadata (Dynamic Evolution)
  industryMetadata: z.record(z.string(), z.any()).optional().default({}),
}).refine((data) => {
  return data.sellingPrice >= data.costPrice
}, {
  message: "Selling price cannot be lower than cost price (Loss detected)",
  path: ["sellingPrice"],
})

export type Product = z.infer<typeof productSchema>
