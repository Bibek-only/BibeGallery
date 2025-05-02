import { Request, Response } from "express";
import { getUserPublicImageSchema } from "../../schemas/schema.export";
import { ApiResponse } from "../../utils/ApiResponse";
import prisma from "../../db/prismaClient";
import imagekit from "../../configuration/imageKit.config";
const deleteUserAccount = async (req: Request | any, res: Response | any) => {
  const validateData = getUserPublicImageSchema.safeParse(req.query);
  if (!validateData.success) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          false,
          400,
          validateData?.error?.message.toString() ||
            "Provided input are invalid userId",
        ),
      );
  }
  try {
    const { userId } = req.query;
    const userDeletionTransaction = await prisma.$transaction(
      async (transaction) => {
        const user = await transaction.user.findUnique({
          //find the user
          where: {
            id: Number(userId),
          },
        });

        if (!user) {
          return null;
        }

        // find all images of the user
        const images = await transaction.image.findMany({
          where: {
            userId: Number(userId),
          },
          select: {
            imageId: true,
          },
        });

        if (!images) {
          return null;
        }

        const imageIdArray = images.map((img) => img.imageId);

        //delet the image form cloude
        const cloudeDel = await imagekit.bulkDeleteFiles(imageIdArray);

        //delete user fromt he db
        return await transaction.user.delete({
          where: {
            id: Number(userId),
          },
        });
      },
    );
    if (!userDeletionTransaction) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            false,
            400,
            "User Account deletion failed",
            null,
            null,
          ),
        );
    }
    return res.status(200).json(
      new ApiResponse(
        true,
        200,
        "User Account deleted successfully",
        {
          data: userDeletionTransaction,
        },
        null,
      ),
    );
  } catch (error: any) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          true,
          400,
          error?.message || "User deletion failed in catch",
          null,
          { error: error },
        ),
      );
  }
};

export default deleteUserAccount;

// get the user by its id
// get all its images id (clolude id) and delte all form clude
// delete the user from db
