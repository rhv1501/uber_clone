import { publishToQueue, subscribeToQueue } from "../services/rabbit.js";
import { rideModel } from "../models/rideModel.js";
import asyncHandler from "../utils/error helpers/asyncHandler.js";
import { error } from "../utils/error helpers/error.js";

export const createRide = asyncHandler(async (req, res) => {
  const { pickup, destination } = req.body;
  const { _id } = req.user.user;
  try {
    const ride = new rideModel({
      user: _id,
      pickup,
      destination,
    });
    publishToQueue("newRide", JSON.stringify(ride));
    await ride.save();
    res.status(200).json({ message: "ride created successfully", ride });
  } catch (err) {
    throw error(500, "server error");
  }
});

export const acceptRide = asyncHandler(async (req, res) => {
  const { ride_id } = req.query;
  const { _id, isavailable } = req.captain.captain;
  if (!isavailable) {
    throw error(400, "captain not toggled");
  }
  try {
    const ride = await rideModel.findById(ride_id);
    if (!ride) {
      throw error(404, "ride not found");
    }
    if (ride.status !== "requested") {
      res.status(400).json({ message: "ride already accepted or completed" });
      return;
    }
    ride.captain = _id;
    ride.status = "accepted";
    await ride.save();
    publishToQueue("rideAccepted", JSON.stringify(ride));
    res.status(200).json({ message: "ride accepted successfully", ride });
  } catch (err) {
    throw error(500, err.message || "server error");
  }
});
