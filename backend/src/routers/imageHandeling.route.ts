import { Router } from "express";
import { imageUpload, deleteImage } from "../controllers/exportController";
import { upload, authMiddleware } from "../middlewares/exportMiddleware";

const imageRouter = Router();

imageRouter.route("/upload-image").post(
  authMiddleware,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  imageUpload,
);

imageRouter.route("/delete-image").delete(deleteImage);

export default imageRouter;
