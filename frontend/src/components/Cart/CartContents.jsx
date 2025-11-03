import { RiDeleteBin3Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice.js';

const CartContents = ({cart, userId, guestId}) => {

  const dispatch = useDispatch();

  //Handle adding or subtracting from cart
  // implement Debouncing
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          size,
          color,
          guestId,
          userId,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, quantity, size, color) => {
    dispatch(
      removeFromCart({ productId, quantity, size, color, guestId, userId })
    );
  };

  return (
    <div>
      {cart.products.map((product, index) => (
        <div key={index} className="flex items-start justify-between py-4 border-b">
          <div className="flex items-start">
            <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded'/>
            <div className="a">
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="cursor-pointer border border-gray-400 rounded px-2 py-1 text-xl font-medium"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="cursor-pointer border border-gray-400 rounded px-2 py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <p>$ {product.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.quantity,
                  product.size,
                  product.color
                )
              }
              className="cursor-pointer"
            >
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartContents