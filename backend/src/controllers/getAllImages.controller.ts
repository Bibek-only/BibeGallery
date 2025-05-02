import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import prisma from "../db/prismaClient";
const getAllImages = async (req: Request | any, res: Response | any) => {
  try {
    const images = await prisma.image.findMany({
      where: {
        visibility: "PRIVATE",
      },
      select:{
        imageUrl:true,
        id: true,
        tags:true,
        user:{
            select:{
                name: true,
                id:true
            }
        }
      }
    });

    if (!images) {
      return res
        .status(400)
        .json(new ApiResponse(false, 400, "can't get all iamges"));
    }

    return res.status(200).json(
      new ApiResponse(true, 200, "Successfully get the images", {
        iamges: images,
      }),
    );
  } catch (error: any) {
    return res.status(400).json(
      new ApiResponse(
        false,
        400,
        error?.message || "Can't get the iamges",
        null,
        {
          error: error,
        },
      ),
    );
  }
};


export default getAllImages