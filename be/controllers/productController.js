/****/
/*  // current working code.

const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
  getAllProductsFromFunction,
} = require("../models/productModel");

// Create a new product (can include multiple images)
const createProduct = async (req, res) => {
  try {
    const product = await addProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error adding product", error: err.message });
  }
};

// Get all products (excluding image2 to image5)
const getProducts = async (req, res) => {
  try {
    let products = await getAllProducts();
    // Filter out additional images for lighter response
    products = products.map(
      ({ image2, image3, image4, image5, ...rest }) => rest
    );
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
};

// Get all products from PostgreSQL function (excluding image2 to image5)
const getProductsFromFunction = async (req, res) => {
  try {
    let products = await getAllProductsFromFunction();
    // Filter out additional images
    products = products.map(
      ({ image2, image3, image4, image5, ...rest }) => rest
    );
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products from function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single product by ID (include all images)
const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: err.message });
  }
};

// Update product by ID
const editProduct = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating product", error: err.message });
  }
};

// Delete product by ID
const removeProduct = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: err.message });
  }
};

// Get products by category (excluding image2 to image5)
const fetchProductsByCategory = async (req, res) => {
  const { category, parent_category, sub_category } = req.query;

  if (!category || !parent_category || !sub_category) {
    return res
      .status(400)
      .json({
        message: "category, parent_category, and sub_category are required",
      });
  }

  try {
    let products = await getProductsByCategory(
      category,
      parent_category,
      sub_category
    );
    // Filter out additional images
    products = products.map(
      ({ image2, image3, image4, image5, ...rest }) => rest
    );
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products by category:", err);
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
};

// Search products by name (excluding image2 to image5)
const searchProductsByName = async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: "Search keyword is required" });
  }

  try {
    let products = await searchProducts(keyword);
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the given keyword." });
    }
    // Filter out additional images
    products = products.map(
      ({ image2, image3, image4, image5, ...rest }) => rest
    );
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
  getProductsFromFunction,
};
*/


/***************/

// new code for multiple images:

/*
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
  getAllProductsFunction
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

// Get all products (excluding image2, image3, image4, image5)
const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

// Get all products using PostgreSQL function (excluding image2, image3, image4, image5)
const getProductsFromFunction = async (req, res) => {
  try {
    const products = await getAllProductsFunction();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products from function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get single product by ID (including all images)
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

// Get products filtered by category (excluding image2, image3, image4, image5)
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

// Search products by name (excluding image2, image3, image4, image5)
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
  getProductsFromFunction
};

*/

const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
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

// Get all products (excluding image2-5 via database function)
const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

// Get single product by ID (including all images)
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
    if (!product) return res.status(404).json({ message: "Product not found" });
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

// Get products filtered by category (excluding image2-5 via database function)
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

// Search products by name (excluding image2-5 via database function)
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
};
