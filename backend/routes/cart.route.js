import { Router } from "express";
import { Cart } from "../models/cart.model.js";
import { addToCart } from "../controllers/cart.controller.js";

const router = Router();

//@route POST /api/cart
//@desc Add a product to the cart for a guest or logged in user
//@access Public
router.post("/", addToCart);

export default router;
