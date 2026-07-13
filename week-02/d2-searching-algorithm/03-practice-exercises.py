## Exercise 2:
# Write pseudocode for Binary Search to find a student by ID in a sorted list of 100 students. Calculate how many steps it takes in the worst case.
def binary_search(list, target) :
    left = 0
    right = len(list) - 1
    steps = 0

    while left <= right :
        middle = (left + right) // 2
        steps += 1
        if target == list[middle] :
            return {
                "steps": steps,
                "is_found" : True,
                "index" : middle
            }
        elif target < list[middle] :
            right = middle - 1 
        elif target > list[middle] :
            left = middle + 1

    return {
        "steps" : steps,
        "is_found" : False,
    }

student_id = list(range(1, 101))
first_test = binary_search(student_id, 1)
print(f"jumlah steps: {first_test['steps']} {f"ditemukan pada index: {first_test['index']}" if first_test['is_found'] == True else "tidak ditemukan"}")

second_test = binary_search(student_id, 101)
print(f"jumlah steps: {second_test['steps']} {f"ditemukan pada index: {second_test['index']}" if second_test['is_found'] == True else "tidak ditemukan"}")


## Exercise 3:
# Create a filtered search algorithm to find all products in a price range (e.g., between $50 and $100). Include step counting.

# use linier searching
def filter_product(data, minimum, maximum) :
    results = []
    for baris in data :
        if filter(baris['price'], minimum, maximum) :
            results.append(baris)

    return results

def filter(price, minimum, maximum) :
    if price >= minimum and price <= maximum :
        return True
    else :
        return False

products = [
    {"id": 1, "name": "Wireless Mouse", "price": 25},
    {"id": 2, "name": "Mechanical Keyboard", "price": 75},
    {"id": 3, "name": "Gaming Headset", "price": 95},
    {"id": 4, "name": "USB Flash Drive 64GB", "price": 18},
    {"id": 5, "name": "Portable SSD 500GB", "price": 110},
    {"id": 6, "name": "Webcam HD", "price": 55},
    {"id": 7, "name": "Bluetooth Speaker", "price": 68},
    {"id": 8, "name": "Monitor 24-inch", "price": 145},
    {"id": 9, "name": "Laptop Stand", "price": 42},
    {"id": 10, "name": "Wireless Charger", "price": 58},
    {"id": 11, "name": "External Hard Drive 1TB", "price": 99},
    {"id": 12, "name": "Noise Cancelling Earbuds", "price": 120},
    {"id": 13, "name": "Smart Watch", "price": 89},
    {"id": 14, "name": "Desk Lamp", "price": 35},
    {"id": 15, "name": "Graphic Tablet", "price": 85},
    {"id": 16, "name": "Microphone USB", "price": 65},
    {"id": 17, "name": "Power Bank 20000mAh", "price": 49},
    {"id": 18, "name": "WiFi Router", "price": 79},
    {"id": 19, "name": "Portable Monitor", "price": 180},
    {"id": 20, "name": "Fitness Tracker", "price": 59}
]

# unit test
print("=======================")
first_product_test = filter_product(products, 50, 100)
print(f"jumlah data : {len(first_product_test)}")
for product in first_product_test :
    print(f"name : {product['name']}, price: {product['price']}")


## Exercise 4:
# Compare Linear Search and Binary Search performance by searching for the same item in a sorted list of 1000 numbers. Count and compare the steps taken by each algorithm.
def linier_search(data, target) :
    steps = 0
    for i in range(len(data)) :
        steps += 1
        if target == data[i] :
            return {
                "steps": steps,
                "is_found" : True,
                "index" : i
            }

    return {
            "steps": steps,
            "is_found" : False,
        }

# unit test
print("=======================")
numbers = list(range(1, 1001))
compare_binary_test = binary_search(numbers, 1002)
print(f"jumlah binary steps: {compare_binary_test['steps']} {f"ditemukan pada index: {compare_binary_test['index']}" if compare_binary_test['is_found'] == True else "tidak ditemukan"}")

compare_linier_test = linier_search(numbers, 1002)
print(f"jumlah linier steps: {compare_linier_test['steps']} {f"ditemukan pada index: {compare_linier_test['index']}" if compare_linier_test['is_found'] == True else "tidak ditemukan"}")