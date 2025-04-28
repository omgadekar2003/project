// const express = require("express");
// const router = express.Router();
// const {
//   createOrder,
//   verifyPayment,
//   getMyOrders,
//   getAllOrders,
//   getOrderById,
//   updateOrderStatus
// } = require("../controllers/orderController");

// const { userAuth } = require("../middlewares/authmiddleware"); // your user auth
// const { adminAuth } = require("../middlewares/adminAuth"); // your admin auth

// // ✅ User routes
// router.post("/create", authmiddleware, createOrder); // Creates Razorpay order
// router.post("/verify", authmiddleware, verifyPayment); // Stores payment after success
// router.get("/my-orders", authmiddleware, getMyOrders); // User sees their own orders

// // ✅ Admin routes
// router.get("/admin/all", adminAuth, getAllOrders); // Admin sees all orders
// router.get("/admin/:id", adminAuth, getOrderById); // Admin sees specific order
// router.put("/admin/:id/status", adminAuth, updateOrderStatus); // Admin updates status

// module.exports = router;


// src/routes/orderRoutes.js

const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus
} = require("../controllers/orderController");

const authmiddleware = require("../middlewares/authmiddleware");  // <-- Correct import
const adminAuth = require("../middlewares/adminAuth"); // admin authorization middleware


// ✅ User routes
router.post("/create", authmiddleware, createOrder); // Creates Razorpay order
router.post("/verify", authmiddleware, verifyPayment); // Stores payment after success
router.get("/my-orders", authmiddleware, getMyOrders); // User sees their own orders

// ✅ Admin routes
router.get("/admin/all", adminAuth, getAllOrders); // Admin sees all orders
router.get("/admin/:id", adminAuth, getOrderById); // Admin sees specific order
router.put("/admin/:id/status", adminAuth, updateOrderStatus); // Admin updates status

module.exports = router;


