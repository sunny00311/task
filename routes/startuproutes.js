const express = require("express");
const db = require("../config/dbconnect");
const validateToken = require("../midlleware/verifyToken");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { log } = require("async");

const { registerstartup } = require("../controllers/startupcontroller");

// router.post("/register", registerUser);

// // router.post("/register", registerUser);

// router.post("/login", loginUser);

// router.get("/current", validateToken, currentUser);

module.exports = router;
// console.log("router :>> ", router);
