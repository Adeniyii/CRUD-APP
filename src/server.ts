import express from "express";
import { config } from "dotenv";
import playerRoutes from "./routes/players";
import { connectDB } from "./config/dbConfig";

config();
const { PORT } = process.env;
const port = process.env.production || PORT;

const app = express();
app.use(express.json());

// Database connection
connectDB().then((conn) =>
  console.log(`connected to database: ${conn.connection.db.databaseName}...`)
);

// Routes
app.use("/api/players", playerRoutes);
// app.post("/api/players");

app.listen(port, () => console.log(`Listening on port ${port}...`));
