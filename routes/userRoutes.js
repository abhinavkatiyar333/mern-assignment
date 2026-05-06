const express = require("express");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Protected Route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected Profile Data",
    user: req.user,
  });
});

module.exports = router;