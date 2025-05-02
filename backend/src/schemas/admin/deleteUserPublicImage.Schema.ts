import { z } from "zod";
const deleteUserPublicImageSchema = z.object({
  imageId: z.number().or(z.string()),
});
export default deleteUserPublicImageSchema;
