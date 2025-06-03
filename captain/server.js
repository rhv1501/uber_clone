import http from "http";
import { app } from "./app.js";
import connectMongo from "./utils/db/connectMongo.js";
const server = http.createServer(app);

server.listen(3002, () => {
  console.log("captain service is running on port 3002");
  connectMongo();
});
