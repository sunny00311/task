const express = require("express");
const db = require("../config/dbconnect");
const validateToken = require("../midlleware/verifyToken");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { log } = require("async");

const {
  registerstartup,
  loginstartup,
} = require("../controllers/startupcontroller");

router
  .route("/register")
  .post(registerstartup)
  .get((req, res) => {
    res.render("startups/startupform");
  });
router
  .route("/login")
  .post(loginstartup)
  .get((req, res) => {
    res.render("startups/login");
  });

router.get("/dashboard", validateToken, (req, res) => {
  res.render("startups/dashboard", {
    startup: {
      name: "InnovateX",
      sector: "HealthTech",
      founder: "Priya Shah",
      email: `${req.user.email}`,
      location: "Bangalore",
      fundingRequired: 50000000,
      website: "https://innovatex.in",
      description:
        "InnovateX is building AI-powered diagnostic tools to improve rural healthcare accessibility.",
    },
  });
});

module.exports = router;
