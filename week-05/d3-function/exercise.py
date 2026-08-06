# Exercise: Invoice Calculator
# Follow Single Responsibility — one function per calculation

# TODO 1: calculate_discount
# Returns the DISCOUNT AMOUNT (e.g., 10% of 100000 = 10000)
def calculate_discount(price, discount_rate=0.10):
    return price * discount_rate


# TODO 2: calculate_tax
# Applies discount first, then calculates PPN on the discounted price
# Returns the TAX AMOUNT only
def calculate_tax(price, tax_rate=0.11, discount=0.0):
    discount_price = calculate_discount(price, discount)
    return (price - discount_price) * tax_rate


# TODO 3: calculate_total
# Calls calculate_discount and calculate_tax internally
# Returns: (price - discount) + tax
def calculate_total(price, discount_rate=0.10, tax_rate=0.11):
    discount = calculate_discount(price, discount_rate)
    tax = calculate_tax(price, tax_rate)
    return (price - discount) + tax


# ── Main program ──────────────────────────────────────────────────────────────
products = [
    {"name": "Laptop",   "price": 8500000, "discount_rate": 0.10},
    {"name": "Mouse",    "price": 250000,  "discount_rate": 0.05},
    {"name": "Keyboard", "price": 450000,  "discount_rate": 0.0},
]

print("=" * 70)
print(f"{'INVOICE SUMMARY':^70}")
print("=" * 70)
print(f"{'Product':<12} {'Price':>12} {'Discount':>12} {'Tax':>12} {'Total':>12}")
print("-" * 70)

for product in products:
    name = product["name"]
    price = product["price"]
    rate = product["discount_rate"]

    total_price = calculate_total(price, rate)
    discount_price = calculate_discount(price, rate)
    tax = calculate_tax(price, tax_rate=0.11, discount=rate)
    
    # TODO 4: call your functions to get discount, tax, and total
    # Use keyword arguments for at least the Laptop call
    # Print the formatted row — see expected output for alignment
    print(f"{name:<11} Rp{price:>12,.0f} Rp{discount_price:>10,.0f} Rp{tax:>10,.0f} Rp{total_price:>12,.0f}")

print("=" * 70)