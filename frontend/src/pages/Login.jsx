import { Link } from "react-router-dom";
import login from "../assets/login.webp";
import { useState } from "react";
//import { useDispatch } from "react-redux";
import {toast} from "sonner"  
// import { loginUser } from "../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch(loginUser({ email, password }));
    try {
      toast.success("User Logined Successfully");
    } catch (error) {
      toast.error("Error Logging In user");
      console.error("Error Logging In user:", error);
    }
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border-2 border-gray-300 shadow-md"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-2xl font-medium">"Rabbit"</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey There! 👋</h2>
          <p className="text-center mb-6">
            Enter Your Username and Password to login
          </p>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your email address"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your password"
            />
          </div>

          {/* Centering the Button */}
          <div className="flex justify-center ">
            <button
              type="submit"
              className="w-full bg-black text-white p-2 px-6 rounded-lg font-semibold cursor-pointer hover:bg-gray-800 transition"
            >
              Sign In
            </button>
          </div>
          <p className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={login}
            alt="Login to Account"
            className="h-[650px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;