import { rideModel } from "../models/rideModel.js";
import asyncHandler from "../utils/error helpers/asyncHandler.js";
import { error } from "../utils/error helpers/error.js";

export const createRide = asyncHandler(async (req, res) => {
  const { pickup, destination } = req.body;
  const { _id } = req.user.user;
  const ride = new rideModel({
    user: _id,
    pickup,
    destination,
  });
  await ride.save();
  res.status(200).json({ message: "ride created successfully", ride });
});

export const acceptRide = asyncHandler(async (req, res) => {
  const { _id, isavailable } = req.captain.captain;
  res.status(200);
});
