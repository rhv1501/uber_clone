import { captainModel } from "../models/captain.model.js";
import { error } from "../utils/error helpers/error.js";

export const toggleavailability = async (req, res) => {
  const _id = req.user;
  const captain = await captainModel.findById(_id);
  if (!captain) {
    error(404, "Captain not found");
    return;
  }
  captain.isavailable = !captain.isavailable; 
  await captain.save();
  res.status(200).json({
    message: "Captain availability toggled successfully",
    captain: {
      email: captain.email,
      _id: captain._id,
      isavailable: captain.isavailable,
    },
  });
  return;
};
