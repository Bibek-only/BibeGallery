import {Outlet} from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { useEffect } from "react"
import {userAuthStatusCheck,userAdminStatusCheck} from "./services/export.services"
const App = () => {

  //check the auth status here
  useEffect(()=>{

    userAuthStatusCheck()
    .then((data)=>{
      console.log("her is the data for user check",data);

      // store the status in the store for admin
    })
    .catch((err)=>{
      console.log(err);
    })

    userAdminStatusCheck()
    .then((data)=>{
      console.log("here is the data for admin check",data);
      // store the status in the store for admin
    })
    .catch((err:any)=>{
      console.log(err)
    })


  },[]);
  
  return (
    <>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default App


//active the loader
//first get the response form the backend
//set the user auth status in the store
//set the use admin status in the store
//stop the loader
