import { Schema, model } from "mongoose";

const PlayerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { autoIndex: false }
);

export const PlayerModel = model("Player", PlayerSchema);
