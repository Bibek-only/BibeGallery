import { Router } from "express";
import { authMiddleware,adminMiddleware } from "../middlewares/exportMiddleware";
import { getAuthStatus } from "../controllers/exportController";
const userRotuer = Router();
userRotuer.route("/user").get(authMiddleware, getAuthStatus);
userRotuer.route("/admin").get(authMiddleware,adminMiddleware, getAuthStatus);
export default userRotuer;
