import { API } from "@/API";
import axios from "axios"
const getUserPublicIMages = async () =>{
    try {

        const response:any = await axios.get(`${API}/user/get-public-images`,{
            withCredentials: true
        });
        if(response.data.success){
            return{
                success: true,
                data:response.data.data
            }
        }

        return{
            success:false,
            message:"Can't get the user public images"
        }
        
    } catch (error:any) {
        const errorMessage = error.response?.data?.message || "Can't get the user public images";
       console.log("Error in getting public images of user",error);
       return{
        success: false,
        message: errorMessage
       }
    }
}

export default getUserPublicIMages