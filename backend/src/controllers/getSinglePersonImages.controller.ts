import prisma from "../db/prismaClient";
import { ApiResponse } from "../utils/ApiResponse";
import { getUserPublicImageSchema } from "../schemas/schema.export";

const getPersonsAllImages = async (req: Request | any, res: Response | any) => {
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

    const userRes:any = await prisma.image.findMany({
      where: {
        userId: Number.parseInt(userId),
        visibility: "PUBLIC",
      },
      select: {
        id: true,
        imageUrl: true,
        tags: true,
        userId: true,
        user: {
          select: {
            name: true,
            profileImageUrl: true
          },
        },
      },
    });

    const userDataRes = await prisma.user.findUnique({
      where:{
        id: Number.parseInt(userId),
      },
      select:{
          name: true,
          profileImageUrl: true
      }
    })

    if(userRes && userDataRes){
      
      return res.status(200).json(
        new ApiResponse(true, 200, "Successfully get user public images",{
          name:userDataRes.name,
          profileImageUrl: userDataRes.profileImageUrl,
          images:userRes
        }),
      );
    }
    
    return res.status(400).json(
      new ApiResponse(
        false,
        400,
        "Cant get the specific user iamges"
      )
    )
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

export default getPersonsAllImages;

//validate it is is admin or not in middleware
//extract the user id from the query param
//validate it in zod
//get the public images based on the userId and return
