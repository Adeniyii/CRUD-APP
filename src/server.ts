import express, { NextFunction, Request, Response } from "express";
import playerRoutes from "./routes/playerRoute";
import { connectDB } from "./db/dbConfig";
import { Mongoose } from "mongoose";
import { config } from "dotenv";

// Load dotenv
config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

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
      res.status(500).json({ statusCode: 500, message: error.message });
      next(error);
    }
  }
  next();
});

// Homepage
app.get("/", (_, res) => {
  return res.status(200).json({
    statusCode: 200,
    message:
      "Welcome to NBA players API. Visit https://github.com/Adeniyii/CRUD-APP for usage information.",
  });
});

// Register player routes
app.use("/api/players", playerRoutes);

// Catch unregistered routes
app.all("*", (_, res) => {
  return res.status(404).json({ statusCode: 404, message: "Page not found." });
});

// Error handler
app.use(function (err: Error, _: Request, __: Response, ___: NextFunction) {
  console.error(err);
  process.exit(1);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
