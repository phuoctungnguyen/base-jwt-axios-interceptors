import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/auth";
import { corsOptions } from "./config/corsOptions";
import getUserRoutes from "./routes/user";
import { Request, Response, NextFunction } from "express";

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

// fix cache from disk from express
// app.use((req, res, next) => {
//   res.set("Cache-Control", "no-store");
//   next();
// });

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
// app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/getuser", getUserRoutes);

app.listen(8000, () => {
  console.log("server is running");
});
