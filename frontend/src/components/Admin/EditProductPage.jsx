import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productsSlice.js";
import { apiRequest } from "../../utils/api.js";
import { updateProduct } from "../../redux/slices/adminProductSlice.js";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams()
  const {selectedProduct, loading, error} = useSelector((state) => state.products)

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/150?random=1",
      },
      {
        url: "https://picsum.photos/150?random=2",
      },
    ],
  });

  const [uploading, setUploading] = useState(false);

  useEffect( () => {
    if(id){
      dispatch(fetchProductDetails(id))
    }
  }, [dispatch, id])

  useEffect( () => {
    if(selectedProduct){
      setProductData(selectedProduct)
    }
  }, [selectedProduct])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file)

    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      setUploading(true)
      const data = await apiRequest(
        "post",
        "/api/upload",
        formData,
        token,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProductData( (prevData) => ({...prevData, images: [...prevData.images, {url: data.imageUrl, altText: ""}]}))
      setUploading(false)
      console.log("Upload success:", data);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploading(false)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({id, productData}))
    navigate("/admin/products")
  };

  if(loading) return <p>Loading....</p>
  if(error) return <p>Error: {error}</p>

  return (
    <div className="max-w-6xl mx-auto my-6 p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form action="" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Product Description
          </label>
          <textarea
            type="text"
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
          />
        </div>
        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Stock Available */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Count in Stock
          </label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            SKU
          </label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Category */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Brand */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (comma-seperated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
            required
            placeholder="M, L, XL, XXL"
          />
        </div>
        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors (comma-seperated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(",")}
            placeholder="red, green, blue, purple"
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Upload Image
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full border border-gray-300 rounded-md p-2 cursor-pointer"
          />
          {uploading && <p>Uploading Image...</p>}
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div className="" key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition-colors cursor-pointer"
          type="submit"
        >
          Update Product
        </button>
      </form>
    </div>
  )
}

export default EditProductPage