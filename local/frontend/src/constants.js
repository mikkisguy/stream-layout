export const IS_DEVELOPMENT = import.meta.env.DEV;

export const TOKEN_API_URL = "http://localhost:7070/token";
export const STREAM_API_URL = import.meta.env.VITE_STREAM_API_URL;

export const MINUTE = 60000;
export const SECOND = 1000;

const EVENT_TYPE_ENUMS = ["SUB", "CHEER", "HOST", "FOLLOW"];
export const EVENT_TYPE = {
  SUB: EVENT_TYPE_ENUMS[0],
  CHEER: EVENT_TYPE_ENUMS[1],
  HOST: EVENT_TYPE_ENUMS[2],
  FOLLOW: EVENT_TYPE_ENUMS[3],
};
