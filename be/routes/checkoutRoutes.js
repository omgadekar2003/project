const express = require("express");
const router = express.Router();
const { initializeCheckout, getOrderSummary, checkoutSingleProduct } = require("../controllers/checkoutController");
const authenticateUser = require("../middlewares/authmiddleware");

router.get("/init", authenticateUser, initializeCheckout);
router.post("/order-summary", authenticateUser, getOrderSummary);
router.get("/product/:id", authenticateUser, checkoutSingleProduct); // ✅ Add this at the end



module.exports = router;

