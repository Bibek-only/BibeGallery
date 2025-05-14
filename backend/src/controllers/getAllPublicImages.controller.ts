import prisma from "../db/prismaClient"
import { Request,Response } from "express"
import { ApiResponse } from "../utils/ApiResponse";
import { Public } from "@prisma/client/runtime/library";
const getAllPublicImages = async(req:Request | any, res:Request | any) => {
    try {

        const imageRes = await prisma.image.findMany({
            where:{
                visibility:"PUBLIC" 
            },
            select:{
                id:true,
                imageUrl:true,
                tags: true,
                userId: true,
                user:{
                    select:{
                        name:true
                    }
                }
            }
        })

        if(imageRes){
           return res.status(200).json(
                new ApiResponse(
                    true,
                    200,
                    "Successfully get the images",
                    imageRes
                )
            )
        }

        return res.status(400).json(
            new ApiResponse(
                false,
                400,
                "Cant't get the public images"
            )
        )

        
    } catch (error:any) {
        console.log("Error in catch blok of get all public images");
        return res.status(400).json(
            new ApiResponse(
                false,
                400,
                error?.message || "Cant get the all images",
                null,
                error
            )
        )
    }
}

export default getAllPublicImages