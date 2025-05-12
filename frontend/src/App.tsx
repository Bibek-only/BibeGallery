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
import {getPublicImages} from "./services/export.services"
const App = () => {
  const dispatch = useDispatch();

  //get the info in the userInfo store
  const {userInfo} = useSelector((state:any)=> state.userReducer)
  const {publicImages} = useSelector((state:any)=> state.imageReducer)


  //check the auth status here
  useEffect(()=>{
    
    dispatch(setLoadingState(true));
    userAuthStatusCheck()
    .then((data)=>{
      console.log("her is the data for user check",data);

      if(data.success){
        dispatch(setUserAuthStatus(true));
      }
    })
    .catch((err)=>{
      console.log(err);
    })

    userAdminStatusCheck()
    .then((data)=>{
      console.log("here is the data for admin check",data);
      if(data.success){
        dispatch(setAdminAuthStatus(true));
      }
    })
    .catch((err:any)=>{
      console.log(err)
    })
    
    
    //get the user info if ther is nothing
    if(!userInfo.id){
      getUserInof()
      .then((data)=>{
        if(data.success){
          dispatch(setUserInformation({
            id: data.data.id,
            name: data.data.name,
            email: data.data.email,
            profileImageUrl: data.data.profileImageUrl,
            creaetAt: data.data.createdAt,
          }))
        }
        
      })
      .catch((error)=>{
        console.log("error in geting user info app",error)
      })
      
    }

    //get public images if there was nothing
    if(publicImages.length == 0){
      getPublicImages()
      .then((data:any)=>{
        console.log("pb image",data.data)
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
