import express from "express";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
const { sign: jwtSign } = jwt;

export const DIR_NAME = path.dirname(fileURLToPath(import.meta.url));
export const JWT = {
  KEY_PATH: process.env.JWT_KEY_PATH,
  ISSUER: "http://localhost:7070",
  AUDIENCE: "http://localhost:7000",
  ALGORITHM: "RS256",
};

const app = express();

app.get("/token", async (_, res, next) => {
  const fullPath = path.join(DIR_NAME, JWT.KEY_PATH);

  const jwtSecret = fs.readFileSync(fullPath);

  const jwtOptions = {
    issuer: JWT.ISSUER,
    audience: JWT.AUDIENCE,
    expiresIn: "2m",
  };

  res.send(jwtSign({}, jwtSecret, jwtOptions));
});
