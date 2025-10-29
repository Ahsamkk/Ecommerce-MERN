import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email");

  if (!orders) {
    throw new ApiError(404, "Orders not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders found succesfully"));
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  order.status = req.body.status || order.status;
  order.isDelivered =
    req.body.status === "Delivered" ? true : order.isDelivered;
  order.deliveredAt =
    req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

  const updatedOrder = await order.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedOrder, "Orders status updated succesfully")
    );
});

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order deleted successfully"));
});

export { getAllOrders, updateOrderStatus, deleteOrder };
