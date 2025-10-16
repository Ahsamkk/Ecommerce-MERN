import MyOrdersPage from "./MyOrdersPage";
import { useState } from "react";

const Profile = () => {

  const user  =  {name: "Anon", email: "anon@gmail.com"};
  //const navigate = useNavigate();
  //const dispatch = useDispatch();

    const handleLogout = () => {

    };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {user?.name}
            </h1>
            <p className="text-lg text-gray-600 mb-4">{user?.email}</p>
            <button
              onClick={handleLogout}
              className="w-full bg-transparent text-red-500 border border-red-500 py-2 px-4 rounded hover:bg-red-600 hover:text-white duration-300 cursor-pointer"
            >
              Logout
            </button>
          </div>
          {/* Right Section */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile