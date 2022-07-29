import { mongoose } from "mongoose";
import { EVENT_TYPE_ENUMS } from "./constants.mjs";

export const twitchTokenSchema = new mongoose.Schema(
  {
    _id: Number,
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expiresIn: {
      type: Number,
      required: true,
    },
    obtainmentTimestamp: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const twitchEventSchema = new mongoose.Schema(
  {
    streamUUID: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: EVENT_TYPE_ENUMS,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    otherData: {
      type: Map,
    },
  },
  { timestamps: true }
);
