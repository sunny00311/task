const express = require("express");
const db = require("../config/dbconnect");
const { logout } = require("../controllers/uiController");
const validateToken = require("../midlleware/verifyToken");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { log } = require("async");

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get(
  "/dashboard",
  validateToken,
  asyncHandler(async (req, res) => {
    // const userId = req.user.id; // Using id from req.user

    try {
      const [results] = await db.query("SELECT * FROM startup_post");

      res.render("dashboard", {
        user: req.user,

        startup_post: results,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }
  })
);

router.get("/createstartup_post", validateToken, (req, res) => {
  res.render("createstartup_post", { user_id: req.user_id });
});
router.get("/uploadstartup_post", (req, res) => {
  console.log("working import");
  res.render("uploadstartup_post", { user_id: req.user_id });
});

// startup ui
router.get("/forstartups", (req, res) => {
  res.render("startups/startupform");
});
router.get("/investorform", (req, res) => {
  res.render("investor/investorform");
});

router.get("/logout", logout);

module.exports = router;
