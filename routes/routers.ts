// routes/adminRoutes.ts

import express from "express";
import { authenticateAdmin } from "../controller/authController";
import {addOceanData, getOceanData} from "../controller/oceanDataController";

const router = express.Router();

router.post("/admin/authenticate", authenticateAdmin);

router.post('/ocean-data', addOceanData);

router.get('/ocean-data', getOceanData);
export default router;
