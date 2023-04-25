const express = require("express");
const validateToken = require("../middleware/validateTokenhandler")
const { registerUser, loginUser, currentUser } = require("../Controller/userController");

const route = express.Router();

route.post("/register", registerUser)

route.post("/login", loginUser)

route.get("/current", validateToken, currentUser)

module.exports = route;