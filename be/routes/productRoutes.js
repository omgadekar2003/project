/* // current working code:

const express = require("express");
const pool = require("../config/db");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProduct,
  editProduct,
  removeProduct,
  fetchProductsByCategory,
  searchProductsByName,
  getProductsFromFunction, // ⬅️ Equivalent to calling the custom function
} = require("../controllers/productController");

const verifyAdmin = require("../middlewares/adminAuth");

// --- Public Routes ---

// Search products by name
router.get("/search", searchProductsByName);

// Get all products (basic)
router.get("/", getProducts);

// Get all products (from a PostgreSQL function, like get_all_products())
router.get("/function", getProductsFromFunction);

// Filter products by category
router.get("/filter", fetchProductsByCategory);

// Get product by ID
router.get("/:id", getProduct);

// --- Admin Routes ---

// Add a new product (supports multiple images via controller logic)
router.post("/", verifyAdmin, createProduct);

// Edit an existing product
router.put("/:id", verifyAdmin, editProduct);

// Delete a product
router.delete("/:id", verifyAdmin, removeProduct);

// Optional: raw route to manually query get_all_products() (if needed)
router.get("/products", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, description, old_price, discount_price, discount, 
              category, parent_category, sub_category, stock, image, size, 
              color, quantity, created_at 
       FROM get_all_products()`
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
*/

/***************/

// new code for multiple images:

/*
const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  editProduct,
  removeProduct,
  fetchProductsByCategory,
  searchProductsByName,
  getProductsFromFunction
} = require("../controllers/productController");
const verifyAdmin = require("../middlewares/adminAuth");

// Public routes
router.get("/search", searchProductsByName);
router.get("/", getProducts);
router.get("/filter", fetchProductsByCategory);
router.get("/function", getProductsFromFunction);
router.get("/:id", getProduct);

// Admin routes
router.post("/", verifyAdmin, createProduct);
router.put("/:id", verifyAdmin, editProduct);
router.delete("/:id", verifyAdmin, removeProduct);

// Extra route using pool directly (excluding image2, image3, image4, image5)
router.get('/products', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, description, old_price, discount_price, discount, 
              category, parent_category, sub_category, stock, image, size, 
              color, quantity, created_at 
       FROM get_all_products()`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
*/



const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  editProduct,
  removeProduct,
  fetchProductsByCategory,
  searchProductsByName,
} = require("../controllers/productController");
const verifyAdmin = require("../middlewares/adminAuth");

// Public routes
router.get("/search", searchProductsByName);
router.get("/", getProducts);
router.get("/filter", fetchProductsByCategory);
router.get("/:id", getProduct);

// Admin routes
router.post("/", verifyAdmin, createProduct);
router.put("/:id", verifyAdmin, editProduct);
router.delete("/:id", verifyAdmin, removeProduct);

// Extra route using pool directly (using database function)
router.get('/products', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_all_products()");
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;