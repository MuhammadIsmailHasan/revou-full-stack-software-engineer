-- scenario: tampilan daftar transaksi
----------------------
SELECT * from users;
SELECT * FROM orders;
--------------------
SELECT 
	o.id AS order_id,
	u.name AS customer_name,
	o.total_price,
	o.status
FROM orders o 
INNER JOIN users u ON o.user_id = u.id;
----------------------
-- show all column in the left table
SELECT 
	o.id AS order_id,
	u.name AS customer_name,
	o.total_price,
	o.status
FROM users u 
LEFT JOIN orders o ON o.user_id = u.id;

-- show all column in the right table
SELECT 
	o.id AS order_id,
	u.name AS customer_name,
	o.total_price,
	o.status
FROM orders o 
RIGHT JOIN users u ON o.user_id = u.id;

-- is the user that does not have orders
SELECT 
	u.id AS user_id,
	u.name AS customer_name,
	o.total_price,
	o.status
FROM users u 
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.user_id IS NULL

--------------
-- MULTIPLE JOIN 
-------------
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL
);

-- 2. Products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(15, 2) NOT NULL
);

-- 3. Orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    total_price NUMERIC(15, 2) NOT NULL,
    status VARCHAR(20) NOT NULL
);

-- 4. Order Items (SUDAH DITAMBAHKAN quantity & unit_price)
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL DEFAULT 1,          -- 👈 Kolom Tambahan
    unit_price NUMERIC(15, 2) NOT NULL        -- 👈 Kolom Tambahan
);

INSERT INTO users (id, name, role) VALUES 
(1, 'Alice', 'buyer'),
(2, 'Bob', 'buyer'),
(3, 'Carol', 'buyer'),
(4, 'Dave', 'buyer');

-- Products
INSERT INTO products (id, name, price) VALUES 
(1, 'Mouse Wireless', 150000),
(2, 'Keyboard Mechanical', 450000),
(3, 'Monitor 24 Inch', 1800000),
(4, 'Webcam HD', 300000);

-- Orders
INSERT INTO orders (id, user_id, total_price, status) VALUES 
(101, 1, 300000, 'completed'),  -- Alice (Beli 2 Mouse = 300rb)
(102, 2, 450000, 'pending'),    -- Bob (Beli 1 Keyboard = 450rb)
(103, 3, 1800000, 'completed'), -- Carol (Beli 1 Monitor = 1.8jt)
(104, 1, 450000, 'completed');  -- Alice (Beli 1 Keyboard = 450rb)

-- Order Items (Disesuaikan dengan kuantitas dan harga per unit)
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES 
(101, 1, 2, 150000), -- Order 101: 2x Mouse Wireless
(102, 2, 1, 450000), -- Order 102: 1x Keyboard Mechanical
(103, 3, 1, 1800000),-- Order 103: 1x Monitor 24 Inch
(104, 2, 1, 450000); -- Order 104: 1x Keyboard Mechanical

SELECT * FROM order_items;

-- scenario: show customer name, product name, quantity and unit price
SELECT
	u.name AS user_name,
	p.name AS product_name,
	oi.quantity,
	oi.unit_price
FROM orders o 
INNER JOIN users u ON o.user_id = u.id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id;


