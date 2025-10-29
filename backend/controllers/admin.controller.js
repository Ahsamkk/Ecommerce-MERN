import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (!users) {
    throw new ApiError(404, "Users not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users found successfully"));
});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Please fill all fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const newUser = await User.create({
    name,
    email,
    password,
    isAdmin,
  });

  return res.status(201).json(201, newUser, "User created successfully");
});

export { getUsers, createUser };
