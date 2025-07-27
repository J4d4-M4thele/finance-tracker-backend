import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import dotenv from "dotenv";
import cors from "cors";

const app: Express = express();

dotenv.config();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const corsOptions = {
  origin: "http://localhost:5173/",
  credentials: true,
};

const mongoURI: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@testcluster1.iqkh70e.mongodb.net/${process.env.MONGO_DATABASE}`;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Successfully connected to database!"))
  .catch((err) => console.error("Failed to connect to database:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log(`Server Running on port: ${port}`);
});
