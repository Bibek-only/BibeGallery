import {Outlet,Navigate} from  "react-router-dom"
import { useSelector } from "react-redux"
const IsAuthRoute = ():any => {
    // run the logic to send the request to backend to check it is authenticated or not
    const {isLogedIn} = useSelector((state:any) => state.authReducer)
    return isLogedIn?<Outlet />:<Navigate to="/home" replace/>
}

export default IsAuthRoute