// index.mjs
import express from "express";
import router from "./routes/routers.mjs";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

// app.use("/", router);

app.get("/wavewise-backend", (req, res) => {
  res.json({ message: "Welcome to WaveWise Backend" });
});

export const handler = serverless(app);
