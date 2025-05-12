import { API } from "@/API";
import axios from "axios";
const userAdminStatusCheck = async () => {
  try {
    const userAdminStatusRes:any = await axios.get(`${API}/user/get-auth-status/admin`, {
      withCredentials: true,
    });
    
    
    if(userAdminStatusRes.data?.success){
        return {
            success:true,
            message: "User is Admin"
        }
    }

    return {
        success:false,
        message: "User is not Admin"
    }
  } catch (error: any) {
    console.log("Error in the catch block of user Admin status check", error);

    // Get error message from backend response if it exists
    const errorMessage =
      error.response?.data?.message || "User Admin status check fail";

    return {
      status: false,
      message: errorMessage,
    };
  }
};

export default userAdminStatusCheck;
