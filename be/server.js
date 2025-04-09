
// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const authRoutes = require("./routes/authRoutes");
// const profileRoutes = require("./routes/profileRoutes"); // Added profile routes

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: "http://localhost:4200",
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//     credentials: true, // Allow credentials (important for cookies)
//   })
// );



// // Define routes
// app.use("/api/auth", authRoutes);
// app.use("/api/user", profileRoutes); // Added profile routes

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Routes
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");       // ✅ Admin Login
const productRoutes = require("./routes/productRoutes");   // ✅ Product CRUD + Public View

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

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
