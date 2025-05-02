import { Router } from "express";
import {
  getAllImagesFroAdmin,
  getAllUsersFroAdmin,
  deleteUserPublicImages,
  deleteUserAccount,
} from "../controllers/exportController";
import { adminMiddleware } from "../middlewares/exportMiddleware";
const adminRouter = Router();

adminRouter.route("/get-all-images").get(adminMiddleware, getAllImagesFroAdmin);
adminRouter.route("/get-all-users").get(adminMiddleware, getAllUsersFroAdmin);
adminRouter
  .route("/delete-user-image")
  .delete(adminMiddleware, deleteUserPublicImages);
adminRouter
  .route("/delete-user-account")
  .delete(adminMiddleware, deleteUserAccount);
export default adminRouter;
