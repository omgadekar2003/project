const express = require("express");
const router = express.Router();
const { initializeCheckout, getOrderSummary, checkoutSingleProduct } = require("../controllers/checkoutController");
const authenticateUser = require("../middlewares/authmiddleware");

router.get("/init", authenticateUser, initializeCheckout);             //get data from cart
router.get("/order-summary", authenticateUser, getOrderSummary);      //order confirm page for payment or COD
router.get("/product/:id", authenticateUser, checkoutSingleProduct); //get data directly from product page 



module.exports = router;

