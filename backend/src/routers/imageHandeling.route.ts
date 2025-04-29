import { Router } from "express";
import { imageUpload } from "../controllers/exportController";

const imageRouter = Router();

imageRouter.route("/upload-image").post(imageUpload);

export default imageRouter;
