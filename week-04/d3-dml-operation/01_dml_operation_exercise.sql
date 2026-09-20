-- Q1: Users whose username starts with "b"
SELECT name AS username
FROM users
WHERE name ILIKE 'b%';

-- Q2: Products above 100,000 IDR, sorted highest first
SELECT id, name, price
FROM products
WHERE price > 100000
ORDER BY price DESC, name ASC;

-- Q3: Top 3 most expensive in-stock products
SELECT id, name, price
FROM products
WHERE stock > 0
ORDER BY price DESC
LIMIT 3;

SELECT * FROM products;
ALTER TABLE products ADD COLUMN description VARCHAR(1000);
SELECT * FROM products;

-- Q4: Insert new product + verify
INSERT INTO products (name, seller_id, description, price, stock)
VALUES 
('Tas Ransel Laptop', 2, '35L kapasitas, cocok untuk kerja dan kuliah', 320000, 25)
('Topi Baseball', 3, 'Lorem insum', 200000, 10)
;

SELECT * FROM products WHERE name = 'Tas Ransel Laptop';

-- Q5: Update Topi Baseball price, confirm with RETURNING
UPDATE products
SET   price = 135000
WHERE id = 2
RETURNING id, name, price;

-- Q6: Mark Kaos Polos as out of stock + find all out-of-stock
UPDATE products
SET   stock = 0
WHERE id = 2;

SELECT name, stock
FROM products
WHERE stock = 0;

-- Q7: Aggregate — count and average price
SELECT COUNT(*) AS total_products, AVG(price) AS avg_price
FROM products;

-- Q8: Safe delete workflow for user id=5
-- Step 1: Preview
SELECT id, name, email
FROM users
WHERE id = 1;

-- Step 2: Delete (run only after confirming Step 1)
DELETE FROM users
WHERE id = 1;

SELECT * FROM users;