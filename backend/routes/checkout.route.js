import { Router } from "express";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import {
  createCheckout,
  finalizeCheckout,
  updateCheckout,
} from "../controllers/checkout.controller.js";

const router = Router();

//@route POST /api/checkout
//@desc Create a new checkout session
//@access Private
router.post("/", verifyJWT, createCheckout);

//@route PUT /api/checkout/:id/pay
//@desc Update checkout to mark as paid after successfull payment
//@access Private
router.put("/:id/pay", verifyJWT, updateCheckout);

//@route POST /api/checkout/:id/finalize
//@desc Finalize checkout and convert to an order after payment confirmation
//@access Private
router.post("/:id/finalize", verifyJWT, finalizeCheckout);

export default router;
