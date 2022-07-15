import * as path from "path";
import { fileURLToPath } from "url";

export const ENV = process.env.NODE_ENV;
export const IS_PRODUCTION = ENV === "production";
export const DIR_NAME = path.dirname(fileURLToPath(import.meta.url));
export const SERVER_PORT = process.env.SERVER_PORT;
export const DEV_PORT = process.env.DEV_PORT;
export const REACT_URL = process.env.REACT_URL;

export const SSL = {
  CERT_PATH: process.env.SSL_CERT_PATH,
  KEY_PATH: process.env.SSL_KEY_PATH,
};

export const JWT = {
  SECRET: process.env.JWT_SECRET,
  ALGORITHM: "HS256",
};

export const USER = {
  ID: "140442943",
  NAME: "mikkisguy",
  BOT: "806434088",
};

export const DB = {
  NAME: process.env.DB_NAME,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
};

export const DB_CONNECTION_STRING = `mongodb://${DB.USER}:${DB.PASSWORD}@mikkisguy-stream-mongodb:27017/${DB.NAME}`;

export const INITIAL = {
  ACCESS_TOKEN: process.env.INITIAL_ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.INITIAL_REFRESH_TOKEN,
};

export const CLIENT = {
  ID: process.env.CLIENT_ID,
  SECRET: process.env.CLIENT_SECRET,
};

export const LOG_STYLING = {
  RESET: "\x1b[0m",
  UNDERSCORE: "\x1b[4m",
  RED: "\x1b[31m",
  CYAN: "\x1b[36m",
};

export const EVENT_TYPE_ENUMS = ["SUB", "CHEER", "HOST", "FOLLOW"];
export const EVENT_TYPE = {
  SUB: EVENT_TYPE_ENUMS[0],
  CHEER: EVENT_TYPE_ENUMS[1],
  HOST: EVENT_TYPE_ENUMS[2],
  FOLLOW: EVENT_TYPE_ENUMS[3],
};
