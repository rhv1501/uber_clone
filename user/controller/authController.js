import { blacklistedModel } from "../models/blacklisted.model.js";
import { userModal } from "../models/user.model.js";
import asyncHandler from "../utils/error helpers/asyncHandler.js";
import { error } from "../utils/error helpers/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signup = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    throw error(400, "All fields are required");
  }
  const existingUser = await userModal.findOne({ email });
  if (existingUser) {
    throw error(400, "User already exists with this email");
  }
  const hash = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, hash);
  const User = await new userModal({
    name,
    email,
    password: hashedPassword,
  });
  const saved = await User.save();
  const token = jwt.sign({ id: saved._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || false,
    sameSite: "strict",
  });
  res.status(201).json({
    message: "User signedup successfully",
    user: {
      id: saved._id,
      name: saved.name,
      email: saved.email,
    },
  });
});
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw error(400, "Email and password are required");
  }
  const user = await userModal.findOne({ email });
  if (!user) {
    throw error(400, "Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw error(400, "Invalid email or password");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || false,
    sameSite: "strict",
  });
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  const blacklistedtoken = await new blacklistedModel({
    token: req.cookies.token,
  });
  await blacklistedtoken.save();
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || false,
    sameSite: "strict",
  });
  res.status(200).json({
    message: "User logged out successfully",
  });
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await userModal
    .findById(req.user)
    .select("-password")
    .select("-__v")
    .select("-createdAt")
    .select("-updatedAt");
  if (!user) {
    throw error(404, "User not found");
  }
  res.status(200).json({
    message: "User retrieved successfully",
    user,
  });
});
