import { API } from "@/API";
import axios from "axios"
const getSpecificPersonPublicImages = async (userId:any) =>{
    try {

        const response:any = await axios.get(`${API}/user/get-person-images?userId=${userId}`,{
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
            message:"Cant't get the user's public images"
        }
        
    } catch (error:any) {
        const errorMessage = error.response?.data?.message || "Can't get the user public images";
       console.log("Error in getting public images of specific user",error);
       return{
        success: false,
        message: errorMessage
       }
    }
}

export default getSpecificPersonPublicImages;