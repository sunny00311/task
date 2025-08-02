const express = require("express");
const router = express.Router();
const { registerInvestor, loginInvestor } = require("../controllers/investorController");

router.post("/register", registerInvestor);
router.post("/login", loginInvestor);

module.exports = router;