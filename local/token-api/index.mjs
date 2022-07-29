import express from "express";
import jwt from "jsonwebtoken";
const { sign: jwtSign } = jwt;
import cors from "cors";
import { v4 as uuid } from 'uuid';

const app = express();

app.locals.streamUUID = uuid();

app.get("/token", cors(), async (_, res, next) => {
  try {
    const jwtPayload = {
      streamUUID: app.locals.streamUUID
    }

    const jwtOptions = {
      expiresIn: process.env.JWT_EXPIRE,
    };

    const signedJwt = jwtSign(jwtPayload, process.env.JWT_SECRET, jwtOptions);

    res.send({ token: signedJwt });
  } catch (error) {
    next(error);
  }
});

app.use((error, request, response, next) => {
  if (response.headersSent) {
    console.error("==> Headers already sent");
    next(error);
  }

  console.error(
    `==> Request ${request.method} ${request.url} -> ${error.stack}`
  );

  response.sendStatus(error.status || 500);
});

app.listen(7070, () => console.log("==> TOKEN SERVER RUNNING"));
