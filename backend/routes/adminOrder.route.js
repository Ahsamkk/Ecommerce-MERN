import { Router } from "express";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import {
  deleteOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/adminOrder.controller.js";

const router = Router();

//@route GET /api/admin/orders
//@desc Get all orders (Admin only)
//@access Private/Admin
router.get("/", verifyJWT, isAdmin, getAllOrders);

//@route PUT /api/admin/orders/:id
//@desc Update order status (Admin only)
//@access Private/Admin
router.put("/:id", verifyJWT, isAdmin, updateOrderStatus);

//@route DELETE /api/admin/orders/:id
//@desc Delete an order (Admin only)
//@access Private/Admin
router.delete("/:id", verifyJWT, isAdmin, deleteOrder);

export default router;
