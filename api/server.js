const express = require("express");
const helmet = require("helmet");
const cors = require("cors");


const authRouter = require("../auth/auth-router");
const posts = require("../posts/post-router");
const authenticate = require("../auth/auth-middleware");
const users = require("../users/users-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/posts", authenticate, posts);
server.use("/api/users", authenticate, users);

server.get("/", (req, res) => {
  res.send(`<h1>Post Here, the subreddit Predictor</h1>`);
});

module.exports = server;
