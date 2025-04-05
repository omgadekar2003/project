// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const authRoutes = require("./routes/authRoutes");
// // const app = express();
// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cookieParser());

// // app.options("/*", function (req, res, next) {
// //   res.header("Access-Control-Allow-Origin", "*");
// //   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
// //   res.header(
// //     "Access-Control-Allow-Headers",
// //     "Content-Type, Authorization, Content-Length, X-Requested-With"
// //   );
// //   res.sendStatus(200);
// // });

// app.use(
//   cors({
//     origin: "http://localhost:4200",
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );

// app.use("/api/auth", authRoutes);
// app.use(cors());

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes"); // Added profile routes

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // Allow credentials (important for cookies)
  })
);



// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/user", profileRoutes); // Added profile routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
