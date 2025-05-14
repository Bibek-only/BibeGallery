import googleAuthCallback from "./googleAuthCallback.controller";
import imageUpload from "./uploadImage.controller";
import deleteImage from "./deleteImage.controller";
import getAllImagesFroAdmin from "./admin/getUserPublicImageForAdmin.controller";
import getAllUsersFroAdmin from "./admin/getAllUsersFormAdmin.controller";
import deleteUserPublicImages from "./admin/deleteUserPublicImages.adminController";
import deleteUserAccount from "./admin/deleteUserAndItsImages.admingController";
import getPrivateImages from "./getPrivateImages.controller";
import getPublicImages from "./getPublicImages.controller";
import getSingleImageData from "./getSingleImage.controller";
import getPersonsAllImages from "./getSinglePersonImages.controller";
import getAllImages from "./getAllImages.controller";
import getAuthStatus from "./getAuthStatus.controller";
import getAdminStatus from "./getAdminStatus.controller";
import getUserInfo from "./getUserInfo.controller";
import logout from "./logout.controller";

export {
  imageUpload,
  googleAuthCallback,
  deleteImage,
  getAllImagesFroAdmin,
  getAllUsersFroAdmin,
  deleteUserPublicImages,
  deleteUserAccount,
  getPrivateImages,
  getPublicImages,
  getSingleImageData,
  getPersonsAllImages,
  getAllImages,
  getAuthStatus,
  getAdminStatus,
  getUserInfo,
  logout,
};
