// const pool = require("../config/db");

// const getAllProducts = async () => {
//   const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
//   return result.rows;
// };

// const getProductById = async (id) => {
//   const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
//   return result.rows[0];
// };

// const addProduct = async ({ name, description, price, category, stock }) => {
//   const result = await pool.query(
//     "INSERT INTO products (name, description, price, category, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//     [name, description, price, category, stock]
//   );
//   return result.rows[0];
// };

// const updateProduct = async (id, data) => {
//   const result = await pool.query(
//     `UPDATE products 
//      SET name=$1, description=$2, price=$3, category=$4, stock=$5 
//      WHERE id=$6 RETURNING *`,
//     [data.name, data.description, data.price, data.category, data.stock, id]
//   );
//   return result.rows[0];
// };

// const deleteProduct = async (id) => {
//   await pool.query("DELETE FROM products WHERE id = $1", [id]);
// };

// module.exports = {
//   getAllProducts,
//   getProductById,
//   addProduct,
//   updateProduct,
//   deleteProduct,
// };

// after image:


const pool = require("../config/db");

const getAllProducts = async () => {
  const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
  return result.rows;
};

const getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

const addProduct = async ({ name, description, price, category, stock, image }) => {
  const result = await pool.query(
    `INSERT INTO products (name, description, price, category, stock, image)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [name, description, price, category, stock, image]
  );
  return result.rows[0];
};

const updateProduct = async (id, data) => {
  const result = await pool.query(
    `UPDATE products 
     SET name=$1, description=$2, price=$3, category=$4, stock=$5, image=$6
     WHERE id=$7 RETURNING *`,
    [data.name, data.description, data.price, data.category, data.stock, data.image, id]
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



