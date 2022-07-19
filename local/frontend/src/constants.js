export const ENV = import.meta.env.NODE_ENV;
export const IS_DEVELOPMENT = ENV !== "production";

export const TOKEN_API_URL = "http://localhost:7070/token";
export const STREAM_API_URL = import.meta.env.VITE_STREAM_API_URL;

export const MINUTE = 60000;
export const SECOND = 1000;
