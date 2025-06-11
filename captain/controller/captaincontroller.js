import { captainModel } from "../models/captain.model.js";
import { error } from "../utils/error helpers/error.js";
import { subscribeToQueue } from "../service/rabbit.js";
const pendingRequests = [];
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
export const waitforRide = (req, res) => {
  req.setTimeout(30000, () => {
    res.status(408).json({ message: "Request timed out" });
  });
  pendingRequests.push(res);
};
export const subscribe = () => {
  subscribeToQueue("newRide", async (data) => {
    const rideData = await JSON.parse(data);
    pendingRequests.forEach((res) => {
      res.status(200).json({
        message: "New ride request received",
        ride: rideData,
      });
    });
    pendingRequests.length = 0; // Clear the pending requests after sending the response
    console.log(rideData);
  });
};
