import { Router } from "express";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { createCheckout } from "../controllers/checkout.controller.js";

const router = Router();

//@route POST /api/checkout
//@desc Create a new checkout session
//@access Private
router.post("/", verifyJWT, createCheckout);

export default router;
