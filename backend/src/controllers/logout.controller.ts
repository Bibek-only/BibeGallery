import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";

const logout = async (req: Request | any, res: Response | any) => {
  try {
    res.clearCookie("token", {
      path: "/",
      sameSite: "None",
      secure: true,
    });
    return res
      .status(200)
      .json(new ApiResponse(true, 200, "Successfully Logout the user"));
  } catch (error: any) {
    console.log("error in the logout catch", error);
    return res
      .status(400)
      .json(new ApiResponse(false, 400, error?.message || "Logout failed"));
  }
};

export default logout;
