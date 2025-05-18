import prisma from "../../db/prismaClient";
import { ApiResponse } from "../../utils/ApiResponse";
import { Request, Response } from "express";

const getAllUsersForAdmin = async (req: Request | any, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: req.userId,
        },
      },
    });
    if (users) {
      res.status(200).json(
        new ApiResponse(true, 200, "Sucessfully get all the user",users),
      );
      return;
    }

    res.status(400).json(new ApiResponse(false, 400, "Cant get the all user"));
    return;
  } catch (error: any) {
    res.status(400).json(
      new ApiResponse(
        false,
        400,
        error?.message || "Cant get all the user for admin",
        null,
        {
          error: error,
        },
      ),
    );
    return;
  }
};

export default getAllUsersForAdmin;
