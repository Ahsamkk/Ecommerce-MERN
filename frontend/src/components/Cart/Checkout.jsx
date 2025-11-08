import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import PaypalButton from "./PaypalButton"
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice.js";
import { apiRequest } from "../../utils/api.js";

const Checkout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Online",
          totalPrice: cart.totalPrice,
        })
      );

      if (response.payload && response.payload._id) {
        setCheckoutId(response.payload._id);
        handlePaymentSuccess(response.payload);
      }
    } catch (err) {
      console.error("Checkout creation failed:", err);
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const response = await apiRequest(
        "put",
        `/api/checkout/${details._id}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        token
      );

      if (response) {
        await handleFinalizeCheckout(details._id);
      }
    } catch (err) {
      console.error("Payment update failed:", err);
    }
  };

  const handleFinalizeCheckout = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const response = await apiRequest(
        "post",
        `/api/checkout/${id}/finalize`,
        {},
        token
      );

      if (response) {
        navigate("/order-confirmation");
      }
    } catch (err) {
      console.error("Finalizing checkout failed:", err);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Error: {error}</p>;
  if (!cart || !cart.products?.length)
    return <p className="text-center">Your cart is empty</p>;

  

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form action="" onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" value={user ? user.email : ""} className="w-full p-2 border rounded" disabled/>
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input 
                type="text" 
                value={shippingAddress.firstName} 
                onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value})}
                className="w-full p-2 border rounded" 
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input 
                type="text" 
                value={shippingAddress.lastName} 
                onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                className="w-full p-2 border rounded" 
                required 
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input 
                type="text" 
                value={shippingAddress.address} 
                onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                className="w-full p-2 border rounded" 
                required 
              />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            {["city", "postalCode"].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress[field]}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      [field]: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              ))}
            </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input 
                type="text" 
                value={shippingAddress.country} 
                onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                className="w-full p-2 border rounded" 
                required 
              />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input 
                type="tel" 
                value={shippingAddress.phone} 
                onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                className="w-full p-2 border rounded" 
                required 
              />
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button type="submit" className="w-full bg-black text-white py-3 rounded cursor-pointer">Continue to Payment</button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with Paypal</h3> 
                <PaypalButton 
                  amount={cart.totalPrice} 
                  onSuccess={handlePaymentSuccess} 
                  onError={(err) => alert("Payment failed, try again", err)}
                  />
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t border-gray-300 py-4 mb-4">
          {cart.products.map((product, idx) => (
            <div
              className="flex items-start justify-between py-2 border-b border-gray-300"
              key={idx}
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t border-gray-300 pt-4">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default Checkout