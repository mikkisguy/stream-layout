import express from "express";
import { mongoose } from "mongoose";
import {
  SERVER_PORT,
  USER,
  IS_PRODUCTION,
  SSL
} from "./constants.mjs";
import {
  logger,
  requestErrorHandler,
  initDatabase,
  getAuthProvider,
  getJwtOptions,
  getJwtToken,
  getSecret
} from "./utils.mjs"
import { ApiClient } from "@twurple/api";
import helmet from "helmet";
import { expressjwt } from "express-jwt";
import https from "https";

let authProvider;

const app = express();

app.use(helmet());

app.use(async (req, _, next) => {
  try {
    logger(`-> Received ${req.method} ${req.path}`);

    process.on("warning", e => logger(e.stack));

    mongoose.connection.on("error", (error) => logger(error, true));

    if (req.path !== "/") {
      authProvider = await getAuthProvider();
    }

    if (!IS_PRODUCTION) {
      logger(`Bearer ${getJwtToken()}`);
    }

    next();
  }
  catch (error) {
    next(error);
  }
});

app.use(expressjwt(getJwtOptions(true)));

app.get("/latest", async (_, res, next) => {
  try {
    const apiClient = new ApiClient({ authProvider });

    const user = await apiClient.users.getUserByName(USER.NAME);

    return res.send({ description: user.description });
  }
  catch (error) {
    next(error);
  }
});

app.use(requestErrorHandler);

const server = https.createServer({
  cert: getSecret(SSL.CERT_PATH),
  key: getSecret(SSL.KEY_PATH)
}, app);

server.listen(SERVER_PORT, () => {
  logger("*** SERVER RUNNING ***");

  initDatabase();
});
