"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/ui/SectionCard";
import { useBusinessConfig } from "@/hooks/useBusinessConfig";
import { useProductsStore } from "@/store/products.store";
import { toast } from "sonner";

const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  sku: z.string().min(3, "SKU is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  cost: z.coerce.number().min(0, "Cost must be positive"),
  currentStock: z.coerce.number().min(0, "Stock cannot be negative"),
  metadata: z.record(z.string(), z.any()).optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function CreateProductPage() {
  const router = useRouter();
  const { productFields, businessType } = useBusinessConfig();
  const { addProduct, isLoading } = useProductsStore();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      price: 0,
      cost: 0,
      currentStock: 0,
      metadata: {},
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    try {
      // Extract metadata fields from form state (since they are dynamic)
      const metadata: Record<string, any> = {};
      productFields.forEach((field) => {
        const val = (form.getValues() as any)[field.name];
        if (val) metadata[field.name] = val;
      });

      await addProduct({
        ...values,
        metadata,
      } as any);

      toast.success("Product created successfully");
      router.push("/products");
    } catch (error: any) {
      toast.error(error.message || "Failed to create product");
    }
  };

  return (
    <PageLayout
      title="Add New Product"
      breadcrumbs={
        <span className="flex items-center gap-2">
          Products <span className="text-muted-foreground/50">/</span> Add New
        </span>
      }
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Catalog
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* General Information */}
              <SectionCard title="Basic Details" className="h-full">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Samsung A12 LCD" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU / Barcode</FormLabel>
                        <FormControl>
                          <Input placeholder="UNIQ-001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </SectionCard>

              {/* Pricing & Stock */}
              <SectionCard title="Pricing & Inventory" className="h-full">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="cost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cost Price (Rs)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sale Price (Rs)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="currentStock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Initial Stock Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </SectionCard>

              {/* Dynamic Business-Specific Fields */}
              <SectionCard
                title={`${businessType.charAt(0) + businessType.slice(1).toLowerCase()} Specifications`}
                className="md:col-span-2 bg-primary/5 border-primary/20"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {productFields.map((field) => (
                    <FormItem key={field.name}>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        <Input
                          type={field.type}
                          placeholder={field.placeholder}
                          {...form.register(field.name as any)}
                        />
                      </FormControl>
                    </FormItem>
                  ))}
                </div>
              </SectionCard>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="min-w-[150px]">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Product
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}
