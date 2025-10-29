import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getOrders,
  getOrdersDetailsById,
} from "../controllers/order.controller.js";

const router = Router();

//@route GET /api/orders/my-orders
//@desc Get logged-in user's orders
//@access Private
router.get("/my-orders", verifyJWT, getOrders);

//@route GET /api/orders/:id
//@desc Get order detiails by ID
//@access Private
router.get("/:id", verifyJWT, getOrdersDetailsById);

export default router;
