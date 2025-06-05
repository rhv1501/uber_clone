import express from "express";
import expressproxy from "express-http-proxy";
import morgan from "morgan";
const app = express();
app.use(morgan("dev"));
app.use(
  "/user",
  expressproxy("http://localhost:3001", { 
    proxyReqPathResolver: (req) => {
      console.log(
        `[PROXY] ${req.method} ${req.originalUrl} -> http://localhost:3001${req.url}`
      );
      return req.url;
    },
    userResDecorator: (proxyRes, proxyResData, req, res) => {
      console.log(
        `[PROXY-RES] ${req.method} ${req.originalUrl} - Status: ${proxyRes.statusCode}`
      );
      return proxyResData;
    },
  })
);
app.use(
  "/captain",
  expressproxy("http://localhost:3002", {
    proxyReqPathResolver: (req) => {
      console.log(
        `[PROXY] ${req.method} ${req.originalUrl} -> http://localhost:3002${req.url}`
      );
      return req.url;
    },
    userResDecorator: (proxyRes, proxyResData, req, res) => {
      console.log(
        `[PROXY-RES] ${req.method} ${req.originalUrl} - Status: ${proxyRes.statusCode}`
      );
      return proxyResData;
    },
  })
);

app.use(
  "/ride",
  expressproxy("http://localhost:3003", {
  proxyReqPathResolver: (req) => {
      console.log(
        `[PROXY] ${req.method} ${req.originalUrl} -> http://localhost:3003${req.url}`
      );
      return req.url;
    },
    userResDecorator: (proxyRes, proxyResData, req, res) => {
      console.log(
        `[PROXY-RES] ${req.method} ${req.originalUrl} - Status: ${proxyRes.statusCode}`
      );
      return proxyResData;
    },
  })
);

app.listen(3000, () => {
  console.log("Gateway service is running on port 3000");
});
