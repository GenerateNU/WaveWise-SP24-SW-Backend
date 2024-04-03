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

// Ocean Data routes
router.post("/ocean-data", addOceanData);
router.get("/ocean-data", getOceanData);

// Authentication routes
router.post("/auth/signup", signup);
router.post("/auth/confirm-signup", confirmSignup);
router.post("/auth/login", login);
router.post("/auth/change-password", changePassword);
router.post("/auth/update-email", updateEmail);
router.post("/auth/logout", logout);

router.get("/", (req, res) => {
  res.json({ message: "Welcome to WaveWise testing" });
});

router.get("/auth", (req, res) => {
  res.json({ message: "Welcome to WaveWise Auth" });
});

export default router;
