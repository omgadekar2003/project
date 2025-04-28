const express = require('express');
const router = express.Router();

const { getMyOrders, getAllOrders } = require('../controllers/orderController');
const authenticateUser = require('../middlewares/authmiddleware');
const verifyAdmin = require('../middlewares/adminAuth');

// User route - Get only their orders
router.get('/myorders', authenticateUser, getMyOrders);

// Admin route - Get all orders
router.get('/admin/orders', verifyAdmin, getAllOrders);

module.exports = router;
