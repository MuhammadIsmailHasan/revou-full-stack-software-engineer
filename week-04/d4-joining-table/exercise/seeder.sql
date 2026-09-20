TRUNCATE TABLE
    order_items,
    orders,
    products,
    categories,
    users
RESTART IDENTITY CASCADE;

INSERT INTO categories (name) VALUES
('Books'),
('Electronics'),
('Home');

INSERT INTO users (name) VALUES
('Alice'),
('Bob'),
('Carol'),
('Dave'),
('Eve');

INSERT INTO products (category_id, name, price) VALUES
(1, 'Python Crash Course', 40.00),
(1, 'SQL Mastery Guide', 55.00),
(1, 'Docker Essentials', 50.00),
(2, 'Mechanical Keyboard', 120.00),
(2, 'Wireless Mouse', 35.00),
(3, 'Office Chair', 180.00),
(3, 'Desk Lamp', 25.00);

INSERT INTO orders (user_id, order_date, status, total_price) VALUES
(1, '2026-08-01', 'Completed', 95.00),
(1, '2026-08-02', 'Completed', 155.00),
(2, '2026-08-03', 'Pending', 180.00),
(3, '2026-08-04', 'Completed', 75.00),
(3, '2026-08-05', 'Shipped', 160.00),
(3, '2026-08-06', 'Completed', 120.00),
(5, '2026-08-07', 'Cancelled', 40.00);

INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 40.00),
(1, 2, 1, 55.00),
(2, 4, 1, 120.00),
(2, 5, 1, 35.00),
(3, 6, 1, 180.00),
(4, 5, 1, 35.00),
(4, 7, 2, 20.00),
(5, 4, 1, 120.00),
(5, 2, 1, 40.00),
(6, 4, 1, 120.00),
(7, 1, 1, 40.00);