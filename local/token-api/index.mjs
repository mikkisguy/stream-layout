import express from "express";
import jwt from "jsonwebtoken";
const { sign: jwtSign } = jwt;

const app = express();

app.get("/token", async (_, res, next) => {
  try {
    const jwtOptions = {
      issuer: "http://localhost:7070",
      audience: "http://localhost:7000",
      expiresIn: "2m",
    };

    const signedJwt = jwtSign({}, process.env.JWT_SECRET, jwtOptions);

    res.send({ token: signedJwt });
  }
  catch (error) {
    next(error);
  }
});

app.use((error, request, response, next) => {
  if (response.headersSent) {
    console.error("==> Headers already sent");
    next(error);
  }

  console.error(`==> Request ${request.method} ${request.url} -> ${error.stack}`);

  response.sendStatus(error.status || 500);
});

app.listen(7070, () => console.log("==> TOKEN SERVER RUNNING"));
