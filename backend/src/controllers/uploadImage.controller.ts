import { Request, Response } from "express";
import fs from "fs";
import imagekit from "../configuration/imageKit.config";
const imageUpload = async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const imagePath = files?.image[0].path;

  try {
    // const fileBuffer = fs.readFileSync(imagePath);
    // const result = await imagekit.upload({
    //   file: fileBuffer, // use buffer for memoryStorage
    //   fileName: files?.image[0].originalname,
    //   folder: "bibe-gallery", // optional
    // });
    // console.log("here is the image upload response", result);

    // res.status(200).json({ url: result.url });
    res.send("image upload successfully");
    return;
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  } finally {
    fs.unlinkSync(files?.image[0].path); // remove the image if he upload was sucessfull or failed
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
