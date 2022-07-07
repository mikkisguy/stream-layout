import express from "express";
import { mongoose } from "mongoose";
import {
  USER_ID,
  logger,
  initDatabase,
  refreshingAuthProvider,
} from "./constants.mjs";
import { ApiClient } from "@twurple/api";

const app = express();

let authProvider;

app.use(async (req, res, next) => {
  authProvider = await refreshingAuthProvider();
  next();
});

app.get("/latest", async (req, res) => {
  logger("Received GET request /latest");

  console.log(JSON.stringify(authProvider, null, 2));

  const apiClient = new ApiClient({
    authProvider,
    logger: {
      minLevel: "debug",
    },
  });

  const jee = await apiClient.users.getUserById(USER_ID);

  return res.send(jee);
});

app.listen(4000, () => {
  logger("*** SERVER RUNNING ***");
  initDatabase();

  mongoose.connection.on("error", (error) => {
    logger(error, true);
  });
});
