const Order = require('../models/orderModel');

// Controller for user to get their own orders
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.getOrdersByUserId(userId);

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    res.status(200).json({ orders });
  } catch (err) {
    console.error('Error fetching user orders:', err.message);
    res.status(500).json({ message: "Server error while fetching orders." });
  }
};

// Controller for admin to get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();

    res.status(200).json({ orders });
  } catch (err) {
    console.error('Error fetching all orders:', err.message);
    res.status(500).json({ message: "Server error while fetching all orders." });
  }
};

module.exports = {
  getMyOrders,
  getAllOrders
};
