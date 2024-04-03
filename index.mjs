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

const app = express();
app.use(express.json());

// Ocean Data routes
app.post("/wavewise-backend/ocean-data", addOceanData);
app.get("/wavewise-backend/ocean-data", getOceanData);

// Authentication routes
app.post("/wavewise-backend/auth/signup", signup);
app.post("/wavewise-backend/auth/confirm-signup", confirmSignup);
app.post("/wavewise-backend/auth/login", login);
app.post("/wavewise-backend/auth/change-password", changePassword);
app.post("/wavewise-backend/auth/update-email", updateEmail);
app.post("/wavewise-backend/auth/logout", logout);

app.get("/wavewise-backend/", (req, res) => {
  res.send("Hello from Express!");
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

export const handler = serverless(app);
