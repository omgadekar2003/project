const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory, // ⬅️ Import added
} = require("../models/productModel");

// ...existing controllers...

// Create new product
const createProduct = async (req, res) => {
  try {
    const product = await addProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

// Get single product
const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
};

// Update product
const editProduct = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
};

// Delete product
const removeProduct = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};

// Filter products by parent_category and sub_category
const fetchProductsByCategory = async (req, res) => {
  const { category, parent_category, sub_category } = req.query;

  // All 3 are required
  if (!category || !parent_category || !sub_category) {
    return res.status(400).json({ message: "category, parent_category, and sub_category are required" });
  }

  try {
    const products = await getProductsByCategory(category, parent_category, sub_category);
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products by category:", err);
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  editProduct,
  removeProduct,
  fetchProductsByCategory, // ⬅️ Added export
};