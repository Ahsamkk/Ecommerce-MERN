import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'

const CartContents = () => {

  const cartProducts = [
    {
      name: "Classic Oxford Shirt",
      price: 39.99,
      size: "L",
      color: "Blue",
      quantity: 10,
      image: "https://picsum.photos/id/237/200/300"
    },
    {
      name: "Slim-Fit Stretch Shirt",
      price: 29.99,
      sizes: "M",
      color: "Navy Blue",
      quantity: 15,
      image: "https://picsum.photos/200/300"
    },
  ]

  return (
    <div>
      {cartProducts.map((product, index) => (
        <div key={index} className="flex items-start justify-between py-4 border-b">
          <div className="flex items-start">
            <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded'/>
            <div className="a">
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button className="border rounded px-2 py-1 text-xl font-medium">-</button>
                <span className="mx-4">{product.quantity}</span>
                <button className="border rounded px-2 py-1 text-xl font-medium">+</button>
              </div>
            </div>
          </div>
          <div className="a">
            <p>$ {product.price.toLocaleString()}</p>
            <button>
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartContents