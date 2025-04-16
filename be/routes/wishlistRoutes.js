const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/authmiddleware.js");

const {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

// Routes
router.post("/wishlistadd", authenticateUser, addToWishlist);
router.get("/wishlistget", authenticateUser, getUserWishlist);
router.delete("/wishlistdel/:itemId", authenticateUser, removeFromWishlist);

module.exports = router;
