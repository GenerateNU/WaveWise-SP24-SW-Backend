// index.mjs
import express from "express";
import router from "./routes/routers.mjs";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

app.use("/wavewise-backend", router);

app.get("/wavewise", (req, res) => {
  res.send("Hello from the backend");
});

export const handler = serverless(app);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
