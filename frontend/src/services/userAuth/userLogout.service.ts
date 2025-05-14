import { API } from "@/API";
import axios from "axios"
const logout = async ()=> {
    try {
        const logoutRes = await axios.delete(`${API}/user/logout`,{
            withCredentials:true
        })
        if(logoutRes.data.success){
            return {
                success: true,
                message: "Logout successfull"
            }
        }
        return {
            success: false,
            message:"Logout failed"
          }
    } catch (error:any) {
        console.log("error in the logout service catch",error);
        const errorMessage =
      error.response?.data?.message || "Can't ge the user information";
      return {
        success: false,
        message:errorMessage
      }

    }
}

export default logout