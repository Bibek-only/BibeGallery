import { visibility } from "@prisma/client";
import { z } from "zod";

export const multerFileSchema = z.object({
  fieldname: z.string(), // Name of the field in the form-data
  originalname: z.string(), // Original name of the uploaded file
  encoding: z.string(), // Encoding type
  mimetype: z.enum([
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
  ]), // Allowed MIME types
  size: z.number().max(1 * 1024 * 1024, {
    message: "File size must be less than or equal to 1MB",
  }), // Size limit (1MB)
  path: z.string(), // Path to the stored file
});

export const imageTags = z.object({
  tags: z.string().min(1, "Tags are required"),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
});
