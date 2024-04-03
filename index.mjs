// index.mjs
import express from "express";
import router from "./routes/routers.mjs";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

app.get("/auth", (req, res) => {
  res.json({ message: "Welcome to WaveWise Auth" });
});

app.get("/wavewise-backend", (req, res) => {
  res.json({ message: "Welcome to WaveWise Backend" });
});

app.use("/auth", router);
app.use("/wavewise-backend", router);

export const handler = serverless(app);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
