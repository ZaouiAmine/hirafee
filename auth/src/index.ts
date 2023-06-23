import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

// require("dotenv").config();

const start = async () => {
  // check if env jwt-secret var is declared
  if (!process.env.JWT_KEY) {
    throw new Error("jwt  env key not defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("mongo env key not defined");
  }

  await natsWrapper.connect('hirafee', 'blabla', 'http://nats-srv:4222');
  natsWrapper.client.on('close', () => {
    console.log('NATS connection closed');
    process.exit();
  });
    process.on('SIGINT', ()=> natsWrapper.client.close());
    process.on('SIGTERM', ()=> natsWrapper.client.close());


  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to db");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("listening on port 3000 !");
  });
};

start();
