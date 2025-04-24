const express = require("express");
const router = express.Router();
const {
  getUserAddress,
  updateUserAddress,
  getAllUsersController
} = require("../controllers/userController");
const authenticateUser = require("../middlewares/authmiddleware");
const adminAuth = require("../middlewares/adminAuth");

router.get("/address", authenticateUser, getUserAddress);  // address for checkout 
router.put("/update-address", authenticateUser, updateUserAddress); // update address on checkout
router.get('/admin/users', adminAuth, getAllUsersController); //admin users call 

module.exports = router;
