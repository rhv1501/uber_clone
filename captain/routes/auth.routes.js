import { Router } from "express";
const router = Router();
import {
  getUser,
  login,
  logout,
  signup,
} from "../controller/authController.js";
import jwtveify from "../middlewares/jwtverify.js";

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", jwtveify, logout);
router.get("/", jwtveify, getUser);

export default router;
