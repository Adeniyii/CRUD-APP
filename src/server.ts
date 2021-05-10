import express from "express";
import { config } from "dotenv";
import playerRoutes from "./routes/playerRoute";
import { connectDB } from "./config/dbConfig";
import { Mongoose } from "mongoose";

// Load dotenv
config();

// Init express
const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;

// Mongoose connection
let mongooseConn: Mongoose | undefined;

// Middleware - Create mongoose connection if none available.
app.use(async (_, res, next) => {
  if (!mongooseConn || mongooseConn!.connection.readyState === 0) {
    try {
      mongooseConn = await connectDB();
      console.log(
        `connected to database: ${mongooseConn!.connection.db.databaseName}...`
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
  next();
});

// Homepage
app.get("/", (_, res) => {
  return res.status(200).json({
    message:
      "Welcome to NBA players API. Please visit https://github.com/Adeniyii/CRUD-APP for usage information.",
  });
});

// Routes
app.use("/api/players", playerRoutes);

// Catch unregistered routes
app.all("*", (_, res) => {
  return res.status(404).json({ message: "Bad request." });
});

// Listener
app.listen(port, () => console.log(`Listening on port ${port}...`));
