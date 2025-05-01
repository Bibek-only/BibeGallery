import { z } from "zod";
export const deleteImageSchema = z.object({
  id: z.number().or(z.string()),
  imageId: z.string(),
});
