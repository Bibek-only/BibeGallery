import googleAuthCallback from "./googleAuthCallback.controller";
import imageUpload from "./uploadImage.controller";
import deleteImage from "./deleteImage.controller";
import getAllImages from "./admin/getUserPublicImageForAdmin.controller";
import getAllUsersFroAdmin from "./admin/getAllUsersFormAdmin.controller";
import deleteUserPublicImages from "./admin/deleteUserPublicImages.adminController";
import deleteUserAccount from "./admin/deleteUserAndItsImages.admingController";
export {
  imageUpload,
  googleAuthCallback,
  deleteImage,
  getAllImages,
  getAllUsersFroAdmin,
  deleteUserPublicImages,
  deleteUserAccount,
};
