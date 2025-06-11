import http from "http";
import { app } from "./app.js";
import connectMongo from "./utils/db/connectMongo.js";
import { connect } from "./service/rabbit.js";
import { subscribe } from "./controller/usercontroller.js";
const server = http.createServer(app);

server.listen(3001, () => {
  console.log("user service is running on port 3001");
  connectMongo();
  connect();
  subscribe();
});
