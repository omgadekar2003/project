const pool = require("../config/db");

const findAdminByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
  return result.rows[0];
};

module.exports = { findAdminByEmail };
