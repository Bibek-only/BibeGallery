import { API } from "@/API";
import axios from "axios";
const getAllPublicImages = async () => {
  try {
    const response = await axios.get(`${API}/user/get-all-public-images`);
    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    }

    return {
      success: false,
      message: "Can't get the public images",
    };
  } catch (error: any) {
    console.log("error in the catch in get public image service ", error);
    const errorMessage =
      error.response?.data?.message || "Can't ge the user information";
    return {
      success: false,
      message: errorMessage,
    };
  }
};

export default getAllPublicImages;
