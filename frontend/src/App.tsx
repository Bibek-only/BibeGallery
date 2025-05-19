import {Outlet} from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { useEffect } from "react"
import {userAuthStatusCheck,userAdminStatusCheck,getUserInof} from "./services/export.services"
import {setLoadingState} from "./store/reducers/Loader/loadingStatus"
import {setUserInformation} from "./store/reducers/user/userSlice"
import {setPublicImages} from "./store/reducers/image/imageSlice"
import { useDispatch,useSelector } from "react-redux"
import {setAdminAuthStatus,setUserAuthStatus} from "./store/reducers/auth/authStatusSlice"
import {getAllPublicImages} from "./services/export.services"
const App = () => {
  const dispatch = useDispatch();

  //get the info in the userInfo store
  const {userInfo} = useSelector((state:any)=> state.userReducer)
  const {publicImages} = useSelector((state:any)=> state.imageReducer)
  const {isLogedIn} = useSelector((state:any)=> state.authReducer);
  

  //check the auth status here
  useEffect(()=>{
    dispatch(setLoadingState(true));
    
    userAuthStatusCheck()
    .then((data)=>{

      if(data.success){
        dispatch(setUserAuthStatus(true));
      }
    })
    .catch((err)=>{
      console.log("Error in catch user auth status check",err);
    })

    dispatch(setLoadingState(true))
    userAdminStatusCheck()
    .then((data)=>{
      if(data.success){
        dispatch(setAdminAuthStatus(true));
      }
    })
    .catch((err:any)=>{
      console.log("Error in user admin statuc check app.tsx",err)
    })
    
    
    //get the user info if ther is nothing
   
    if(!userInfo.id || isLogedIn){
      dispatch(setLoadingState(true))
      getUserInof()
      .then((data)=>{
        if(data.success){
          dispatch(setUserInformation({
            id: data.data.id,
            name: data.data.name,
            email: data.data.email,
            profileImageUrl: data.data.profileImageUrl,
            creaetAt: data.data.createdAt,
            imageCount: data.data?._count?.images || 0
          }))
        }
        
      })
      .catch((error)=>{
        console.log("error in geting user info app",error)
      })
      
    }

    //get public images if there was nothing
    if(publicImages.length <=1 ){
      dispatch(setLoadingState(true))
      getAllPublicImages()
      .then((data:any)=>{
        
        dispatch(setPublicImages(data.data))
      })
      .catch((error:any)=>{
        console.log("error in the get  public image",error)
      })
    }

    //set the loading state to default
    dispatch(setLoadingState(false));
    


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
