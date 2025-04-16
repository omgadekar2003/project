// const jwt = require("jsonwebtoken");

// const authenticateUser = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res
//       .status(401)
//       .json({ message: "Access denied. No token provided." });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { userId: decoded.userId };
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token." });
//   }
// };

// module.exports = authenticateUser;


const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  // Get the token from the cookies
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId }; // Attach userId to the request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authenticateUser;
