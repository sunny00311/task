const db = require("../config/dbconnect");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

  const [rows] = await db.promise().query("SELECT * FROM investor WHERE email = ?", [email]);
  if (rows.length > 0) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.promise().query(
    "INSERT INTO investor (name, email, phone, firm, website, sector, ticketSize, location, bio, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [fullName, email, phone, firm, website, sector, ticketSize, location, bio, hashedPassword]
  );

  if (result.affectedRows > 0) {
    res.status(201).json({ message: "Investor registered successfully" });
  } else {
    res.status(400);
    throw new Error("Registration failed");
  }
});

const loginInvestor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.promise().query("SELECT * FROM investor WHERE email = ?", [email]);
  if (rows.length === 0) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const user = rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30d" });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

module.exports = {
  registerInvestor,
  loginInvestor,
};