import prisma from "../db/prismaClient";
import { ApiResponse } from "../utils/ApiResponse";

const getPrivateImages = async (req: Request | any, res: Response | any) => {
  try {
    const privateImages = await prisma.image.findMany({
      where: {
        userId: req.userId,
        visibility: "PRIVATE",
      },
      select: {
        imageId: true,
        id: true,
        imageUrl: true,
        tags: true,
        user: {
          select: {
            name: true,
            id: true,
            email: true,
          },
        },
      },
    });

    if (!privateImages) {
      return res
        .status(400)
        .json(new ApiResponse(false, 400, "Can't get the user private iamges"));
    }

    return res.status(200).json(
      new ApiResponse(
        true,
        200,
        "Successfully get the user private iamges",
        {
          privateImages: privateImages,
        },
        null,
      ),
    );
  } catch (error: any) {
    return res.status(400).json(
      new ApiResponse(
        false,
        400,
        error?.message || "Get all private images failed",
        null,
        {
          error: error,
        },
      ),
    );
  }
};

export default getPrivateImages;
