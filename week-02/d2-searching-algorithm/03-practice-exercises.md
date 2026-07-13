# Exercise 1: 
Write pseudocode for Linear Search that returns the index of the target item. Test it with a list of 10 numbers and count the steps for best, average, and worst cases.

## solution
FUNCTION linierSearch(dataList, target) :
    SET steps = 0
    FOR i FROM 0 TO LENGTH(dataList) - 1 :
        SET steps = steps + 1
        IF dataList[i] == target THEN
            RETURN {
                status_code : 200,
                data : {
                    index : i, 
                    steps : steps
                }
            }
        END IF
    END FOR

    RETURN {
        status_code : 404,
        data : null
    }
END FUNCTION

### unit test
SET data = [10, 78, 45, 12, 43, 45, 90, 57, 19, 20]
linierSearch(data, 10)
    {
        status_code : 200,
        data : {
            index : 0,
            steps : 1
        }
    }

linierSearch(data, 43)
    {
        status_code : 200,
        data : {
            index : 4,
            steps : 5
        }
    }

linierSearch(data, 30)
    {
        status_code : 404,
        data : null
    }


# Exercise 2: 
Write pseudocode for Binary Search to find a student by ID in a sorted list of 100 students. Calculate how many steps it takes in the worst case.

## solution
FUNCTION binarySearch(dataList, target) :
    SET left = 0
    SET right = LENGTH(dataList) - 1
    SET steps = 0

    WHILE left <= right :
        SET middle = (left + right) / 2
        SET steps = steps + 1
        IF target == dataList[middle] THEN
            RETURN steps
        ELSE IF target > dataList[middle] THEN
            SET left = middle + 1
        ELSE IF target < dataList[middle] THEN
            SET right = middle - 1
        END IF
    END WHILE

    RETURN steps
END FUNCTION

### unit test
const studentsId = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100
];

binarySearch(studentsId, 101)
    1# 
        middle = 50
        steps = 1
        left = 51
        right = 99
    2# 
        middle = 80
        steps = 2
        left = 81
        right = 99
    3# 
        middle = 90
        steps = 3
        left = 91
        right = 99
    4#
        middle = 95
        steps = 4
        left = 96
        rigth = 99
    5#
        middle = 98
        steps = 5
        left = 99
        right = 99
    6# 
        middle = 99
        steps = 6
        left = 100
        rigth = 99

