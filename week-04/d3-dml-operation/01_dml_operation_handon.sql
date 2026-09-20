CREATEDB revoshop_db

psql revoshop_db
\l
\dt

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL UNIQUE,
	email VARCHAR(255) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
	is_active BOOLEAN DEFAULT TRUE,
	created_at TIMESTAMP DEFAULT NOW()
)

CREATE TABLE books (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	author VARCHAR(255) NOT NULL,
	price NUMERIC(10, 2) NOT NULL CONSTRAINT book_price_positive CHECK (price > 0),
	stock_quantity INTEGER NOT NULL DEFAULT 0 CONSTRAINT book_stock_non_negative CHECK (stock_quantity >= 0),
	create_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	total_amount NUMERIC(10, 2) NOT NULL,
	status VARCHAR(20) NOT NULL DEFAULT 'pending' CONSTRAINT order_valid_status CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
	ordered_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (username, email, password_hash)
VALUES ('budi123', 'budi@mail.com', 'hashed_password_here');

-- Test 2: Insert duplicate email (should fail with UNIQUE error)
INSERT INTO users (username, email, password_hash)
VALUES ('budi456', 'budi@mail.com', 'another_hash');

-- Test 3: Insert book with negative price (should fail with CHECK error)
INSERT INTO books (title, author, price, stock_quantity)
VALUES ('Pemrograman Python', 'Ani Rahayu', -50000, 10);

-- Test 4: Insert valid book (should succeed)
INSERT INTO books (title, author, price, stock_quantity)
VALUES ('Pemrograman Python', 'Ani Rahayu', 85000, 10);
