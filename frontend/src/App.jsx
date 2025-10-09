import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import {Toaster} from "sonner"
import Register from './pages/Register'
import Profile from './pages/Profile'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={ <UserLayout/> }>
    <Route index element={ <Home/> } />
    <Route path="login" element={ <Login /> } />
    <Route path="register" element={ <Register /> } />
    <Route path="profile" element={ <Profile /> } />
  </Route>
))

const App = () => {

  return (
    <>
      <Toaster position="top-right" duration={1000} />
      <RouterProvider router={router}/>

    </>
  )
}

export default App
