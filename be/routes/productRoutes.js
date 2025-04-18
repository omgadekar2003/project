const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  editProduct,
  removeProduct,
  fetchProductsByCategory, // ⬅️ Import added
  searchProductsByName // ⬅️ New search controller
} = require("../controllers/productController");
const verifyAdmin = require("../middlewares/adminAuth");

//public to both
router.get("/search", searchProductsByName);

// for Public
router.get("/", getProducts);
router.get("/filter", fetchProductsByCategory); // ⬅️ New Route
router.get("/:id", getProduct);


// for Admin
router.post("/", verifyAdmin, createProduct);
router.put("/:id", verifyAdmin, editProduct);
router.delete("/:id", verifyAdmin, removeProduct);

module.exports = router;
