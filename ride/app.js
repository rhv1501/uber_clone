import express from "express";
import cookieParser from "cookie-parser";
import riderRoutes from "./routes/rider.route.js";
import errormiddleware from "./middlewares/errormiddleware.js"
import morgan from "morgan";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import connectMongo from "./utils/db/connectMongo.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", riderRoutes);

app.use(errormiddleware);
app.listen(3003, () => {
  connectMongo();
  console.log("ride service is running on port 3003");
});
