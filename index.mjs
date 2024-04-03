import express from "express";
import {
  addOceanData,
  getOceanData,
} from "./controller/oceanDataController.mjs";
import {
  signup,
  confirmSignup,
  login,
  changePassword,
  updateEmail,
  logout,
} from "./controller/authController.mjs";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

// Ocean Data routes
app.route("/wavewise-backend/ocean-data").post(addOceanData).get(getOceanData);

// Authentication routes
app.route("/wavewise-backend/auth/signup").post(signup);
app.route("/wavewise-backend/auth/confirm-signup").post(confirmSignup);
app.route("/wavewise-backend/auth/login").post(login);
app.route("/wavewise-backend/auth/change-password").post(changePassword);
app.route("/wavewise-backend/auth/update-email").post(updateEmail);
app.route("/wavewise-backend/auth/logout").post(logout);

app.get("/wavewise-backend/", (req, res) => {
  res.send("Hello from Express!");
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

export const handler = serverless(app);
