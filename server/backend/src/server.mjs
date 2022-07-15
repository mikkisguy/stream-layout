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
  REACT_URL
} from "./constants.mjs";
import {
  logger,
  requestErrorHandler,
  initDatabase,
  getSecret,
  getAuthProvider,
  latestEventHandler,
  undefinedAsEmptyString
} from "./utils.mjs";
import helmet from "helmet";
import { expressjwt } from "express-jwt";
import https from "https";
import cors from "cors";
import { ApiClient } from "@twurple/api";

const app = express();

const httpsServer = https.createServer(
  {
    cert: getSecret(SSL.CERT_PATH),
    key: getSecret(SSL.KEY_PATH),
  },
  app
);

app.use(helmet());

app.use(cors({ origin: REACT_URL }));

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

app.get("/latest", async (_, res, next) => {
  try {
    const authProvider = await getAuthProvider();
    const apiClient = new ApiClient({ authProvider });

    // Subscribers
    const { data: subscriberData } =
      await apiClient.subscriptions.getSubscriptions(USER.ID);

    const subDisplayName = undefinedAsEmptyString(subscriberData[0].userDisplayName);

    const subResponse = {
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

    const followerDisplayName = undefinedAsEmptyString(followerData[0].userDisplayName);

    const followResponse = {
      type: EVENT_TYPE.FOLLOW,
      displayName: followerDisplayName,
      otherData: {
        count: followerCount
      },
    };

    // Check and save
    const isNewSub = latestEventHandler(subResponse, next);
    const isNewFollow = latestEventHandler(followResponse, next);

    return res.send({
      latestSub: {
        isNew: isNewSub,
        ...subResponse,
      },
      latestFollow: {
        isNew: isNewFollow,
        ...followResponse
      },
    });
  } catch (error) {
    next(error);
  }
});

app.use(requestErrorHandler);

httpsServer.listen(IS_PRODUCTION ? SERVER_PORT : DEV_PORT, async () => {
  logger(`${LOG_STYLING.UNDERSCORE}*** SERVER RUNNING ***${LOG_STYLING.RESET}`);

  initDatabase();
});
