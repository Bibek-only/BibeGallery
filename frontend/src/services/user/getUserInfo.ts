import { API } from "@/API"
import axios from "axios"

const getUserInof = async () => {
    try {
        const userData = await axios.get(`${API}/user/get-user-info`,{
            withCredentials: true
        });
        
        if(userData.data.success){
            return{
                success:true,
                data:userData.data.data,
                message: userData.data.message
            }
        }

        return{
            success:false,
            message: "Can't get the user Info"
        }
        
    } catch (error:any) {
        console.log("Error in getting user info",error);
        const errorMessage =
      error.response?.data?.message || "Can't ge the user information";
        return{
            success:false,
            message:errorMessage
        }
    }

}

export default getUserInof