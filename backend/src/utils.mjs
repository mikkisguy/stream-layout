import { format, getUnixTime } from "date-fns";
import { mongoose } from "mongoose";
import { twitchTokenSchema } from "./schemas.mjs";
import {
  RefreshingAuthProvider,
  ClientCredentialsAuthProvider,
} from "@twurple/auth";
import * as fs from "fs";
import * as path from "path";
import {
  IS_PRODUCTION,
  DB_CONNECTION_STRING,
  INITIAL,
  CLIENT,
  DIR_NAME,
  JWT,
} from "./constants.mjs";
import jwt from "jsonwebtoken";
const { sign: jwtSign } = jwt;

// Create model (collection in MongoDB)
const TwitchToken = mongoose.model("TwitchToken", twitchTokenSchema);

export const logger = (message, error = false) => {
  const date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const type = error ? "ERROR" : "INFO";

  return console.log(`${date} | ${type} | ${message}`);
};

export const requestErrorHandler = (error, request, response, next) => {
  const errorLogMessage = IS_PRODUCTION ? error.message : error.stack;
  const status = error.status || 500;

  if (response.headersSent) {
    logger("Headers already sent");
    return next(error);
  }

  logger(errorLogMessage, true);
  response.sendStatus(status);
};

export const initDatabase = async () => {
  try {
    mongoose.connect(DB_CONNECTION_STRING);
  } catch (error) {
    logger(error, true);
  }

  await mongoose.connection.on("connected", () => logger("Database connected"));

  // Check if token data is already initialized
  const initCheck = await TwitchToken.findById(1).exec();

  if (initCheck == undefined) {
    // Set initial token data
    const initialTwitchTokenData = new TwitchToken({
      _id: 1,
      accessToken: INITIAL.ACCESS_TOKEN,
      refreshToken: INITIAL.REFRESH_TOKEN,
      expiresIn: 0,
      obtainmentTimestamp: 0,
    });

    // Save to database
    await initialTwitchTokenData.save().then((saved) => {
      if (saved === initialTwitchTokenData) {
        logger("Initial token data saved");
      }
    });
  } else {
    return logger("Token data already initialized");
  }
};

export const getAuthProvider = async (asClientCredentials = false) => {
  if (asClientCredentials) {
    return new ClientCredentialsAuthProvider(CLIENT.ID, CLIENT.SECRET);
  }

  let tokenData = JSON.stringify(await TwitchToken.findById(1).exec());

  const handleRefresh = async (newTokenData) => {
    tokenData = await TwitchToken.findOneAndUpdate(
      { _id: 1 },
      {
        accessToken: newTokenData.accessToken,
        refreshToken: newTokenData.refreshToken,
        expiresIn: newTokenData.expiresIn,
        obtainmentTimestamp: newTokenData.obtainmentTimestamp,
      },
      { new: true }
    ).then(logger("Refreshed token data saved"));
  };

  return new RefreshingAuthProvider(
    {
      clientId: CLIENT.ID,
      clientSecret: CLIENT.SECRET,
      onRefresh: (newTokenData) => handleRefresh(newTokenData),
    },
    JSON.parse(tokenData)
  );
};

export const getSecret = (filePath) => {
  const fullPath = path.join(DIR_NAME, filePath);

  return fs.readFileSync(fullPath);
};

export const getJwtOptions = (comingRequest = false) => {
  const specificOptions = comingRequest
    ? {
        secret: getSecret(JWT.KEY_PATH),
        algorithms: [JWT.ALGORITHM],
      }
    : {
        algorithm: JWT.ALGORITHM,
        expiresIn: "24h",
      };

  return {
    issuer: JWT.ISSUER,
    audience: IS_PRODUCTION ? JWT.AUDIENCE : "",
    ...specificOptions,
  };
};

export const getJwtToken = () =>
  jwtSign({}, getSecret(JWT.KEY_PATH), getJwtOptions());
