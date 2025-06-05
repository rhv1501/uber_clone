import { Router } from "express";
import jwtveify from "../middlewares/jwtverify.js";
import { toggleavailability } from "../controller/captaincontroller.js";

const router = Router();

router.patch("/toggle-availability", jwtveify, toggleavailability);

export default router;
