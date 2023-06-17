import mongoose from "mongoose";
import { app } from "./app";
// require("dotenv").config();

const start = async () => {
  // check if env jwt-secret var is declared
  if (!process.env.JWT_KEY) {
    throw new Error("jwt  env key not defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("mongo env key not defined");
  }
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("connected to db");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("listening on port 3000 !");
  });
};

start();
