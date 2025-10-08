import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import {Toaster} from "sonner"

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={ <UserLayout/> }>
    <Route index element={ <Home/> } />
    <Route to="login" element={ <Login />} />
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
