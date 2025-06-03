import jwt from "jsonwebtoken";
import asyncHandler from "../utils/error helpers/asyncHandler.js";
import { error } from "../utils/error helpers/error.js";
import { blacklistedModel } from "../models/blacklisted.model.js";
const jwtveify = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw error(401, "Authentication token is required");
  }
  const blacklistedToken = await blacklistedModel.findOne({ token });
  if (blacklistedToken) {
    throw error(401, "user logged out, login again");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      await new blacklistedModel({ token }).save();
      throw error(401, "Token expired and blacklisted");
    }
    throw error(401, "Invalid or expired token");
  }
});
export default jwtveify;
