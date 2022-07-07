import express from "express";
import { mongoose } from "mongoose";
import { logger, initDatabase, refreshingAuthProvider } from "./constants.mjs";
import { ApiClient } from "@twurple/api";

const app = express();

let authProvider;

// Load auth
app.use(async (req, res, next) => {
  authProvider = await refreshingAuthProvider();

  next();
});

app.get("/latest", async (req, res) => {
  logger("Received GET request /latest");

  const apiClient = new ApiClient({ authProvider });

  const user = await apiClient.users.getUserByName("mikkisguy");

  return res.send({ description: user.description });
});

app.listen(4000, () => {
  logger("*** SERVER RUNNING ***");
  initDatabase();

  mongoose.connection.on("error", (error) => {
    logger(error, true);
  });
});
