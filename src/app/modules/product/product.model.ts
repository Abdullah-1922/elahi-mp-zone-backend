import { Schema, model } from "mongoose";
import { TProduct, TProductVariant } from "./product.interface";

// Product Schema
const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
  },
  {
    timestamps: true,
  },
);

// Product Variant Schema
const productVariantSchema = new Schema<TProductVariant>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
    },
    variant: {
      type: String,
      required: [true, "Variant name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Variant price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Variant stock is required"],
      min: [0, "Stock cannot be negative"],
    },
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProduct>("Product", productSchema);
export const ProductVariant = model<TProductVariant>(
  "ProductVariant",
  productVariantSchema,
);
