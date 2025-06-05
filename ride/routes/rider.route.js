import { Router } from "express";
import { acceptRide, createRide } from "../controllers/riderController.js";
import userverify from "../middlewares/userAuth.middlewares.js";
import captainverify from "../middlewares/captainAuth.middleware.js";
const router = Router();

router.post("/create-ride", userverify, createRide);
router.post("/accept-ride", captainverify, acceptRide);

export default router;
