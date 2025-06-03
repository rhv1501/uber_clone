import { Schema, model } from "mongoose";
const blacklistedSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
export const blacklistedModel = model(
  "BlacklistedUserTokens",
  blacklistedSchema
);
