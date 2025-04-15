// const cartModel = require("../models/cartModel");

// // Add to Cart
// exports.addToCart = async (req, res) => {
//   const user_id = req.user.userId; // From JWT
//   const { product_id, quantity } = req.body;

//   try {
//     const existingItem = await cartModel.findCartItem(user_id, product_id);

//     if (existingItem.rows.length > 0) {
//       await cartModel.updateCartItemQuantity(quantity, user_id, product_id);
//       return res.status(200).json({ message: "Cart updated" });
//     } else {
//       await cartModel.insertCartItem(user_id, product_id, quantity);
//       return res.status(201).json({ message: "Added to cart" });
//     }
//   } catch (error) {
//     console.error("Error adding to cart:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get User Cart
// exports.getUserCart = async (req, res) => {
//   const user_id = req.user.userId;

//   try {
//     const result = await cartModel.getCartItems(user_id);
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error("Error fetching cart:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Remove Cart Item
// exports.removeFromCart = async (req, res) => {
//   const user_id = req.user.userId;
//   const { itemId } = req.params;

//   try {
//     // (Optional) You can check if item belongs to this user first
//     await cartModel.deleteCartItem(itemId);
//     res.status(200).json({ message: "Item removed from cart" });
//   } catch (error) {
//     console.error("Error deleting item:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

