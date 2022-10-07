const express = require("express");

const authRoute = express.Router();
const authController = require("../../controller/authController");

authRoute.post("/login", authController.signIn);
authRoute.post("/signup", authController.signUp);

module.exports = authRoute;
