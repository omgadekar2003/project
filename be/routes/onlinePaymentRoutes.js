const express = require("express");
const router = express.Router();
const {
  createRazorpayOrder,
  placeOnlineOrder,
  getRazorpayKey, // ✅ Correctly imported
} = require("../controllers/onlinePaymentController");
const authenticateUser = require("../middlewares/authmiddleware");

// Create Razorpay order
router.post("/create-order", authenticateUser, createRazorpayOrder);

// Place final order after payment
router.post("/verify-payment", authenticateUser, placeOnlineOrder);

// Get Razorpay key (public route)
router.get("/razorpay-key", getRazorpayKey);

module.exports = router;
