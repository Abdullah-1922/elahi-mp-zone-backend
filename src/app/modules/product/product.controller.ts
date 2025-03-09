import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// Product Controllers

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await ProductServices.createProduct(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Product created successfully",
    data: product,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await ProductServices.getAllProducts();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Products retrieved successfully",
    data: products,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const product = await ProductServices.getProductById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Product retrieved successfully",
    data: product,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const updatedProduct = await ProductServices.updateProduct(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Product updated successfully",
    data: updatedProduct,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  await ProductServices.deleteProduct(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Product deleted successfully",
    data: null,
  });
});

// Product Variant Controllers

const createProductVariant = catchAsync(async (req: Request, res: Response) => {
  const variant = await ProductServices.createProductVariant(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Product variant created successfully",
    data: variant,
  });
});

const getProductVariants = catchAsync(async (req: Request, res: Response) => {
  const variants = await ProductServices.getProductVariants(
    req.params.productId,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Product with variants retrieved successfully",
    data: variants,
  });
});

const getVariantById = catchAsync(async (req: Request, res: Response) => {
  const variant = await ProductServices.getVariantById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Product variant retrieved successfully",
    data: variant,
  });
});

const updateVariant = catchAsync(async (req: Request, res: Response) => {
  const updatedVariant = await ProductServices.updateVariant(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Product variant updated successfully",
    data: updatedVariant,
  });
});

const deleteVariant = catchAsync(async (req: Request, res: Response) => {
  await ProductServices.deleteVariant(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Product variant deleted successfully",
    data: null,
  });
});

const getProductWithVariants = catchAsync(
  async (req: Request, res: Response) => {
    const productWithVariants = await ProductServices.getProductWithVariants(
      req.params.productId,
    );
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Product with variants retrieved successfully",
      data: productWithVariants,
    });
  },
);

export const ProductController = {
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
