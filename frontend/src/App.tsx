import {Outlet} from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
const App = () => {
  return (
    <>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default App
