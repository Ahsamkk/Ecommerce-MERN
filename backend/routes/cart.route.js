import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addToCart,
  changeProductQuantity,
  deleteProductFromCart,
  getCartDetails,
  mergeCart,
} from "../controllers/cart.controller.js";

const router = Router();

//@route POST /api/cart
//@desc Add a product to the cart for a guest or logged in user
//@access Public
router.post("/", addToCart);

//@route PUT /api/cart
//@desc Update product quantity from plus minus button
//@access Public
router.put("/", changeProductQuantity);

//@route DELETE /api/cart
//@desc Remove product from the cart
//@access Public
router.delete("/", deleteProductFromCart);

//@route GET /api/cart
//@desc Get logged-in users or guest users cart
//@access Public
router.get("/", getCartDetails);

//@route POST /api/cart/merge
//@desc Merge guest cart into user cart on login
//@access Private
router.post("/merge", verifyJWT, mergeCart);

export default router;
