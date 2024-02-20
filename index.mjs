import express from "express";
import adminRoutes from "./routes/routers.mjs";
import oceanDataRoutes from "./routes/routers.mjs";
import test from "./routes/routers.mjs";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

app.use("/", adminRoutes);
app.use("/", oceanDataRoutes);
app.use("/", test);

app.get("/wavewise-backend", (req, res) => {
  res.json({ message: "Welcome to WaveWise Backend" });
});
export const handler = serverless(app);
