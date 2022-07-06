import express from "express";
import { mongoose } from "mongoose";
import { logger, initDatabase } from "./constants.mjs";

const app = express();

app.get("/latest", (_, res) => {
  logger("Received GET request /latest");

  return res.send("GET Response");
});

app.listen(4000, () => {
  logger("*** SERVER RUNNING ***");
  initDatabase();

  mongoose.connection.on("error", (error) => {
    logger(error, true);
  });
});
