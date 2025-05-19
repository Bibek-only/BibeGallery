import { API } from "@/API";
import axios from "axios";

const getAllUsers = async () => {
    try {

        const res = await axios.get(`${API}/admin/get-all-users`,{
            withCredentials: true
        })

        if(res.data.success){
            return{
                success:true,
                message:"Successfully get all the user",
                data:res.data.data
            }
        }
        return{
            success:false,
            message: "Can't get all the user"
        }
        
    } catch (error:any) {
        console.log("Error in the catch block fot getting all the users",error);
        const errorMessage =
      error.response?.data?.message || "Can't ge the user information";
      return {
        success:false,
        message: errorMessage
      }
    }
}   
export default getAllUsers;