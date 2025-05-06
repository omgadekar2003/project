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
/*

INSERT INTO products (id, name, description, old_price, discount_price, discount, category, parent_category, sub_category, stock, image, size, color, quantity, created_at) VALUES
(2, 'Floral Print Saree', 'Graceful chiffon saree adorned with a soft floral print. Lightweight, breathable, and perfect for festive occasions or elegant daytime wear', 1299.00, 900.00, 29, 'Women', 'Traditional wear', 'Sarees', 50, 'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/w/y/y/free-linen-189-h-almaari-fashion-unstitched-original-imahac4s8t8rjrg7.jpeg?q=70', 'Free Size', 'Pink', NULL, '2025-04-11T09:19:14.487Z'),
(17, 'Classic Kurta Set', 'Traditional white kurta set crafted with premium cotton. Perfect for festive and casual wear with comfortable fit.', 1499.00, 999.00, 33, 'Men', 'Traditional Wear', 'Kurta', 43, 'https://tse1.mm.bing.net/th?id=OIP.jrVF-Gjoa9HB2-yzhw5EUgHaJ4&pid=Api&rs=1&c=1&qlt=95&w=93&h=124', 'M', 'green', NULL, '2025-04-16T10:27:46.212Z'),
(18, 'Denim Skinny Jeans', 'Stylish mid-rise jeans designed with stretchable denim for all-day comfort. A wardrobe staple for every woman.', 1199.00, 799.00, 33, 'Women', 'Casual Wear', 'Jeans', 65, 'https://sp.yimg.com/ib/th?id=OPAC.bT5FlCerh%2feh0w474C474&o=5&pid=21.1&w=174&h=500', 's', 'black', 1, '2025-04-16T10:30:13.848Z'),
(19, 'Kids Ethnic Set', 'Vibrant ethnic wear for kids with intricate embroidery. Comfortable and stylish option for festive occasions.', 1199.00, 799.00, 32, 'Kids', 'Traditional Wear', 'Ethnic Sets', 10, 'https://sp.yimg.com/ib/th?id=OPAC.NgNrHWkHkyg9Hw474C474&o=5&pid=21.1&w=174&h=174', 'M', 'blue', 1, '2025-04-16T10:33:31.577Z'),
(20, 'Striped Casual Shirt', 'Smart-casual striped shirt made from premium cotton, ideal for daily office wear.', 999.00, 699.00, 30, 'Men', 'Formal Wear', 'Shirts', 60, 'https://m.media-amazon.com/images/I/81-A-rnJGJL._AC_UL480_FMwebp_QL65_.jpg', 'L', 'light green', 1, '2025-04-19T09:51:12.924Z'),
(21, 'Pleated Midi Dress', 'Elegant pleated dress in a flattering A-line cut. Perfect for semi-formal events.', 1699.00, 1199.00, 29, 'Women', 'Party Wear', 'Dresses', 10, 'https://m.media-amazon.com/images/I/71AyDXkcSmL._AC_UL480_FMwebp_QL65_.jpg', 'M', 'black', 1, '2025-04-19T09:54:24.740Z'),
(22, 'Boys'' Summer Shorts', 'Lightweight and comfy shorts designed for active kids during summer.', 599.00, 399.00, 33, 'Kids', 'Casual Wear', 'Shorts', 18, 'https://m.media-amazon.com/images/I/71z+ACErTrL._AC_UL480_FMwebp_QL65_.jpg', 'S', 'blue', NULL, '2025-04-19T10:02:18.772Z'),
(23, 'High-Waist Trousers', 'Stylish high-waist trousers suitable for both work and casual outings.', 1399.00, 999.00, 29, 'Women', 'Office Wear', 'Trousers', 4, 'https://m.media-amazon.com/images/I/61Gk1S3bLTL._AC_UL480_FMwebp_QL65_.jpg', 'M', 'brown', NULL, '2025-04-19T10:14:03.937Z'),
(24, 'Casual Denim Jacket', 'Rugged denim jacket for all-weather style and comfort.', 1899.00, 1399.00, 26, 'Men', 'Winter Wear', 'Jackets', 9, 'https://m.media-amazon.com/images/I/71DoZhiZ0WS._AC_UL480_FMwebp_QL65_.jpg', 'L', 'Blue', 1, '2025-04-19T10:17:20.738Z'),
(25, 'Women’s Woolen Cardigan', 'Soft woolen cardigan to keep you warm in style during winter.', 1499.00, 999.00, 33, 'Women', 'Winter Wear', 'Sweaters', 10, 'https://m.media-amazon.com/images/I/61VuUKGntUL._AC_SX679_.jpg', 'M', 'black', 1, '2025-04-19T10:19:43.949Z'),
(26, 'Boys’ Hooded Sweatshirt', 'Warm and trendy hooded sweatshirt with kangaroo pocket.', 799.00, 599.00, 25, 'Kids', 'Winter Wear', 'Sweatshirts', 7, 'https://m.media-amazon.com/images/I/61enW85eoUL._AC_UL480_FMwebp_QL65_.jpg', 'L', 'Yellow', 1, '2025-04-19T10:21:34.409Z'),
(27, 'Women’s Crop Top', 'Trendy cotton crop top with stylish sleeves and soft texture.', 899.00, 599.00, 33, 'Women', 'Casual Wear', 'Tops', 2, 'https://m.media-amazon.com/images/I/5117i1xOOlL._AC_UL480_FMwebp_QL65_.jpg', 'S', 'White', 1, '2025-04-19T10:24:10.263Z'),
(28, 'Men''s Linen Kurta', 'Breathable linen kurta for a comfortable ethnic look.', 1299.00, 899.00, 31, 'Men', 'Traditional Wear', 'Kurta', 15, 'https://m.media-amazon.com/images/I/51cbkCRDrbL._AC_UL480_FMwebp_QL65_.jpg', 'M', 'White', 1, '2025-04-19T10:26:25.984Z'),
(29, 'Embroidered Anarkali Suit', 'Elegant georgette Anarkali suit featuring intricate embroidery and flared silhouette. Ideal for weddings and festive gatherings.', 2499.00, 1799.00, 18, 'Women', 'Traditional wear', 'Suits', 2, 'https://m.media-amazon.com/images/I/81AccoA1sSL._AC_UL480_FMwebp_QL65_.jpg', 'L', 'Red', 1, '2025-04-25T06:12:59.697Z'),
(30, 'Silk Kurta Pyjama Set', 'Traditional silk kurta pyjama set with a classic collar and subtle jacquard design. Comfortable and stylish for formal or cultural events.', 899.00, 599.00, 20, 'Women', 'Traditional wear', 'Kurta Pyjama', 9, 'https://m.media-amazon.com/images/I/71xpRh7bDvL._AC_UL480_FMwebp_QL65_.jpg', 'M', 'pink', 1, '2025-04-25T06:15:08.278Z'),
(31, 'Sequin Bodycon Dress', 'Dazzling bodycon dress embellished with sequins. Designed for a glamorous party look and a flattering fit.', 2199.00, 1599.00, 27, 'Women', 'Party Wear', 'Dresses', 10, 'https://m.media-amazon.com/images/I/61MzCBXgRzL._AC_UL480_FMwebp_QL65_.jpg', 'M', 'Black', 1, '2025-04-25T06:21:04.581Z'),
(32, 'Velvet Blazer Set', 'Luxurious velvet blazer and trouser set, perfect for evening parties and formal occasions. Tailored fit with a rich texture.', 1299.00, 899.00, 25, 'Women', 'Party Wear', 'Suits', 10, 'https://m.media-amazon.com/images/I/61hZD1fDlTL._AC_UL480_FMwebp_QL65_.jpg', 'L', 'White', 1, '2025-04-25T06:23:27.598Z'),
(33, 'Formal Cotton Shirt', 'Tailored cotton shirt with a crisp finish. Breathable and comfortable for everyday office wear.', 799.00, 599.00, 15, 'Women', 'Office Wear', 'Shirts', 30, 'https://m.media-amazon.com/images/I/711K9DWy6EL._AC_UL480_FMwebp_QL65_.jpg', 'M', 'pink', 1, '2025-04-25T06:26:25.442Z'),
(34, 'Slim Fit Blazer', 'Classic slim-fit blazer with a single-button closure. Ideal for professional meetings and corporate events.', 1299.00, 899.00, 35, 'Women', 'Office Wear', 'Blazers', 5, 'https://m.media-amazon.com/images/I/61VptmOadVL._AC_UL480_FMwebp_QL65_.jpg', 'L', 'blue', NULL, '2025-04-25T06:28:12.185Z'),
(35, 'Woolen Overcoat', 'Long woolen overcoat with lapel collar, ideal for staying warm in style during the winter season.', 1299.00, 899.00, 19, 'Women', 'Winter Wear', 'Coats', 8, 'https://m.media-amazon.com/images/I/61lmBiy5iEL._AC_UL480_FMwebp_QL65_.jpg', 'M', 'black', 1, '2025-04-25T06:31:56.329Z'),
(36, 'Puffer Jacket', 'Insulated puffer jacket with detachable hood, perfect for cold and windy days.', 699.00, 499.00, 15, 'Women', 'Winter Wear', 'Jackets', 15, 'https://m.media-amazon.com/images/I/714q+oOP6eL._AC_UL480_FMwebp_QL65_.jpg', 'M', 'black', 1, '2025-04-25T06:33:39.928Z'),
(37, 'Silk Blend Nehru Jacket', 'Classic Nehru jacket made from a smooth silk blend. Perfect for weddings and festive events.', 599.00, 499.00, 10, 'Men', 'Traditional Wear', 'Jacket', 5, 'https://m.media-amazon.com/images/I/71w7pQb8cpL._AC_UL480_FMwebp_QL65_.jpg', 'L', 'Green', 1, '2025-04-25T06:38:20.296Z'),
(38, 'Embroidered Sherwani Set', 'Elegant sherwani set with fine embroidery, includes churidar and dupatta. Ideal for grand celebrations.', 5499.00, 4499.00, 15, 'Men', 'Traditional Wear', 'Sherwani', 5, 'https://m.media-amazon.com/images/I/51pyTdo-HDL._AC_UL480_FMwebp_QL65_.jpg', 'M', 'blue', 1, '2025-04-25T06:40:04.516Z'),
(39, 'Men''s Slim Fit Formal Shirt', 'Elegant slim fit shirt with a crisp collar and button cuffs, ideal for office or formal occasions.', 699.00, 499.00, 16, 'Men', 'Formal Wear', 'Shirts', 5, 'https://m.media-amazon.com/images/I/61Avt-98+wL._AC_UL480_FMwebp_QL65_.jpg', 'M', 'Red', 1, '2025-04-25T06:45:22.398Z'),
(40, 'Men''s Tailored Fit Blazer', 'Classic two-button blazer with sharp tailoring, perfect for business meetings and presentations.', 1299.00, 1099.00, 10, 'Men', 'Formal Wear', 'Blazers', 5, 'https://m.media-amazon.com/images/I/71Tt4bP9ywL._AC_UL480_FMwebp_QL65_.jpg', 'L', 'Yellow', 1, '2025-04-25T06:48:29.177Z'),
(41, 'Graphic Printed T-Shirt', 'Soft cotton T-shirt with vibrant graphic print, ideal for casual outings or weekend looks.', 799.00, 499.00, 20, 'Men', 'Casual Wear', 'T-shirt', 5, 'https://m.media-amazon.com/images/I/71Hr2GnGgQL._AC_UL480_FMwebp_QL65_.jpg', 'M', 'black', 1, '2025-04-25T06:51:57.020Z'),
(42, 'Denim Jogger Pants', 'Comfortable joggers with a denim look, perfect for laid-back styles and casual comfort.', 899.00, 599.00, 25, 'Men', 'Casual Wear', 'Jogger', 4, 'https://m.media-amazon.com/images/I/611re3ifssL._AC_UL480_FMwebp_QL65_.jpg', 'M', 'white', 1, '2025-04-25T06:53:50.059Z');

*/


-- updated: products table for multiple images: 

/*
CREATE TABLE products2 (
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  image2 TEXT,
  image3 TEXT,
  image4 TEXT,
  image5 TEXT
);
*/




--ALTER TABLE products
-- ADD COLUMN image2 TEXT,
-- ADD COLUMN image3 TEXT,
-- ADD COLUMN image4 TEXT,
-- ADD COLUMN image5 TEXT;


-- UPDATE products
-- SET image  = 'https://m.media-amazon.com/images/I/51F5u6X1yXL._AC_SX679_.jpg',
--     image2 = 'https://m.media-amazon.com/images/I/61RL7xQy4oL._AC_SX679_.jpg',
--     image3 = 'https://m.media-amazon.com/images/I/81lVNw6avQL._AC_SY679_.jpg',
--     image4 = 'https://m.media-amazon.com/images/I/71mDAkHh3mL._AC_SX679_.jpg',
--     image5 = 'https://m.media-amazon.com/images/I/71-6QfSuNjL._AC_SX679_.jpg'
-- WHERE id = 2;


-- UPDATE products
-- SET image  = 'https://m.media-amazon.com/images/I/71CDVUoAjnL._AC_SY879_.jpg',
--     image2 = 'https://m.media-amazon.com/images/I/71Tn30R6T+L._AC_SY679_.jpg',
--     image3 = 'https://m.media-amazon.com/images/I/71Tn30R6T+L._AC_SY679_.jpg',
--     image4 = 'https://m.media-amazon.com/images/I/71vu2RkpKAL._AC_SY679_.jpg',
--     image5 = 'https://m.media-amazon.com/images/I/71hPL0-+tJL._AC_SY679_.jpg'
-- WHERE id = 17;


-- UPDATE products
-- SET image  = 'https://m.media-amazon.com/images/I/41e45Ek1WqL._AC_SY879_.jpg',
--     image2 = 'https://m.media-amazon.com/images/I/51GkkQ-6NoL._AC_SY679_.jpg',
--     image3 = 'https://m.media-amazon.com/images/I/51vBe8ZBHcL._AC_SY679_.jpg',
--     image4 = 'https://m.media-amazon.com/images/I/51w2njhy-HL._AC_SY679_.jpg',
--     image5 = 'https://m.media-amazon.com/images/I/71gZPeYIAjL._AC_SY879_.jpg'
-- WHERE id = 18;


/*  ########### products functions to update code and reduce backend logic */
/*
-- Function to get all products (excluding image2-5)
CREATE OR REPLACE FUNCTION get_all_products()
RETURNS TABLE (
    id INTEGER,
    name TEXT,
    description TEXT,
    old_price NUMERIC(10,2),
    discount_price NUMERIC(10,2),
    discount INTEGER,
    category TEXT,
    parent_category TEXT,
    sub_category TEXT,
    stock INTEGER,
    image TEXT,
    size TEXT,
    color TEXT,
    quantity INTEGER,
    created_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id, p.name, p.description, p.old_price, p.discount_price, p.discount,
        p.category, p.parent_category, p.sub_category, p.stock, p.image,
        p.size, p.color, p.quantity, p.created_at
    FROM products p
    ORDER BY p.id ASC;
END;
$$ LANGUAGE plpgsql;

-- Function to get a product by ID (including all images)
CREATE OR REPLACE FUNCTION get_product_by_id(p_id INTEGER)
RETURNS TABLE (
    id INTEGER,
    name TEXT,
    description TEXT,
    old_price NUMERIC(10,2),
    discount_price NUMERIC(10,2),
    discount INTEGER,
    category TEXT,
    parent_category TEXT,
    sub_category TEXT,
    stock INTEGER,
    image TEXT,
    image2 TEXT,
    image3 TEXT,
    image4 TEXT,
    image5 TEXT,
    size TEXT,
    color TEXT,
    quantity INTEGER,
    created_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id, p.name, p.description, p.old_price, p.discount_price, p.discount,
        p.category, p.parent_category, p.sub_category, p.stock, p.image,
        p.image2, p.image3, p.image4, p.image5, p.size, p.color, p.quantity,
        p.created_at
    FROM products p
    WHERE p.id = p_id;
END;
$$ LANGUAGE plpgsql;

-- Function to add a new product
CREATE OR REPLACE FUNCTION add_product(
    p_name TEXT,
    p_description TEXT,
    p_old_price NUMERIC(10,2),
    p_discount_price NUMERIC(10,2),
    p_discount INTEGER,
    p_category TEXT,
    p_parent_category TEXT,
    p_sub_category TEXT,
    p_stock INTEGER,
    p_image TEXT,
    p_image2 TEXT,
    p_image3 TEXT,
    p_image4 TEXT,
    p_image5 TEXT,
    p_size TEXT,
    p_color TEXT,
    p_quantity INTEGER
)
RETURNS TABLE (
    id INTEGER,
    name TEXT,
    description TEXT,
    old_price NUMERIC(10,2),
    discount_price NUMERIC(10,2),
    discount INTEGER,
    category TEXT,
    parent_category TEXT,
    sub_category TEXT,
    stock INTEGER,
    image TEXT,
    image2 TEXT,
    image3 TEXT,
    image4 TEXT,
    image5 TEXT,
    size TEXT,
    color TEXT,
    quantity INTEGER,
    created_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO products (
        name, description, old_price, discount_price, discount,
        category, parent_category, sub_category, stock,
        image, image2, image3, image4, image5,
        size, color, quantity
    ) VALUES (
        p_name, p_description, p_old_price, p_discount_price, p_discount,
        p_category, p_parent_category, p_sub_category, p_stock,
        p_image, p_image2, p_image3, p_image4, p_image5,
        p_size, p_color, p_quantity
    )
    RETURNING 
        products.id, products.name, products.description, products.old_price, 
        products.discount_price, products.discount, products.category, 
        products.parent_category, products.sub_category, products.stock, 
        products.image, products.image2, products.image3, products.image4, 
        products.image5, products.size, products.color, products.quantity, 
        products.created_at;
END;
$$ LANGUAGE plpgsql;

-- Function to update a product
CREATE OR REPLACE FUNCTION update_product(
    p_id INTEGER,
    p_name TEXT,
    p_description TEXT,
    p_old_price NUMERIC(10,2),
    p_discount_price NUMERIC(10,2),
    p_discount INTEGER,
    p_category TEXT,
    p_parent_category TEXT,
    p_sub_category TEXT,
    p_stock INTEGER,
    p_image TEXT,
    p_image2 TEXT,
    p_image3 TEXT,
    p_image4 TEXT,
    p_image5 TEXT,
    p_size TEXT,
    p_color TEXT,
    p_quantity INTEGER
)
RETURNS TABLE (
    id INTEGER,
    name TEXT,
    description TEXT,
    old_price NUMERIC(10,2),
    discount_price NUMERIC(10,2),
    discount INTEGER,
    category TEXT,
    parent_category TEXT,
    sub_category TEXT,
    stock INTEGER,
    image TEXT,
    image2 TEXT,
    image3 TEXT,
    image4 TEXT,
    image5 TEXT,
    size TEXT,
    color TEXT,
    quantity INTEGER,
    created_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    UPDATE products
    SET 
        name = p_name,
        description = p_description,
        old_price = p_old_price,
        discount_price = p_discount_price,
        discount = p_discount,
        category = p_category,
        parent_category = p_parent_category,
        sub_category = p_sub_category,
        stock = p_stock,
        image = p_image,
        image2 = p_image2,
        image3 = p_image3,
        image4 = p_image4,
        image5 = p_image5,
        size = p_size,
        color = p_color,
        quantity = p_quantity
    WHERE id = p_id
    RETURNING 
        products.id, products.name, products.description, products.old_price, 
        products.discount_price, products.discount, products.category, 
        products.parent_category, products.sub_category, products.stock, 
        products.image, products.image2, products.image3, products.image4, 
        products.image5, products.size, products.color, products.quantity, 
        products.created_at;
END;
$$ LANGUAGE plpgsql;

-- Function to delete a product
CREATE OR REPLACE FUNCTION delete_product(p_id INTEGER)
RETURNS VOID AS $$
BEGIN
    DELETE FROM products WHERE id = p_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get products by category (excluding image2-5)
CREATE OR REPLACE FUNCTION get_products_by_category(
    p_category TEXT,
    p_parent_category TEXT,
    p_sub_category TEXT
)
RETURNS TABLE (
    id INTEGER,
    name TEXT,
    description TEXT,
    old_price NUMERIC(10,2),
    discount_price NUMERIC(10,2),
    discount INTEGER,
    category TEXT,
    parent_category TEXT,
    sub_category TEXT,
    stock INTEGER,
    image TEXT,
    size TEXT,
    color TEXT,
    quantity INTEGER,
    created_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id, p.name, p.description, p.old_price, p.discount_price, p.discount,
        p.category, p.parent_category, p.sub_category, p.stock, p.image,
        p.size, p.color, p.quantity, p.created_at
    FROM products p
    WHERE LOWER(p.category) = LOWER(p_category)
    AND LOWER(p.parent_category) = LOWER(p_parent_category)
    AND LOWER(p.sub_category) = LOWER(p_sub_category);
END;
$$ LANGUAGE plpgsql;

-- Function to search products by name (excluding image2-5)
CREATE OR REPLACE FUNCTION search_products(p_keyword TEXT)
RETURNS TABLE (
    id INTEGER,
    name TEXT,
    description TEXT,
    old_price NUMERIC(10,2),
    discount_price NUMERIC(10,2),
    discount INTEGER,
    category TEXT,
    parent_category TEXT,
    sub_category TEXT,
    stock INTEGER,
    image TEXT,
    size TEXT,
    color TEXT,
    quantity INTEGER,
    created_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id, p.name, p.description, p.old_price, p.discount_price, p.discount,
        p.category, p.parent_category, p.sub_category, p.stock, p.image,
        p.size, p.color, p.quantity, p.created_at
    FROM products p
    WHERE p.name ILIKE '%' || p_keyword || '%';
END;
$$ LANGUAGE plpgsql;

*/

/* ####### For cart new functions:*/

/*
-- Function to check if an item exists in the user's cart
CREATE OR REPLACE FUNCTION find_cart_item(p_user_id INTEGER, p_product_id INTEGER)
RETURNS TABLE (
    id INTEGER,
    user_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    created_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT ci.id, ci.user_id, ci.product_id, ci.quantity, ci.created_at
    FROM cart_items ci
    WHERE ci.user_id = p_user_id AND ci.product_id = p_product_id;
END;
$$ LANGUAGE plpgsql;

-- Function to insert a new cart item
CREATE OR REPLACE FUNCTION insert_cart_item(p_user_id INTEGER, p_product_id INTEGER, p_quantity INTEGER)
RETURNS VOID AS $$
BEGIN
    INSERT INTO cart_items (user_id, product_id, quantity)
    VALUES (p_user_id, p_product_id, p_quantity);
END;
$$ LANGUAGE plpgsql;

-- Function to update the quantity of an existing cart item
CREATE OR REPLACE FUNCTION update_cart_item_quantity(p_quantity INTEGER, p_user_id INTEGER, p_product_id INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE cart_items
    SET quantity = quantity + p_quantity
    WHERE user_id = p_user_id AND product_id = p_product_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get all cart items for a user with product details
CREATE OR REPLACE FUNCTION get_user_cart_items(p_user_id INTEGER)
RETURNS TABLE (
    cart_item_id INTEGER,
    quantity INTEGER,
    product_id INTEGER,
    product_name TEXT,
    product_price NUMERIC(10,2),
    product_image TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ci.id AS cart_item_id,
        ci.quantity,
        p.id AS product_id,
        p.name AS product_name,
        p.discount_price AS product_price,
        p.image AS product_image
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to delete a cart item by ID
CREATE OR REPLACE FUNCTION delete_cart_item(p_item_id INTEGER)
RETURNS VOID AS $$
BEGIN
    DELETE FROM cart_items WHERE id = p_item_id;
END;
$$ LANGUAGE plpgsql;

-- Function to remove multiple cart items by product IDs
CREATE OR REPLACE FUNCTION remove_items_from_cart(p_user_id INTEGER, p_product_ids INTEGER[])
RETURNS VOID AS $$
BEGIN
    IF p_product_ids IS NOT NULL AND array_length(p_product_ids, 1) > 0 THEN
        DELETE FROM cart_items
        WHERE user_id = p_user_id AND product_id = ANY(p_product_ids);
    END IF;
END;
$$ LANGUAGE plpgsql;
*/



