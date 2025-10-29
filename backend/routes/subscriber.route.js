import { Router } from "express";
import { subscribeUser } from "../controllers/subscriber.controller.js";

const router = Router();

//@route POST /api/subscribe
//@desc Subscribe a user
//@access Public
router.post("/subscribe", subscribeUser);

export default router;
