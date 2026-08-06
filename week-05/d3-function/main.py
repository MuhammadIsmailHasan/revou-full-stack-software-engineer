def calculate_subtotal(price, quantity):
    return price * quantity

def calculate_discount(subtotal, discount_rate=0.0):
    return subtotal * discount_rate

def calculate_tax(amount, tax_rate=0.11):
    return amount * tax_rate

def calculate_total(subtotal, discount_rate=0.0, tax_rate=0.11):
    discount = calculate_discount(subtotal, discount_rate)
    after_discount = subtotal - discount
    tax = calculate_tax(after_discount, tax_rate)
    return after_discount + tax

def print_invoice(customer_name, items, discount_rate=0.0, tax_rate=0.11):
    print(f"{'='*44}")
    print(f"  INVOICE — {customer_name}")
    print(f"{'='*44}")

    overall_subtotal = 0
    for item in items:
        line_total = calculate_subtotal(item['price'], item['qty'])
        overall_subtotal += line_total
        print(f"  {item['name']:<20} x{item['qty']}  Rp{line_total:>10,.0f}")

    discount_amt = calculate_discount(overall_subtotal, discount_rate)
    after_discount = overall_subtotal - discount_amt
    tax_amt = calculate_tax(after_discount, tax_rate)
    total = after_discount + tax_amt

    print(f"{'─'*44}")
    print(f"  {'Subtotal':<30} Rp{overall_subtotal:>10,.0f}")
    if discount_rate > 0:
        print(f"  {'Discount (' + str(int(discount_rate*100)) + '%)':<30} Rp{discount_amt:>10,.0f}")
    print(f"  {'PPN (' + str(int(tax_rate*100)) + '%)':<30} Rp{tax_amt:>10,.0f}")
    print(f"{'='*44}")
    print(f"  {'TOTAL':<30} Rp{total:>10,.0f}")
    print(f"{'='*44}")

# Main
order_items = [
    {'name': 'Laptop Asus',    'price': 8500000, 'qty': 1},
    {'name': 'Mouse Wireless', 'price': 250000,  'qty': 2},
    {'name': 'USB Hub',        'price': 150000,  'qty': 1},
]
print_invoice("Budi Santoso", order_items, discount_rate=0.10)