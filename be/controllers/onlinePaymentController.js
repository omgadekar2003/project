const Razorpay = require("razorpay");
const onlinePaymentModel = require("../models/onlinePaymentModel");
const cartModel = require("../models/cartModel");


// Create Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. Create Razorpay Order
const createRazorpayOrder = async (req, res) => {
  try {
    const { products } = req.body;
    const product = products[0];
    const amount = product.total * 100; // convert to paise

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};

// 2. Place Order after Payment success
const placeOnlineOrder = async (req, res) => {
  try {
    const { products, address, razorpay_order_id, razorpay_payment_id } =
      req.body;
    const userId = req.user.userId;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products found in order." });
    }

    const product = products[0];

    const orderData = {
      user_id: userId,
      product_id: product.product_id,
      product_name: product.name,
      product_image: product.image,
      price: parseFloat(product.price),
      quantity: product.quantity,
      total_cost: product.total,
      payment_method: "online",
      address: address,
      status: "paid",
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
    };

    const newOrder = await onlinePaymentModel.insertOnlineOrder(orderData);

    
    // 🔁 REMOVE PURCHASED PRODUCT FROM CART
    await cartModel.removeItemsFromCart(userId, [product.product_id]);

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to place order", error: error.message });
  }
};

const getRazorpayKey = (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
};

module.exports = { createRazorpayOrder, placeOnlineOrder, getRazorpayKey };
