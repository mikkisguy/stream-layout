import express from "express";
import { mongoose } from "mongoose";
import {
  SERVER_PORT,
  SSL,
  JWT,
  LOG_STYLING,
  EVENT_TYPE,
  USER,
  IS_PRODUCTION,
  DEV_PORT,
} from "./constants.mjs";
import {
  logger,
  requestErrorHandler,
  initDatabase,
  getSecret,
  getAuthProvider,
  latestEventHandler,
  undefinedAsEmptyString,
  getStreamUUID,
} from "./utils.mjs";
import helmet from "helmet";
import { expressjwt } from "express-jwt";
import https from "https";
import cors from "cors";
import { ApiClient } from "@twurple/api";
import { twitchEventSchema } from "./schemas.mjs";

const app = express();

const httpsServer = https.createServer(
  {
    cert: getSecret(SSL.CERT_PATH),
    key: getSecret(SSL.KEY_PATH),
  },
  app
);

app.use(helmet());

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:7000"
  ]
}));

app.use(
  expressjwt({ secret: JWT.SECRET, algorithms: [JWT.ALGORITHM] })
    .unless({ path: /\/no-auth/i })
);

app.use(async (req, _, next) => {
  try {
    logger(`-> Received ${req.method} ${req.path}`);

    process.on("warning", (e) => logger(e.stack));

    mongoose.connection.on("error", (error) => logger(error, true));

    next();
  } catch (error) {
    next(error);
  }
});

app.get("/no-auth*", async (_, res) => res.end("/no-auth"));

app.get("/latest", async (req, res, next) => {
  try {
    const authProvider = await getAuthProvider();
    const apiClient = new ApiClient({ authProvider });

    // Subscribers
    const { data: subscriberData } =
      await apiClient.subscriptions.getSubscriptions(USER.ID);

    const subDisplayName = undefinedAsEmptyString(
      subscriberData[0].userDisplayName
    );

    const subResponse = {
      streamUUID: getStreamUUID(req),
      type: EVENT_TYPE.SUB,
      displayName: subDisplayName,
      otherData: {
        isGift: subscriberData[0].isGift,
        gifterDisplayName: subscriberData[0].gifterDisplayName,
        tier: subscriberData[0].tier,
      },
    };

    // Followers
    const { data: followerData, total: followerCount } =
      await apiClient.users.getFollows({ followedUser: USER.ID });

    const followerDisplayName = undefinedAsEmptyString(
      followerData[0].userDisplayName
    );

    const followResponse = {
      streamUUID: getStreamUUID(req),
      type: EVENT_TYPE.FOLLOW,
      displayName: followerDisplayName,
      otherData: {
        count: followerCount,
      },
    };

    // Check and save
    const isNewSub = await latestEventHandler(subResponse, next);
    const isNewFollow = await latestEventHandler(followResponse, next);

    return res.send({
      latestSub: {
        isNew: isNewSub,
        ...subResponse,
      },
      latestFollow: {
        isNew: isNewFollow,
        ...followResponse,
      },
    });
  } catch (error) {
    next(error);
  }
});

app.get("/latest-mock/:boolean", async (req, res, next) => {
  const getRand = () => Math.floor(Math.random() * 3);

  try {
    return res.send({
      latestSub: {
        isNew: getRand() === 1,
        type: EVENT_TYPE.SUB,
        displayName: getRand() === 1 ? "Subaaja93" : "tilaaja_",
        otherData: {
          isGift: req.params.boolean || false,
          gifterDisplayName: "",
          tier: "1000",
        },
      },
      latestFollow: {
        isNew: getRand() === 1,
        type: EVENT_TYPE.FOLLOW,
        displayName: getRand() === 1 ? "Seuraaja-" : "follower1000",
        otherData: {
          count: 158,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

app.get("/thanks", async (req, res, next) => {
  try {
    const TwitchEvent = mongoose.model("TwitchEvent", twitchEventSchema);

    const queryByUUID = await TwitchEvent.find({ streamUUID: getStreamUUID(req) }, null, {
      sort: { createdAt: 1 },
    }).exec();

    return res.send(queryByUUID);
  } catch (error) {
    next(error);
  }
});

app.get("/thanks-mock", async (req, res, next) => {
  try {
    return res.send([
      { id: 1, streamUUID: getStreamUUID(req), type: EVENT_TYPE.FOLLOW, displayName: "Seuraaja" },
      { id: 2, streamUUID: getStreamUUID(req), type: EVENT_TYPE.FOLLOW, displayName: "meikäläinen" },
      { id: 3, streamUUID: getStreamUUID(req), type: EVENT_TYPE.FOLLOW, displayName: "follower1000" },
      { id: 4, streamUUID: getStreamUUID(req), type: EVENT_TYPE.SUB, displayName: "tilaaja_" },
    ]);
  } catch (error) {
    next(error);
  }
});

app.use(requestErrorHandler);

httpsServer.listen(IS_PRODUCTION ? SERVER_PORT : DEV_PORT, async () => {
  logger(`${LOG_STYLING.UNDERSCORE}*** SERVER RUNNING ***${LOG_STYLING.RESET}`);

  initDatabase();
});
