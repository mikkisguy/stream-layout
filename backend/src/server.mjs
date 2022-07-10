import express from "express";
import { mongoose } from "mongoose";
import {
  SERVER_PORT,
  USER,
  SSL,
  JWT,
  SOCKET_IO
} from "./constants.mjs";
import {
  logger,
  requestErrorHandler,
  initDatabase,
  getAuthProvider,
  getJwtOptions,
  getSecret
} from "./utils.mjs";
import { ApiClient } from "@twurple/api";
import helmet from "helmet";
import { expressjwt } from "express-jwt";
import https from "https";
import cors from "cors";
import { Server } from "socket.io";
import { authorize } from "@thream/socketio-jwt";

let authProvider;

const app = express();

const httpsServer = https.createServer({
  cert: getSecret(SSL.CERT_PATH),
  key: getSecret(SSL.KEY_PATH)
}, app);

/************************** SOCKET.IO ******************************/

const io = new Server(httpsServer, {
  path: "/socket",
  cors: {
    origin: JWT.AUDIENCE,
    methods: ["GET"]
  }
});

io.use(
  authorize({
    secret: String(getSecret(JWT.KEY_PATH)),
    algorithms: [JWT.ALGORITHM],
  })
)

io.engine.on("connection_error", (err) => {
  logger(`${SOCKET_IO} Connection error (${err.message})`, true);
});

io.on("connection", (socket) => {
  const clientAddress = socket.handshake.address;

  logger(`${SOCKET_IO} Client connected (${clientAddress})`);

  socket.on("disconnect", () => {
    logger(`${SOCKET_IO} Client disconnected (${clientAddress})`);
  });
});

/************************** EXPRESS ******************************/

app.use(helmet());

app.use(cors({ origin: JWT.AUDIENCE }));

app.use(expressjwt(getJwtOptions(true)).unless({ path: ["/socket/"] }));

app.use(async (req, _, next) => {
  try {
    logger(`-> Received ${req.method} ${req.path}`);

    process.on("warning", e => logger(e.stack));

    mongoose.connection.on("error", (error) => logger(error, true));

    if (req.path !== "/") {
      authProvider = await getAuthProvider();
    }

    next();
  }
  catch (error) {
    next(error);
  }
});

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


/************************** SERVER ******************************/

httpsServer.listen(SERVER_PORT, () => {
  logger("*** SERVER RUNNING ***");

  initDatabase();
});
