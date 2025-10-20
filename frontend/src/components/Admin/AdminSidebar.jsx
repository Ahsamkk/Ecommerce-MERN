import {
  FaBoxOpen,
  FaClipboardList,
  FaSignInAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";

const AdminSidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="w-full pb-2 mb-6 border-b border-gray-600">
        <Link to="/admin" className="text-2xl font-medium">
          Rabbit
        </Link>
      </div>
      <h2 className="text-xl font-medium mb-6 text-center text-gray-200">
        Admin Dashboard
      </h2>

      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 bg-gray-700 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/admin/orders"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
        <div className="mt-6">
          <button
            className="cursor-pointer w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 transition rounded flex items-center justify-center space-x-2"
            onClick={handleLogout}
          >
            <FaSignInAlt />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default AdminSidebar