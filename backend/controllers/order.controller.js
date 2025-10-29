import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Order } from "../models/order.model.js";

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  if (!orders) {
    throw new ApiError(404, "Orders not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

const getOrdersDetailsById = asyncHandler(async (req, res) => {
  const orderDetails = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!orderDetails) {
    throw new ApiError(404, "Orders details not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, orderDetails, "Orders details fetched successfully")
    );
});

export { getOrders, getOrdersDetailsById };
