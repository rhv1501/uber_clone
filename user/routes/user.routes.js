import { Router } from "express";
import { rideaceepted } from "../controller/usercontroller.js";
import jwtveify from "../middlewares/jwtverify.js";
const router = Router();
router.get("/accepted-ride", jwtveify, rideaceepted);
export default router;
