const pool = require("../config/db");

// Check if item exists in user's wishlist
const findWishlistItem = (user_id, product_id) => {
  return pool.query(
    "SELECT * FROM wishlist_items WHERE user_id = $1 AND product_id = $2",
    [user_id, product_id]
  );
};

// Insert new item into wishlist
const insertWishlistItem = (user_id, product_id, quantity) => {
  return pool.query(
    "INSERT INTO wishlist_items (user_id, product_id, quantity) VALUES ($1, $2, $3)",
    [user_id, product_id, quantity]
  );
};

// Update quantity if item already in wishlist (optional)
const updateWishlistItemQuantity = (quantity, user_id, product_id) => {
  return pool.query(
    "UPDATE wishlist_items SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3",
    [quantity, user_id, product_id]
  );
};

// Get all wishlist items for a user (with product details)
// const getUserWishlistItems = (userId) => {
//   return pool.query(
//     `SELECT 
//         wi.id AS wishlist_item_id,
//         wi.quantity,
//         p.id AS product_id,
//         p.name AS product_name,
//         p.discount_price AS product_price,
//         p.image AS product_image
//      FROM wishlist_items wi
//      JOIN products p ON wi.product_id = p.id
//      WHERE wi.user_id = $1`,
//     [userId]
//   );
// };

// Get all wishlist items for a user (with product details)
const getUserWishlistItems = (userId) => {
  return pool.query(
    `
    SELECT wi.id as wishlist_item_id, wi.quantity, p.* 
    FROM wishlist_items wi
    JOIN products p ON wi.product_id = p.id
    WHERE wi.user_id = $1
  `,
    [userId]
  );
};

// Remove item from wishlist
const deleteWishlistItem = (itemId) => {
  return pool.query("DELETE FROM wishlist_items WHERE id = $1", [itemId]);
};

module.exports = {
  findWishlistItem,
  insertWishlistItem,
  updateWishlistItemQuantity,
  getUserWishlistItems,
  deleteWishlistItem,
};
