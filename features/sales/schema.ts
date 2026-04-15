import { z } from "zod";

const positiveInt = (field: string) =>
  z.coerce.number({ invalid_type_error: `${field} must be a number` }).int().min(1, `${field} must be at least 1`);

const positiveNum = (field: string) =>
  z.coerce.number({ invalid_type_error: `${field} must be a number` }).min(0, `${field} must be 0 or greater`);

// Single order item row
export const orderItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  quantity: positiveInt("Quantity"),
  unitPrice: positiveNum("Unit price").min(0.01, "Price must be greater than 0"),
});

export const createOrderSchema = z.object({
  customerId: z.string().optional().or(z.literal("")),
  customerName: z.string().max(100).optional().or(z.literal("")),
  customerPhone: z
    .string()
    .regex(/^[0-9+\-\s()]*$/, "Invalid phone")
    .max(20)
    .optional()
    .or(z.literal("")),
  items: z
    .array(orderItemSchema)
    .min(1, "At least one item is required"),
  discount: positiveNum("Discount").optional(),
  tax: positiveNum("Tax").optional(),
  amountPaid: positiveNum("Amount paid").optional(),
  paymentMethod: z
    .enum(["cash", "card", "bank_transfer", "online", ""])
    .optional(),
  notes: z.string().max(300).optional().or(z.literal("")),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    "pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "returned",
  ]),
});

export type CreateOrderFormValues      = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusFormValues = z.infer<typeof updateOrderStatusSchema>;
export type OrderItemFormValues        = z.infer<typeof orderItemSchema>;
