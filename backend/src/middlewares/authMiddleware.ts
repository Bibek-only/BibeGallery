import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import jwt from "jsonwebtoken";
import prisma from "../db/prismaClient";

type tokenDataPaylod = {
  id: number;
  email: string;
};

const authMiddleware = async (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;
  if (!token) {
    res
      .status(400)
      .json(
        new ApiResponse(
          false,
          400,
          "User authentication failed not auth token was found",
          null,
          null,
        ),
      );
    return;
  }

  // extract the data from the token
  try {
    const BearerToken = token.split(" ")[1];
    if (!BearerToken) {
      res
        .status(400)
        .json(
          new ApiResponse(
            false,
            400,
            "User authentication failed not auth token was found",
            null,
            null,
          ),
        );
      return;
    }

    const { id, email } = jwt.verify(
      BearerToken,
      process.env.JWT_SECREATE!,
    ) as tokenDataPaylod;
    if (!id || !email) {
      res
        .status(400)
        .json(
          new ApiResponse(
            false,
            400,
            "User authentication failed because toke doesnot contain required information",
            null,
            null,
          ),
        );
      return;
    }

    const userRes = await prisma.user.findUnique({
      where: {
        id: id,
        email: email,
      },
    });

    if (!userRes) {
      res
        .status(400)
        .json(
          new ApiResponse(
            false,
            400,
            "User authentication failed because provided token is not a valid user's token",
            null,
            null,
          ),
        );
      return;
    }

    req.userId = id;
    req.userEmail = email;

    next();
  } catch (error) {
    res.status(400).json(
      new ApiResponse(
        false,
        400,
        "User authentication failed in auth route's catch block",
        null,
        {
          error: error,
        },
      ),
    );
    return;
  }
};

export default authMiddleware;

// get the token and extract the body and the id
//check the user is exist in the db or not accordint to the id and email
//success
//is exist set the user id and the email in the request object
//then pass the controll to next router

// failuer
//send the error response that the user is not authenicate
