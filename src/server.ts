import express from "express";
import { config } from "dotenv";
// import { connectDB } from "./db/dbConfig";
// import { MongoClient } from "mongodb";

config();
const app = express();
const { PORT } = process.env;
const port = process.env.PORT || PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
