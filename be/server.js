const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Routes
const authRoutes = require("./routes/authRoutes");    //user login
const profileRoutes = require("./routes/profileRoutes");  // user profile.
const adminRoutes = require("./routes/adminRoutes");       // ✅ Admin Login
const productRoutes = require("./routes/productRoutes");   // ✅ Product CRUD + Public View
const cartRoutes = require("./routes/cartRoutes"); // 🛒 Cart route
const wishlistRoutes = require("./routes/wishlistRoutes"); // 💖 Wishlist route
const userRoutes = require("./routes/userRoutes");    // during checkout and pay user can update Address & admin user calls
const checkoutRoutes = require("./routes/checkoutRoutes"); // ⬅️ Checkout for Payment
const orderRoutes = require('./routes/orderRoutes');  // User / Admin can view orders respect to them !
const codRoutes = require("./routes/codRoutes");    // for cash on delivery post data.
const onlinePaymentRoutes = require("./routes/onlinePaymentRoutes"); // RAZORPAY for Payments.


dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // Allow cookies
  })
);

// Route Handlers
app.use("/api/auth", authRoutes);           // User register/login
app.use("/api/user", profileRoutes);        // User profile + update
app.use("/api/admin", adminRoutes);         // Admin login
app.use("/api/products", productRoutes);    // Product CRUD + View
app.use("/api/cart", cartRoutes);           // product to cart + CRUD
app.use("/api/wishlist", wishlistRoutes);   // product add to wishlist + CRUD
app.use("/api/users", userRoutes);          // Update or Address before payment
app.use("/api/checkout", checkoutRoutes);   // ⬅️ store Tem Session Info for Next Page
app.use('/api/users', userRoutes);          // for getting all users on admin side 
app.use('/api/orders', orderRoutes);        // for getting orders details.
app.use("/api/pay", codRoutes);             // codroutes 
app.use("/api/onlinepay", onlinePaymentRoutes); // RAZORPAY Payments.

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
