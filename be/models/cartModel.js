/*
const pool = require("../config/db");

// Check if item exists in user's cart
const findCartItem = (user_id, product_id) => {
  return pool.query(
    "SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2",
    [user_id, product_id]
  );
};

// Insert new item into cart
const insertCartItem = (user_id, product_id, quantity) => {
  return pool.query(
    "INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)",
    [user_id, product_id, quantity]
  );
};

// Update quantity if item already in cart
const updateCartItemQuantity = (quantity, user_id, product_id) => {
  return pool.query(
    "UPDATE cart_items SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3",
    [quantity, user_id, product_id]
  );
};

// Get all cart items for a user (with product details)
const getUserCartItems = (userId) => {
  return pool.query(
    `SELECT 
        ci.id AS cart_item_id,
        ci.quantity,
        p.id AS product_id,
        p.name AS product_name,
        p.discount_price AS product_price, -- Using discount_price is correct
        p.image AS product_image
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.user_id = $1`,
    [userId]
  );
};

// Remove item from cart
const deleteCartItem = (itemId) => {
  return pool.query("DELETE FROM cart_items WHERE id = $1", [itemId]);
};

// Remove multiple items from cart based on user_id and array of product_ids
const removeItemsFromCart = async (userId, productIds) => {
  if (!Array.isArray(productIds) || productIds.length === 0) return;

  const query = `
    DELETE FROM cart_items
    WHERE user_id = $1 AND product_id = ANY($2::int[])
  `;
  return pool.query(query, [userId, productIds]);
};


module.exports = {
  findCartItem,
  insertCartItem,
  updateCartItemQuantity,
  getUserCartItems,
  deleteCartItem,
  removeItemsFromCart,
};
*/

const pool = require("../config/db");

// Check if item exists in user's cart
const findCartItem = async (user_id, product_id) => {
  const result = await pool.query("SELECT * FROM find_cart_item($1, $2)", [user_id, product_id]);
  return result;
};

// Insert new item into cart
const insertCartItem = async (user_id, product_id, quantity) => {
  await pool.query("SELECT insert_cart_item($1, $2, $3)", [user_id, product_id, quantity]);
};

// Update quantity if item already in cart
const updateCartItemQuantity = async (quantity, user_id, product_id) => {
  await pool.query("SELECT update_cart_item_quantity($1, $2, $3)", [quantity, user_id, product_id]);
};

// Get all cart items for a user (with product details)
const getUserCartItems = async (userId) => {
  const result = await pool.query("SELECT * FROM get_user_cart_items($1)", [userId]);
  return result;
};

// Remove item from cart
const deleteCartItem = async (itemId) => {
  await pool.query("SELECT delete_cart_item($1)", [itemId]);
};

// Remove multiple items from cart based on user_id and array of product_ids
const removeItemsFromCart = async (userId, productIds) => {
  if (!Array.isArray(productIds) || productIds.length === 0) return;
  await pool.query("SELECT remove_items_from_cart($1, $2)", [userId, productIds]);
};

module.exports = {
  findCartItem,
  insertCartItem,
  updateCartItemQuantity,
  getUserCartItems,
  deleteCartItem,
  removeItemsFromCart,
};