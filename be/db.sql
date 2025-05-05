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






