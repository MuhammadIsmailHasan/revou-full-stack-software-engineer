scores = [72, 88, 95, 61, 79, 83]
print(f"First: {scores[0]}")
print(f"Last: {scores[-1]}")
print(f"Third: {scores[2]}")
print(f"First 3: {scores[:4]}")
print(f"First 3: {scores[3:]}")

scores.append(90) # always add at the last of list, FIFO
# use insert for adding with spesific index 
# insert(index, value)
print(f"After Append: {scores}")

scores.remove(min(scores)) # it will remove the first value that is found
# use pop for removing with spesific index 
# pop(index)
# or it will remove the last index if doesn't input the index
# pop()
print(f"After Remove: {scores}")

print(f"Highest: {max(scores)}")
print(f"Highest: {min(scores)}")
print(f"Highest: {sum(scores) / len(scores)}")

# make new variable
sorted_score = sorted(scores)

for index, score in enumerate(sorted_score, 1) :
    print(f"Rank {index}: {score}")
    
print(f"original list doesn't sorted: {scores}")

scores.sort()
print(f"original list was sorted asc: {scores}")

scores.sort(reverse=True)
print(f"original list was sorted desc: {scores}")

