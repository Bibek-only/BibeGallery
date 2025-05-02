//user
import { imageTags, multerFileSchema } from "./imageUpload.schema";
import { deleteImageSchema } from "./deleteIMage.schema";

//admin
import { getUserPublicImageSchema } from "./admin/getUserPublicImage.Schema";
import deleteUserPublicImageSchema from "./admin/deleteUserPublicImage.Schema";

export { imageTags, multerFileSchema, deleteImageSchema }; //user

export { getUserPublicImageSchema, deleteUserPublicImageSchema }; //admin
