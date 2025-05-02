import prisma from "../db/prismaClient";
import { ApiResponse } from "../utils/ApiResponse";

const getPublicImages = async (req: Request | any, res: Response | any) => {
  try {
    const publicImages = await prisma.image.findMany({
      where: {
        userId: req.userId,
        visibility: "PUBLIC",
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

    if (!publicImages) {
      return res
        .status(400)
        .json(new ApiResponse(false, 400, "Can't get the user public iamges"));
    }

    return res.status(200).json(
      new ApiResponse(
        true,
        200,
        "Successfully get the user public iamges",
        {
          publicImages: publicImages,
        },
        null,
      ),
    );
  } catch (error: any) {
    return res.status(400).json(
      new ApiResponse(
        false,
        400,
        error?.message || "Get all public images failed",
        null,
        {
          error: error,
        },
      ),
    );
  }
};

export default getPublicImages;
