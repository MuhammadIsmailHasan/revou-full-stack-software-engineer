# Exercise 1:
# Given a list of 20 student records (name, age, grade, attendance), filter students with grade >= 80 AND attendance >= 90,
# then calculate their average grade.

# use typing like pseudocode, please

def process_data(students) :
    students_filtered = filter_students(students)
    grade_average = calculate_average(students_filtered)

    return {
        "students" : students_filtered,
        "grade_average" : grade_average
    }

def filter_students(students) :
    students_filtered = []
    for row in range(0, len(students)) : # it's more like pseudocode than format (for row in students)
        if students[row]['grade'] >= 80 and students[row]['attendance'] >= 90 :
            students_filtered.append(students[row])

    return students_filtered

def calculate_average(students) :
    results = 0
    if len(students) == 0 :
        return 0
    else :
        sum = 0
        index = 0
        while index < len(students) :
            sum += students[index]['grade']
            index += 1

        results = sum / len(students)

    return results
# run
students = [
    {"name": "Alice", "age": 16, "grade": 85, "attendance": 95},
    {"name": "Bob", "age": 17, "grade": 72, "attendance": 88},
    {"name": "Charlie", "age": 16, "grade": 91, "attendance": 91},
    {"name": "David", "age": 18, "grade": 78, "attendance": 85},
    {"name": "Eva", "age": 17, "grade": 88, "attendance": 97},
    {"name": "Frank", "age": 16, "grade": 95, "attendance": 93},
    {"name": "Grace", "age": 17, "grade": 67, "attendance": 80},
    {"name": "Helen", "age": 18, "grade": 82, "attendance": 90},
    {"name": "Ian", "age": 16, "grade": 79, "attendance": 89},
    {"name": "Julia", "age": 17, "grade": 90, "attendance": 96},
    {"name": "Kevin", "age": 18, "grade": 84, "attendance": 94},
    {"name": "Laura", "age": 16, "grade": 76, "attendance": 87},
    {"name": "Michael", "age": 17, "grade": 93, "attendance": 98},
    {"name": "Nina", "age": 18, "grade": 81, "attendance": 92},
    {"name": "Oscar", "age": 16, "grade": 69, "attendance": 84},
    {"name": "Paula", "age": 17, "grade": 87, "attendance": 91},
    {"name": "Quinn", "age": 18, "grade": 92, "attendance": 95},
    {"name": "Rachel", "age": 16, "grade": 75, "attendance": 86},
    {"name": "Steve", "age": 17, "grade": 80, "attendance": 90},
    {"name": "Tina", "age": 18, "grade": 89, "attendance": 97},
]

do_test = process_data(students)

for row in do_test['students'] :
    print(f"name: {row['name']}; grade: {row['grade']}; attendance: {row['attendance']};")

print(f"average grade: {do_test['grade_average']}")