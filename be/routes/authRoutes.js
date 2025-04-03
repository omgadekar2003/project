const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");
const authenticateUser = require("../middlewares/authmiddleware"); 

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authenticateUser, logoutUser);

module.exports = router;
