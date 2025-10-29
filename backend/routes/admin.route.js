import { Router } from "express";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/admin.controller.js";

const router = Router();

//@route GET /api/admin/users
//@desc Get all users
//@access Private/Admin
router.get("/", verifyJWT, isAdmin, getUsers);

//@route POST /api/admin/users
//@desc Create a new user (admin only)
//@access Private/Admin
router.post("/", verifyJWT, isAdmin, createUser);

//@route PUT /api/admin/users/:id
//@desc Update a user info (admin only)
//@access Private/Admin
router.put("/:id", verifyJWT, isAdmin, updateUser);

//@route DELETE /api/admin/users/:id
//@desc Delete a user (admin only)
//@access Private/Admin
router.delete("/:id", verifyJWT, isAdmin, deleteUser);

export default router;
