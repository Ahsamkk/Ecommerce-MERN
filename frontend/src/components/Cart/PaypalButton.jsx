import { useNavigate } from "react-router-dom"


const PaypalButton = () => {

  const navigate = useNavigate()

  return (
    <div>
      <button className="w-full bg-blue-500 text-center text-white text-lg font-bold rounded cursor-pointer py-2" onClick={() => navigate("/order-confirmation")}>PayPal</button>
    </div>
  )
}

export default PaypalButton