//user
import { imageTags, multerFileSchema } from "./imageUpload.schema";
import { deleteImageSchema } from "./deleteIMage.schema";

//admin
import { getUserPublicImageSchema } from "./admin/getUserPublicImage.Schema";

export { imageTags, multerFileSchema, deleteImageSchema }; //user

export { getUserPublicImageSchema }; //admin
