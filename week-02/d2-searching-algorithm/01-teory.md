# seaching algorithm
## learning goal
to understand the concept and how the searching algorithm word, pros and cons, determine either linier or binary to solve the problem effectively
there are 2 algorithms :
- linear
    - uses to the unsorted dataset
    - it will loop for entire data
    - good for choice with data count < 100
    - uses to filtering because it will check every single data
    - takes n steps (n is length of dataset)
- binary 
    - uses only to the sorted dataset because the validation index will be invalid if the data unset
    - it will devide data to 2 piecies, then comparison the target to each piece. choose the piece which have range of target. remove data which didnot range in the target
    - very good choice with data count > 1000
    - takes log2(n)

## concept
searching is used by :
- seaching data from dataset
- filtering data by query user

## general pattern
- linier 
    FOR i FROM 0 TO LENGTH(data) - 1 :
        IF data[i] == target THEN
            "data found"
        END IF
    END FOR

- binary
    left = 0
    right = 100
    middle = (left + right) / 2
    WHILE left <= right :
        IF target == data[middle] THEN
            "data found"
        ELSE IF target < data[middle] THEN
            right = middle - 1
        ELSE IF target > data[middle] THEN
            left = middle + 1
        END IF
    END WHILE

## complexity

## common problems
- filter products in ecommerce by name, or price > 1000000
- searching a word in dictionary app
- searching a student with name of ismail