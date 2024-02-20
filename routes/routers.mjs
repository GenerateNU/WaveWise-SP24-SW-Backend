// routers.mjs
import express from "express";
const router = express.Router();

router.post("/admin/authenticate", authenticateAdmin);
router.post("/ocean-data", addOceanData);
router.get("/ocean-data", getOceanData);
router.get("/wavewise-backend", (req, res) => {
  res.json({ message: "Welcome to WaveWise Backend" });
});

export default router;
