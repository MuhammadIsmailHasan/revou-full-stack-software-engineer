# Exercise 2:
# From a list of 15 products (name, price, stock, category), find all products in "Electronics" category with stock > 0,
# calculate total inventory value, and sort by value descending.

# use typing like pseudocode, please
# use different logic from exercise 1


def filter_products(products) :
    product_filtered = []
    for i in range(0, len(products)) :
        if products[i]['category'] == 'Electronics' and products[i]['stock'] > 0 :
            products[i]['value'] = calcuate_inventory(products[i])
            product_filtered.append(products[i])

    return {
        "filtered" : product_filtered,
        "sorted" : selection_sort(product_filtered)
    }

def calcuate_inventory(product) :
    return product['price'] * product['stock']

def selection_sort (products) :
    for i in range(0, len(products)) :
        max_index_pointer = i
        max_value_pointer = products[max_index_pointer]['value']

        for pointer in range(i + 1, len(products)) :
            if products[pointer]['value'] > max_value_pointer :
                max_index_pointer = pointer
                max_value_pointer = products[pointer]['value']

        if max_index_pointer != i :
            temp = products[i]
            products[i] = products[max_index_pointer]
            products[max_index_pointer] = temp

    return products

products = [
    {"name": "Laptop", "price": 1200, "stock": 10, "category": "Electronics"},
    {"name": "Smartphone", "price": 800, "stock": 15, "category": "Electronics"},
    {"name": "Headphones", "price": 150, "stock": 30, "category": "Electronics"},
    {"name": "Keyboard", "price": 75, "stock": 20, "category": "Electronics"},
    {"name": "Mouse", "price": 40, "stock": 0, "category": "Electronics"},
    {"name": "Desk Chair", "price": 200, "stock": 8, "category": "Furniture"},
    {"name": "Office Desk", "price": 350, "stock": 5, "category": "Furniture"},
    {"name": "Notebook", "price": 5, "stock": 100, "category": "Stationery"},
    {"name": "Pen", "price": 2, "stock": 200, "category": "Stationery"},
    {"name": "Monitor", "price": 300, "stock": 12, "category": "Electronics"},
    {"name": "USB Drive", "price": 25, "stock": 50, "category": "Electronics"},
    {"name": "Printer", "price": 250, "stock": 4, "category": "Electronics"},
    {"name": "Coffee Mug", "price": 12, "stock": 40, "category": "Kitchen"},
    {"name": "Tablet", "price": 500, "stock": 6, "category": "Electronics"},
    {"name": "Webcam", "price": 90, "stock": 18, "category": "Electronics"},
]

do_test = filter_products(products)
print("filtered product")
for row in do_test['filtered'] :
    print(f"name: {row['name']}; value: {row['value']};")

print("")
print("sorted product")
for row in do_test['sorted'] :
    print(f"name: {row['name']}; value: {row['value']};")
