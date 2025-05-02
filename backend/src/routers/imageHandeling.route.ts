import { Router } from "express";
import {
  imageUpload,
  deleteImage,
  getPrivateImages,
  getPublicImages,
  getSingleImageData,
} from "../controllers/exportController";
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

imageRouter.route("/delete-image").delete(authMiddleware, deleteImage);
imageRouter.route("/get-private-images").get(authMiddleware, getPrivateImages);
imageRouter.route("/get-public-images").get(authMiddleware, getPublicImages);
imageRouter
  .route("/get-single-image-data")
  .get(authMiddleware, getSingleImageData);
export default imageRouter;
