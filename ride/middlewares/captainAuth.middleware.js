import jwt from "jsonwebtoken";
import asyncHandler from "../utils/error helpers/asyncHandler.js";
import { error } from "../utils/error helpers/error.js";
const url = process.env.Gateway_URL || "http://localhost:3000";
const jwtveify = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw error(401, "Authentication token is required");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.captain = await getUser(token);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw error(401, "Token expired and blacklisted");
    }
    throw error(401, err.message);
  }
});
const getUser = async (captain_id) => {
  try {
    const response = await fetch("url/captain/auth", {
      headers: {
        authorization: `bearer ${captain_id}`,
      },
    });
    if (!response.ok) {
      throw error(404, "user not found");
    }
    const data = await response.json();
    return data;
  } catch (e) {
    throw error(500, "server error");
  }
};
export default jwtveify;
