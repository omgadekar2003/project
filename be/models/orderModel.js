const pool = require('../config/db');

// Get orders by User ID (for normal users)
const getOrdersByUserId = async (userId) => {
  const query = `
    SELECT product_id, product_name, product_image, price, quantity, total_cost, payment_method, address, status
    FROM orders
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

// Get all orders (for admin)
const getAllOrders = async () => {
  const query = `
    SELECT id, user_id, product_id, product_name, product_image, price, quantity, total_cost, payment_method, address, status, razorpay_order_id, razorpay_payment_id, created_at, updated_at
    FROM orders
    ORDER BY created_at DESC
  `;
  const result = await pool.query(query);
  return result.rows;
};

module.exports = {
  getOrdersByUserId,
  getAllOrders
};
