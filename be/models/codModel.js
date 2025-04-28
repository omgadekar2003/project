const pool = require("../config/db");

const insertOrder = async (orderData) => {
  const {
    user_id,
    product_id,
    product_name,
    product_image,
    price,
    quantity,
    total_cost,
    payment_method,
    address,
    status,
    razorpay_order_id,
    razorpay_payment_id
  } = orderData;

  const query = `
    INSERT INTO orders (
      user_id,
      product_id,
      product_name,
      product_image,
      price,
      quantity,
      total_cost,
      payment_method,
      address,
      status,
      razorpay_order_id,
      razorpay_payment_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *;
  `;

  const values = [
    user_id,
    product_id,
    product_name,
    product_image,
    price,
    quantity,
    total_cost,
    payment_method,
    address,
    status,
    razorpay_order_id,
    razorpay_payment_id
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = { insertOrder };
