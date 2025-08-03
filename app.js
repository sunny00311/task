const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const startup_postRoutes = require("./routes/routes");
const userRoutes = require("./routes/userRoutes");
const uiRoutes = require("./routes/uiRoutes");
const startuproutes = require("./routes/startuproutes");
const investorroutes = require("./routes/investorroutes");
// const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

const path = require("path");

const errorHandler = require("./midlleware/errorHandler");
const db = require("./config/dbconnect.js");
// Middleware to parse incoming JSON data
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));
// app.use(expressLayouts);
// app.set("layout", "layout");
app.use(express.json());
app.use("/api/startup_post", startup_postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/startup", startuproutes);
app.use("/api/investor", investorroutes);
app.use("/", uiRoutes);
// Home page
// app.get("/userlogin", (req, res) => {
//   res.render("partials/loginpage");
// });

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
