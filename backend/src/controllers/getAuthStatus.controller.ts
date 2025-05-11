import { ApiResponse } from "../utils/ApiResponse";

const getAuthStatus = async (req: Request | any, res: Response | any) => {
  return res
    .status(200)
    .json(new ApiResponse(true, 200, "User is authenticated"));
};

export default getAuthStatus;
