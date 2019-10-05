const dotenv = require("dotenv").config();
const express = require("express");
const server = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");

server.use(cors());

const login = require("./users/login");
const users = require("./users/users");
const message = require("./chat/chat");

server.use("/api", login, users, message);

server.listen(PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});
