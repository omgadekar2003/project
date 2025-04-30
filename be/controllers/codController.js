const codModel = require("../models/codModel");
const cartModel = require("../models/cartModel");


const placeOrder = async (req, res) => {
  try {
    const { products, address } = req.body;
    const userId = req.user.userId;   // from auth middleware

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products found in order." });
    }

    const product = products[0]; // taking first product for now

    const orderData = {
      user_id: userId,
      product_id: product.product_id,
      product_name: product.name,
      product_image: product.image,
      price: parseFloat(product.price),
      quantity: product.quantity,
      total_cost: product.total,
      payment_method: "cod",
      address: address,
      status: "pending",
      razorpay_order_id: null,
      razorpay_payment_id: null,
    };

    const newOrder = await codModel.insertOrder(orderData);

    
    // 🔁 REMOVE PURCHASED PRODUCT FROM CART
    await cartModel.removeItemsFromCart(userId, [product.product_id]);

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};

module.exports = { placeOrder };
