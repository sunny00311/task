const db = require("../config/dbconnect");
const asyncHandler = require("express-async-handler");

const getstartup_posts = asyncHandler(async (req, res) => {
  const [rows] = await db.query("SELECT * FROM post");
  res.render("home");
  res.status(200).json(rows);
});

// @route POST /api/startup_posts
const createstartup_post = asyncHandler(async (req, res) => {
  const { name, email, phone, mode } = req.body;
  const isWeb = mode === "web";
  // Check if any field is missing
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields (name, email, phone) are required");
  }
  // const user_id = 12;

  const user_id = req.user.id;
  // Insert data into MySQL
  const [result] = await db.query(
    "INSERT INTO post (name, email, phone,user_id) VALUES (?, ?, ?,?)",
    [name, email, phone, user_id]
  );

  // Return created startup_post with its insertId
  if (isWeb) {
    return res.redirect("/dashboard");
  } else {
    return res.status(200).json({
      id: result.insertId,
      name,
      email,
      phone,
      message: "startup_post created successfully",
    });
  }
});

const getstartup_post = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query("SELECT * FROM post WHERE id = ?", [id]);

  if (rows.length === 0) {
    res.status(404);
    throw new Error("startup_post not found");
  }

  res.status(200).json(rows[0]);
});

// @desc Update startup_post
// @route PUT /api/startup_posts/:id
const updatestartup_post = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log("req.params :>> ", req.params);
  const { name, email, phone, mode } = req.body;
  const isWeb = mode === "web";
  // const id = req.user.id;
  // Check if startup_post exists
  const [existing] = await db.query("SELECT * FROM post WHERE id = ?", [id]);
  if (existing.length === 0) {
    res.status(404);
    throw new Error("startup_post not found");
  }

  // Update startup_post
  const [result] = await db.query(
    "UPDATE post SET name = ?, email = ?, phone = ? WHERE id = ?",
    [name, email, phone, id]
  );
  if (isWeb) {
    return res.redirect("/dashboard");
  } else {
    return res
      .status(200)
      .json({ message: "startup_post updated successfully" });
  }
});

const deletestartup_post = asyncHandler(async (req, res) => {
  const mode = req.body;
  const isWeb = mode === "web";
  const { id } = req.params;
  console.log("req.params :>> ", req.params);
  // Check if startup_post exists
  const [existing] = await db.query("SELECT * FROM post WHERE id = ?", [id]);
  if (existing.length === 0) {
    res.status(404);
    throw new Error("startup_post not found");
  }

  // Delete startup_post
  await db.query("DELETE FROM post WHERE id = ?", [id]);
  if (isWeb) {
    return res.redirect("/dashboard");
  } else {
    return res
      .status(200)
      .json({ message: "startup_post deleted successfully" });
  }
});

const exportstartup_posts = asyncHandler(async (req, res) => {
  const [rows] = await db.query("SELECT * FROM post");
  res.render("export", { startup_posts: rows });
});
module.exports = {
  getstartup_posts,
  createstartup_post,
  getstartup_post,
  updatestartup_post,
  deletestartup_post,
};
