import { IoMdClose } from "react-icons/io"
import CartContents from "../Cart/CartContents"
import {useNavigate} from "react-router-dom"
import { useEffect, useRef } from "react"


const CartDrawer = ({drawerOpen, toggleCartDrawer}) => {

  const navigate = useNavigate();
  const drawerRef = useRef();
  const handleCheckout = () => {
    toggleCartDrawer(!drawerOpen)
    navigate("/checkout")
  } 

  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerOpen && drawerRef.current && !drawerRef.current.contains(event.target)) {
        toggleCartDrawer(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [drawerOpen, toggleCartDrawer]);

  return (
    <div ref={drawerRef} className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 md:w-[30rem] bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-grey-600"/>
        </button>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <CartContents />
      </div>

      <div className="p-4 bg-white sticky bottom-0">
        <button onClick={handleCheckout} className="w-full bg-black text-white py-3 rounded-lg font-semibold cursor-pointer hover:bg-gray-800 transition">Checkout</button>
        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">Shipping, taxes and discount codes calculated at checkout.</p>
      </div>
    </div>
  )
}

export default CartDrawer