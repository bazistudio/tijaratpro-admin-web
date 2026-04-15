import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().min(1, "Supplier name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]*$/, "Invalid phone number")
    .max(20)
    .optional()
    .or(z.literal("")),
  address: z.string().max(200).optional().or(z.literal("")),
  city: z.string().max(80).optional().or(z.literal("")),
  company: z.string().max(150).optional().or(z.literal("")),
  notes: z.string().max(300).optional().or(z.literal("")),
});

export type SupplierFormValues = z.infer<typeof supplierSchema>;
