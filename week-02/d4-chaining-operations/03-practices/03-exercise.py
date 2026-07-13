# Exercise 3:
# Analyze a list of 25 orders (id, customer, amount, date, status). Filter completed orders, calculate total revenue, average order value,
# and find the top 5 customers by total spending.

def filter_orders(orders) :
    completed = []
    revenue = 0
    for row in orders :
        if row['status'] == "Completed" :
            revenue += row['amount']
            completed.append(row)

    if len(completed) == 0 :
        average_order = 0
    else :
        average_order = revenue / len(completed)

    order_complete_sorted = bubble_order(completed)

    return {
        "completed" : completed,
        "revenue" : revenue,
        "average" : average_order,
        "top_n" : find_top_n(order_complete_sorted, 5)
    }

def bubble_order(orders) :
    for i in range(0, len(orders)) :
        for j in range(0, len(orders) - i - 1) :
            if orders[j]['amount'] < orders[j + 1]['amount'] :
                temp = orders[j]
                orders[j] = orders[j + 1]
                orders[j + 1] = temp

    return orders

def find_top_n(orders, n) :
    top_n = []
    for i in range(0, n + 1) :
        top_n.append(orders[i])

    return top_n

orders = [
    {"id": 1, "customer": "Alice", "amount": 250.00, "date": "2025-01-05", "status": "Completed"},
    {"id": 2, "customer": "Bob", "amount": 120.50, "date": "2025-01-06", "status": "Pending"},
    {"id": 3, "customer": "Charlie", "amount": 560.00, "date": "2025-01-06", "status": "Completed"},
    {"id": 4, "customer": "Alice", "amount": 180.75, "date": "2025-01-07", "status": "Completed"},
    {"id": 5, "customer": "David", "amount": 320.00, "date": "2025-01-08", "status": "Cancelled"},
    {"id": 6, "customer": "Eva", "amount": 450.00, "date": "2025-01-09", "status": "Completed"},
    {"id": 7, "customer": "Frank", "amount": 95.00, "date": "2025-01-10", "status": "Completed"},
    {"id": 8, "customer": "Grace", "amount": 780.00, "date": "2025-01-11", "status": "Completed"},
    {"id": 9, "customer": "Bob", "amount": 210.00, "date": "2025-01-11", "status": "Completed"},
    {"id": 10, "customer": "Helen", "amount": 640.00, "date": "2025-01-12", "status": "Pending"},
    {"id": 11, "customer": "Ian", "amount": 300.00, "date": "2025-01-13", "status": "Completed"},
    {"id": 12, "customer": "Charlie", "amount": 125.50, "date": "2025-01-14", "status": "Completed"},
    {"id": 13, "customer": "Jack", "amount": 980.00, "date": "2025-01-15", "status": "Completed"},
    {"id": 14, "customer": "Eva", "amount": 275.25, "date": "2025-01-16", "status": "Completed"},
    {"id": 15, "customer": "Karen", "amount": 150.00, "date": "2025-01-17", "status": "Cancelled"},
    {"id": 16, "customer": "Laura", "amount": 510.00, "date": "2025-01-18", "status": "Completed"},
    {"id": 17, "customer": "Mike", "amount": 220.00, "date": "2025-01-19", "status": "Completed"},
    {"id": 18, "customer": "Nina", "amount": 430.00, "date": "2025-01-20", "status": "Pending"},
    {"id": 19, "customer": "Oscar", "amount": 390.00, "date": "2025-01-21", "status": "Completed"},
    {"id": 20, "customer": "Alice", "amount": 700.00, "date": "2025-01-22", "status": "Completed"},
    {"id": 21, "customer": "Grace", "amount": 150.00, "date": "2025-01-23", "status": "Completed"},
    {"id": 22, "customer": "Charlie", "amount": 275.00, "date": "2025-01-24", "status": "Completed"},
    {"id": 23, "customer": "Jack", "amount": 320.00, "date": "2025-01-25", "status": "Completed"},
    {"id": 24, "customer": "Laura", "amount": 180.00, "date": "2025-01-26", "status": "Completed"},
    {"id": 25, "customer": "Bob", "amount": 410.00, "date": "2025-01-27", "status": "Completed"},
]

do_test = filter_orders(orders)
print("completed")
for row in do_test['completed'] :
    print(row)

print("")
print("revenue: ", do_test['revenue'])

print("")
print("average: ", do_test['average'])

print("")
for row in do_test['top_n'] :
    print(row)
