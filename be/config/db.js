const { Pool } = require('pg'); 
require('dotenv').config(); 

// Create PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Check connection
pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL!"))
    .catch(err => console.error("❌ Database connection error:", err));

module.exports = pool;
