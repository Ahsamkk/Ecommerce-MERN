import { Checkout } from "../models/checkout.model.js";
import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
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

const updateCheckout = asyncHandler(async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  const checkout = await Checkout.findById(req.params.id);

  if (!checkout) {
    throw new ApiError(404, "Checkout not found");
  }

  if (paymentStatus === "paid") {
    checkout.isPaid = true;
    checkout.paymentStatus = paymentStatus;
    checkout.paymentDetails = paymentDetails;
    checkout.paidAt = Date.now();

    await checkout.save();

    return res
      .status(200)
      .json(new ApiResponse(200, checkout, "Checkout updated successfully"));
  } else {
    throw new ApiError(400, "Invalid payment status");
  }
});

const finalizeCheckout = asyncHandler(async (req, res) => {
  const checkout = await Checkout.findById(req.params.id);

  if (!checkout) {
    throw new ApiError(404, "Checkout not found");
  }

  if (checkout.isPaid && !checkout.isFinalized) {
    //Create final Order based on the checkout details
    const finalOrder = await Order.create({
      user: checkout.user,
      orderItems: checkout.checkoutItems,
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
      isDelivered: false,
      paymentStatus: "paid",
      paymentDetails: checkout.paymentDetails,
    });

    checkout.isFinalized = true;
    checkout.finalizedAt = Date.now();
    await checkout.save();

    await Cart.findOneAndDelete({ user: checkout.user });
    return res
      .status(201)
      .json(
        new ApiResponse(401, "Checkout finalized and Order created succesfully")
      );
  }
});

export { createCheckout, updateCheckout, finalizeCheckout };
