import prisma from "../../db/prismaClient";
import { ApiResponse } from "../../utils/ApiResponse";
import { getUserPublicImageSchema } from "../../schemas/schema.export";

const getAllImages = async (req: Request | any, res: Response | any) => {
  try {
    const schemaValidation = getUserPublicImageSchema.safeParse(req.query);
    if (!schemaValidation.success) {
      res.status(400).json(
        new ApiResponse(
          false,
          400,
          schemaValidation.error.message || "Invalid data provided userId",
          null,
          {
            error: schemaValidation.error,
          },
        ),
      );
      return;
    }
    const { userId } = req.query;
    const allImages = await prisma.image.findMany({
      where: {
        id: Number.parseInt(userId),
        visibility: "PUBLIC",
      },
    });
    res.status(200).json(
      new ApiResponse(true, 200, "Successfully get user public images", {
        data: allImages,
      }),
    );
    return;
  } catch (error: any) {
    res
      .status(400)
      .json(
        new ApiResponse(
          false,
          400,
          error?.message || "Can't find all public images of user",
        ),
      );

    return;
  }
};

export default getAllImages;

//validate it is is admin or not in middleware
//extract the user id from the query param
//validate it in zod
//get the public images based on the userId and return
