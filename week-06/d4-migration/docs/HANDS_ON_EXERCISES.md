# Hands-On Exercises: Many-to-Many Relationships

Latihan interaktif untuk mempraktekan Many-to-Many relationships dalam Flask.

---

## Exercise 1: Basic Setup

### Objective
Membuat Association Table dan Models dasar.

### Steps

**1.1** Buat file `exercise1_models.py`:

```python
from utils import db

# TODO 1: Create association table
# Hints:
# - Use db.Table()
# - Name it: student_courses
# - Columns: student_id (FK), course_id (FK)
# - Both are primary keys
student_courses = db.Table(...)  # FILL THIS IN

# TODO 2: Create Student model
class Student(db.Model):
    # FILL THIS IN
    pass

# TODO 3: Create Course model
class Course(db.Model):
    # FILL THIS IN
    pass
```

**1.2** Solusi dapat dilihat di: `example_many_to_many.py` (lines 1-60)

### Verification

```python
# Buka Flask shell
flask shell

>>> from exercise1_models import Student, Course
>>> student = Student(name='Test', email='test@example.com', nim='001')
>>> course = Course(name='Python', code='PY101')
>>> db.session.add_all([student, course])
>>> db.session.commit()
>>> 
>>> # Verify relationship works
>>> student.courses.append(course)
>>> db.session.commit()
>>> print(student.courses)
[<Course PY101: Python>]
```

---

## Exercise 2: CRUD Operations

### Objective
Mengimplementasikan Create, Read, Update, Delete operations pada Many-to-Many.

### Steps

**2.1** Implementasikan fungsi di `exercise2_crud.py`:

```python
from models import Student, Course, db

# CREATE
def create_and_enroll():
    """Create student, course, dan enroll student ke course"""
    # TODO: 
    # 1. Create student with name='Adi', email='adi@example.com', nim='007'
    # 2. Create course with name='Node.js', code='NODE501'
    # 3. Add both to session and commit
    # 4. Enroll student ke course
    # 5. Commit again
    # 6. Return student dan course objects
    pass

# READ
def get_student_courses(student_id):
    """Ambil semua courses untuk seorang student"""
    # TODO:
    # 1. Query student by id
    # 2. Return student dan list of courses
    pass

def get_course_students(course_id):
    """Ambil semua students di satu course"""
    # TODO:
    # 1. Query course by id
    # 2. Return course dan list of students
    pass

# UPDATE
def change_student_enrollment(student_id, old_course_id, new_course_id):
    """Unenroll dari satu course, enroll ke course lain"""
    # TODO:
    # 1. Get student, old course, new course
    # 2. Remove old course
    # 3. Add new course
    # 4. Commit
    pass

# DELETE
def unenroll_all_courses(student_id):
    """Unenroll student dari semua courses"""
    # TODO:
    # 1. Get student
    # 2. Clear all courses
    # 3. Commit
    pass
```

**2.2** Test di Flask shell:

```python
flask shell

>>> from exercise2_crud import *
>>> 
>>> # Create
>>> student, course = create_and_enroll()
>>> print(f"Created: {student.name} in {course.name}")
>>> 
>>> # Read
>>> s_courses = get_student_courses(student.id)
>>> print(f"Student takes: {len(s_courses)} courses")
>>> 
>>> # Update
>>> new_course = Course(name='Docker', code='DOCKER601')
>>> db.session.add(new_course)
>>> db.session.commit()
>>> change_student_enrollment(student.id, course.id, new_course.id)
>>> print(f"New courses: {[c.code for c in student.courses]}")
```

### Expected Output

```
Created: Adi in Node.js
Student takes: 1 courses
New courses: ['DOCKER601']
```

---

## Exercise 3: Query and Filter

### Objective
Membuat complex queries dengan Many-to-Many relationships.

### Steps

**3.1** Implementasikan queries di `exercise3_queries.py`:

```python
from models import Student, Course
from sqlalchemy import func

# Query 1: Find students taking specific course
def students_in_course(course_code):
    """
    Find semua students yang mengambil course dengan code tertentu
    
    Expected return: List of Student objects
    Example: students_in_course('PY101') → [Student(...), Student(...)]
    """
    # TODO: Write query using filter and any()
    pass

# Query 2: Find courses taken by specific student
def courses_for_student(student_id):
    """
    Find semua courses yang diambil oleh student tertentu
    
    Expected return: List of Course objects
    """
    # TODO: Write query using Student.query
    pass

# Query 3: Find popular courses (most students)
def get_popular_courses(limit=5):
    """
    Find top N courses berdasarkan jumlah students
    
    Expected return: List of tuples (Course, count)
    """
    # TODO: Use db.session.query() with group by
    pass

# Query 4: Find busy students (most courses)
def get_busiest_students(limit=5):
    """
    Find top N students berdasarkan jumlah courses yang diambil
    
    Expected return: List of tuples (Student, count)
    """
    # TODO: Use db.session.query() with group by
    pass

# Query 5: Average courses per student
def avg_courses_per_student():
    """
    Calculate rata-rata courses yang diambil per student
    
    Expected return: Float
    """
    # TODO: Use func.avg()
    pass

# Query 6: Students without any courses
def unregistered_students():
    """
    Find students yang belum mengambil course apapun
    
    Expected return: List of Student objects
    """
    # TODO: Use filter dengan ~Student.courses.any()
    pass

# Query 7: Courses without students
def empty_courses():
    """
    Find courses yang belum ada student
    
    Expected return: List of Course objects
    """
    # TODO: Use filter with ~Course.students.any()
    pass
```

**3.2** Test queries:

```python
flask shell

>>> from exercise3_queries import *
>>> 
>>> # Test Query 1
>>> students = students_in_course('PY101')
>>> print(f"Students in PY101: {[s.name for s in students]}")
>>> 
>>> # Test Query 3
>>> popular = get_popular_courses(3)
>>> for course, count in popular:
...     print(f"{course.code}: {count} students")
>>> 
>>> # Test Query 5
>>> avg = avg_courses_per_student()
>>> print(f"Average courses per student: {avg:.2f}")
```

### Expected Output

```
Students in PY101: ['Ismail', 'Ahmad', 'Budi']
PY101: 3 students
WEB201: 3 students
DB301: 2 students
Average courses per student: 2.50
```

---

## Exercise 4: API Routes

### Objective
Membuat Flask routes untuk Many-to-Many operations.

### Steps

**4.1** Buat API routes di `exercise4_routes.py`:

```python
from flask import Blueprint, request, jsonify
from models import Student, Course, db

ex4_bp = Blueprint('ex4', __name__, url_prefix='/api/ex4')

# Route 1: List all enrollments as table
@ex4_bp.route('/enrollments', methods=['GET'])
def get_enrollments():
    """
    GET /api/ex4/enrollments
    
    Returns:
    {
        "total_enrollments": 10,
        "enrollments": [
            {"student": "Ismail", "course": "PY101"},
            ...
        ]
    }
    """
    # TODO: Query all students and their courses
    pass

# Route 2: Get student's schedule
@ex4_bp.route('/students/<int:student_id>/schedule', methods=['GET'])
def get_student_schedule(student_id):
    """
    GET /api/ex4/students/1/schedule
    
    Returns student info dan list of courses dengan details
    """
    # TODO: Implement
    pass

# Route 3: Get course roster
@ex4_bp.route('/courses/<int:course_id>/roster', methods=['GET'])
def get_course_roster(course_id):
    """
    GET /api/ex4/courses/1/roster
    
    Returns course info dan list of enrolled students
    """
    # TODO: Implement
    pass

# Route 4: Batch enroll students
@ex4_bp.route('/enroll-batch', methods=['POST'])
def batch_enroll():
    """
    POST /api/ex4/enroll-batch
    
    Request body:
    {
        "enrollments": [
            {"student_id": 1, "course_id": 1},
            {"student_id": 1, "course_id": 2},
            ...
        ]
    }
    
    Returns:
    {
        "success": 8,
        "failed": 2,
        "details": [...]
    }
    """
    # TODO: Implement with error handling
    pass

# Route 5: Generate statistics
@ex4_bp.route('/stats', methods=['GET'])
def get_stats():
    """
    GET /api/ex4/stats
    
    Returns various statistics about enrollments
    """
    # TODO: Calculate and return:
    # - total_students
    # - total_courses
    # - total_enrollments
    # - avg_courses_per_student
    # - avg_students_per_course
    # - busiest_student
    # - most_popular_course
    pass
```

**4.2** Test routes dengan cURL:

```bash
# Test Route 1
curl http://localhost:5000/api/ex4/enrollments

# Test Route 2
curl http://localhost:5000/api/ex4/students/1/schedule

# Test Route 3
curl http://localhost:5000/api/ex4/courses/1/roster

# Test Route 4
curl -X POST http://localhost:5000/api/ex4/enroll-batch \
  -H "Content-Type: application/json" \
  -d '{"enrollments": [{"student_id": 1, "course_id": 1}]}'

# Test Route 5
curl http://localhost:5000/api/ex4/stats
```

---

## Exercise 5: Error Handling

### Objective
Menangani edge cases dan error conditions.

### Steps

**5.1** Buat robust routes di `exercise5_error_handling.py`:

```python
from flask import Blueprint, request, jsonify
from models import Student, Course, db

ex5_bp = Blueprint('ex5', __name__, url_prefix='/api/ex5')

@ex5_bp.route('/safe-enroll', methods=['POST'])
def safe_enroll():
    """
    POST /api/ex5/safe-enroll
    
    Handle all possible errors:
    - Student tidak ditemukan → 404
    - Course tidak ditemukan → 404
    - Sudah enrolled → 400
    - Invalid input → 400
    """
    # TODO: Implement with comprehensive error handling
    pass

@ex5_bp.route('/safe-unenroll/<int:student_id>/<int:course_id>', methods=['DELETE'])
def safe_unenroll(student_id, course_id):
    """
    DELETE /api/ex5/safe-unenroll/1/1
    
    Handle errors:
    - Student tidak ditemukan → 404
    - Course tidak ditemukan → 404
    - Tidak enrolled → 400
    """
    # TODO: Implement with error handling
    pass

@ex5_bp.route('/validate-enrollment', methods=['POST'])
def validate_enrollment():
    """
    POST /api/ex5/validate-enrollment
    
    Validasi bahwa:
    - Student tidak exceed max courses (e.g., 6)
    - Course tidak exceed max students (e.g., 30)
    - Student tidak conflict dengan waktu course
    - Student prerequisite terpenuh
    
    Return validation result dengan detail error
    """
    # TODO: Implement with multiple validations
    pass
```

**5.2** Test error handling:

```bash
# Test 1: Student not found
curl -X POST http://localhost:5000/api/ex5/safe-enroll \
  -H "Content-Type: application/json" \
  -d '{"student_id": 9999, "course_id": 1}'
# Expected: 404 Not Found

# Test 2: Already enrolled
curl -X POST http://localhost:5000/api/ex5/safe-enroll \
  -H "Content-Type: application/json" \
  -d '{"student_id": 1, "course_id": 1}'
# Expected: 400 Already enrolled

# Test 3: Invalid input
curl -X POST http://localhost:5000/api/ex5/safe-enroll \
  -H "Content-Type: application/json" \
  -d '{"student_id": "invalid"}'
# Expected: 400 Bad Request
```

---

## Exercise 6: Advanced: Association Object

### Objective
Menggunakan Model class sebagai association table (dengan extra data).

### Steps

**6.1** Buat association object di `exercise6_association_object.py`:

```python
from utils import db
from datetime import datetime

# TODO: Create Enrollment model
# This replaces the db.Table with a full model
class Enrollment(db.Model):
    __tablename__ = 'enrollments'
    
    # TODO: Add these fields:
    # - student_id (FK, PK)
    # - course_id (FK, PK)
    # - enrolled_at (DateTime, default now)
    # - grade (String, nullable)
    # - attendance (Integer, default 0)
    # - notes (Text, nullable)
    pass

# Update Student model
class Student(db.Model):
    __tablename__ = 'students'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True)
    
    # TODO: Update relationship to use Enrollment
    # enrollments = db.relationship('Enrollment', backref='student')
    pass

# Update Course model
class Course(db.Model):
    __tablename__ = 'courses'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    code = db.Column(db.String(10), unique=True)
    
    # TODO: Update relationship to use Enrollment
    # enrollments = db.relationship('Enrollment', backref='course')
    pass
```

**6.2** Test dengan extra data:

```python
flask shell

>>> from exercise6_association_object import *
>>> 
>>> # Create objects
>>> student = Student(name='Test', email='test@ex.com')
>>> course = Course(name='Test Course', code='TEST101')
>>> db.session.add_all([student, course])
>>> db.session.commit()
>>> 
>>> # Create enrollment dengan extra data
>>> enrollment = Enrollment(student_id=student.id, course_id=course.id, grade='A', attendance=95)
>>> db.session.add(enrollment)
>>> db.session.commit()
>>> 
>>> # Query dan akses extra data
>>> enrollment = Enrollment.query.first()
>>> print(f"{enrollment.student.name} - {enrollment.course.code}: {enrollment.grade} ({enrollment.attendance}%)")
```

### Expected Output

```
Test - TEST101: A (95%)
```

---

## Exercise 7: Performance Optimization

### Objective
Mengoptimasi queries dengan Many-to-Many relationships.

### Steps

**7.1** Bandingkan performa di `exercise7_performance.py`:

```python
from models import Student, Course
from sqlalchemy.orm import joinedload
import time

# SLOW VERSION (N+1 queries)
def get_all_students_slow():
    """
    Ini menghasilkan N+1 queries:
    - 1 query: SELECT * FROM students
    - N queries: SELECT * FROM courses WHERE ... (untuk setiap student)
    """
    students = Student.query.all()
    result = []
    for student in students:
        result.append({
            'name': student.name,
            'courses': [c.name for c in student.courses]  # N queries!
        })
    return result

# OPTIMIZED VERSION (1 query dengan JOIN)
def get_all_students_fast():
    """
    Ini menghasilkan 1 query dengan JOIN:
    - 1 query: SELECT * FROM students JOIN courses...
    """
    students = Student.query.options(
        joinedload(Student.courses)
    ).all()
    result = []
    for student in students:
        result.append({
            'name': student.name,
            'courses': [c.name for c in student.courses]  # No more queries!
        })
    return result

# TODO: Add timing comparison
if __name__ == '__main__':
    # Time both versions
    # Print results showing performance difference
    pass
```

**7.2** Test performa:

```python
flask shell

>>> from exercise7_performance import *
>>> import time
>>> 
>>> # Time slow version
>>> start = time.time()
>>> get_all_students_slow()
>>> print(f"Slow: {time.time() - start:.4f}s")
>>> 
>>> # Time fast version
>>> start = time.time()
>>> get_all_students_fast()
>>> print(f"Fast: {time.time() - start:.4f}s")
```

---

## Solution Verification

Untuk mengecek jawaban, lihat:

| Exercise | Solution File | Lines |
|----------|---------------|-------|
| 1 | example_many_to_many.py | 1-60 |
| 2 | example_many_to_many.py | Functions |
| 3 | routes_many_to_many.py | Get endpoints |
| 4 | routes_many_to_many.py | All endpoints |
| 5 | routes_many_to_many.py | Error handlers |
| 6 | MANY_TO_MANY_EXAMPLE.md | Section 5 |
| 7 | QUICK_REFERENCE.md | Performance Tips |

---

## Checklist: Completion

- [ ] Exercise 1: Basic Setup ✓
- [ ] Exercise 2: CRUD Operations ✓
- [ ] Exercise 3: Query and Filter ✓
- [ ] Exercise 4: API Routes ✓
- [ ] Exercise 5: Error Handling ✓
- [ ] Exercise 6: Advanced ✓
- [ ] Exercise 7: Performance ✓
- [ ] All tests passing ✓
- [ ] Understand concepts ✓
- [ ] Ready for production? ✓

---

## Challenge: Build Your Own System

Setelah menyelesaikan semua exercises, coba buat sistem Many-to-Many Anda sendiri!

### Ideas

1. **Library Management System**
   - Many-to-Many: Author ↔ Book
   - Track: Publication date, number of pages

2. **Hospital Patient Management**
   - Many-to-Many: Doctor ↔ Patient
   - Track: Diagnosis, treatment, appointment dates

3. **Restaurant Menu System**
   - Many-to-Many: Menu ↔ Ingredient
   - Track: Quantity, preparation time

4. **Event Management**
   - Many-to-Many: User ↔ Event
   - Track: Registration date, ticket status, attendance

---

## Need Help?

- Check QUICK_REFERENCE.md for syntax
- Review VISUALIZATIONS.md for understanding
- Look at example_many_to_many.py for working examples
- Check routes_many_to_many.py for API patterns

Happy learning! 🚀

