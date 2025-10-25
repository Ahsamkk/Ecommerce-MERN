import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    discountedPrice,
    countInStock,
    category,
    brand,
    sizes,
    colors,
    collections,
    material,
    gender,
    images,
    isFeatured,
    isPublished,
    tags,
    dimensions,
    weight,
    sku,
  } = req.body;

  if (
    !name ||
    !description ||
    !price ||
    !discountedPrice ||
    !countInStock ||
    !sku ||
    !category ||
    !sizes ||
    sizes.length === 0 ||
    !colors ||
    colors.length === 0 ||
    !collections ||
    !images ||
    images.length === 0 ||
    !images[0].url
  ) {
    throw new ApiError(400, "One or more required fields are missing");
  }

  const createdProduct = await Product.create({
    name,
    description,
    price,
    discountedPrice,
    countInStock,
    category,
    brand,
    sizes,
    colors,
    collections,
    material,
    gender,
    images,
    isFeatured,
    isPublished,
    tags,
    dimensions,
    weight,
    sku,
    user: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createdProduct, "Product created Successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    discountPrice,
    countInStock,
    category,
    brand,
    sizes,
    colors,
    collections,
    material,
    gender,
    images,
    isFeatured,
    isPublished,
    tags,
    dimensions,
    weight,
    sku,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.discountPrice = discountPrice || product.discountPrice;
  product.countInStock = countInStock || product.countInStock;
  product.category = category || product.category;
  product.brand = brand || product.brand;
  product.sizes = sizes || product.sizes;
  product.colors = colors || product.colors;
  product.collections = collections || product.collections;
  product.material = material || product.material;
  product.gender = gender || product.gender;
  product.images = images || product.images;
  product.isFeatured =
    isFeatured !== undefined ? isFeatured : product.isFeatured;
  product.isPublished =
    isPublished !== undefined ? isPublished : product.isPublished;
  product.tags = tags || product.tags;
  product.dimensions = dimensions || product.dimensions;
  product.weight = weight || product.weight;
  product.sku = sku || product.sku;

  const updatedProduct = await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated Succesfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid product id");
  }

  const deletedProduct = await Product.findByIdAndDelete(productId);

  if (!deletedProduct) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedProduct, "Product deleted Successfully"));
});

export { createProduct, updateProduct, deleteProduct };
