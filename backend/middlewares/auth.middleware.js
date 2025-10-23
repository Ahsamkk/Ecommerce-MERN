import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model";

// Middleware to protect routes
const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken?._id).select("-password");

  if (!user) {
    throw new ApiError(401, "Invalid Access Token");
  }

  req.user = user;
  next();
});

//Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

export { verifyJWT };
