import { Router } from "express";
import jwtveify from "../middlewares/jwtverify.js";
import {
  toggleavailability,
  waitforRide,
} from "../controller/captaincontroller.js";

const router = Router();

router.patch("/toggle-availability", jwtveify, toggleavailability);
router.get("/wait-for-ride", jwtveify, waitforRide);

export default router;
