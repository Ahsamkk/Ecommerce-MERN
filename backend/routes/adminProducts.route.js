import { Router } from "express";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router();

//@route GET /api/admin/products
//@desc Get all products
//@access Private/Admin
router.get(
  "/",
  verifyJWT,
  isAdmin,
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    if (!products) {
      throw new ApiError(404, "Products not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, products, "Products fetched successfully"));
  })
);

export default router;
