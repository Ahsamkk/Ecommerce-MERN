import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getUserProfile,
  loginUser,
  registerUser,
  refreshAccessToken,
  logoutUser,
} from "../controllers/user.controller.js";

const router = Router();

//@route POST /api/users/register
//@desc Register a new user
//@access Public
router.route("/register").post(registerUser);

//@desc Authenticate user
//@access Public
router.route("/login").post(loginUser);

//@desc Get logged-in user's profile
//@access Private
router.route("/profile").get(verifyJWT, getUserProfile);

//@desc Logout the user
router.route("/logout").post(verifyJWT, logoutUser);

//@desc Refresh Tokens
router.route("/refresh-token").post(refreshAccessToken);

export default router;
