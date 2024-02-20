import express from "express";
// import adminRoutes from "./routes/routers";
// import oceanDataRoutes from "./routes/routers";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from your Lambda function!" });
});

// app.use("/api", adminRoutes);
// app.use("/api", oceanDataRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

export const handler = serverless(app);
