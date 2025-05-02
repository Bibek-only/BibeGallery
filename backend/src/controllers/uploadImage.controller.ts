import { Request, Response } from "express";
import fs from "fs";
import imagekit from "../configuration/imageKit.config";
import { multerFileSchema, imageTags } from "../schemas/schema.export";
import { ApiResponse } from "../utils/ApiResponse";

import prisma from "../db/prismaClient";

const imageUpload = async (req: Request | any, res: Response | any) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  let imageUploadRes: any;
  try {
    const body = req.body;

    const imagePath = files?.image[0]?.path;

    //validate the body tags
    const validateBody = imageTags.safeParse(body);

    if (!validateBody.success) {
      return res.status(400).json(
        new ApiResponse(false, 400, "Input tags are invalid", null, {
          error: validateBody.error,
        }),
      );
    }

    //validate the file for upload
    const validateFile = multerFileSchema.safeParse(files?.image[0]);
    if (!validateFile.success) {
      return res.status(400).json(
        new ApiResponse(false, 400, "Input file is invalid are invalid", null, {
          error: validateFile.error,
        }),
      );
    }
    const fileBuffer = fs.readFileSync(imagePath);

    // upload the image in image kit
    imageUploadRes = await imagekit.upload({
      file: fileBuffer, // use buffer for memoryStorage
      fileName: files?.image[0].originalname,
      folder: "bibe-gallery", // optional
    });
    if (!imageUploadRes) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            false,
            400,
            "Image uplod fail in the imgekit",
            null,
            null,
          ),
        );
    }
    const dbTransaction = await prisma.$transaction(async (transaction) => {
      //store the image in db
      return transaction.image.create({
        data: {
          imageId: imageUploadRes.fileId,
          imageUrl: imageUploadRes.url,
          visibility: body.visibility,
          tags: ["tag"],
          user: {
            connect: {
              id: req.userId,
            },
          },
        },
      });
    });
    if (!dbTransaction) {
      return res
        .status(400)
        .json(new ApiResponse(false, 400, "Image upload failed in the db"));
    }
    return res.status(200).json(
      new ApiResponse(
        true,
        200,
        "Image uplaod sucessfully",
        {
          imageUrl: dbTransaction.imageUrl,
          tags: dbTransaction.tags,
        },
        null,
      ),
    );
  } catch (error: any) {
    //delete the image form the cloude store
    console.log(error);
    if (imageUploadRes?.fileId) {
      const deleteres = await imagekit.deleteFile(imageUploadRes.fileId);
      res.status(400).json(
        new ApiResponse(
          false,
          400,
          "Image store in db operatin failed, image removed from cloude",
          null,
          {
            error: error,
          },
        ),
      );
    }
  } finally {
    try {
      //remove the image from local machine
      fs.unlinkSync(files?.image[0].path);
    } catch (error) {
      res
        .status(400)
        .json(
          new ApiResponse(
            false,
            400,
            "image unlin from local machine failed",
            null,
            null,
          ),
        );

      return;
    }
  }
};
export default imageUpload;

// first upload the image in image kit
// sucessfyll
//get the user id from request
//get the ags
//get the image id, url
//store the datain db
//return sucess response

//fail
//send the error message
