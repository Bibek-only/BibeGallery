import { Router } from "express";
import { getAllImages,getAllUsersFroAdmin } from "../controllers/exportController";
import authMiddleware from "../middlewares/authMiddleware";
const adminRouter = Router();

adminRouter.route("/get-all-images").get(authMiddleware,getAllImages);
adminRouter.route("/get-all-users").get(authMiddleware,getAllUsersFroAdmin);
export default adminRouter;
