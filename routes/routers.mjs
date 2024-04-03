import express from "express";
import {
  addOceanData,
  getOceanData,
} from "../controller/oceanDataController.mjs";
import {
  signup,
  confirmSignup,
  login,
  changePassword,
  updateEmail,
  logout,
} from "../controller/authController.mjs";

const router = express.Router();

router.post("/ocean-data", addOceanData);
router.get("/ocean-data", getOceanData);

router.post("/signup", signup);
router.post("/confirm-signup", confirmSignup);
router.post("/login", login);
router.post("/change-password", changePassword);
router.post("/update-email", updateEmail);
router.post("/logout", logout);

export default router;
