# PLAYING GAME
## requirements
    I'm thinking of a number between **1 and 100**. Your job is to guess it!

    **Rules:**

    - You can guess any number
    - I'll tell you if your guess is "too high" or "too low"
    - Try to find the number in as few guesses as possible

**Game 1: Random Guessing**

    Student guesses: 50

    → "Too low!"

    Student guesses: 75

    → "Too high!"

    Student guesses: 60

    → "Too low!"

    Student guesses: 70

    → "Too high!"

    Student guesses: 65

    → "Correct! You found it in 5 guesses!"

**solution**
    SET number = 78
    SET tryingCount = 0
    SET userInput = 0

    WHILE userInput != number :
        SET userInput = INPUT("masukkan angka")
        PRINT("Student guesses: " + userInput)
        
        IF userInput > number THEN
            PRINT("Too high!")
        ELSE userInput < number THEN
            PRINT("Too low!")
        END IF
        SET tryingCount = tryingCount + 1

    END WHILE

    PRINT("Correct! You found it in " + tryingCount + " guesses!")

**Game 2: Strategic Guessing**

    Student guesses: 50 (middle of 1-100)

    → "Too low!" (now we know it's between 51-100)

    Student guesses: 75 (middle of 51-100)

    → "Too high!" (now we know it's between 51-74)

    Student guesses: 62 (middle of 51-74)

    → "Too low!" (now we know it's between 63-74)

    Student guesses: 68 (middle of 63-74)

    → "Correct! You found it in 4 guesses!"

**solution**
    SET minimumRange = 1
    SET maximumRange = 100
    SET number = 68
    SET tryingCount = 0
    SET userInput = 0

    WHILE userInput != number :
        SET userInput = INPUT("masukkan angka")
        PRINT("Student guesses: " + userInput + "(middle" + minimumRange + " - " maximumRange + ")")

        IF userInput > number THEN
            SET maximumRange = userInput - 1
            PRINT("Too Hight! (now we know it's between " + minimumRange + " - " maximumRange + ")") 
        ELSE IF userInput < number THEN
            SET minimumRange = userInput + 1
            PRINT("Too low! (now we know it's between " + minimumRange + " - " maximumRange + ")") 
        END IF

        SET tryingCount = tryingCount + 1
    END WHILE

    PRINT("Correct! You found it in " + tryingCount + " guesses!")


# EXERCISE
## Problem Statement
You are given a list of students with their names and exam scores. Write pseudocode to find and display all students who scored above 80, along with counting how many steps (comparisons) your algorithm takes.

## Requirements
Create a list of at least 8 students with names and scores
Write a filtered search algorithm to find all students with score > 80
Count and display the number of steps (comparisons) your algorithm takes
Display the results showing each student's name and score
Handle the case where no students score above 80
Test your pseudocode with different threshold values (e.g., 70, 85, 90)

## solution
SET students = [
    {name: "Alice", score: 85},
    {name: "Bob", score: 72},
    {name: "Charlie", score: 91},
    {name: "Diana", score: 68},
    {name: "Eve", score: 88},
    {name: "Frank", score: 75},
    {name: "Grace", score: 95},
    {name: "Henry", score: 82}
]

SET threshold = 80

SET results = []
SET steps = 0

FOR i FROM 0 TO LENGTH(students) - 1 :
	SET steps = steps + 1
	IF students[i].score > threshold :
		ADD students[i] TO results
	END IF
END FOR

SET resultLength = LENGTH(results)
PRINT("Example output for threshold: " + threshold);
PRINT("Found" + resultLength + "students with score > " + threshold)
PRINT("Steps taken: " + steps + " (checked all students)")
IF resultLength == 0 THEN
	PRINT("No students scored above " + threshold)
ELSE
	PRINT("High-scoring students:")
	FOR EACH student IN results :
		PRINT("- " + student.name + ": " + student.score)
	END FOR
END IF

