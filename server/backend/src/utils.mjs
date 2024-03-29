import { format } from "date-fns";
import { mongoose } from "mongoose";
import { twitchTokenSchema, twitchEventSchema } from "./schemas.mjs";
import { RefreshingAuthProvider } from "@twurple/auth";
import {
  IS_PRODUCTION,
  DB_CONNECTION_STRING,
  INITIAL,
  CLIENT,
  LOG_STYLING,
  JWT,
} from "./constants.mjs";
import jwt from "jsonwebtoken";
const { verify: jwtVerify } = jwt;

// Create model (collection in MongoDB)
const TwitchToken = mongoose.model("TwitchToken", twitchTokenSchema);

export const logger = (message, error = false) => {
  const date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const type = error ? `${LOG_STYLING.RED}ERROR` : `${LOG_STYLING.CYAN}INFO`;

  return console.log(`${date} | ${type}${LOG_STYLING.RESET} | ${message}`);
};

export const requestErrorHandler = (error, request, response, next) => {
  const errorLogMessage = `Request ${request.method} ${request.url} from ${request.ip
    } -> ${IS_PRODUCTION ? error.message : error.stack}`;
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

export const getAuthProvider = async () => {
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

export const latestEventHandler = async (data, next) => {
  try {
    const { type, displayName } = data;
    const TwitchEvent = mongoose.model("TwitchEvent", twitchEventSchema);

    let isNew;

    const queryEvent = await TwitchEvent.find({ type, displayName }, null, {
      sort: { createdAt: -1 },
      limit: 1,
    }).exec();

    if (queryEvent.length === 0 && displayName !== "") {
      const newEvent = new TwitchEvent(data);
      await newEvent.save();

      isNew = true;
    } else {
      isNew = false;
    }

    return isNew;
  } catch (error) {
    return next(error);
  }
};

export const undefinedAsEmptyString = (input) => (input ? input : "");

export const getStreamUUID = (request) => {
  const [_, token] = request.header("authorization").split(" ");
  const decodedJwt = jwtVerify(token, JWT.SECRET);

  return decodedJwt.streamUUID;
};
