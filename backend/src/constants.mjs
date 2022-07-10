import * as path from "path";
import { fileURLToPath } from "url";

export const ENV = process.env.NODE_ENV;

export const IS_PRODUCTION = ENV === "production";

export const DIR_NAME = path.dirname(fileURLToPath(import.meta.url));

export const SERVER_PORT = process.env.SERVER_PORT;

export const SSL = {
  CERT_PATH: process.env.SSL_CERT_PATH,
  KEY_PATH: process.env.SSL_KEY_PATH
}

export const JWT = {
  KEY_PATH: process.env.JWT_KEY_PATH,
  ISSUER: `${process.env.JWT_ISSUER_URL}:${SERVER_PORT}`,
  AUDIENCE: process.env.JWT_AUDIENCE
}

export const USER = {
  ID: "140442943",
  NAME: "mikkisguy"
}

export const DB = {
  NAME: process.env.DB_NAME,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
}

export const DB_CONNECTION_STRING = `mongodb://${DB.USER}:${DB.PASSWORD}@localhost:27017/${DB.NAME}`;

export const INITIAL = {
  ACCESS_TOKEN: process.env.INITIAL_ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.INITIAL_REFRESH_TOKEN
}

export const CLIENT = {
  ID: process.env.CLIENT_ID,
  SECRET: process.env.CLIENT_SECRET
}
