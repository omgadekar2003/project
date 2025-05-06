// current one:

/*
//old code

const pool = require("../config/db");

// Get all products (excluding extra images)
const getAllProducts = async () => {
  const result = await pool.query(
    `SELECT id, name, description, old_price, discount_price, discount, 
            category, parent_category, sub_category, stock, image, size, 
            color, quantity, created_at 
     FROM products ORDER BY id ASC`
  );
  return result.rows;
};

// Get all products using a database function (excluding extra images)
const getAllProductsFunction = async () => {
  const result = await pool.query(
    `SELECT id, name, description, old_price, discount_price, discount, 
            category, parent_category, sub_category, stock, image, size, 
            color, quantity, created_at 
     FROM get_all_products()`
  );
  return result.rows;
};

// Get a product by ID (including all images)
const getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

// Add a new product with multiple images
const addProduct = async ({
  name,
  description,
  old_price,
  discount_price,
  discount,
  category,
  parent_category,
  sub_category,
  stock,
  image,
  image2,
  image3,
  image4,
  image5,
  size,
  color,
  quantity,
}) => {
  const result = await pool.query(
    `INSERT INTO products (
      name, description, old_price, discount_price, discount,
      category, parent_category, sub_category, stock,
      image, image2, image3, image4, image5,
      size, color, quantity
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9,
      $10, $11, $12, $13, $14,
      $15, $16, $17
    ) RETURNING *`,
    [
      name,
      description,
      old_price,
      discount_price,
      discount,
      category,
      parent_category,
      sub_category,
      stock,
      image,
      image2,
      image3,
      image4,
      image5,
      size,
      color,
      quantity,
    ]
  );
  return result.rows[0];
};

// Update a product by ID with multiple images
const updateProduct = async (id, data) => {
  const result = await pool.query(
    `UPDATE products SET 
      name = $1,
      description = $2,
      old_price = $3,
      discount_price = $4,
      discount = $5,
      category = $6,
      parent_category = $7,
      sub_category = $8,
      stock = $9,
      image = $10,
      image2 = $11,
      image3 = $12,
      image4 = $13,
      image5 = $14,
      size = $15,
      color = $16,
      quantity = $17
     WHERE id = $18 RETURNING *`,
    [
      data.name,
      data.description,
      data.old_price,
      data.discount_price,
      data.discount,
      data.category,
      data.parent_category,
      data.sub_category,
      data.stock,
      data.image,
      data.image2,
      data.image3,
      data.image4,
      data.image5,
      data.size,
      data.color,
      data.quantity,
      id,
    ]
  );
  return result.rows[0];
};

// Delete a product by ID
const deleteProduct = async (id) => {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
};

// Get products by category (excluding extra images)
const getProductsByCategory = async (
  category,
  parent_category,
  sub_category
) => {
  const result = await pool.query(
    `SELECT id, name, description, old_price, discount_price, discount, 
            category, parent_category, sub_category, stock, image, size, 
            color, quantity, created_at 
     FROM products 
     WHERE LOWER(category) = LOWER($1) 
     AND LOWER(parent_category) = LOWER($2) 
     AND LOWER(sub_category) = LOWER($3)`,
    [category, parent_category, sub_category]
  );
  return result.rows;
};

// Search products (excluding extra images)
const searchProducts = async (keyword) => {
  const result = await pool.query(
    `SELECT id, name, description, old_price, discount_price, discount, 
            category, parent_category, sub_category, stock, image, size, 
            color, quantity, created_at 
     FROM products WHERE name ILIKE '%' || $1 || '%'`,
    [keyword]
  );
  return result.rows;
};

module.exports = {
  getAllProducts,
  getAllProductsFunction,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
};

*/

/***************/

// new code for multiple images:

/*
const pool = require("../config/db");

// Get all products (excluding image2, image3, image4, image5)
const getAllProducts = async () => {
  const result = await pool.query(
    `SELECT id, name, description, old_price, discount_price, discount, 
            category, parent_category, sub_category, stock, image, size, 
            color, quantity, created_at 
     FROM products2 ORDER BY id ASC`
  );
  return result.rows;
};

// Get all products using a database function (excluding image2, image3, image4, image5)
const getAllProductsFunction = async () => {
  const result = await pool.query(
    `SELECT id, name, description, old_price, discount_price, discount, 
            category, parent_category, sub_category, stock, image, size, 
            color, quantity, created_at 
     FROM get_all_products()`
  );
  return result.rows;
};

// Get a product by ID (including all images)
const getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM products2 WHERE id = $1", [id]);
  return result.rows[0];
};

// Add a new product
const addProduct = async ({
  name,
  description,
  old_price,
  discount_price,
  discount,
  category,
  parent_category,
  sub_category,
  stock,
  image,
  image2,
  image3,
  image4,
  image5,
  size,
  color,
  quantity
}) => {
  const result = await pool.query(
    `INSERT INTO products2 (
      name, description, old_price, discount_price, discount,
      category, parent_category, sub_category, stock,
      image, image2, image3, image4, image5,
      size, color, quantity
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9,
      $10, $11, $12, $13, $14,
      $15, $16, $17
    ) RETURNING *`,
    [
      name,
      description,
      old_price,
      discount_price,
      discount,
      category,
      parent_category,
      sub_category,
      stock,
      image,
      image2,
      image3,
      image4,
      image5,
      size,
      color,
      quantity
    ]
  );
  return result.rows[0];
};

// Update a product by ID
const updateProduct = async (id, data) => {
  const result = await pool.query(
    `UPDATE products2 SET 
      name = $1,
      description = $2,
      old_price = $3,
      discount_price = $4,
      discount = $5,
      category = $6,
      parent_category = $7,
      sub_category = $8,
      stock = $9,
      image = $10,
      image2 = $11,
      image3 = $12,
      image4 = $13,
      image5 = $14,
      size = $15,
      color = $16,
      quantity = $17
     WHERE id = $18 RETURNING *`,
    [
      data.name,
      data.description,
      data.old_price,
      data.discount_price,
      data.discount,
      data.category,
      data.parent_category,
      data.sub_category,
      data.stock,
      data.image,
      data.image2,
      data.image3,
      data.image4,
      data.image5,
      data.size,
      data.color,
      data.quantity,
      id
    ]
  );
  return result.rows[0];
};

// Delete a product by ID
const deleteProduct = async (id) => {
  await pool.query("DELETE FROM products2 WHERE id = $1", [id]);
};

// Get products by category, parent category, and sub-category (excluding image2, image3, image4, image5)
const getProductsByCategory = async (category, parent_category, sub_category) => {
  const result = await pool.query(
    `SELECT id, name, description, old_price, discount_price, discount, 
            category, parent_category, sub_category, stock, image, size, 
            color, quantity, created_at 
     FROM products2 
     WHERE LOWER(category) = LOWER($1) 
     AND LOWER(parent_category) = LOWER($2) 
     AND LOWER(sub_category) = LOWER($3)`,
    [category, parent_category, sub_category]
  );
  return result.rows;
};

// Search products by name (case-insensitive, excluding image2, image3, image4, image5)
const searchProducts = async (keyword) => {
  const result = await pool.query(
    `SELECT id, name, description, old_price, discount_price, discount, 
            category, parent_category, sub_category, stock, image, size, 
            color, quantity, created_at 
     FROM products2 WHERE name ILIKE '%' || $1 || '%'`,
    [keyword]
  );
  return result.rows;
};

module.exports = {
  getAllProducts,
  getAllProductsFunction,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts
};

*/

const pool = require("../config/db");

// Get all products using database function (excluding image2-5)
const getAllProducts = async () => {
  const result = await pool.query("SELECT * FROM get_all_products()");
  return result.rows;
};

// Get a product by ID using database function (including all images)
const getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM get_product_by_id($1)", [id]);
  return result.rows[0];
};

// Add a new product using database function
const addProduct = async ({
  name,
  description,
  old_price,
  discount_price,
  discount,
  category,
  parent_category,
  sub_category,
  stock,
  image,
  image2,
  image3,
  image4,
  image5,
  size,
  color,
  quantity,
}) => {
  const result = await pool.query(
    `SELECT * FROM add_product(
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9,
      $10, $11, $12, $13, $14,
      $15, $16, $17
    )`,
    [
      name,
      description,
      old_price,
      discount_price,
      discount,
      category,
      parent_category,
      sub_category,
      stock,
      image,
      image2,
      image3,
      image4,
      image5,
      size,
      color,
      quantity,
    ]
  );
  return result.rows[0];
};

// Update a product by ID using database function
const updateProduct = async (id, data) => {
  const result = await pool.query(
    `SELECT * FROM update_product(
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9,
      $10, $11, $12, $13, $14,
      $15, $16, $17, $18
    )`,
    [
      id,
      data.name,
      data.description,
      data.old_price,
      data.discount_price,
      data.discount,
      data.category,
      data.parent_category,
      data.sub_category,
      data.stock,
      data.image,
      data.image2,
      data.image3,
      data.image4,
      data.image5,
      data.size,
      data.color,
      data.quantity,
    ]
  );
  return result.rows[0];
};

// Delete a product by ID using database function
const deleteProduct = async (id) => {
  await pool.query("SELECT delete_product($1)", [id]);
};

// Get products by category using database function (excluding image2-5)
const getProductsByCategory = async (category, parent_category, sub_category) => {
  const result = await pool.query(
    "SELECT * FROM get_products_by_category($1, $2, $3)",
    [category, parent_category, sub_category]
  );
  return result.rows;
};

// Search products using database function (excluding image2-5)
const searchProducts = async (keyword) => {
  const result = await pool.query("SELECT * FROM search_products($1)", [keyword]);
  return result.rows;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
};