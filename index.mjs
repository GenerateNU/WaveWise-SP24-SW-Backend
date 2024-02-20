// import express from "express";
// // import adminRoutes from "./routes/routers.mjs";
// // import oceanDataRoutes from "./routes/routers.mjs";
// import test from "./routes/routers.mjs";
// import serverless from "serverless-http";

// const app = express();
// app.use(express.json());

// // app.use("/wavewise-backend", adminRoutes);
// // app.use("/wavewise-backend", oceanDataRoutes);

// app.use("/", test);

// // app.get("/wavewise-backend", (req, res) => {
// //   res.json({ message: "Welcome to WaveWise Backend" });
// // });

// export const handler = serverless(app);

import express from "express";
import serverless from "serverless-http";
import router from "./routes/routers.mjs";

const app = express();
app.use(express.json());

app.use("/", router);

export const handler = serverless(app);
