def selection_sort(lists):
    n = len(lists)
    total_comparison = 0
    total_swap = 0

    for i in range(0, n - 1):  # bisa n - 1 atau n -2 (n - 1 percuma karena tidak perlu comparison lagi)
        min_index = i
        print("==== pass index of : ", i)

        comparisons_ponter = 0
        swap_pointer = 0
        for j in range(i + 1, n):
            comparisons_ponter += 1

            print("current pointer index (j) : ", j)
            print("min index: ", min_index)
            print(lists[j], " > ", lists[min_index])

            if (lists[j]['price'] > lists[min_index]['price']):
                min_index = j
                swap_pointer += 1

            print("")
        print("")
        print("comparison in pass : ", i, " is : ", comparisons_ponter)
        print("swap in pass : ", i, " is : ", swap_pointer)

        total_comparison += comparisons_ponter
        total_swap += swap_pointer

        if (min_index != i):
            temp = lists[i]
            lists[i] = lists[min_index]
            lists[min_index] = temp
        print(lists)
        print("")

    print("total comparison: ", total_comparison)
    print("total swap: ", total_swap)


    return {
        "sorted_list" : lists,
        "filtered_list" : linier_search(lists)
    }


def linier_search(lists, ):
    threshold = (25 / 100) * len(lists)
    cheapest = len(lists) - threshold
    results = []

    for i in range(0, len(lists)) :
        if i < threshold or i >= cheapest :
            results.append(lists[i])

    return results

products=[
   {"name": "Keyboard", "price": 75000},
   {"name": "Monitor", "price": 120000},
   {"name": "Mouse", "price": 45000},
   {"name": "Headset", "price": 98000},
   {"name": "Laptop", "price": 250000},
   {"name": "Printer", "price": 180000},
   {"name": "USB Drive", "price": 35000},
   {"name": "Webcam", "price": 150000},
   {"name": "Mouse Pad", "price": 65000},
   {"name": "Tablet", "price": 210000},
   {"name": "HDMI Cable", "price": 55000},
   {"name": "Speaker", "price": 85000}
]

do_test = selection_sort(products)
for baris in do_test['sorted_list'] :
    print(baris['price'])
print("")
for baris in do_test['filtered_list'] :
    print(baris['price'])