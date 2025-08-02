const db = require("../config/dbconnect");
const asyncHandler = require("express-async-handler");

const getdashboard = asyncHandler(async (req, res) => {
  const userId = req.user.id; // using id from req.user

  try {
    const [results] = await db.query("SELECT * FROM startup_post");
    res.render("dashboard", { user: req.user, startup_post: results });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.redirect("/login"); // redirect to login page
});

module.exports = { logout };
