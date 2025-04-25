const pool = require("../config/db");

const getUserAddressById = async (userId) => {
  const result = await pool.query(
    "SELECT name, phone_number, address FROM users WHERE id = $1",
    [userId]
  );
  return result.rows[0] || null;
};


const updateUserAddressById = async (userId, newAddress) => {
  const result = await pool.query(
    "UPDATE users SET address = $1 WHERE id = $2 RETURNING address",
    [newAddress, userId]
  );
  return result.rows[0]?.address;
};

const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM get_all_users()');
  return result.rows;
};

module.exports = {
  getUserAddressById,
  updateUserAddressById,
  getAllUsers
};
