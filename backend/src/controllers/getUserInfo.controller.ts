import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import prisma from "../db/prismaClient";

const getUserInfo = async (req: Request | any, res: Response | any) => {
  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profileImageUrl: true,
        createdAt: true,
        _count: {
          select: {
            images: {
              where: {
                userId: req.userId,
              },
            },
          },
        },
      },
    });

    if (userInfo) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            true,
            200,
            "Successfully get the user Info",
            userInfo,
            null,
          ),
        );
    }

    return res
      .status(400)
      .json(new ApiResponse(false, 400, "Can't get the user Info"));
  } catch (error: any) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          false,
          400,
          error?.message || "Can't get the user information",
        ),
      );
  }
};

export default getUserInfo;
