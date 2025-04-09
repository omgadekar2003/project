const express = require("express");
const router = express.Router();
const { adminLogin, adminLogout } = require("../controllers/adminController");

router.post("/login", adminLogin);
router.post("/logout", adminLogout); // <-- NEW logout route

module.exports = router;
