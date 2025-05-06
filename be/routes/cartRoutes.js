/*
const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/authmiddleware.js");

const {
  addToCart,
  getUserCart,
  removeFromCart,
} = require("../controllers/cartController");

// Routes for authenticated users only
router.post("/cartadd", authenticateUser, addToCart);
router.get("/cartget", authenticateUser, getUserCart);
router.delete("/cartdel/:itemId", authenticateUser, removeFromCart);

module.exports = router;
*/

const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/authmiddleware.js");

const {
  addToCart,
  getUserCart,
  removeFromCart,
} = require("../controllers/cartController");

// Routes for authenticated users only
router.post("/cartadd", authenticateUser, addToCart);
router.get("/cartget", authenticateUser, getUserCart);
router.delete("/cartdel/:itemId", authenticateUser, removeFromCart);

module.exports = router;