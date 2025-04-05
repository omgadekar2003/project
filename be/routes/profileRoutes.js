const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/profileController");
const authenticateUser = require("../middlewares/authmiddleware");

const router = express.Router();

// Get user profile
router.get("/profile", authenticateUser, getUserProfile);

// Update user profile
router.put("/profile/update", authenticateUser, updateUserProfile);

module.exports = router;
