import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

// Product routes
router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.patch("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

// Product variant routes
router.post("/variant", ProductController.createProductVariant);
router.get("/:productId/variants", ProductController.getProductVariants);
router.get("/variant/:id", ProductController.getVariantById);
router.patch("/variant/:id", ProductController.updateVariant);
router.delete("/variant/:id", ProductController.deleteVariant);

// Product with variants route
router.get(
  "/:productId/with-variants",
  ProductController.getProductWithVariants,
);

export const ProductRoutes = router;
