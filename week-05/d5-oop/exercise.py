class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

    def is_available(self):
        return self.stock > 0

    def apply_discount(self, percentage):
        self.price = self.price - self.price * percentage

    def display(self):
        status = '[In Stock]' if self.is_available() else '[Out of Stock]'
        print(f"{self.name:<10} Rp {self.price:>10,.0f} {status:>15}")


class Cart:
    def __init__(self):
        self.items= []

    def add_item(self, product):
        # YOUR CODE HERE — only add if product.is_available()
        # print a message if the product is out of stock
        if not product.is_available() :
            print(f"the product {product.name} is out of stock")
        else :
            self.items.append(product)
            print(f"Added : {product.name}")

    def remove_item(self, product):
        if product in self.items :
            self.items.remove(product)
        else :
            print(f"product doesn't exists in cart")

    def calculate_total(self):
        return sum(product.price for product in self.items)

    def display_cart(self):
        if len(self.items) > 0 :
            print(f"List products in cart")
            for index, item in enumerate(self.items, 1) :
                print(f"{index}. {item.name}")
        else :
            print("Cart is empty")

# --- Simulation ---
# TODO: Create at least 4 products (one should be out of stock)
laptop = Product("Laptop", 15000000, 5)
mouse = Product("Mouse", 150000, 10)
keyboard = Product("Keyboard", 500000, 7)
handphone = Product("Handphone", 750000, 0)

print("--- Products ---")
laptop.display()
mouse.display()
keyboard.display()
handphone.display()

# TODO: Apply a discount to one product
mouse.apply_discount(0.10)
print()
print("Apply discount at mouse product")
mouse.display()

# TODO: Try adding all products to the cart
print()
print("Add products to cart")
ismail_cart = Cart()
ismail_cart.add_item(laptop)
ismail_cart.add_item(mouse)
ismail_cart.add_item(keyboard)
ismail_cart.add_item(handphone)

print()
print("--- Display cart ---")
ismail_cart.display_cart()

# TODO: Remove one product from the cart
ismail_cart.remove_item(mouse)

print()
print("--- Remove mouse in cart")
ismail_cart.display_cart()

# TODO: Display all remaining cart items and print the total
print()
print("--- Products ---")
for product in ismail_cart.items :
    product.display()

print()
print("--- TOTAL ---")
print(f"Rp {ismail_cart.calculate_total():>15,.0f}")

# Edge Case
print()
print("--- Remove product that there isn't in cart ---")
printer = Product("Printer", 300000, 100)
ismail_cart.remove_item(printer)