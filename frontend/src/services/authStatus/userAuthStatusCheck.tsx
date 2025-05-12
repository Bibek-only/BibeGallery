import { API } from "@/API";
import axios from "axios";
const userAuthStatusCheck = async () => {
  try {
    const userAuthStatusRes:any = await axios.get(`${API}/user/get-auth-status/user`, {
      withCredentials: true,
    });
    
    
    
    if(userAuthStatusRes.data?.success){
        return {
            success:true,
            message: "User is loggedin"
        }
    }

    return {
        success:false,
        message: "User is not loggedin"
    }
  } catch (error: any) {
    console.log("Error in the catch block of user Auth status check", error);

    // Get error message from backend response if it exists
    const errorMessage =
      error.response?.data?.message || "User Auth status check fail";

    return {
      status: false,
      message: errorMessage,
    };
  }
};

export default userAuthStatusCheck;
