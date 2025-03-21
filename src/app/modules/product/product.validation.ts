import { z } from "zod";

// Product validation schema
export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Product name is required" }).trim(),
    description: z
      .string()
      .min(1, { message: "Product description is required" }),
    image: z.string().min(1, { message: "Product image is required" }),
  }),
});

export const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

// Product Variant validation schema
export const createProductVariantValidationSchema = z.object({
  body: z.object({
    productId: z.string().min(1, { message: "Product ID is required" }),
    variant: z.string().min(1, { message: "Variant name is required" }).trim(),
    price: z.number().min(0, { message: "Price cannot be negative" }),
  }),
});

export const updateProductVariantValidationSchema = z.object({
  body: z.object({
    productId: z.string().optional(),
    variant: z.string().trim().optional(),
    price: z
      .number()
      .min(0, { message: "Price cannot be negative" })
      .optional(),
    
  }),
});
