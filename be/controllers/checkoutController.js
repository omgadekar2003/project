const pool = require("../config/db");
const { getUserAddressById } = require("../models/userModel");

// GET /api/checkout/init
const initializeCheckout = async (req, res) => {
  try {
    const userId = req.user.userId; 

    const cartResult = await pool.query(
      "SELECT c.product_id, c.quantity, p.name, p.image, p.discount_price::numeric AS price FROM cart_items c JOIN products p ON c.product_id = p.id WHERE c.user_id = $1",
      [userId]
    );

    const address = await getUserAddressById(userId);

    const deliveryCharge = 50;
    const items = cartResult.rows.map(item => ({
      ...item,
      total: item.price * item.quantity,
      delivery: deliveryCharge
    }));

    const orderTotal = items.reduce((acc, curr) => acc + curr.total + curr.delivery, 0);

    res.status(200).json({
      address,
      items,
      orderTotal,
      arrivalDate: getArrivalDate(),
    });
  } catch (error) {
    console.error("Checkout init error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Helper to calculate 1 week later date
const getArrivalDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString().split("T")[0];
};


//order summary for payment page and order confirmed page:
const getOrderSummary = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { cartItems, address } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart items are required" });
    }

    // If address is updated, use it. Else fetch old one.
    let finalAddress = address;
    if (!address) {
      const user = await getUserById(userId);
      finalAddress = user?.address || "No address found";
    }

    let total = 0;
    const detailedItems = cartItems.map((item) => {
      const itemTotal = item.price * item.quantity + (item.deliveryCharge || 0);
      total += itemTotal;
      return {
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        items: item.quantity,
        deliveryCharge: item.deliveryCharge || 0,
        total: itemTotal
      };
    });

    const arrivalDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    return res.status(200).json({
      address: finalAddress,
      products: detailedItems,
      orderTotal: total,
      arrivalDate,
    });

  } catch (error) {
    console.error("Order summary error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


const checkoutSingleProduct = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.id;

    const result = await pool.query(
      "SELECT id AS product_id, name, image, discount_price AS price FROM products WHERE id = $1",
      [productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = result.rows[0];
    const quantity = 1;
    const delivery = 50;
    const total = product.price * quantity + delivery;

    const address = await getUserAddressById(userId);

    res.status(200).json({
      address,
      items: [{
        ...product,
        quantity,
        delivery,
        total
      }],
      orderTotal: total,
      arrivalDate: getArrivalDate(),
    });

  } catch (error) {
    console.error("Checkout single product error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};




module.exports = {
  initializeCheckout,
  getArrivalDate,
  getOrderSummary,
  checkoutSingleProduct
};
