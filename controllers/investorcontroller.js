const db = require("../config/dbconnect");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
//investor
const registerInvestor = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phone,
    firm,
    website,
    sector,
    ticketSize,
    location,
    bio,
    password,
  } = req.body;

  const userExists = await db.query("SELECT * FROM investor WHERE email = $1", [
    email,
  ]);
  if (userExists.rows.length > 0) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await db.query(
    "INSERT INTO investor (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password]
  );
  if (user) {
    res.status(201).json({
      _id: user.rows[0].id,
      name: user.rows[0].name,
      email: user.rows[0].email,
      token: generateToken(user.rows[0].id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
