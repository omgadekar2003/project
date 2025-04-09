const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findAdminByEmail } = require("../models/adminModel");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await findAdminByEmail(email);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 86400000, // 1 day
    });

    res.json({ message: "Admin logged in successfully" ,token});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Admin Logout
const adminLogout = (req, res) => {
  res.clearCookie("adminToken");
  res.json({ message: "Admin logged out successfully" });
};

module.exports = { adminLogin, adminLogout };
