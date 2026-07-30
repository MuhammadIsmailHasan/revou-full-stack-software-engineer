-- ============================================================
-- Exercise: revoshop_db — orders + order_items tables
-- ===========================================================
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	is_active BOOLEAN DEFAULT TRUE,
	created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (id, username, password) 
VALUES 
	(1001, 'muhammad', 11111),
	(1002, 'ismail', 22222),
	(1003, 'hasan', 33333);


------------------------------------------------------------------------
-- Step 1: Verify base tables exist
SELECT id, username FROM users LIMIT 3;


------------------------------------------------------------------------
-- Step 2: Create the orders table
-- TODO: Write CREATE TABLE orders with FK constraint
-- Remember: users table must exist first!
CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES users(id),
	total_amount NUMERIC(14, 2) NOT NULL,
	ordered_at TIMESTAMP DEFAULT NOW(),
	CONSTRAINT fk_orders_users 
		FOREIGN KEY (user_id) REFERENCES users(id)
		ON DELETE RESTRICT
);


------------------------------------------------------------------------
-- Step 3: Insert a valid order
-- TODO: Insert an order for an existing user_id
INSERT INTO orders (user_id, total_amount)
VALUES (1001, 1000000), (1001, 200000), (1002, 3000000), (1003, 4000000);

------------------------------------------------------------------------
-- Step 4: Test the FK violation
-- TODO: Try inserting an order with user_id = 9999
-- Paste the error you receive as a comment below:
INSERT INTO orders (user_id, total_amount)
VALUES (9999, 500000);
-- ERROR: insert or update on table "users" violates foreign key constaint


------------------------------------------------------------------------
-- Step 5: Test the RESTRICT behaviour
-- TODO: Try deleting the user who owns the order above
-- Paste the error you receive as a comment below:

DELETE from users WHERE id = 1002;
-- ERROR: update or delete on table "users" violates foreign key constaint


------------------------------------------------------------------------
-- Step 6: Create the order_items junction table
-- TODO: Write CREATE TABLE order_items with:
--   - order_id FK (CASCADE on delete)
--   - product_id FK (RESTRICT on delete)
--   - composite PRIMARY KEY
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(11, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO products (id, name, price, stock_quantity)
VALUES (5001, 'sepatu', 90000, 5), (5002, 'sandal', 8000, 2), (5003, 'topi', 7000, 4), (5004, 'chromebook', 10000, 6);

CREATE TABLE order_items (
	order_id INT NOT NULL,
	product_id INT NOT NULL,
	PRIMARY KEY (order_id, product_id), -- it will prevent duplicate for combination of order_id & product_id
	CONSTRAINT fk_oi_orders
		FOREIGN KEY (order_id) REFERENCES orders(id)
		ON DELETE CASCADE, 
	CONSTRAINT fk_oi_products
		FOREIGN KEY (product_id) REFERENCES products(id)
		ON DELETE RESTRICT
);

INSERT INTO order_items (order_id, product_id)
VALUES (2, 5001), (2, 5002), (3, 5002), (4, 5004);

DELETE FROM orders WHERE id = 2;
DELETE FROM products WHERE id = 5002;
-- ERROR : update or delete on table "products" violates restrict setting of foreign key constraint

DELETE FROM order_items WHERE order_id = 3;
DELETE FROM order_items WHERE product_id = 5004;

-- Step 7: Verify structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name IN ('orders', 'order_items')
ORDER BY table_name, ordinal_position;
