import express from "express";
import {
  addOceanData,
  getOceanData,
} from "../controller/oceanDataController.js";
import {
  signup,
  confirmSignup,
  login,
  changePassword,
  updateEmail,
  logout,
} from "../controller/authController.js";

const router = express.Router();

// Ocean Data routes
router.route("/ocean-data").post(addOceanData).get(getOceanData);

// Authentication routes
router.route("/auth/signup").post(signup);
router.route("/auth/confirm-signup").post(confirmSignup);
router.route("/auth/login").post(login);
router.route("/auth/change-password").post(changePassword);
router.route("/auth/update-email").post(updateEmail);
router.route("/auth/logout").post(logout);

export default router;
