
const checkout = {
  _id: "12344",
  createdAt: new Date(),
  checkoutItems: [
    {
      productID: "1",
      name: "Jacket",
      color: "black",
      size: "M",
      price: 150,
      quantity: 1,
      image: "https://picsum.photos/150?random=1",
    },
    {
      productID: "2",
      name: "Jacket",
      color: "black",
      size: "M",
      price: 200,
      quantity: 2,
      image: "https://picsum.photos/150?random=2",
    },
  ],
  shippingAddress: {
    address: "324 Genjam Street",
    city: "Los Vegas",
    country: "USA",
  },
};

const OrderConfirmationPage = () => {

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10); //Adds 10 days
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <h1 className="text-4xl font-bold text-center text-rabbit-red mb-8">
        Thank You for Your Order!
      </h1>

      {checkout && (
        <div className="p-6 rounded-lg border border-gray-300">
          <div className="flex justify-between mb-20">
            <div>
              <h2 className="text-xl font-semibold">
                Order ID: {checkout._id}
              </h2>
              <p className="text-gray-500">
                Order date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* Estimated Delivery */}
            <div>
              <p className="text-emerald-700 text-sm">
                Estimated Delivery:{" "}
                {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          {/* Ordered Items */}
          <div className="mb-20">
            {checkout.checkoutItems.map((item) => (
              <div className="flex items-center mb-4" key={item.productID}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md">${item.price}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gary-600">Online Payment</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gary-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gary-600">
                {checkout.shippingAddress.city},{" "}
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderConfirmationPage