// Sorting Names Exercise

FUNCTION bubbleSort(names) 
    SET namesLength = LENGTH(names)
    SET comparisons = 0
    SET swaps = 0
    
    FOR i FROM 0 TO namesLength - 1 
        PRINT "pass " + (i + 1) + ":"
    
        FOR j FROM 0 TO namesLength - i - 2 
            PRINT "Compare" + names[j] + " and " + names[j + 1]

            SET comparisons = comparisons + 1
            
            IF names[j] > names[j + 1] THEN 
                SET swaps = swaps + 1
                
                SET temp = names[j] 
                SET names[j] = names[j + 1]
                SET names[j + 1] = temp
    
                PRINT "swaps"
            ELSE 
                PRINT "no swaps"
            END IF
        END FOR
    
        PRINT "after pass : " + names
    END FOR
    
    PRINT "comparisions : " + comparisons
    PRINT "swaps : " + swaps

    RETURN {
        "names" : names,
        "comparisions" : comparisions,
        "swaps" : swaps
    }
END FUNCTION

SET names = ["Grace", "Alice", "Frank", "Diana", 
             "Charlie", "Henry", "Bob", "Eve"]
SET bubleTest = bubbleSort(names)
PRINT "Sorted list: " + bubleTest.names
PRINT "Comparisons: " + bubleTest.comparisions
PRINT "Swaps" + bubleTest.swaps
