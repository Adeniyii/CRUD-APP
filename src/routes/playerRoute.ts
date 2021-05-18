import { Router } from "express";
import {
  addPlayer,
  getPlayer,
  getPlayers,
  removePlayer,
  updatePlayer,
} from "../controllers/playerController";
import { body, oneOf } from "express-validator";

const route = Router();

route.get("/", getPlayers);

route.get("/:id", getPlayer);

route.delete("/:id", removePlayer);

route.post(
  "/",
  [
    // Validate request
    body("email", "Invalid email address").isEmail(),
    body("password", "Invalid password")
      .exists()
      .isLength({ min: 5 })
      .withMessage("Password must be more than 5 characters."),
    body("name", "Invalid name").exists().isLength({ min: 2 }),
    body("country", "Invalid country").exists(),
  ],
  addPlayer
);

route.put(
  "/:id",
  [
    // Validate request
    oneOf(
      [
        body("name").exists(),
        body("email").exists(),
        body("password").exists(),
        body("country").exists(),
      ],
      "No fields were provided."
    ),
  ],
  updatePlayer
);

export default route;
//
