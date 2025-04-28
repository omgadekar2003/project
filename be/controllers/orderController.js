const razorpay = require("../config/razorpay");
const Order = require("../models/orderModel"); // Correctly import the Order model


const createOrder = async (req, res) => {
  const {
    product_id,
    product_name,
    product_image,
    price,
    quantity,
    total_cost,
    payment_method,
    address
  } = req.body;

  try {
    let razorpayOrder = null;

    // If Razorpay is selected, create a Razorpay order
    if (payment_method === "razorpay") {
      const options = {
        amount: total_cost * 100, // Razorpay expects amount in paise
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`
      };
      razorpayOrder = await razorpay.orders.create(options);
    }

    // Create the order in the database
    const order = await Order.createOrder({
      user_id: req.user.id, // Ensure you're passing the correct user ID
      product_id,
      product_name,
      product_image,
      price,
      quantity,
      total_cost,
      payment_method,
      address,
      razorpay_order_id: razorpayOrder?.id || null // Only pass razorpay_order_id if it's available
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
      razorpayOrder
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
};


const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id } = req.body;

  try {
    await Order.updatePayment(razorpay_order_id, razorpay_payment_id);
    res.status(200).json({ message: "Payment verified & updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.getOrdersByUserId(req.user.id);
    
    // Check if no orders exist for the user
    if (orders.length === 0) {
      return res.status(404).json({ message: "You didn't buy anything" });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get user orders" });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get all orders" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get order" });
  }
};

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const validStatus = ["pending", "paid", "done"];
  if (!validStatus.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const updated = await Order.updateOrderStatus(req.params.id, status);
    res.status(200).json({ message: "Status updated", order: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus
};