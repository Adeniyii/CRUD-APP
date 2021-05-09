import mongoose from "mongoose";
import { config } from "dotenv";
config();

const { MONGO_URI } = process.env;

export async function connectDB() {
  try {
    // mongoose.
    const client = await mongoose.connect(MONGO_URI!, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return client;
  } catch (error) {
    error.message += "----- Please contact the developer.";
    throw new Error(error);
  }
}
