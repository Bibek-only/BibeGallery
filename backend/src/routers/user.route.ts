import { Router } from "express";
import { authMiddleware,adminMiddleware } from "../middlewares/exportMiddleware";
import { getAuthStatus,getUserInfo } from "../controllers/exportController";
const userRotuer = Router();
userRotuer.route("/get-auth-status/user").get(authMiddleware, getAuthStatus);
userRotuer.route("/get-auth-status/admin").get(authMiddleware,adminMiddleware, getAuthStatus);
userRotuer.route("/get-user-info").get(authMiddleware,getUserInfo);
export default userRotuer;
