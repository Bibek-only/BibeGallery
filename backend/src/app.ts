import express, { Request, Response } from "express";
import { ApiResponse } from "./utils/ApiResponse";
import "dotenv/config";
import cors from "cors";
import { imageRouter, authRouter } from "./routers/exportRoutes";
import cookieParser from "cookie-parser";

import passport from "./configuration/passport.config";

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use("/api/v1/user", imageRouter);
app.use("/api/v1/user/auth", authRouter);

app.get("/api/v1", async (req: Request, res: Response) => {
  res
    .status(200)
    .json(new ApiResponse(true, 200, "Health checked everything fine"));
});

export default app;
