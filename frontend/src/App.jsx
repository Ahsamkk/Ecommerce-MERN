import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={ <UserLayout/> }>
    <Route index element={ <Home/> } />
  </Route>
))

const App = () => {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
