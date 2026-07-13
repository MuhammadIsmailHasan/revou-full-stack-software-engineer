# there are two pointer
# current index
# current minimum index
# every first loop, these always same

# 1. find minimum value that compare next index with current index
# 2. if next index < current index, then set current minimum index to next index
# 3. change value to the first index of list, then set current index & currrent minimum index with current index


def selection_sort(names) :
    names_length = len(names)
    comparisons = 0
    swaps = 0

    for current_index in range(0, names_length - 1) :
        print(f"pass {current_index + 1} : ")
        print(f"before comparison {names}")

        index_of_minimum = 0
        value_of_minumum = names[current_index]

        # find minimum value and index and set index minimum
        for next_index in range(current_index + 1, names_length - 1) :
            comparisons += 1
            print(f"comparisons : {comparisons} with {names[next_index]} < {value_of_minumum}")
            if names[next_index] < value_of_minumum :
                index_of_minimum = next_index
                value_of_minumum = names[next_index]


        if index_of_minimum != current_index :
            temp = names[current_index]
            names[current_index] = names[index_of_minimum]
            names[index_of_minimum] = temp

            swaps += 1
            print(f"== SWAPS")
        else :
            print("== NO SWAPS")

        print(f"after comparison: {names}")

    results = {
        "names" : names,
        "comparisons" : comparisons,
        "swaps" : swaps
    }
    return results

names = ["Grace", "Alice", "Frank", "Diana", "Charlie", "Henry", "Bob", "Eve"]
do_sort = selection_sort(names)
print(f"new names: {do_sort['names']}")
print(f"comparisons: {do_sort['comparisons']}")
print(f"swaps: {do_sort['swaps']}")