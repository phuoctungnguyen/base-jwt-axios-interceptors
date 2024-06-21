import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/auth";

dotenv.config();

const app: Application = express();

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err: Error) => {
    console.log(err);
  });

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(8000, () => {
  console.log("server is running");
});
