

def filter_orders(orders, threshold):
    results = []

    for order in orders:
        if order["amount"] >= threshold:
            results.append(order)

    return results


def summarize_revenue(orders):
    if len(orders) == 0:
        return {
            "status": False,
            "message": "empty order"
        }

    sum_amount = orders[0]["amount"]
    highest = orders[0]
    lowest = orders[0]

    swap_h = 0
    swap_l = 0

    for i in range(1, len(orders)):
        sum_amount += orders[i]["amount"]

        if orders[i]["amount"] > highest["amount"]:
            highest = orders[i]
            swap_h += 1

        if orders[i]["amount"] < lowest["amount"]:
            lowest = orders[i]
            swap_l += 1

    average = sum_amount / len(orders)
    print("swap h: ", swap_h)
    print("swap l: ", swap_l)

    return {
        "status": True,
        "data": {
            "total": sum_amount,
            "average": average,
            "highest": highest,
            "lowest": lowest
        }
    }


def count_orders(orders, field):
    results = {}

    for order in orders:
        key = order[field]

        if key not in results:
            results[key] = 1
        else:
            results[key] += 1

    return results


def find_orders_by_customer(orders, name):
    results = []
    is_found = False

    for order in orders:
        if order["customer"] == name:
            results.append({
                "product": order["product"],
                "amount": order["amount"]
            })
            is_found = True

    if not is_found:
        return {
            "status": False,
            "message": "not found"
        }

    return {
        "status": True,
        "data": results
    }


def classify_orders_by_customer(orders):
    results = {}

    for order in orders:
        customer = order["customer"]

        if customer not in results:
            results[customer] = []

        results[customer].append(order)

    return results


def calculate_amount(orders):
    customer_orders = classify_orders_by_customer(orders)

    results = []

    for customer_name in customer_orders:
        total_amount = 0

        for order in customer_orders[customer_name]:
            total_amount += order["amount"]

        results.append({
            "customer": customer_name,
            "amount": total_amount
        })

    return results


def selection_sort(orders):
    customer_order_amount = calculate_amount(orders)

    n = len(customer_order_amount)
    comparison = 0
    swap = 0
    for i in range(n - 1):
        max_index = i
        for j in range(i + 1, n):
            comparison += 1
            if customer_order_amount[j]["amount"] > customer_order_amount[max_index]["amount"]:
                max_index = j

        if max_index != i:
            customer_order_amount[i], customer_order_amount[max_index] = (
                customer_order_amount[max_index],
                customer_order_amount[i],
            )
            swap += 1
    print(f"selection sort comparison: {comparison}")
    print(f"selection sort swap: {swap}")
    return customer_order_amount


def main(orders, threshold, group_field, name):
    filtered = filter_orders(orders, threshold)

    summary = summarize_revenue(orders)
    order_group = count_orders(orders, group_field)
    order_by_customer = find_orders_by_customer(orders, name)
    sorted_customer_order = selection_sort(orders)

    return {
        "totalOrders": len(orders),
        "significantOrders": len(filtered),
        "summary": summary,
        "orderGroup": order_group,
        "orderByCustomer": order_by_customer,
        "sortedCustomerOrder": sorted_customer_order
    }


# =========================
# Running App
# =========================

orders = [
    {"customer": "Aisha", "product": "Keyboard", "amount": 250, "category": "Electronics"},
    {"customer": "Budi", "product": "Notebook", "amount": 35, "category": "Stationery"},
    {"customer": "Aisha", "product": "Mouse", "amount": 90, "category": "Electronics"},
    {"customer": "Citra", "product": "Monitor", "amount": 1200, "category": "Electronics"},
    {"customer": "Budi", "product": "Pen Set", "amount": 15, "category": "Stationery"},
    {"customer": "Dewi", "product": "Desk Lamp", "amount": 75, "category": "Home"},
    {"customer": "Citra", "product": "Chair", "amount": 320, "category": "Home"},
    {"customer": "Aisha", "product": "USB Cable", "amount": 20, "category": "Electronics"},
    {"customer": "Eko", "product": "Marker", "amount": 8, "category": "Stationery"},
    {"customer": "Dewi", "product": "Headphones", "amount": 180, "category": "Electronics"},
]

threshold = 50
group_field = "category"
name = "Aisha"

reports = main(orders, threshold, group_field, name)

print("=== ONLINE STORE ORDER ANALYSIS ===")
print(f"Total orders: {reports['totalOrders']}")
print(f"Significant orders (>={threshold}) : {reports['significantOrders']}")

print("\n-- Revenue --")
if not reports["summary"]["status"]:
    print(reports["summary"]["message"])
else:
    data = reports["summary"]["data"]
    print(f"Total revenue : {data['total']}")
    print(f"Average order : {data['average']:.2f}")
    print(f"Highest : {data['highest']['product']} ({data['highest']['amount']})")
    print(f"Lowest  : {data['lowest']['product']} ({data['lowest']['amount']})")

print("\n-- Orders per category --")
for key in reports["orderGroup"]:
    print(f"{key} : {reports['orderGroup'][key]}")

print(f"\n-- Customer lookup: {name} --")
if not reports["orderByCustomer"]["status"]:
    print(reports["orderByCustomer"]["message"])
else:
    for product in reports["orderByCustomer"]["data"]:
        print(f"{product['product']} - {product['amount']}")

print("\n-- Top customers --")
for i, customer in enumerate(reports["sortedCustomerOrder"], start=1):
    print(f"{i}. {customer['customer']} - {customer['amount']}")