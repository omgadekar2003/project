const pool = require("../config/db");

// Create user
const createUser = async (name, email, hashedPassword) => {
    return await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hashedPassword]
    );
};

// Find user by email
const findUserByEmail = async (email) => {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return user.rows[0];
};

module.exports = { createUser, findUserByEmail };
