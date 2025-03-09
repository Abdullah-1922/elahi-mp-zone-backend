import { Types } from "mongoose";

export type TProduct = {
  name: string;
  description: string;
  image: string;
};

export type TProductVariant = {
  productId: Types.ObjectId;
  variant: string;
  price: number;
  stock: number;
};
