import express from "express";
// import { authenticateAdmin } from "../controller/authController.mjs";
import {
  addOceanData,
  getOceanData,
} from "../controller/oceanDataController.mjs";

const router = express.Router();

// router.post("/admin/authenticate", authenticateAdmin);
router.post("/ocean-data", addOceanData);
router.get("/ocean-data", getOceanData);

router.get("/", (req, res) => {
  res.json({ message: "Welcome to WaveWise Backend" });
});

export default router;
