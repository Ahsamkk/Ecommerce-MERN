import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscriber } from "../models/subscriber.model.js";

const subscribeUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    throw new ApiError(400, "Invalid email address");
  }

  const existingSubscriber = await Subscriber.findOne({ email });
  if (existingSubscriber) {
    return res.status(200).json(new ApiResponse(200, "Already Subscribed"));
  }

  const newSubscriber = await Subscriber.create({ email });

  if (!newSubscriber) {
    throw new ApiError(200, "Error while adding email to database");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Subscribed successfully to newsletter"));
});

export { subscribeUser };
