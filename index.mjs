// index.mjs
import express from "express";
import router from "./routes/routers.mjs";
import serverless from "serverless-http";
import cors from "cors";

const app = express();

// Enable CORS middleware
app.use(cors());

app.use(express.json());
app.use("/", router);

export const handler = serverless(app);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
