const db = require("../config/dbconnect");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const registerstartup = asyncHandler(async (req, res) => {
  const {
    startupName,
    tagline,
    founderName,
    email,
    phone,
    location,
    website,
    stage,
    industry,
    teamSize,
    problem,
    solution,
    valueProp,
    market,
    revenueModel,
    traction,
    techStack,
    funding,
    fundUsage,
    prevFunding,
    socialLinks,
    password,
  } = req.body;
  console.log("startupName :>> ", startupName);
  const [rows] = await db.query("SELECT * FROM startup WHERE email = ?", [
    email,
  ]);
  if (rows.length > 0) {
    res.status(400);
    throw new Error("User already exists");
  }
  const [result] = await db.query(
    "INSERT INTO startup (startupName, tagline, founderName, email, phone, location, website, stage, industry, teamSize, problem, solution, valueProp, market, revenueModel, traction, techStack, funding, fundUsage, prevFunding, socialLinks, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      startupName,
      tagline,
      founderName,
      email,
      phone,
      location,
      website,
      stage,
      industry,
      teamSize,
      problem,
      solution,
      valueProp,
      market,
      revenueModel,
      traction,
      techStack,
      funding,
      fundUsage,
      prevFunding,
      socialLinks,
      password,
    ]
  );

  if (result.affectedRows > 0) {
    res.redirect("/api/startup/login?registered=1");
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});

const loginstartup = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await db.query("SELECT * FROM startup WHERE email = ?", [email]);
  // console.log("user", user[0][0].password);

  console.log("user :>> ", user);
  if (user.length > 0 && password === user[0][0].password) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user[0][0].name,
          email: user[0][0].email,
          id: user[0][0].id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "4h" }
    );

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: true, // Use true in production with HTTPS
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.redirect("/api/startup/dashboard");
  }
});

module.exports = {
  registerstartup,
  loginstartup,
};
