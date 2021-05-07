import { MongoClient } from "mongodb";

/**
 * A function which connects to a database using a connection string and returns a MongoClient object as a promise.
 * @param uri A connection string to which the application will connect
 * @returns A MongoClient object as a promise
 */
export const connectDB = async (uri: string) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const connClient = await client.connect();
  console.log(`Connected to ${connClient.db.name} database successfully...`);

  return connClient;
};

export const disconnectDB = async (client: MongoClient) => {
  if (client.isConnected()) {
    client.close();

    return client;
  }
  console.log("Database disconnected...");
  return client;
};
