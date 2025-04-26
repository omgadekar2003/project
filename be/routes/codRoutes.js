const express = require("express");
const router = express.Router();
const { placeOrder } = require("../controllers/codController");
const authenticateUser = require("../middlewares/authmiddleware");  


router.post("/cod", authenticateUser, placeOrder);

module.exports = router;
