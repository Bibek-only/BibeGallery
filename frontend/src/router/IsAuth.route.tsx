import {Outlet,Navigate} from  "react-router-dom"
const IsAuthRoute = ():any => {
    // run the logic to send the request to backend to check it is authenticated or not
    const isAuth = false;
    return isAuth?<Outlet />:<Navigate to="/" replace/>
}

export default IsAuthRoute