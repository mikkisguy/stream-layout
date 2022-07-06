import { mongoose } from "mongoose";

export const configSchema = new mongoose.Schema({
  _id: Number,
  token: {
    access: {
      type: String,
      required: true,
    },
    refresh: {
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
  client: {
    id: {
      type: String,
      required: true,
    },
    secret: {
      type: String,
      required: true,
    },
  },
});

export const eventSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  type: {
    type: String,
    enum: ["SUB", "HOST", "FOLLOW"],
    required: true,
  },
  nick: {
    type: String,
    required: true,
  },
});
