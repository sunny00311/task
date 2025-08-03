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
    password,
    website,
    sector,
    ticketSize,
    location,
    bio,
  } = req.body;

  const [rows] = await db.query("SELECT * FROM investor WHERE email = ?", [
    email,
  ]);
  if (rows.length > 0) {
    res.status(400);
    throw new Error("User already exists");
  }
  const [user] = await db.query(
    `INSERT INTO investor (fullName, email, phone, firm, password, website, sector, ticketSize, location, bio)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      fullName,
      email,
      phone,
      firm,
      password,
      website,
      sector,
      ticketSize,
      location,
      bio,
    ]
  );

  if (user.affectedRows > 0) {
    res.status(201).json({ message: "User created successfully" });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
  // if (user) {
  //   res.status(201).json({
  //     _id: user.rows[0].id,
  //     name: user.rows[0].name,
  //     email: user.rows[0].email,
  //     token: generateToken(user.rows[0].id),
  //   });
  // } else {
  //   res.status(400);
  //   throw new Error("Invalid user data");
  // }
});

const logininvestor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await db.query("SELECT * FROM investor WHERE email = ?", [
    email,
  ]);
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
      secure: true,
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.redirect("/api/investor/dashboard");
  }
});

module.exports = {
  registerInvestor,
  logininvestor,
};
