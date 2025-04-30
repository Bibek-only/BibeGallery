import { Request, Response } from "express";
import imagekit from "../configuration/imageKit.config";

const deleteImage = async (req: Request, res: Response) => {
  const deleteres = await imagekit.deleteFile("6811ce48432c476416b98ac4");
  console.log(deleteres);

  res.json({
    res: deleteres,
  });
  return;
};

export default deleteImage;

//get the image id in body
// get the user id from the reques
//delete the image form cloude storage
//sucess
// delete the image through image id and user id from db

//false
//send error message
