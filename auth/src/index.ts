import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  // check if env jwt-secret var is declared
  if (!process.env.JWT_KEY) {
    throw new Error("env key not defined");
  }
  try {
    mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected to db");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("listening on port 3000 !");
  });
};

start();
