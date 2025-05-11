import { ApiResponse } from "../utils/ApiResponse";

const getAdminStatus = async (req: Request | any, res: Response | any) => {
  return res
    .status(200)
    .json(new ApiResponse(true, 200, "User is authenticated and admin also"));
};

export default getAdminStatus;
