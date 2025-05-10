import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  //run the logic to send the request to verify is it admin or not
  const isAdmin = true;
  return isAdmin ? <Outlet /> : <Navigate to="/home" replace />;
};

export default AdminRoute;
