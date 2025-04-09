const pool = require("../config/db");

const getAllProducts = async () => {
  const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
  return result.rows;
};

const getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

const addProduct = async ({
  name,
  description,
  old_price,
  discount_price,
  discount,
  category,
  stock,
  image,
  size,
  color,
  quantity,
}) => {
  const result = await pool.query(
    `INSERT INTO products 
      (name, description, old_price, discount_price, discount, category, stock, image, size, color, quantity)
     VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     RETURNING *`,
    [
      name,
      description,
      old_price,
      discount_price,
      discount,
      category,
      stock,
      image,
      size,
      color,
      quantity,
    ]
  );
  return result.rows[0];
};

const updateProduct = async (id, data) => {
  const result = await pool.query(
    `UPDATE products SET 
      name = $1,
      description = $2,
      old_price = $3,
      discount_price = $4,
      discount = $5,
      category = $6,
      stock = $7,
      image = $8,
      size = $9,
      color = $10,
      quantity = $11
     WHERE id = $12 RETURNING *`,
    [
      data.name,
      data.description,
      data.old_price,
      data.discount_price,
      data.discount,
      data.category,
      data.stock,
      data.image,
      data.size,
      data.color,
      data.quantity,
      id,
    ]
  );
  return result.rows[0];
};

const deleteProduct = async (id) => {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};




