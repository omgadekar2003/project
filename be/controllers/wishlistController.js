const pool = require("../config/db");
const {
  findWishlistItem,
  insertWishlistItem,
  updateWishlistItemQuantity,
  getUserWishlistItems,
  deleteWishlistItem,
} = require("../models/wishlistModel");

// Add to wishlist
const addToWishlist = async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user?.userId;

  if (!user_id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  if (!product_id || isNaN(product_id)) {
    return res.status(400).json({ message: "Invalid or missing product_id" });
  }

  if (!quantity || isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "Invalid or missing quantity" });
  }

  try {
    const productCheck = await pool.query("SELECT id FROM products WHERE id = $1", [product_id]);
    if (productCheck.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingItem = await findWishlistItem(user_id, product_id);

    if (existingItem.rows.length > 0) {
      await updateWishlistItemQuantity(quantity, user_id, product_id);
    } else {
      await insertWishlistItem(user_id, product_id, quantity);
    }

    res.status(200).json({ message: "Item added to wishlist successfully" });
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ message: "Server error while adding to wishlist" });
  }
};

// Get user's wishlist
const getUserWishlist = async (req, res) => {
  const user_id = req.user?.userId;

  if (!user_id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const result = await getUserWishlistItems(user_id);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching wishlist items:", err);
    res.status(500).json({ message: "Server error while fetching wishlist" });
  }
};

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    await deleteWishlistItem(itemId);
    res.status(200).json({ message: "Item removed from wishlist" });
  } catch (err) {
    console.error("Error removing item:", err);
    res.status(500).json({ message: "Server error while removing item" });
  }
};

module.exports = {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
};
