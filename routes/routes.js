const express = require("express");
const router = express.Router();
const validateToken = require("../midlleware/verifyToken");
const {
  createstartup_post,
  getstartup_post,
  updatestartup_post,
  deletestartup_post,
} = require("../controllers/startup_postController");
router.use(validateToken);
router.route("/").get(getstartup_post).post(createstartup_post);
router
  .route("/:id")
  .get(getstartup_post)
  .put(updatestartup_post)
  .delete(deletestartup_post);

// router.route("/search/:name");
module.exports = router;
