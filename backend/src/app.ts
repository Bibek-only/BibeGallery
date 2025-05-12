import express, { Request, Response } from "express";
import { ApiResponse } from "./utils/ApiResponse";
import "dotenv/config";
import cors from "cors";
import {
  imageRouter,
  authRouter,
  adminRouter,
  userRotuer,
} from "./routers/exportRoutes";
import cookieParser from "cookie-parser";

import passport from "./configuration/passport.config";

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use("/api/v1/user", imageRouter);
app.use("/api/v1/user/auth", authRouter);
app.use("/api/v1/user", userRotuer);
app.use("/api/v1/admin", adminRouter);

app.get("/api/v1", async (req: Request, res: Response) => {
  //health check route
  res
    .status(200)
    .json(new ApiResponse(true, 200, "Health checked everything fine"));
});

import prisma from "./db/prismaClient";
import jwt from "jsonwebtoken";
// testing route for manual singin/up
app.post("/test-login", async (req: any, res: any) => {
  //generte the user
  const { name, email } = req.body;
  if (!email || !name) {
    res.send("no email and pass was provided");
    return;
  }
  try {
    const user = await prisma.user.upsert({
      where: {
        email: email,
      },
      update: {},
      create: {
        email: email,
        name: name,
      },
    });

    if (!user) {
      res.send("user is not create");
      return;
    }

    const jwtToken = jwt.sign(
      {
        //create the cookie
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECREATE!,
      {
        expiresIn: "3d",
      },
    );

    res.cookie("token", `Bearer ${jwtToken}`, {
      //set the cookie in the frontend
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.send("user created sucessfully");
    return;
  } catch (error) {
    res.send("user creation failed in catch");
    return;
  }
});

export default app;
