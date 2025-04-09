const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  editProduct,
  removeProduct,
} = require("../controllers/productController");
const verifyAdmin = require("../middlewares/adminAuth");

// for Public
router.get("/", getProducts);
router.get("/:id", getProduct);

// for Admin
router.post("/", verifyAdmin, createProduct);
router.put("/:id", verifyAdmin, editProduct);
router.delete("/:id", verifyAdmin, removeProduct);

module.exports = router;
