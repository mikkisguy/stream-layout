# Code Storage 2000(tm)

```js
// /************** SOCKET.IO **************/

const io = new Server(httpsServer, {
  path: "/no-auth/socket",
  cors: {
    origin: JWT.AUDIENCE,
    methods: ["GET"],
  },
});

io.use(
  authorize({
    secret: String(getSecret(JWT.KEY_PATH)),
    algorithms: [JWT.ALGORITHM],
  })
);

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
```

```js
// /************** eventSub.mjs **************/

import { ApiClient } from "@twurple/api";
import { EventSubMiddleware } from "@twurple/eventsub";
import { ClientCredentialsAuthProvider } from "@twurple/auth";
import { CLIENT, SERVER_URL, EVENTSUB_SECRET } from "./constants.mjs";
import { logger } from "./utils.mjs";

export const getEventSubMiddleware = () => {
  const authProvider = new ClientCredentialsAuthProvider(
    CLIENT.ID,
    CLIENT.SECRET
  );

  const apiClient = new ApiClient({ authProvider });

  return new EventSubMiddleware({
    apiClient,
    hostName: SERVER_URL,
    pathPrefix: "/no-auth/twitch",
    secret: EVENTSUB_SECRET,
    strictHostCheck: true,
  });
};

export const handleEvent = async (eventType, eventData, io) => {
  logger(eventType);
};

// constants.mjs
export const EVENTSUB_SECRET = process.env.EVENTSUB_SECRET;
export const SERVER_URL = `${process.env.JWT_ISSUER_URL}`;
```
