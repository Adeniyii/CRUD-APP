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
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create collection from PlayerSchema
const PlayerModel = model("Players", PlayerSchema);

export default PlayerModel;
