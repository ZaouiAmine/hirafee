import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  // try {
  //   await mongoose.connect('mongodb://profileservice-mongo-srv:27017/profile');
  //   console.log("connected to mongodb ");
  // }

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
  try {
    mongoose.connect("mongodb://profile-mongo-srv:27017/profile");
    console.log("connected to db");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("listening on port 3000 !");
  });
};
start();
