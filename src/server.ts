import express from "express";
import { config } from "dotenv";
import playerRoutes from "./routes/players";
import { connectDB } from "./config/dbConfig";
import { Mongoose } from "mongoose";

config();

const app = express();
app.use(express.json());
const { PORT } = process.env;
const port = process.env.production || PORT;

let connection: Mongoose | undefined;

// Middleware - Create mongoose connection if none available.
app.use(async (_, res, next) => {
  if (!connection) {
    try {
      connection = await connectDB();
      console.log(
        `connected to database: ${connection!.connection.db.databaseName}...`
      );
    } catch (error) {
      res.status(500).json({ success: false, data: error.message });
      return;
    }
  }
  next();
});

// Routes
app.use("/api/players", playerRoutes);

// app.post("/api/players");

app.listen(port, () => console.log(`Listening on port ${port}...`));
