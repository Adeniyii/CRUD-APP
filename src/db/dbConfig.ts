import mongoose from "mongoose";
import { config } from "dotenv";
config();

// Connection string
const { MONGO_URI } = process.env;

/**
 * Establishes a connection to the database specified by the connection string.
 * @returns {Mongoose} Mongoose client
 * @returns {Error} Error object
 */
export async function connectDB() {
  try {
    const client = await mongoose.connect(MONGO_URI!, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    return client;
  } catch (error) {
    error.message += "----- Please contact the developer.";
    throw new Error(error);
  }
}
