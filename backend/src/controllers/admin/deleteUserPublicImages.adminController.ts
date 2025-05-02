import imagekit from "../../configuration/imageKit.config";
import prisma from "../../db/prismaClient";
import { deleteUserPublicImageSchema } from "../../schemas/schema.export";
import { ApiResponse } from "../../utils/ApiResponse";
const deleteUserPublicImages = async (
  req: Request | any,
  res: Response | any,
) => {
  const validateData = deleteUserPublicImageSchema.safeParse(req.query);
  if (!validateData.success) {
    res.status(400).json(
      new ApiResponse(
        false,
        400,
        validateData.error.message || "provided inputs are invalid",
        null,
        {
          error: validateData.error,
        },
      ),
    );
    return;
  }

  try {
    const { imageId } = req.query;

    const delImageTransaction = await prisma.$transaction(
      async (transaction) => {
        const image = await transaction.image.findUnique({
          where: {
            id: Number(imageId),
            visibility: "PUBLIC",
          },
        });

        if (!image) {
          return null;
        }

        //delete the image formt he cloude
        const deleteRes = await imagekit.deleteFile(image.imageId);

        //delete the image form the db
        return await transaction.image.delete({
          where: {
            id: image.id,
          },
        });
      },
    );

    if (!delImageTransaction) {
      res
        .status(400)
        .json(
          new ApiResponse(
            false,
            400,
            "Data base operation fail in db operation",
          ),
        );
      return;
    }

    res
      .status(200)
      .json(new ApiResponse(true, 200, "Image deleted successfully"));
  } catch (error: any) {
    res.status(400).json(
      new ApiResponse(
        false,
        400,
        error.message || "Cant delete the user's id",
        null,
        {
          error: error,
        },
      ),
    );
  }
};

export default deleteUserPublicImages;

//find the image with the image id
//get the images id to delet the cloude file
// delete the image form db
