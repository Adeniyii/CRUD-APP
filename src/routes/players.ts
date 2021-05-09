import { Request, Response, Router } from "express";
import { PlayerModel } from "../models/Player";

const route = Router();

/**
 * A route handler to query for a single player from the NBA database using player id provided in req params.
 * @param req HTTP request object from client.
 * @param res Sends back a status code and a json object containing success status{boolean} and data {Object} from database, or an error message on failure.
 */
async function getPlayer(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const player = await PlayerModel.findById(id);
    return res.status(200).json({ success: true, data: { player } });
  } catch (error) {
    return res.status(500).json({ success: false, data: error.message });
    // process.exit(1)
  }
}

/**
 * A route handler to query for all players from NBA database.
 * @param req HTTP request object from client.
 * @param res A json object containing success status {boolean} and data {Object} from database, or an error message on failure.
 */
async function getPlayers(_: Request, res: Response) {
  try {
    const players = await PlayerModel.find({});
    return res.status(200).json({
      success: true,
      data: { players },
    });
  } catch (error) {
    return res.status(500).json({ success: false, data: error.message });
    // process.exit(1)
  }
}

/**
 * A route handler to add a player to the NBA database using data {Object} provided in the request body.
 * @param req HTTP request object from client.
 * @param res Sends back a status code and a json object containing success status{boolean} and data {Object} from database, or an error message on failure.
 */
async function addPlayer(req: Request, res: Response) {
  try {
    const playerPayload = req.body;

    const player = new PlayerModel(playerPayload);
    const savedDoc = await player.save();
    return res.status(201).json({ success: true, data: savedDoc });
  } catch (error) {
    return res.status(500).json({ success: false, data: error.message });
  }
}

/**
 * A route handler to update a player in the NBA database using the player id provided in req.params wiith the data {Object} provided in the request body.
 * @param req HTTP request object from client.
 * @param res Sends back a status code and a json object containing success status{boolean} and data {Object} from database, or an error message on failure.
 */
async function updatePlayer(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, email, country } = req.body;

    const updatedPlayer = await PlayerModel.findByIdAndUpdate(
      id,
      { $set: { name: name, email: email, country: country } },
      { new: true, omitUndefined: true }
    );
    return res.status(201).json({ success: true, data: updatedPlayer });
  } catch (error) {
    return res.status(500).json({ success: false, data: error.message });
  }
}

route
  .get("/", getPlayers)
  .get("/:id", getPlayer)
  .post("/", addPlayer)
  .put("/:id", updatePlayer);

export default route;
