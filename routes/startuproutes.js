const express = require("express");
const router = express.Router();
const { registerstartup, loginstartup } = require("../controllers/startupcontroller");

router.post("/register", registerstartup);
router.post("/login", loginstartup);

module.exports = router;