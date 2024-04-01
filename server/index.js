import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import UserRoute from "./routes/User.js";
import MenuRoute from "./routes/MenuItem.js";
import OrderRoute from "./routes/Order.js";
import ServiceRoute from "./routes/Service.js";
import Recommendations from "./routes/Recommendations.js";

import { saveToken } from "./config/firebase.js";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

app.use(cors());
app.use(
  bodyParser.urlencoded(
    { extended: false },
    { limit: "50mb" },
    { parameterLimit: 50000 }
  )
);
app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).send(errorMessage);
});

app.post("/registerPushToken", async (req, res) => {
  const userId = String(req.body.userId);
  const token = String(req.body.token);

  await saveToken(userId, token);
  res.status(201).send();
});

app.listen(8800, () => {
  connect();
  console.log("Server is running on port 8800");
});

app.use("/api/user", UserRoute);
app.use("/api/menu", MenuRoute);
app.use("/api/order", OrderRoute);
app.use("/api/service", ServiceRoute)
app.use("/api/recommendation", Recommendations)
