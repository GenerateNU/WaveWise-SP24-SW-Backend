import express from "express";
import serverless from "serverless-http";
import router from "./routes/routers.mjs";

const app = express();
app.use(express.json());

// Define a catch-all route to handle all incoming requests
app.use((req, res) => {
  console.log("Incoming request:", req.method, req.path);
  router(req, res);
});

export const handler = serverless(app);
