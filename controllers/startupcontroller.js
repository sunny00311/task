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
  } = req.body;

  const [rows] = await db
    .promise()
    .query("SELECT * FROM investor WHERE email = ?", [email]);
  if (rows.length > 0) {
    res.status(400);
    throw new Error("User already exists");
  }
  const [result] = await db
    .promise()
    .query(
      "INSERT INTO investor (email, phone, firm, website, sector, ticketSize, location, bio, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [email, phone, firm, website, sector, ticketSize, location, bio, password]
    );
  if (result.affectedRows > 0) {
    res.status(201).json({ message: "User created successfully" });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});

module.exports = {
  registerstartup,
};
