
  
/*
const pool = require("../config/db");
const {
  findCartItem,
  insertCartItem,
  updateCartItemQuantity,
  getUserCartItems,
  deleteCartItem,
} = require("../models/cartModel");

// Add to cart
const addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user?.userId;

  if (!user_id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  // Validation
  if (!product_id || isNaN(product_id)) {
    return res.status(400).json({ message: "Invalid or missing product_id" });
  }

  if (!quantity || isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "Invalid or missing quantity" });
  }

  try {
    // Check if product exists
    const productCheck = await pool.query("SELECT id FROM products WHERE id = $1", [product_id]);
    if (productCheck.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingItem = await findCartItem(user_id, product_id);

    if (existingItem.rows.length > 0) {
      await updateCartItemQuantity(quantity, user_id, product_id);
    } else {
      await insertCartItem(user_id, product_id, quantity);
    }

    res.status(200).json({ message: "Item added to cart successfully" });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Server error while adding to cart" });
  }
};

// Get user's cart items
const getUserCart = async (req, res) => {
  const user_id = req.user?.userId;

  if (!user_id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const result = await getUserCartItems(user_id);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ message: "Server error while fetching cart" });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    await deleteCartItem(itemId);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Error removing item:", err);
    res.status(500).json({ message: "Server error while removing item" });
  }
};

module.exports = {
  addToCart,
  getUserCart,
  removeFromCart,
};

*/


const pool = require("../config/db");
const {
  findCartItem,
  insertCartItem,
  updateCartItemQuantity,
  getUserCartItems,
  deleteCartItem,
} = require("../models/cartModel");

// Add to cart
const addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user?.userId;

  if (!user_id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  // Validation
  if (!product_id || isNaN(product_id)) {
    return res.status(400).json({ message: "Invalid or missing product_id" });
  }

  if (!quantity || isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "Invalid or missing quantity" });
  }

  try {
    // Check if product exists
    const productCheck = await pool.query("SELECT id FROM products WHERE id = $1", [product_id]);
    if (productCheck.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingItem = await findCartItem(user_id, product_id);

    if (existingItem.rows.length > 0) {
      await updateCartItemQuantity(quantity, user_id, product_id);
    } else {
      await insertCartItem(user_id, product_id, quantity);
    }

    res.status(200).json({ message: "Item added to cart successfully" });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Server error while adding to cart" });
  }
};

// Get user's cart items
const getUserCart = async (req, res) => {
  const user_id = req.user?.userId;

  if (!user_id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const result = await getUserCartItems(user_id);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ message: "Server error while fetching cart" });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const cartItem = await pool.query("SELECT * FROM cart_items WHERE id = $1", [itemId]);
    if (cartItem.rows.length === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await deleteCartItem(itemId);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Error removing item:", err);
    res.status(500).json({ message: "Server error while removing item" });
  }
};

module.exports = {
  addToCart,
  getUserCart,
  removeFromCart,
};