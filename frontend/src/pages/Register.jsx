import { useState } from "react";
import { Link} from "react-router";
import register from "../assets/register.webp";
import { registerUser } from "../redux/slices/authSlice.js";
import { useDispatch } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({name, email, password}))
  };

  return (
    <div className="flex">
      <div className="hidden md:block w-1/2 bg-gray-300">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={register}
            alt="Sign In"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          action=""
          className="w-full max-w-md bg-white p-8 rounded-lg border border-gray-300 shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-rabbit-saadhu font-medium">Rabbit</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">
            Let's explore in deep~
          </h2>
          <p className="text-center mb-6">
            Enter Your Username & Password to login
          </p>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-rabbit-red text-white p-2 rounded-lg font-semibold hover:bg-rabbit-red/80 duration-300"
          >
            Sign Up
          </button>
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-rabbit-red underline "
            >
              Login!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;