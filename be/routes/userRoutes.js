const express = require("express");
const router = express.Router();
const {
  getUserAddress,
  updateUserAddress,
} = require("../controllers/userController");
const authenticateUser = require("../middlewares/authmiddleware");

router.get("/address", authenticateUser, getUserAddress);
router.put("/update-address", authenticateUser, updateUserAddress);

module.exports = router;
