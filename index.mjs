import express from "express";
import adminRoutes from "./routes/routers";
import oceanDataRoutes from "./routes/routers";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

app.use("/wavewise-backend/api", adminRoutes);
app.use("/wavewise-backend/api", oceanDataRoutes);

export const handler = serverless(app);
