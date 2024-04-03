import express from "express";
import * as oceanDataController from "../controller/oceanDataController.mjs";
import * as authController from "../controller/authController.mjs";

const router = express.Router();

// Ocean Data routes
router.post("/ocean-data", oceanDataController.addOceanData);
router.get("/ocean-data", oceanDataController.getOceanData);

// Authentication routes
router.post("/signup", authController.signup);
router.post("/confirm-signup", authController.confirmSignup);
router.post("/login", authController.login);
router.post("/change-password", authController.changePassword);
router.post("/update-email", authController.updateEmail);
router.post("/logout", authController.logout);

router.get("/", (req, res) => {
  res.json({ message: "Welcome to WaveWise Backend" });
});

export default router;
