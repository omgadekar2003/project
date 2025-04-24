const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
  getAllProductsFromFunction, // ✅ renamed for clarity
} = require("../models/productModel");

// Create a new product
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

// Get all products using PostgreSQL function
const getProductsFromFunction = async (req, res) => {
  try {
    const products = await getAllProductsFromFunction();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products from function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get single product by ID
const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
};

// Update product by ID
const editProduct = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
};

// Delete product by ID
const removeProduct = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};

// Get products filtered by category
const fetchProductsByCategory = async (req, res) => {
  const { category, parent_category, sub_category } = req.query;

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

// Search products by name
const searchProductsByName = async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: "Search keyword is required" });
  }

  try {
    const products = await searchProducts(keyword);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for the given keyword." });
    }

    res.json(products);
  } catch (err) {
    console.error("Error searching products:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  editProduct,
  removeProduct,
  fetchProductsByCategory,
  searchProductsByName,
  getProductsFromFunction, // ✅ exported cleanly
};
