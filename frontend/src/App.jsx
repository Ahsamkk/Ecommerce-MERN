import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<UserLayout/>}>
    
  </Route>
))

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
