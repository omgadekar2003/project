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

/*
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  old_price NUMERIC(10, 2),
  discount_price NUMERIC(10, 2),
  discount INTEGER,
  category TEXT NOT NULL,           -- Men, Women, Kids
  parent_category TEXT NOT NULL,    -- Casual wear, Formal wear, etc.
  sub_category TEXT NOT NULL,       -- T-shirts, Suits, Sarees, etc.
  stock INTEGER DEFAULT 0,
  image TEXT,
  size TEXT,                        -- M, L, XL, etc.
  color TEXT,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

-- add to cart:

/*
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

-- wishlist:

/*
CREATE TABLE wishlist_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

-- function to get all users on admin side:
/*
CREATE OR REPLACE FUNCTION get_all_users()
RETURNS TABLE (
    id INT,
    name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP
)
AS $$
BEGIN
    RETURN QUERY
    SELECT id, name, email, phone, address, created_at FROM users;
END;
$$ LANGUAGE plpgsql;



-- Orders view by admin:
/*
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_image TEXT,
  price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  total_cost NUMERIC(10,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,         -- "razorpay" or "cod"
  address TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',        -- "pending", "paid", "done"
  razorpay_order_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



select * from orders


*/ */







