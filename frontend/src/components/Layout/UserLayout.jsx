import { Outlet} from "react-router-dom"
import Footer from "../Common/Footer"
import Header from "../Common/Header"
import ScrollToTop from "../Common/ScrollToTop.jsx"

const UserLayout = () => {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  )
}

export default UserLayout