import mongoose from "mongoose";
const connectMongo = async () => {
  try {
    const mongoUrl = process.env.MONGO_DB || "mongodb://localhost:27017/uber";
    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected successfully");
  } catch (e) {
    throw new Error("Failed to connect to MongoDB: " + e.message);
  }
};

export default connectMongo;
