// index.mjs
import express from "express";
import router from "./routes/routers.mjs"; // Ensure this is the correct relative path
import serverless from "serverless-http";

const app = express();
app.use(express.json());

app.use("/", router);

export const handler = serverless(app);
