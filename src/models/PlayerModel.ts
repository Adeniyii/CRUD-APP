import { Schema, model } from "mongoose";

// Create mongoose schema
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

// Create collection from PlayerSchema
const PlayerModel = model("Player", PlayerSchema);

export default PlayerModel;
