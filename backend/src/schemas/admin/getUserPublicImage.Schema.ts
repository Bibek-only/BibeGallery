import { z } from "zod";
export const getUserPublicImageSchema = z.object({
  userId: z.number().or(z.string()),
});
