CREATE TABLE users (
    id SERIAL PRIMARY KEY,          -- YOUR DECISION: primary key, auto-increment
    username VARCHAR(255) NOT NULL UNIQUE, -- YOUR DECISION: short text, required
    email VARCHAR(255) NOT NULL UNIQUE, -- YOUR DECISION: text, required, max 255 chars
    password_hash VARCHAR(255) NOT NULL, -- YOUR DECISION: text, required (stores hashed password)
    is_active BOOLEAN DEFAULT TRUE,     -- YOUR DECISION: true/false flag, optional
    created_at TIMESTAMP DEFAULT NOW() -- YOUR DECISION: date + time, optional (auto-set)
);


CREATE TABLE products (
    id SERIAL PRIMARY KEY, -- YOUR DECISION: primary key, auto-increment
    name VARCHAR(255) NOT NULL, -- YOUR DECISION: short text, required
    description VARCHAR(1000), -- YOUR DECISION: long text, optional
    price NUMERIC(11, 2) NOT NULL, -- YOUR DECISION: exact decimal, required
    stock_quantity INTEGER NOT NULL DEFAULT 0,  -- YOUR DECISION: whole number, required
    created_at TIMESTAMP DEFAULT NOW()-- YOUR DECISION: date + time, optional (auto-set)
);

-- Table 3: orders
-- Stores one row per purchase transaction
CREATE TABLE orders (
    id SERIAL PRIMARY KEY, -- YOUR DECISION: primary key, auto-increment
    user_id INTEGER NOT NULL, -- YOUR DECISION: whole number (references a user), required
    total_amount NUMERIC(14, 2) NOT NULL, -- YOUR DECISION: exact decimal, required
    status VARCHAR(25) NOT NULL DEFAULT 'waitingForPayment', -- YOUR DECISION: short text (e.g. 'pending', 'shipped'), required
    ordered_at TIMESTAMP DEFAULT NOW() -- YOUR DECISION: date + time, optional (auto-set)
);