x = 1
y = 1
z = 2
n = 3

result = []
for i in range(0, x + 1):
    data = []
    data.append(i)
    for j in range(0, y + 1):
        data.append(j)
        for k in range(0, z + 1):
            data.append(k)
            if (i + j + k) != n:
                result.append(data.copy())
            data.pop()
        data.pop()
    data.pop()
print(result)

print("============ chance with list comprehension technique")
"""
    rumus = [ekspresi for item iterable kondisi]
    ekpresi =>  hasil dari iterasi yg akan menjadi output, termasuk bentuknya
    for item iterable => loop pada umumnya
    kondisi => pengecekan kondisi dalam loop
     - harus dibungkus dengan list, menandakan hasilnya berupa list
     - jika banyak loop, maka loop dalam loop
    
"""
result_list_comprehension = [
    [i, j, k]
    for i in range(0, x + 1)
    for j in range(0, y + 1)
    for k in range(0, z + 1)
    if i + j + k != n
]

print(result_list_comprehension)
