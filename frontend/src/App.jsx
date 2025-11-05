import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import {Toaster} from "sonner"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CollectionPage from './pages/CollectionPage'
import ProductDetails from './components/Products/ProductDetails'
import Checkout from './components/Cart/Checkout'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import MyOrdersPage from './pages/MyOrdersPage'
import AdminLayout from './components/Admin/AdminLayout'
import UserManagement from './components/Admin/UserManagement'
import ProductManagement from './components/Admin/ProductManagement'
import OrderManagement from './components/Admin/OrderManagement'
import EditProductPage from './components/Admin/EditProductPage'
import AdminHomePage from './pages/AdminHomePage'
import ProtectedRoute from './components/Common/ProtectedRoute.jsx'

import {Provider} from "react-redux"
import store from "./redux/store.js"

const router = createBrowserRouter(
  createRoutesFromElements(
  <>
    <Route path="/" element={ <UserLayout/> }>
      <Route index element={ <Home/> } />
      <Route path="login" element={ <Login /> } />
      <Route path="register" element={ <Register /> } />
      <Route path="profile" element={ <Profile /> } />
      <Route path="collections/:collection" element={ <CollectionPage /> }/>
      <Route path="product/:id" element={ <ProductDetails /> }/>
      <Route path="checkout" element={ <Checkout /> }/>
      <Route path="order-confirmation" element={ <OrderConfirmationPage /> }/>
      <Route path="order/:id" element={ <OrderDetailsPage />}/>
      <Route path="my-orders" element={ <MyOrdersPage />}/>
    </Route>

    // Admin Routes
    
    <Route path="/admin" element={<ProtectedRoute role={"admin"}><AdminLayout /></ProtectedRoute>}>
      <Route index element={<AdminHomePage />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="products" element={<ProductManagement />} />
      <Route path="products/:id/edit" element={<EditProductPage />} />
      <Route path="orders" element={<OrderManagement />} />
    </Route>
  </>
))

const App = () => {

  return (
    <Provider store={store}>
      <Toaster position="top-right" duration={1000} />
      <RouterProvider router={router}/>
    </Provider>
  )
}

export default App