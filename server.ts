import express from "express";
import adminRoutes from "./routes/routers";
import oceanDataRoutes from "./routes/routers";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

app.use("/api", adminRoutes);
app.use("/api", oceanDataRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

module.exports.handler = serverless(app);
