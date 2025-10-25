import { Router } from "express";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getBestSeller,
  getNewArrivals,
  getProductById,
  getSimilarProducts,
} from "../controllers/product.controller.js";

const router = Router();

router.route();

//@route POST /api/products
//@desc Create a new product
//@access Private/Admin
router.post("/", verifyJWT, isAdmin, createProduct);

//@route PUT /api/products/:id
//@desc Update an existing product ID
//@access Private/Admin
router.put("/:id", verifyJWT, isAdmin, updateProduct);

//@route DELETE /api/products/:id
//@desc Delete an existing product ID
//@access Private/Admin
router.delete("/:id", verifyJWT, isAdmin, deleteProduct);

//@route GET /api/products
//@desc Get all products with optional query filters
//@access Public
router.get("/", getProducts);

//@route GET /api/products/best-seller
//@desc Rerieve the product with highest rating
//@access Public
router.get("/best-seller", getBestSeller);

//@route GET /api/products/new-arrivals
//@desc Rerieve latest 8 products= creation date
//@access Public
router.get("/new-arrivals", getNewArrivals);

//@route GET /api/products/:id
//@desc Get a single product by iD
//@access Public
router.get("/:id", getProductById);

//@route GET /api/products/similar/:id
//@desc Rerieve similar products based on the current product's gender and category
//@access Public
router.get("/similar/:id", getSimilarProducts);

export default router;
