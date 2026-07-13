# ambil index depannya
# masukan valuenya jadi key_acuan
# bandingkan key_acuan dengan value_belakangnya
# jika memenuhi kondisi, maka geser index key_acuan kebelakang
# lakukan pengecekan hal yang sama dengan belakangnya
# akan terus di lakukan sampai index ke 0 jika pengecekan selalu berniai true
# jika di tengah pengecekan sudah bernilai false, stop iterasi
# insert key_acuan ke index yang memenuhi pengecekan itu tadi
# (NOTE INSERT / SWAP CUMA SEKALI), SEBELUMNYA HANYA DILAKUKAN swap index
# lakukan kembali pada index setelahnya yakni index ke 2
# jadi jumlah pass adalah n - 1

def withFor(numbers) :
    n = len(numbers)
    for iteration in range(0, n - 1) :
        index_acuan = iteration + 1
        key_acuan = numbers[index_acuan]
        index_yg_digeser = iteration + 1

        print("pass : ", iteration)
        print("index_acuan : ", index_acuan)

        for step in range(iteration + 1, 0, -1) :
            print("-- indeks step", step)
            print(f"{numbers[step - 1]} > {key_acuan} ?")
            if numbers[step - 1] > key_acuan :
                index_yg_digeser = index_acuan
                index_acuan = step - 1

                print("indeks acuan ditukar menjadi : ", index_acuan)
                print("indeks yg di geser: ", index_yg_digeser)
                print("key acuan", key_acuan)

                if index_acuan != index_yg_digeser:
                    numbers[index_yg_digeser] = numbers[index_acuan]
                    numbers[index_acuan] = key_acuan

                print(f"step {step} :  {numbers}")
                print("--")

        print(f"iteraion {iteration} :  {numbers}")
        print("")

    print(numbers)

def withWhile(numbers) :
    n = len(numbers)

    for iteration in range(0, n - 1) :
        index_acuan = iteration + 1
        key_acuan = numbers[index_acuan]

        step = iteration
        while step >= 0 :
            print(f"number ke step {step} : {numbers[step]} < {key_acuan}")
            if numbers[step] < key_acuan :
                numbers[index_acuan] = numbers[step]
            step -= 1
        print(f"step diluar while {step}")
        if (step != -1) :
            numbers[step] = key_acuan
        print(f"iteration ke-{iteration} adalah {numbers}")
        print("")

    return numbers

numbers = [5, 9, 4, 7, 6, 2, 1, 8, 7]
# [9, 5, 4, 7, 6, 2, 1, 8, 7]
print(withWhile(numbers))



