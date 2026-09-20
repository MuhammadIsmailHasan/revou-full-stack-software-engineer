-- Q1 — Show all orders with the name of the user who placed them. Columns: order_id, customer_name, total_price, status. Sort by order_id ascending.
-- Expexted results = Q1: 7 rows — Alice×2, Bob×1, Carol×3, Eve×1 (order_id 1 through 7)
SELECT 
    o.id AS order_id,
    u.name AS customer_name,
    o.total_price,
    o.status
FROM orders o
JOIN users u ON u.id = o.user_id;


-- Q2 — List all products that have never been ordered. Show only product name and price.
-- Expected results = Q2: 1 row — Docker Essentials | 50.00
SELECT 
    p.name, 
    p.price
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.id IS NULL;

-- Q3 — Show each user and the number of orders they have placed. Include users with 0 orders. Columns: customer, order_count. Sort by order_count descending.
-- Expected results = Q3: 5 rows — Carol:3, Alice:2, Bob:1, Eve:1, Dave:0
SELECT
    u.name,
    COALESCE(COUNT(o.id), 0) AS number_orders
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY number_orders DESC;

-- Q4 — Show each order with the names of all products in that order. Columns: order_id, customer_name, product_name, quantity, unit_price. Sort by order_id.
-- Expected results = Q4: 9 rows — one per order_item line (e.g. order 1 has 2 rows: Python Crash Course + SQL Mastery Guide)
SELECT
    o.id AS order_id,
    u.name AS customer_name,
    p.name AS product_name,
    oi.quantity,
    oi.unit_price
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON p.id = oi.product_id;

-- Q5 — Show the total amount spent by each user (sum of total_price across their orders). Include only users who have placed at least one order. Columns: customer, total_spent. Sort by total_spent descending.
-- Expected results = Q5: 4 rows — Carol:205.00, Alice:115.00, Bob:55.00, Eve:45.00

SELECT 
    u.name AS customer,
    COALESCE(SUM(o.total_price), 0) AS total_spent
FROM orders o
JOIN users u ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY total_spent DESC;


