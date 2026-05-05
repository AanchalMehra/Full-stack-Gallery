import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dbConnection from "./connection/userConnection.js";

import testRouter from "./routes/testRoute.js";
import imageRoute from "./routes/imageRoute.js";
import authrouter from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*",
  credentials: true
}));

const PORT = process.env.PORT;

// db connection
dbConnection(process.env.MONGO_URL);

app.use("/api", testRouter);
app.use("/api", imageRoute);
app.use("/api", authrouter);

app.listen(PORT, () =>
  console.log(`Server started at PORT ${PORT}`)
);
