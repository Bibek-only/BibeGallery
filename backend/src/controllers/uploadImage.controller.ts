import { Request, Response } from "express";
const imageUpload = async (req: Request, res: Response) => {
  res.send("image upload successfully");
};

export default imageUpload;
