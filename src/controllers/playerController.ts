import { Request, Response } from "express";
import PlayerModel from "../models/PlayerModel";
import { validationResult } from "express-validator";

/**
 * A route handler to query for a single player from the NBA database using player id provided in req params.
 * @param req HTTP request object from client.
 * @param res Sends back a status code and a json object containing message {string} and data {Object} from database on success, or an error message on failure.
 */
export async function getPlayer(req: Request, res: Response) {
  try {
    const player = await PlayerModel.findById(req.params.id);

    // If no player was found
    if (!player) throw new Error("No player was found for given id.");
    return res.status(200).json({
      statusCode: 200,
      message: "Fetched successfully.",
      data: { player },
    });
  } catch (error) {
    return error.name === "CastError"
      ? res.status(400).json({ statusCode: 400, message: error.reason.message })
      : res.status(400).json({ statusCode: 400, message: error.message });
  }
}

/**
 * A route handler to query for all players from NBA database.
 * @param req HTTP request object from client.
 * @param res A json object containing message {string} and data {Object} from database on success, or an error message on failure.
 */
export async function getPlayers(_: Request, res: Response) {
  try {
    const players: Object[] = await PlayerModel.find({});
    if (players.length < 1) throw new Error("No players were found.");

    return res.status(200).json({
      statusCode: 200,
      message: "Fetched successfully.",
      data: { players },
    });
  } catch (error) {
    return res.status(404).json({ statusCode: 400, message: error.message });
  }
}

/**
 * A route handler to add a player to the NBA database using data {Object} provided in the request body.
 * @param req HTTP request object from client.
 * @param res Sends back a status code and a json object containing message {string} and data {Object} from database on success, or an error message on failure.
 */
export async function addPlayer(req: Request, res: Response) {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ statusCode: 400, message: errors.mapped() });

  try {
    const payload = req.body;

    const player = new PlayerModel(payload);
    const newPlayer = await player.save();

    return res.status(201).json({
      statusCode: 201,
      message: "Player created successfully.",
      data: { newPlayer },
    });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
}

/**
 * A route handler to update a player in the NBA database using the player id provided in req.params wiith the data {Object} provided in the request body.
 * @param req HTTP request object from client.
 * @param res Sends back a status code and a json object containing message {string} and data {Object} from database on success, or an error message on failure.
 */
export async function updatePlayer(req: Request, res: Response) {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ statusCode: 400, message: errors.array()[0]["msg"] });

  try {
    const { id } = req.params;
    const { name, email, country, password } = req.body;

    const updatedPlayer = await PlayerModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: name,
          email: email,
          password: password,
          country: country,
        },
      },
      { new: true, omitUndefined: true }
    );
    if (!updatedPlayer) throw new Error("No player was found for given id.");
    return res.status(201).json({
      statusCode: 201,
      message: "Updated successfully.",
      data: { updatedPlayer },
    });
  } catch (error) {
    return error.name === "CastError"
      ? res.status(400).json({ statusCode: 400, message: error.reason.message })
      : res.status(400).json({ statusCode: 400, message: error.message });
  }
}

/**
 * A route handler to delete a player from the NBA database using the player id provided in req.params
 * @param req HTTP request object from client.
 * @param res Sends back a status code and a json object containing message {string} and data {Object} from database on success, or an error message on failure.
 */
export async function removePlayer(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const removedPlayer = await PlayerModel.findByIdAndDelete(id);

    if (!removedPlayer) throw new Error("No player was found for given id.");
    return res.status(201).json({
      statusCode: 201,
      message: "Removed successfully.",
      data: { removedPlayer },
    });
  } catch (error) {
    return error.name === "CastError"
      ? res.status(400).json({ statusCode: 400, message: error.reason.message })
      : res.status(400).json({ statusCode: 400, message: error.message });
  }
}
//
