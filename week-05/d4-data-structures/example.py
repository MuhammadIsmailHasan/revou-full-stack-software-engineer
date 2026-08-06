# student_registry.py

registry = [
    {"name": "Alice",   "score": 92},
    {"name": "Budi",    "score": 68},
    {"name": "Charlie", "score": 85},
    {"name": "Diana",   "score": 55},
    {"name": "Eko",     "score": 97},
    {"name": "Farah",   "score": 74},
]


def add_grade_and_status(students):
    for student in students:
        score = student["score"]
        if score >= 90:
            student["grade"] = "A"
        elif score >= 75:
            student["grade"] = "B"
        elif score >= 60:
            student["grade"] = "C"
        else:
            student["grade"] = "F"
        student["passed"] = score >= 75


def find_student(students, name):
    for student in students:
        if student["name"].lower() == name.lower():
            return student
    return None


def class_statistics(students):
    scores = [s["score"] for s in students]
    passing = [s for s in students if s.get("passed", False)]
    return {
        "highest":   max(scores),
        "lowest":    min(scores),
        "average":   round(sum(scores) / len(scores), 2),
        "pass_rate": round(len(passing) / len(students) * 100, 1),
    }


def print_report(students):
    print(f"\n{'Name':<10} {'Score':<8} {'Grade':<7} {'Status'}")
    print("-" * 38)
    for s in students:
        status = "Passed" if s["passed"] else "Failed"
        print(f'{s["name"]:<10} {s["score"]:<8} {s["grade"]:<7} {status}')


# ── Run ──────────────────────────────────────────────
add_grade_and_status(registry)
print_report(registry)

stats = class_statistics(registry)
print(f"\nHighest : {stats['highest']}")
print(f"Lowest  : {stats['lowest']}")
print(f"Average : {stats['average']}")
print(f"Pass rate: {stats['pass_rate']}%")

result = find_student(registry, "eko")
if result:
    print(f"\nFound: {result['name']} — Score: {result['score']}, Grade: {result['grade']}")
else:
    print("Student not found.")