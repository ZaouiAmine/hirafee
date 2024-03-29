import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {

  // catch (err) {
  //   console.error(err);

  // }
  // app.listen(3000, () => {
  //   console.log("Listening on port 3000 okey ?!");
  // });

  // check if env jwt-secret var is declared
  // if (!process.env.JWT_KEY) {
  //   throw new Error("env key not defined");
  // }
  if (!process.env.MONGO_URI) {
    throw new Error ("monog_uri must be defined");
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
