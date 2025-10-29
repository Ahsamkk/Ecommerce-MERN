import { Router } from "express";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { createUser, getUsers } from "../controllers/admin.controller.js";

const router = Router();

//@route GET /api/admin/users
//@desc Get all users
//@access Private/Admin
router.get("/", verifyJWT, isAdmin, getUsers);

//@route POST /api/admin/users
//@desc Create a new user (admin only)
//@access Private/Admin
router.post("/", verifyJWT, isAdmin, createUser);

export default router;
