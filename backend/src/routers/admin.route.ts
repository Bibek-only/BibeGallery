import { Router } from "express";
import {
  getAllImages,
  getAllUsersFroAdmin,
  deleteUserPublicImages,
  deleteUserAccount,
} from "../controllers/exportController";
import authMiddleware from "../middlewares/authMiddleware";
const adminRouter = Router();

adminRouter.route("/get-all-images").get(authMiddleware, getAllImages);
adminRouter.route("/get-all-users").get(authMiddleware, getAllUsersFroAdmin);
adminRouter
  .route("/delete-user-image")
  .delete(authMiddleware, deleteUserPublicImages);
adminRouter
  .route("/delete-user-account")
  .delete(authMiddleware, deleteUserAccount);
export default adminRouter;
