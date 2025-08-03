const express = require("express");
const db = require("../config/dbconnect");
const validateToken = require("../midlleware/verifyToken");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { log } = require("async");

const {
  registerInvestor,
  logininvestor,
} = require("../controllers/investorcontroller");

router
  .route("/register")
  .post(registerInvestor)
  .get((req, res) => {
    res.render("investor/investorform");
  });
router
  .route("/login")
  .post(logininvestor)
  .get((req, res) => {
    res.render("investor/login");
  });

router.get(
  "/dashboard",
  validateToken,
  asyncHandler(async (req, res) => {
    const startup = await db.query("SELECT * FROM startup");

    res.render("investor/dashboard", {
      user: {
        fullName: "Sunny Sahani",
        sector: "HealthTech",
        founder: "Priya Shah",
        phone: "+91-9876543210",
        firm: "InnovateX Capital",
        ticketSize: "₹10L - ₹1Cr",

        email: `${req.user.email}`, // no need for template literal
        location: "Bangalore",
        fundingRequired: 50000000,
        website: "https://innovatex.in",
        bio: "InnovateX is building AI-powered diagnostic tools to improve rural healthcare accessibility.",
      },
      startups: startup[0], // second property in the same object
    });
  })
);

module.exports = router;
