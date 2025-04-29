import { Router } from "express";
import passport from "../configuration/passport.config";
import { googleAuthCallback } from "../controllers/exportController";

const router = Router();

router.get(
  // must hit through frontend to open the goolge login screen
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  //after the loginwas done this end point was hit as call back url
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback,
);

export default router;
