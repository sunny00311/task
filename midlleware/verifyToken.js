const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  //  let token = req.cookies.token;

  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // console.log("token1 :>> ", token);

  if (!token) {
    res.status(401);
    throw new Error("No token found. Authorization denied.");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw new Error("User is not authorized");
    }

    req.user = decoded.user;

    next();
  });
});

module.exports = validateToken;
