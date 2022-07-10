import { mongoose } from "mongoose";

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

export const eventSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    type: {
      type: String,
      enum: ["SUB", "HOST", "FOLLOW"],
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
