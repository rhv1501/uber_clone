import EventEmitter from "events";
const rideEventEmitter = new EventEmitter();
import { subscribeToQueue } from "../service/rabbit.js";

export const rideaceepted = (req, res) => {
  rideEventEmitter.once("rideAccepted", (data) => {
    res.status(200).json({
      message: "Ride accepted successfully",
      ride: data,
    });
  });
  setTimeout(() => {
    res.status(408).json({ message: "Request timed out" });
  }, 30000); // Set a timeout for the request
};
export const subscribe = () => {
  subscribeToQueue("rideAccepted", async (data) => {
    const rideData = await JSON.parse(data);
    rideEventEmitter.emit("rideAccepted", rideData);
  });
};
