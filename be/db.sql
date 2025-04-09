/* CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone_number VARCHAR(15),
    nationality VARCHAR(100),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);  
*/
/*
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  old_price INTEGER,                  -- Old MRP
  discount_price INTEGER,            -- Discounted amount (or difference)
  discount VARCHAR(50),              -- e.g., "30% OFF"
  category VARCHAR(100),
  stock INTEGER DEFAULT 0,
  image TEXT,                         -- Image URL or Base64 string
  size TEXT[],                        -- Array to store sizes like ['S', 'M', 'L']
  color VARCHAR(50),                 -- e.g., 'Red', 'Black', 'Blue'
  quantity INTEGER,                 -- User’s order quantity
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);












