const express = require("express");
const router = express.Router();
const { createRazorpayOrder, placeOnlineOrder } = require("../controllers/onlinePaymentController");
const authenticateUser = require("../middlewares/authmiddleware");

// Create Razorpay order
router.post("/create-order", authenticateUser, createRazorpayOrder);

// Place final order after payment
router.post("/verify-payment", authenticateUser, placeOnlineOrder);

module.exports = router;
