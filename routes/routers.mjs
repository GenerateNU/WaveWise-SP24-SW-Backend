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
router
  .route("/ocean-data")
  .post((req, res) => {
    console.log("POST /ocean-data route hit");
    addOceanData(req, res);
  })
  .get((req, res) => {
    console.log("GET /ocean-data route hit");
    getOceanData(req, res);
  });

// Authentication routes
router.route("/auth/signup").post((req, res) => {
  console.log("/auth/signup route hit");
  signup(req, res);
});
router.route("/auth/confirm-signup").post((req, res) => {
  console.log("/auth/confirm-signup route hit");
  confirmSignup(req, res);
});
router.route("/auth/login").post((req, res) => {
  console.log("/auth/login route hit");
  login(req, res);
});
router.route("/auth/change-password").post((req, res) => {
  console.log("/auth/change-password route hit");
  changePassword(req, res);
});
router.route("/auth/update-email").post((req, res) => {
  console.log("/auth/update-email route hit");
  updateEmail(req, res);
});
router.route("/auth/logout").post((req, res) => {
  console.log("/auth/logout route hit");
  logout(req, res);
});

// Define a catch-all route to handle 404 Not Found
router.use((req, res) => {
  console.log("Catch-all route hit");
  res.status(404).json({ error: "Not Found" });
});

export default (req, res) => {
  router(req, res, () => {});
};
