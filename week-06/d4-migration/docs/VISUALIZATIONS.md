# Many-to-Many Visualizations & Examples

## 1. Database Structure Diagram

### Simple View (One-to-Many vs Many-to-Many)

```
┌────────────────────────────────────────────────────────────────┐
│  ONE-TO-MANY (Kategori ↔ Produk)                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  CATEGORY                        PRODUCT                      │
│  ┌──────────────┐               ┌──────────────┐             │
│  │ id (PK)      │               │ id (PK)      │             │
│  │ name         │───────FK──────│ category_id  │             │
│  └──────────────┘     1:N       └──────────────┘             │
│                                                                │
│  One category has many products                              │
│  Product belongs to one category                             │
└────────────────────────────────────────────────────────────────┘


┌────────────────────────────────────────────────────────────────┐
│  MANY-TO-MANY (Student ↔ Course)                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  STUDENT                   STUDENT_COURSES        COURSE      │
│  ┌──────────────┐          ┌──────────────┐      ┌──────────┐│
│  │ id (PK)      │──FK──────│ student_id   │      │ id (PK) ││
│  │ name         │          │ course_id────│──FK──│ name    ││
│  │ email        │          └──────────────┘      └──────────┘│
│  └──────────────┘                                             │
│      │                                                         │
│      │ Many students can take many courses                   │
│      │ Many courses can have many students                   │
│      │ Association table holds the relationships             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 2. Data Example

### Example Data Set

```
STUDENTS:
┌────┬──────────────┬─────────────────────┐
│ ID │ Name         │ Email               │
├────┼──────────────┼─────────────────────┤
│ 1  │ Ismail       │ ismail@example.com  │
│ 2  │ Ahmad        │ ahmad@example.com   │
│ 3  │ Siti         │ siti@example.com    │
│ 4  │ Budi         │ budi@example.com    │
└────┴──────────────┴─────────────────────┘

COURSES:
┌────┬────────────────────────────┬──────┐
│ ID │ Name                       │ Code │
├────┼────────────────────────────┼──────┤
│ 1  │ Introduction to Python     │ PY101 │
│ 2  │ Web Development w/ Flask   │ WEB201│
│ 3  │ Database Design            │ DB301 │
│ 4  │ REST API Development       │ API401│
└────┴────────────────────────────┴──────┘

STUDENT_COURSES (Association Table):
┌────────────┬───────────┐
│ student_id │ course_id │
├────────────┼───────────┤
│ 1          │ 1         │  ← Ismail takes PY101
│ 1          │ 2         │  ← Ismail takes WEB201
│ 1          │ 3         │  ← Ismail takes DB301
│ 2          │ 1         │  ← Ahmad takes PY101
│ 2          │ 2         │  ← Ahmad takes WEB201
│ 3          │ 2         │  ← Siti takes WEB201
│ 3          │ 4         │  ← Siti takes API401
│ 4          │ 1         │  ← Budi takes PY101
│ 4          │ 3         │  ← Budi takes DB301
│ 4          │ 4         │  ← Budi takes API401
└────────────┴───────────┘
```

### Visual Representation of Relationships

```
PY101 (Intro Python)        WEB201 (Flask)          DB301 (Database)        API401 (REST API)
    ↓                           ↓                       ↓                         ↓
    │                           │                       │                         │
    ├─→ Ismail                  ├─→ Ismail              ├─→ Ismail               ├─→ Siti
    ├─→ Ahmad                   ├─→ Ahmad              │                        └─→ Budi
    └─→ Budi                    └─→ Siti               ├─→ Budi
                                                       └─→ Budi (duplicate?)


Course Enrollment Count:
┌─────────────┬──────────┐
│ Course      │ Students │
├─────────────┼──────────┤
│ PY101       │ 3        │  (Ismail, Ahmad, Budi)
│ WEB201      │ 3        │  (Ismail, Ahmad, Siti)
│ DB301       │ 2        │  (Ismail, Budi)
│ API401      │ 2        │  (Siti, Budi)
└─────────────┴──────────┘

Student Course Load:
┌─────────────┬─────────┐
│ Student     │ Courses │
├─────────────┼─────────┤
│ Ismail      │ 3       │  (PY101, WEB201, DB301)
│ Ahmad       │ 2       │  (PY101, WEB201)
│ Siti        │ 2       │  (WEB201, API401)
│ Budi        │ 3       │  (PY101, DB301, API401)
└─────────────┴─────────┘
```

---

## 3. Python Code Execution Flow

### Creating Relationships

```
CREATE RELATIONSHIPS:

Step 1: Create objects
┌─────────────────────────────────┐
│ student = Student(name='Ismail')│
│ course = Course(code='PY101')   │
│ db.session.add(student)         │
│ db.session.add(course)          │
│ db.session.commit()             │
└─────────────────────────────────┘
         ↓
Step 2: Add relationship
┌─────────────────────────────────┐
│ student.courses.append(course)  │
│ db.session.commit()             │
│                                 │
│ INSERT INTO student_courses     │
│ VALUES (1, 1)                   │
└─────────────────────────────────┘
         ↓
Step 3: Query to verify
┌─────────────────────────────────┐
│ for c in student.courses:       │
│   print(c.name)                 │
│ # Output: Introduction to Python│
└─────────────────────────────────┘
```

---

## 4. Query Flow Diagrams

### Query 1: Find all courses for a student

```
START: Get courses for Ismail (ID=1)
  │
  ├─→ Load Student with ID=1
  │     │
  │     └─→ SELECT * FROM students WHERE id=1
  │           ↓
  │           Result: Ismail
  │
  ├─→ Access student.courses
  │     │
  │     └─→ Query association table
  │           SELECT course_id FROM student_courses 
  │           WHERE student_id = 1
  │           ↓
  │           Result: [1, 2, 3]
  │
  ├─→ Load Course objects
  │     │
  │     └─→ SELECT * FROM courses WHERE id IN (1, 2, 3)
  │           ↓
  │           Result: [
  │             Course(1, PY101),
  │             Course(2, WEB201),
  │             Course(3, DB301)
  │           ]
  │
  └─→ RETURN: [PY101, WEB201, DB301]

PYTHON CODE:
student = Student.query.get(1)
courses = student.courses  ← All queries happen automatically
for course in courses:
    print(course.name)
```

### Query 2: Find all students in a course (using backref)

```
START: Get students in WEB201 (ID=2)
  │
  ├─→ Load Course with ID=2
  │     │
  │     └─→ SELECT * FROM courses WHERE id=2
  │           ↓
  │           Result: WEB201
  │
  ├─→ Access course.students (via backref)
  │     │
  │     └─→ Query association table
  │           SELECT student_id FROM student_courses 
  │           WHERE course_id = 2
  │           ↓
  │           Result: [1, 2, 3]
  │
  ├─→ Load Student objects
  │     │
  │     └─→ SELECT * FROM students WHERE id IN (1, 2, 3)
  │           ↓
  │           Result: [
  │             Student(1, Ismail),
  │             Student(2, Ahmad),
  │             Student(3, Siti)
  │           ]
  │
  └─→ RETURN: [Ismail, Ahmad, Siti]

PYTHON CODE:
course = Course.query.get(2)
students = course.students  ← Uses backref
for student in students:
    print(student.name)
```

---

## 5. API Request/Response Flow

### Enrollment Process

```
┌─────────────────────────────────────────────────────────┐
│ Client sends: POST /api/m2m/students/1/enroll/2        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Flask Route Handler:                                 │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 1. Parse student_id=1, course_id=2              │ │
│  │ 2. Query: student = Student.query.get(1)        │ │
│  │ 3. Query: course = Course.query.get(2)          │ │
│  │ 4. Check: if course in student.courses → 400    │ │
│  │ 5. Add: student.courses.append(course)          │ │
│  │ 6. Commit: db.session.commit()                  │ │
│  │           ↓                                      │ │
│  │      INSERT INTO student_courses                │ │
│  │      VALUES (1, 2)                              │ │
│  │ 7. Return: {"message": "Enrolled successfully"} │ │
│  └──────────────────────────────────────────────────┘ │
│                        ↓                              │
│ Client receives: 201 Created                         │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Comparison: Different Relationship Types

```
┌──────────────────────────────────────────────────────────────┐
│ ONE-TO-ONE RELATIONSHIP                                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ User (1) ────────── Profile (1)                            │
│                                                              │
│ Code:                                                        │
│ class User(db.Model):                                        │
│     profile = db.relationship('Profile', uselist=False)     │
│                                                              │
│ Data Structure:                                              │
│ User(id=1) → Profile(id=1)                                 │
│ One user has exactly one profile                           │
│                                                              │
└──────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────┐
│ ONE-TO-MANY RELATIONSHIP                                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ User (1) ───────┬── Post (N)                               │
│                 ├── Post                                    │
│                 └── Post                                    │
│                                                              │
│ Code:                                                        │
│ class User(db.Model):                                        │
│     posts = db.relationship('Post', backref='author')      │
│                                                              │
│ Data Structure:                                              │
│ User(id=1) → [Post(id=1), Post(id=2), Post(id=3)]         │
│ One user has many posts                                     │
│ One post belongs to one user                                │
│                                                              │
└──────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────┐
│ MANY-TO-MANY RELATIONSHIP                                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│         Student (N) ──────── Course (N)                    │
│          ├─ Student 1 ────────────┬─ Course A             │
│          ├─ Student 2 ────────┬───┴─ Course B             │
│          └─ Student 3 ────┬───┴────── Course C            │
│                           │                                │
│         Association Table (student_courses)                │
│                                                              │
│ Code:                                                        │
│ student_courses = db.Table(...)                             │
│ class Student(db.Model):                                     │
│     courses = db.relationship('Course',                     │
│                  secondary=student_courses)                │
│                                                              │
│ Data Structure:                                              │
│ Student(id=1) → [Course(id=1), Course(id=2)]              │
│ Student(id=2) → [Course(id=1), Course(id=3)]              │
│ Student(id=3) → [Course(id=2)]                            │
│ Many students can take many courses                         │
│ Many courses can have many students                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 7. SQL Queries Behind the Scenes

### Python Code → SQL Translation

```python
# PYTHON CODE:
student = Student.query.get(1)
courses = student.courses

# GENERATES SQL:
SELECT * FROM students WHERE id = 1;

SELECT courses.* FROM courses 
JOIN student_courses ON courses.id = student_courses.course_id
WHERE student_courses.student_id = 1;

---

# PYTHON CODE:
courses = Course.query.filter(Course.students.any(Student.id == 1))

# GENERATES SQL:
SELECT courses.* FROM courses
WHERE EXISTS (
    SELECT 1 FROM student_courses
    WHERE student_courses.course_id = courses.id
    AND student_courses.student_id = 1
);

---

# PYTHON CODE:
student.courses.append(course)
db.session.commit()

# GENERATES SQL:
INSERT INTO student_courses (student_id, course_id) 
VALUES (1, 2);

---

# PYTHON CODE:
student.courses.remove(course)
db.session.commit()

# GENERATES SQL:
DELETE FROM student_courses 
WHERE student_id = 1 AND course_id = 2;
```

---

## 8. Common Patterns

### Pattern 1: Check Membership

```
Check if course is in student's courses:

Python:
    if course in student.courses:
        print("Enrolled")
    else:
        print("Not enrolled")

Behind the scenes:
    SELECT 1 FROM student_courses
    WHERE student_id = 1 AND course_id = 2
    LIMIT 1;
```

### Pattern 2: Count Relationships

```
Count how many courses a student has:

Python:
    count = len(student.courses)

Behind the scenes:
    SELECT COUNT(*) FROM student_courses
    WHERE student_id = 1;
```

### Pattern 3: Conditional Add

```
Add relationship only if not already exists:

Python:
    if course not in student.courses:
        student.courses.append(course)
        db.session.commit()

Behind the scenes:
    1. SELECT FROM student_courses WHERE ... (check)
    2. INSERT INTO student_courses ... (if not exists)
```

---

## 9. Performance Considerations

### Lazy Loading (Default)

```
SLOW for multiple queries:
    students = Student.query.all()  # 1 query
    for student in students:        # N queries!
        for course in student.courses:
            print(course.name)

Total: 1 + N queries (N+1 problem)
```

### Eager Loading (Recommended)

```
FAST for known access patterns:
    students = Student.query.options(
        joinedload(Student.courses)
    ).all()  # 1 query with JOIN
    
    for student in students:        # No additional queries!
        for course in student.courses:
            print(course.name)

Total: 1 query
```

