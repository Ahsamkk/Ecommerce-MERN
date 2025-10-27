import { asyncHandler } from "../utils/asyncHandler.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getUserOrGuestCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  if (!productId) {
    throw new ApiError(400, "ProductId is missing");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const cart = await getUserOrGuestCart(userId, guestId);

  // find index of the product if it already exists in cart
  if (cart) {
    const productIndex = cart.products.findIndex(
      (product) =>
        product.productId.toString() === productId &&
        product.size === size &&
        product.color === color
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += Number(quantity);
    } else {
      cart.products.push({
        productId,
        name: product.name,
        image: product.images[0].url,
        price: product.price,
        size,
        color,
        quantity,
      });
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();

    return res
      .status(200)
      .json(new ApiResponse(200, cart, "Added to cart Successfully"));
  } else {
    // Create new cart for user or guest
    const newCart = await Cart.create({
      user: userId ? userId : undefined,
      guestId: guestId ? guestId : "guest_" + new Date().getTime(),
      // guestId: userId ? undefined : guestId || "guest_" + new Date.getTime(),
      products: [
        {
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        },
      ],
      totalPrice: product.price * quantity,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newCart, "New Cart created Successfully"));
  }
});

const changeProductQuantity = asyncHandler(async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  if (!productId) {
    throw new ApiError(400, "ProductId is missing");
  }

  const cart = await getUserOrGuestCart(userId, guestId);

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const productIndex = cart.products.findIndex(
    (product) =>
      product.productId.toString() === productId &&
      product.size === size &&
      product.color === color
  );

  if (productIndex > -1) {
    if (quantity > 0) {
      cart.products[productIndex].quantity = quantity;
    } else {
      cart.products.splice(productIndex, 1);
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
    return res
      .status(200)
      .json(new ApiResponse(200, cart, "Cart quantity updated succesfully"));
  } else {
    return res
      .status(404)
      .json(new ApiResponse(404, "Product not found in cart"));
  }
});

const deleteProductFromCart = asyncHandler(async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  const cart = await getUserOrGuestCart(userId, guestId);

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const productIndex = cart.products.findIndex(
    (product) =>
      product.productId.toString() === productId &&
      product.size === size &&
      product.color === color
  );

  if (productIndex > -1) {
    cart.products.splice(productIndex, 1);

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  } else {
    throw new ApiError(404, "Product not found in cart");
  }

  await cart.save();
  return res.json(
    new ApiResponse(200, cart, "Product deleted from cart successfully")
  );
});

const getCartDetails = asyncHandler(async (req, res) => {
  const { userId, guestId } = req.query;

  const cart = await getUserOrGuestCart(userId, guestId);

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart found successfully"));
});

const mergeCart = asyncHandler(async (req, res) => {
  const { guestId } = req.body;

  if (!guestId) {
    throw new ApiError(400, "GuestId is missing");
  }

  const guestCart = await Cart.findOne({ guestId });
  const userCart = await Cart.findOne({ user: req.user.id });

  // If there is no guest cart, return not found
  if (!guestCart) {
    if (!userCart) {
      throw new ApiError(404, "Guest cart not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, userCart, "Cart already merged"));
  }

  if (guestCart.products.length === 0) {
    return res.status(400).json(400, "Guest cart is empty");
  }

  if (guestCart) {
    // if guest cart and user cart both exist merge them
    if (userCart) {
      guestCart.products.forEach((guestItem) => {
        const productIndex = userCart.products.findIndex(
          (cartItem) =>
            cartItem.productId.toString() === guestItem.productId.toString() &&
            cartItem.color === guestItem.color &&
            cartItem.size === guestItem.size
        );

        if (productIndex > -1) {
          userCart.products[productIndex].quantity += guestItem.quantity;
        } else {
          userCart.products.push(guestItem);
        }
      });

      userCart.totalPrice = userCart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await userCart.save();

      await Cart.findOneAndDelete({ guestId });

      return res
        .status(200)
        .json(new ApiResponse(200, userCart, "Cart merged successfully"));
    } else {
      //If the user has no existing cart, assign the guest cart to the user
      guestCart.user = req.user._id;
      guestCart.guestId = undefined;
      await guestCart.save();

      return res
        .status(200)
        .json(new ApiResponse(200, guestCart, "Cart merged successfully"));
    }
  }
});

export {
  addToCart,
  changeProductQuantity,
  deleteProductFromCart,
  getCartDetails,
  mergeCart,
};
