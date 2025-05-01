import { Request, Response } from "express";
import imagekit from "../configuration/imageKit.config";
import { deleteImageSchema } from "../schemas/schema.export";
import { ApiResponse } from "../utils/ApiResponse";
import prisma from "../db/prismaClient";

const deleteImage = async (req: Request | any, res: Response) => {
  const bodyValidation = deleteImageSchema.safeParse(req.query);

  if (!bodyValidation.success) {
    res.status(400).json(
      new ApiResponse(
        false,
        400,
        bodyValidation.error.message || "Data type are invalid",
        null,
        {
          error: bodyValidation.error,
        },
      ),
    );
    return;
  }

  const { imageId, id } = req.query;
  try {
    const image = await prisma.image.findUnique({
      where: {
        id: Number.parseInt(id) as number,
        imageId: imageId,
        userId: req.userId,
      },
    });

    if (!image) {
      res
        .status(400)
        .json(
          new ApiResponse(
            false,
            400,
            "File doesnot exists in database",
            null,
            null,
          ),
        );
      return;
    }

    const deleteResClude: any = await imagekit.deleteFile(imageId);

    if (deleteResClude) {
      const deletedImage = await prisma.image.delete({
        where: {
          id: image.id,
        },
      });

      if (deletedImage) {
        res
          .status(200)
          .json(new ApiResponse(true, 200, "Image deleted successfully"));
        return;
      }
    }

    res.status(400).json(new ApiResponse(false, 400, "Image deletion failed"));
    return;
  } catch (error: any) {
    res.status(400).json(
      new ApiResponse(
        false,
        400,
        error.message || "Image deleted failed in catch",
        null,
        {
          error: error,
        },
      ),
    );
  }
};

export default deleteImage;

//get the image id in body
// get the user id from the reques
//delete the image form cloude storage
//sucess
// delete the image through image id and user id from db

//false
//send error message
