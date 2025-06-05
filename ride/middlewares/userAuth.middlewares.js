import jwt from "jsonwebtoken";
import asyncHandler from "../utils/error helpers/asyncHandler.js";
import { error } from "../utils/error helpers/error.js";
const jwtveify = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw error(401, "Authentication token is required");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await getUser(token);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw error(401, "Token expired and blacklisted");
    }
    throw error(401, err.message);
  }
});
const getUser = async (user_id) => {
  try {
    const response = await fetch("http://localhost:3000/user/auth", {
      headers: {
        authorization: `bearer ${user_id}`,
      },
    });
    if (!response.ok) {
      error(404, "user not found");
    }
    const data = await response.json();
    return data;
  } catch (e) {
    error(500, "server error");
    return;
  }
};
export default jwtveify;
