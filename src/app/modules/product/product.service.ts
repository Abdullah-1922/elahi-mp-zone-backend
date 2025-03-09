import { TProduct, TProductVariant } from "./product.interface";
import { Product, ProductVariant } from "./product.model";

// Product Service

// Create a new product
const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

// Get all products
const getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

// Get single product by id
const getProductById = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

// Update product
const updateProduct = async (id: string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new Error("Product not found");
  }

  return result;
};

// Delete product
const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw new Error("Product not found");
  }

  return result;
};

// Product Variant Services
// Create product variant
const createProductVariant = async (payload: TProductVariant) => {
  const product = await Product.findById(payload.productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const result = await ProductVariant.create(payload);
  return result;
};
// Get all variants of a product
const getProductVariants = async (productId: string) => {
  const product = await
  Product.findById(productId).lean();
  if (!product) {
    throw new Error("Product not found");
  }
  const variants = await ProductVariant.find({ productId }).lean();
   const data ={product, variants}
  return data;
};

// Get single variant
const getVariantById = async (id: string) => {
  const variant = await ProductVariant.findById(id);
  if (!variant) {
    throw new Error("Variant not found");
  }

  return variant;
};

// Update variant
const updateVariant = async (id: string, payload: Partial<TProductVariant>) => {
  const result = await ProductVariant.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) {
    throw new Error("Variant not found");
  }
  return result;
};
// Delete variant
const deleteVariant = async (id: string) => {
  const result = await ProductVariant.findByIdAndDelete(id);

  if (!result) {
    throw new Error("Variant not found");
  }

  return result;
};

// Get product with variants
const getProductWithVariants = async (productId: string) => {
  const product = await Product.findById(productId);
  const variants = await ProductVariant.find({ productId });
  return { product, variants };
};




export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductVariant,
  getProductVariants,
  getVariantById,
  updateVariant,
  deleteVariant,
  getProductWithVariants,
};
