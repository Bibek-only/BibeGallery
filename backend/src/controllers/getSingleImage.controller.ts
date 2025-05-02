import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import prisma from "../db/prismaClient";
const getSingleImageData = async (req: Request | any, res: Response | any) => {
  const { id } = req.query;
  if (!id) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          false,
          400,
          "Cant get the image Required data is not provided",
        ),
      );
  }

  try {
    const imageData = await prisma.image.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        imageUrl: true,
        tags: true,
        createdAt: true,
        visibility: true,
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    if (!imageData) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            false,
            400,
            "Can't get he image data file Dont exist",
          ),
        );
    }

    //check the visibility fro validation to check who is accessing the image
    if (imageData.visibility === "PRIVATE" && imageData.user.id != req.userId) {
      return res
        .status(400)
        .json(
          new ApiResponse(false, 400, "Dont have access to view the image"),
        );
    }

    return res.status(200).json(
      new ApiResponse(true, 200, "Successfully get the image data", {
        data: imageData,
      }),
    );
  } catch (error: any) {
    return res.status(400).json(
      new ApiResponse(
        false,
        400,
        error?.message || "Can't get image data",
        null,
        {
          error: error,
        },
      ),
    );
  }
};

export default getSingleImageData;
