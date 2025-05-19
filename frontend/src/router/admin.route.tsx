import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  //run the logic to send the request to verify is it admin or not
  const {isAdmin} = useSelector((state:any) => state.authReducer)
  return isAdmin ? <Outlet /> : <Navigate to="/home" replace />;
};

export default AdminRoute;
