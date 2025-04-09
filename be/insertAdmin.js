const bcrypt = require('bcryptjs');
const pool = require('./config/db'); // Adjust path if needed

const insertAdmin = async () => {
  const name = 'Admin User';
  const email = 'admin@example.com';
  const plainPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  try {
    const result = await pool.query(
      'INSERT INTO admins (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    console.log('✅ Admin inserted:', result.rows[0]);
  } catch (err) {
    console.error('❌ Error inserting admin:', err.message);
  } finally {
    pool.end(); // Close DB connection
  }
};

insertAdmin();
