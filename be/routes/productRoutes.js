const express = require("express");
const pool = require("../config/db");
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

// Assuming you have a pool instance for your database (make sure to import or define it)
  // Modify according to your actual pool configuration

// Function to get all products (if needed)
const getAllProducts = async () => {
  const result = await pool.query("SELECT * FROM get_all_products()");
  return result.rows;
};

// Public routes
router.get("/search", searchProductsByName);
router.get("/", getProducts);
router.get("/filter", fetchProductsByCategory); // ⬅️ New Route for filtering by category
router.get("/:id", getProduct);

// Admin routes
router.post("/", verifyAdmin, createProduct);
router.put("/:id", verifyAdmin, editProduct);
router.delete("/:id", verifyAdmin, removeProduct);

// Route to get all products (using the custom `getAllProducts` function)
router.get('/products', async (req, res) => {
  try {
    const products = await getAllProducts();  // Fetching all products
    res.json(products);  // Sending the fetched products as JSON response
    console.log('Fetched products:', products);  // Debug log
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
