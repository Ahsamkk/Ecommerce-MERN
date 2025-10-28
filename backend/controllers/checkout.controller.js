import { Checkout } from "../models/checkout.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createCheckout = asyncHandler(async (req, res) => {
  const {
    checkoutItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    paymentStatus,
    paymentDetails,
  } = req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    throw new ApiError(400, "Checkout items are missing");
  }

  const checkout = await Checkout.create({
    user: req.user._id,
    checkoutItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    paymentStatus,
    paymentDetails,
    isPaid: false,
  });

  if (!checkout) {
    throw new ApiError(400, "Checkout couldnt be created");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, checkout, "Checkout created successfully"));
});

export { createCheckout };
